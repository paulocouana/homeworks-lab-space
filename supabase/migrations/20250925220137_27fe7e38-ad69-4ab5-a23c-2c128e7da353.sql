-- Fix security vulnerability: Remove overly permissive public access to spaces table
-- and implement proper access controls

-- First, drop the problematic "Everyone can view spaces" policy
DROP POLICY IF EXISTS "Everyone can view spaces" ON public.spaces;

-- Create more secure policies that still allow marketplace functionality

-- 1. Authenticated users can view only active spaces (for marketplace browsing)
CREATE POLICY "Authenticated users can view active spaces" 
ON public.spaces 
FOR SELECT 
TO authenticated
USING (is_active = true);

-- 2. Space owners can view all their own spaces (including inactive ones)
CREATE POLICY "Owners can view their own spaces" 
ON public.spaces 
FOR SELECT 
TO authenticated
USING (auth.uid() = owner_id);

-- 3. Admins can view all spaces
CREATE POLICY "Admins can view all spaces" 
ON public.spaces 
FOR SELECT 
TO authenticated
USING (get_current_user_type() = 'admin'::user_type);

-- Note: The existing "Owners can manage their spaces" policy for ALL operations remains unchanged
-- as it properly restricts management operations to space owners only