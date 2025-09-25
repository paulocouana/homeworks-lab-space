-- CRITICAL SECURITY FIX: Fix infinite recursion in organization_members RLS policy
-- This prevents database crashes and security vulnerabilities

-- Create a security definer function to safely check user organization roles
-- This prevents infinite recursion by not querying the same table within its own RLS policy
CREATE OR REPLACE FUNCTION public.get_user_organization_role(user_id uuid, org_id uuid)
RETURNS TEXT AS $$
  SELECT role FROM public.organization_members 
  WHERE user_id = $1 AND organization_id = $2
  LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Drop the problematic policy that causes infinite recursion
DROP POLICY IF EXISTS "Organization owners can manage members" ON public.organization_members;

-- Create a new safe policy using the security definer function
CREATE POLICY "Organization owners can manage members - secure" 
ON public.organization_members 
FOR ALL 
TO authenticated
USING (public.get_user_organization_role(auth.uid(), organization_id) = 'owner');

-- Also fix the similar issue in organizations table
DROP POLICY IF EXISTS "Organization owners can manage organizations" ON public.organizations;

CREATE POLICY "Organization owners can manage organizations - secure" 
ON public.organizations 
FOR ALL 
TO authenticated
USING (public.get_user_organization_role(auth.uid(), id) = 'owner');