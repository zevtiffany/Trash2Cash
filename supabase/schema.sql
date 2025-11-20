-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create Enum for Roles
create type user_role as enum ('household', 'waste_bank', 'government');

-- Create Profiles Table (extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  name text,
  role user_role default 'household'::user_role,
  points integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Profiles
alter table public.profiles enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Create Waste Transactions Table
create table public.waste_transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null, -- The household user
  waste_bank_id uuid references public.profiles(id) not null, -- The waste bank officer
  type text not null,
  weight numeric(10, 2) not null, -- Weight in Kg
  points_earned integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Transactions
alter table public.waste_transactions enable row level security;

-- Policies for Transactions
create policy "Users can view their own transactions"
  on public.waste_transactions for select
  using ( auth.uid() = user_id );

create policy "Waste Banks can view transactions they processed"
  on public.waste_transactions for select
  using ( auth.uid() = waste_bank_id );

create policy "Government can view all transactions"
  on public.waste_transactions for select
  using ( 
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'government'
    )
  );

create policy "Waste Banks can insert transactions"
  on public.waste_transactions for insert
  with check (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'waste_bank'
    )
  );

-- Create Rewards Table
create table public.rewards (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  points_cost integer not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Rewards
alter table public.rewards enable row level security;

create policy "Rewards are viewable by everyone"
  on public.rewards for select
  using ( true );

-- Create Reward Redemptions Table
create table public.reward_redemptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  reward_id uuid references public.rewards(id) not null,
  status text default 'pending', -- pending, completed, rejected
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Redemptions
alter table public.reward_redemptions enable row level security;

create policy "Users can view their own redemptions"
  on public.reward_redemptions for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own redemptions"
  on public.reward_redemptions for insert
  with check ( auth.uid() = user_id );

-- Function to handle point deduction on redemption
create or replace function handle_reward_redemption()
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
$$ language plpgsql;

-- Trigger for redemption
create trigger on_reward_redemption
  before insert on public.reward_redemptions
  for each row execute procedure handle_reward_redemption();

-- Function to handle point addition on waste transaction
create or replace function handle_waste_transaction()
returns trigger as $$
begin
  update public.profiles
  set points = points + new.points_earned
  where id = new.user_id;
  return new;
end;
$$ language plpgsql;

-- Trigger for waste transaction
create trigger on_waste_transaction
  after insert on public.waste_transactions
  for each row execute procedure handle_waste_transaction();
