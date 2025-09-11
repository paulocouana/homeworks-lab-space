-- Add missing RLS policies for organizations table
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

-- Add missing policies for organization_members
CREATE POLICY "Organization owners can manage members" 
ON public.organization_members 
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.organization_members om2
  WHERE om2.organization_id = organization_members.organization_id 
  AND om2.user_id = auth.uid()
  AND om2.role = 'owner'
));

-- Admin access policies for admin users
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