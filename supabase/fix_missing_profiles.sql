-- Script to fix missing profiles for existing users
-- Run this in Supabase SQL Editor

insert into public.profiles (id, email, name, role, points)
select 
  au.id, 
  au.email, 
  -- Use name from metadata, or fallback to part of email
  coalesce(au.raw_user_meta_data->>'name', split_part(au.email, '@', 1)), 
  -- Use role from metadata if valid, otherwise default to 'household'
  case 
    when (au.raw_user_meta_data->>'role') = 'waste_bank' then 'waste_bank'::public.user_role
    when (au.raw_user_meta_data->>'role') = 'government' then 'government'::public.user_role
    else 'household'::public.user_role
  end,
  0 -- Default points
from auth.users au
where not exists (
  select 1 from public.profiles p where p.id = au.id
);
