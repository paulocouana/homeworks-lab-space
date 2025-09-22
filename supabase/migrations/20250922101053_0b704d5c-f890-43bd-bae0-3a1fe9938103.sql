-- Add is_active column to spaces table
ALTER TABLE public.spaces 
ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;