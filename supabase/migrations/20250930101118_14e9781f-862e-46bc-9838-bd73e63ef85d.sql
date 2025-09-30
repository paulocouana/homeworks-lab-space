-- FIX: Infinite recursion in profiles RLS policy
-- The admin policy was querying profiles table within its own policy, causing infinite recursion
-- Solution: Use the existing get_current_user_type() function which is SECURITY DEFINER and bypasses RLS

-- Drop the problematic admin policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Recreate admin policy using the SECURITY DEFINER function to avoid recursion
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (get_current_user_type() = 'admin'::user_type);