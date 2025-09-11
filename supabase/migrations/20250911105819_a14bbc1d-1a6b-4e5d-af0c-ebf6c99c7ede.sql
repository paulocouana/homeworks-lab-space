-- Create the profiles table that was missing
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  user_type public.user_type NOT NULL DEFAULT 'client',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (user_type = 'admin');

-- Create the trigger for the profiles table
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Now add the missing RLS policies that failed before
CREATE POLICY "Organizations are viewable by their members" 
ON public.organizations 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.organization_members 
  WHERE organization_members.organization_id = organizations.id 
  AND organization_members.user_id = auth.uid()
));

CREATE POLICY "Organization owners can manage organizations" 
ON public.organizations 
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.organization_members 
  WHERE organization_members.organization_id = organizations.id 
  AND organization_members.user_id = auth.uid()
  AND organization_members.role = 'owner'
));

CREATE POLICY "Organization owners can manage members" 
ON public.organization_members 
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.organization_members om2
  WHERE om2.organization_id = organization_members.organization_id 
  AND om2.user_id = auth.uid()
  AND om2.role = 'owner'
));

CREATE POLICY "Admins can view all organizations" 
ON public.organizations 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.user_type = 'admin'
));

CREATE POLICY "Admins can view all organization members" 
ON public.organization_members 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.user_type = 'admin'
));

CREATE POLICY "Admins can view all payments" 
ON public.payments 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.user_type = 'admin'
));