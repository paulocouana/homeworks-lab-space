-- Extensões úteis
create extension if not exists pgcrypto;

-- =========================
-- Enums
-- =========================
do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum ('admin', 'moderator', 'user');
  end if;
  if not exists (select 1 from pg_type where typname = 'org_member_role') then
    create type public.org_member_role as enum ('owner', 'manager', 'member');
  end if;
  if not exists (select 1 from pg_type where typname = 'booking_status') then
    create type public.booking_status as enum ('pending', 'confirmed', 'canceled', 'completed');
  end if;
  if not exists (select 1 from pg_type where typname = 'payment_status') then
    create type public.payment_status as enum ('pending', 'paid', 'failed', 'refunded');
  end if;
  if not exists (select 1 from pg_type where typname = 'payment_provider') then
    create type public.payment_provider as enum ('stripe', 'paypal', 'mpesa', 'mkesh', 'emola', 'other');
  end if;
  if not exists (select 1 from pg_type where typname = 'subscription_status') then
    create type public.subscription_status as enum ('trialing', 'active', 'past_due', 'canceled', 'unpaid', 'incomplete');
  end if;
end$$;

-- =========================
-- Tabelas principais
-- =========================

-- Perfis de utilizadores (não referenciamos auth.users por FK; app cria o registo após signup)
create table if not exists public.profiles (
  id uuid primary key,                      -- deverá ser igual a auth.uid()
  email text unique,
  first_name text,
  last_name text,
  avatar_url text,
  phone text,
  locale text default 'pt-PT',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Tabela de roles de aplicação (inclui admin)
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique(user_id, role)
);

-- Organizações (proprietários/empresas)
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  description text,
  created_by uuid not null references public.profiles(id),
  subscription_status public.subscription_status not null default 'incomplete',
  plan text,
  currency text default 'usd',
  current_period_start timestamptz,
  current_period_end timestamptz,
  external_provider text,           -- p.ex. 'stripe'
  external_customer_id text,
  external_subscription_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Membros de organização com papéis específicos
create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.org_member_role not null default 'member',
  created_at timestamptz not null default now(),
  unique(organization_id, user_id)
);

-- Espaços/Listagens
create table if not exists public.spaces (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null,
  description text,
  address_line1 text,
  address_line2 text,
  city text,
  region text,
  postal_code text,
  country_code text,
  latitude numeric(9,6),
  longitude numeric(9,6),
  capacity int,
  amenities jsonb not null default '[]'::jsonb,
  hourly_rate integer,
  daily_rate integer,
  currency text default 'usd',
  is_active boolean not null default true,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Imagens associadas aos espaços (ficheiros guardados no Storage)
create table if not exists public.space_images (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references public.spaces(id) on delete cascade,
  storage_path text not null,    -- caminho em storage.objects
  is_cover boolean not null default false,
  created_at timestamptz not null default now()
);

-- Reservas
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references public.spaces(id) on delete restrict,
  organization_id uuid not null references public.organizations(id) on delete restrict,
  user_id uuid not null references public.profiles(id) on delete cascade,
  start_time timestamptz not null,
  end_time timestamptz not null,
  status public.booking_status not null default 'pending',
  total_amount integer,
  currency text default 'usd',
  payment_status public.payment_status not null default 'pending',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Pagamentos (normalmente escritos por Edge Functions com service role)
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  provider public.payment_provider not null,
  provider_session_id text,
  provider_payment_intent_id text,
  status public.payment_status not null default 'pending',
  amount integer not null,
  currency text default 'usd',
  receipt_url text,
  raw_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider, provider_session_id)
);

-- Subscrições (do lado do proprietário/organização)
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  status public.subscription_status not null default 'incomplete',
  plan text,
  price_cents integer,
  currency text default 'usd',
  external_provider text,              -- p.ex. 'stripe'
  external_customer_id text,
  external_subscription_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================
-- Índices
-- =========================
create index if not exists idx_user_roles_user on public.user_roles(user_id);
create index if not exists idx_org_members_org on public.organization_members(organization_id);
create index if not exists idx_org_members_user on public.organization_members(user_id);
create index if not exists idx_spaces_org on public.spaces(organization_id);
create index if not exists idx_bookings_org on public.bookings(organization_id);
create index if not exists idx_bookings_user on public.bookings(user_id);
create index if not exists idx_bookings_space on public.bookings(space_id);
create index if not exists idx_payments_booking on public.payments(booking_id);
create index if not exists idx_payments_org on public.payments(organization_id);

-- =========================
-- Funções auxiliares (RLS)
-- =========================

-- Função para ranking de papéis em organização
create or replace function public.org_role_rank(_role public.org_member_role)
returns int
language sql
stable
as $$
  select case
    when _role = 'owner' then 3
    when _role = 'manager' then 2
    when _role = 'member' then 1
    else 0
  end;
$$;

-- Verifica se o utilizador tem um role de aplicação (admin, etc.)
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  );
$$;

-- É membro da organização?
create or replace function public.is_org_member(_user_id uuid, _organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_members m
    where m.organization_id = _organization_id
      and m.user_id = _user_id
  );
$$;

-- É membro com um papel mínimo (owner>=manager>=member)?
create or replace function public.is_org_member_with_min_role(
  _user_id uuid,
  _organization_id uuid,
  _min_role public.org_member_role
) returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_members m
    where m.organization_id = _organization_id
      and m.user_id = _user_id
      and public.org_role_rank(m.role) >= public.org_role_rank(_min_role)
  );
$$;

-- Obtém a organização associada a um espaço (para RLS em space_images)
create or replace function public.get_space_org_id(_space_id uuid)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select s.organization_id
  from public.spaces s
  where s.id = _space_id;
$$;

-- =========================
-- Triggers: updated_at
-- =========================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_organizations_updated_at on public.organizations;
create trigger trg_organizations_updated_at
before update on public.organizations
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_spaces_updated_at on public.spaces;
create trigger trg_spaces_updated_at
before update on public.spaces
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_bookings_updated_at on public.bookings;
create trigger trg_bookings_updated_at
before update on public.bookings
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_payments_updated_at on public.payments;
create trigger trg_payments_updated_at
before update on public.payments
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_subscriptions_updated_at on public.subscriptions;
create trigger trg_subscriptions_updated_at
before update on public.subscriptions
for each row execute procedure public.set_updated_at();

-- =========================
-- Triggers de validação/normalização
-- =========================

-- Em bookings: valida datas e impõe organization_id a partir do espaço
create or replace function public.booking_set_org_and_validate()
returns trigger
language plpgsql
as $$
declare
  v_org uuid;
begin
  select organization_id into v_org
  from public.spaces
  where id = new.space_id;

  if v_org is null then
    raise exception 'Espaço inválido';
  end if;

  new.organization_id := v_org;

  if new.end_time <= new.start_time then
    raise exception 'end_time deve ser posterior a start_time';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_bookings_validate on public.bookings;
create trigger trg_bookings_validate
before insert or update on public.bookings
for each row execute procedure public.booking_set_org_and_validate();

-- Em payments: preenche organization_id e user_id a partir da booking
create or replace function public.payment_set_org_user_from_booking()
returns trigger
language plpgsql
as $$
declare
  v_org uuid;
  v_user uuid;
begin
  select organization_id, user_id into v_org, v_user
  from public.bookings
  where id = new.booking_id;

  if v_org is null then
    raise exception 'Reserva inválida';
  end if;

  new.organization_id := v_org;
  new.user_id := v_user;

  return new;
end;
$$;

drop trigger if exists trg_payments_fill on public.payments;
create trigger trg_payments_fill
before insert or update on public.payments
for each row execute procedure public.payment_set_org_user_from_booking();

-- =========================
-- RLS: activar e políticas
-- =========================

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.spaces enable row level security;
alter table public.space_images enable row level security;
alter table public.bookings enable row level security;
alter table public.payments enable row level security;
alter table public.subscriptions enable row level security;

-- profiles
drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles
for select
to authenticated
using (
  id = auth.uid() or public.has_role(auth.uid(), 'admin')
);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin"
on public.profiles
for update
to authenticated
using (id = auth.uid() or public.has_role(auth.uid(), 'admin'))
with check (id = auth.uid() or public.has_role(auth.uid(), 'admin'));

-- user_roles
drop policy if exists "user_roles_select_self_or_admin" on public.user_roles;
create policy "user_roles_select_self_or_admin"
on public.user_roles
for select
to authenticated
using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

drop policy if exists "user_roles_admin_write" on public.user_roles;
create policy "user_roles_admin_write"
on public.user_roles
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- organizations
drop policy if exists "orgs_select_member_or_admin" on public.organizations;
create policy "orgs_select_member_or_admin"
on public.organizations
for select
to authenticated
using (public.is_org_member(auth.uid(), id) or public.has_role(auth.uid(), 'admin'));

drop policy if exists "orgs_insert_creator" on public.organizations;
create policy "orgs_insert_creator"
on public.organizations
for insert
to authenticated
with check (created_by = auth.uid());

drop policy if exists "orgs_update_manager_or_admin" on public.organizations;
create policy "orgs_update_manager_or_admin"
on public.organizations
for update
to authenticated
using (public.has_role(auth.uid(), 'admin') or public.is_org_member_with_min_role(auth.uid(), id, 'manager'))
with check (public.has_role(auth.uid(), 'admin') or public.is_org_member_with_min_role(auth.uid(), id, 'manager'));

drop policy if exists "orgs_delete_owner_or_admin" on public.organizations;
create policy "orgs_delete_owner_or_admin"
on public.organizations
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin') or public.is_org_member_with_min_role(auth.uid(), id, 'owner'));

-- organization_members
drop policy if exists "org_members_select_member_or_admin" on public.organization_members;
create policy "org_members_select_member_or_admin"
on public.organization_members
for select
to authenticated
using (public.is_org_member(auth.uid(), organization_id) or public.has_role(auth.uid(), 'admin'));

drop policy if exists "org_members_insert_owner_or_admin" on public.organization_members;
create policy "org_members_insert_owner_or_admin"
on public.organization_members
for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin') or public.is_org_member_with_min_role(auth.uid(), organization_id, 'owner'));

drop policy if exists "org_members_update_owner_or_admin" on public.organization_members;
create policy "org_members_update_owner_or_admin"
on public.organization_members
for update
to authenticated
using (public.has_role(auth.uid(), 'admin') or public.is_org_member_with_min_role(auth.uid(), organization_id, 'owner'))
with check (public.has_role(auth.uid(), 'admin') or public.is_org_member_with_min_role(auth.uid(), organization_id, 'owner'));

drop policy if exists "org_members_delete_owner_admin_or_self" on public.organization_members;
create policy "org_members_delete_owner_admin_or_self"
on public.organization_members
for delete
to authenticated
using (
  public.has_role(auth.uid(), 'admin')
  or public.is_org_member_with_min_role(auth.uid(), organization_id, 'owner')
  or auth.uid() = user_id
);

-- spaces
drop policy if exists "spaces_select_public" on public.spaces;
create policy "spaces_select_public"
on public.spaces
for select
to public
using (true);

drop policy if exists "spaces_insert_manager_or_admin" on public.spaces;
create policy "spaces_insert_manager_or_admin"
on public.spaces
for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin') or public.is_org_member_with_min_role(auth.uid(), organization_id, 'manager'));

drop policy if exists "spaces_update_manager_or_admin" on public.spaces;
create policy "spaces_update_manager_or_admin"
on public.spaces
for update
to authenticated
using (public.has_role(auth.uid(), 'admin') or public.is_org_member_with_min_role(auth.uid(), organization_id, 'manager'))
with check (public.has_role(auth.uid(), 'admin') or public.is_org_member_with_min_role(auth.uid(), organization_id, 'manager'));

drop policy if exists "spaces_delete_owner_or_admin" on public.spaces;
create policy "spaces_delete_owner_or_admin"
on public.spaces
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin') or public.is_org_member_with_min_role(auth.uid(), organization_id, 'owner'));

-- space_images
drop policy if exists "space_images_select_public" on public.space_images;
create policy "space_images_select_public"
on public.space_images
for select
to public
using (true);

drop policy if exists "space_images_write_manager_or_admin" on public.space_images;
create policy "space_images_write_manager_or_admin"
on public.space_images
for all
to authenticated
using (public.has_role(auth.uid(), 'admin') or public.is_org_member_with_min_role(auth.uid(), public.get_space_org_id(space_id), 'manager'))
with check (public.has_role(auth.uid(), 'admin') or public.is_org_member_with_min_role(auth.uid(), public.get_space_org_id(space_id), 'manager'));

-- bookings
drop policy if exists "bookings_select_self_org_admin" on public.bookings;
create policy "bookings_select_self_org_admin"
on public.bookings
for select
to authenticated
using (
  user_id = auth.uid()
  or public.is_org_member(auth.uid(), organization_id)
  or public.has_role(auth.uid(), 'admin')
);

drop policy if exists "bookings_insert_self" on public.bookings;
create policy "bookings_insert_self"
on public.bookings
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "bookings_update_self_org_admin" on public.bookings;
create policy "bookings_update_self_org_admin"
on public.bookings
for update
to authenticated
using (
  user_id = auth.uid()
  or public.is_org_member(auth.uid(), organization_id)
  or public.has_role(auth.uid(), 'admin')
)
with check (
  user_id = auth.uid()
  or public.is_org_member(auth.uid(), organization_id)
  or public.has_role(auth.uid(), 'admin')
);

-- payments (apenas leitura para utilizador/org; escrita deve ser via service role)
drop policy if exists "payments_select_self_org_admin" on public.payments;
create policy "payments_select_self_org_admin"
on public.payments
for select
to authenticated
using (
  user_id = auth.uid()
  or public.is_org_member(auth.uid(), organization_id)
  or public.has_role(auth.uid(), 'admin')
);

-- subscriptions (leitura para org/admin; escrita via service role)
drop policy if exists "subscriptions_select_org_admin" on public.subscriptions;
create policy "subscriptions_select_org_admin"
on public.subscriptions
for select
to authenticated
using (public.is_org_member(auth.uid(), organization_id) or public.has_role(auth.uid(), 'admin'));

-- =========================
-- Storage: bucket e políticas
-- =========================

-- Bucket público para imagens de espaços
insert into storage.buckets (id, name, public)
values ('space-images', 'space-images', true)
on conflict (id) do nothing;

-- Políticas no storage.objects (bucket 'space-images')
drop policy if exists "space_images_public_read" on storage.objects;
create policy "space_images_public_read"
on storage.objects
for select
to public
using (bucket_id = 'space-images');

drop policy if exists "space_images_authenticated_insert" on storage.objects;
create policy "space_images_authenticated_insert"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'space-images');

drop policy if exists "space_images_owner_update" on storage.objects;
create policy "space_images_owner_update"
on storage.objects
for update
to authenticated
using (bucket_id = 'space-images' and owner = auth.uid())
with check (bucket_id = 'space-images' and owner = auth.uid());

drop policy if exists "space_images_owner_delete" on storage.objects;
create policy "space_images_owner_delete"
on storage.objects
for delete
to authenticated
using (bucket_id = 'space-images' and owner = auth.uid());