-- Fix for points not updating
-- The issue is that the Waste Bank user does not have permission to update the Household user's profile due to RLS.
-- We need to make the trigger function SECURITY DEFINER so it runs with elevated privileges.

create or replace function public.handle_waste_transaction()
returns trigger as $$
begin
  update public.profiles
  set points = points + new.points_earned
  where id = new.user_id;
  return new;
end;
$$ language plpgsql security definer;

-- Also update the redemption handler to be safe
create or replace function public.handle_reward_redemption()
returns trigger as $$
declare
  reward_cost int;
  user_points int;
begin
  -- Get reward cost
  select points_cost into reward_cost from public.rewards where id = new.reward_id;
  
  -- Get user points
  select points into user_points from public.profiles where id = new.user_id;
  
  -- Check if user has enough points
  if user_points < reward_cost then
    raise exception 'Insufficient points';
  end if;
  
  -- Deduct points
  update public.profiles
  set points = points - reward_cost
  where id = new.user_id;
  
  return new;
end;
$$ language plpgsql security definer;
