-- Fix security vulnerability in profiles table RLS policy
-- Create a security definer function to safely check user role
CREATE OR REPLACE FUNCTION public.get_current_user_type()
RETURNS public.user_type AS $$
  SELECT user_type FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Drop the vulnerable policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create a secure policy that uses the security definer function
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.get_current_user_type() = 'admin'::user_type);