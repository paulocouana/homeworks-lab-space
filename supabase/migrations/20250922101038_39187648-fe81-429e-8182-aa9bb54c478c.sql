-- Add is_active column to spaces table
ALTER TABLE public.spaces 
ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;

-- Add foreign key constraint from bookings to spaces
ALTER TABLE public.bookings 
ADD CONSTRAINT bookings_space_id_fkey 
FOREIGN KEY (space_id) REFERENCES public.spaces(id) ON DELETE CASCADE;

-- Add foreign key constraint from bookings to profiles
ALTER TABLE public.bookings 
ADD CONSTRAINT bookings_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Add foreign key constraint from spaces to profiles (owner)
ALTER TABLE public.spaces 
ADD CONSTRAINT spaces_owner_id_fkey 
FOREIGN KEY (owner_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Add foreign key constraint from organization_members to profiles
ALTER TABLE public.organization_members 
ADD CONSTRAINT organization_members_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Add foreign key constraint from organization_members to organizations
ALTER TABLE public.organization_members 
ADD CONSTRAINT organization_members_organization_id_fkey 
FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE;

-- Add foreign key constraint from spaces to organizations
ALTER TABLE public.spaces 
ADD CONSTRAINT spaces_organization_id_fkey 
FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE SET NULL;

-- Add foreign key constraint from payments to bookings
ALTER TABLE public.payments 
ADD CONSTRAINT payments_booking_id_fkey 
FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON DELETE CASCADE;