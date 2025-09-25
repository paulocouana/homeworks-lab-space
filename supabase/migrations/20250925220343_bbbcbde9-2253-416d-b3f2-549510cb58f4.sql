-- Fix security vulnerability: Prevent unauthorized access to customer personal data
-- Add more restrictive policies to ensure profile data privacy

-- Drop the current "Admins can view all profiles" policy which uses a potentially recursive function
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create a new, more secure admin policy using the existing function
CREATE POLICY "Admins can view all profiles - secure" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.id = auth.uid() AND p.user_type = 'admin'::user_type
  )
);

-- The existing "Users can view their own profile" policy remains as it's secure
-- The existing "Users can update their own profile" policy remains as it's secure

-- Add a policy to explicitly deny INSERT on profiles (should only be done via trigger)
CREATE POLICY "Profiles can only be created via auth trigger" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (false);

-- Add a policy to prevent DELETE operations on profiles
CREATE POLICY "Profiles cannot be deleted" 
ON public.profiles 
FOR DELETE 
TO authenticated
USING (false);