-- SECURITY FIX: Fix profiles table RLS policies to prevent cross-user data access
-- Issue: RESTRICTIVE policies were using AND logic, causing access issues
-- Solution: Convert to PERMISSIVE policies with proper OR logic

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles - secure" ON public.profiles;

-- Create PERMISSIVE policies with proper isolation
-- Users can view ONLY their own profile data (email, phone, etc.)
CREATE POLICY "Users can view only their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

-- Admins can view all profiles for administrative purposes
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.id = auth.uid() 
    AND p.user_type = 'admin'::user_type
  )
);

-- Ensure the UPDATE policy is also PERMISSIVE for consistency
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Users can update only their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);