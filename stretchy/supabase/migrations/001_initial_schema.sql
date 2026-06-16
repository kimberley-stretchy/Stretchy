-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────────────────────────
-- Profiles (one per auth user)
-- ─────────────────────────────────────────────────────────────
create table profiles (
  id          uuid primary key references auth.users on delete cascade,
  display_name text,
  avatar_url  text,
  suburb      text,
  created_at  timestamptz default now()
);

alter table profiles enable row level security;

create policy "Users can view their own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ─────────────────────────────────────────────────────────────
-- Waitlist
-- ─────────────────────────────────────────────────────────────
create table waitlist (
  id         uuid primary key default uuid_generate_v4(),
  email      text not null unique,
  role       text check (role in ('move', 'host', 'both')),
  suburb     text,
  created_at timestamptz default now()
);

alter table waitlist enable row level security;

-- Only service role can read waitlist; anyone can insert
create policy "Anyone can join waitlist"
  on waitlist for insert with check (true);

-- ─────────────────────────────────────────────────────────────
-- Hosts
-- ─────────────────────────────────────────────────────────────
create table hosts (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid references auth.users not null unique,
  display_name text not null,
  avatar_url   text,
  bio          text,
  specialties  text[],
  verified_at  timestamptz,
  created_at   timestamptz default now()
);

alter table hosts enable row level security;

create policy "Hosts are publicly viewable"
  on hosts for select using (true);

create policy "Hosts can update their own record"
  on hosts for update using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────
-- Sessions
-- ─────────────────────────────────────────────────────────────
create type session_state as enum ('open', 'confirmed', 'cancelled', 'completed');
create type movement_type as enum ('yoga', 'pilates', 'breath', 'sound', 'flow', 'run', 'hiit');

create table sessions (
  id              uuid primary key default uuid_generate_v4(),
  host_id         uuid references hosts not null,
  title           text not null,
  description     text,
  movement_type   movement_type not null,
  starts_at       timestamptz not null,
  ends_at         timestamptz,
  location_name   text not null,
  location_address text,
  location_lat    numeric(9,6),
  location_lng    numeric(9,6),
  host_target     integer not null,   -- NZD cents
  min_attendees   integer not null default 5,
  max_attendees   integer not null default 20,
  state           session_state not null default 'open',
  gate_sent_at    timestamptz,
  confirmed_at    timestamptz,
  cancelled_at    timestamptz,
  created_at      timestamptz default now()
);

alter table sessions enable row level security;

create policy "Sessions are publicly viewable"
  on sessions for select using (true);

create policy "Hosts can manage their sessions"
  on sessions for all using (
    exists (
      select 1 from hosts
      where hosts.id = sessions.host_id
      and hosts.user_id = auth.uid()
    )
  );

-- ─────────────────────────────────────────────────────────────
-- Holds
-- ─────────────────────────────────────────────────────────────
create type hold_state as enum ('active', 'released', 'charged', 'refunded');

create table holds (
  id                  uuid primary key default uuid_generate_v4(),
  session_id          uuid references sessions not null,
  user_id             uuid references auth.users not null,
  state               hold_state not null default 'active',
  stripe_pi_id        text,   -- payment intent id
  amount_charged_nzd  integer,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now(),
  unique (session_id, user_id, state)
);

alter table holds enable row level security;

create policy "Users can view their own holds"
  on holds for select using (auth.uid() = user_id);

create policy "Users can insert holds"
  on holds for insert with check (auth.uid() = user_id);

create policy "Users can update their own holds"
  on holds for update using (auth.uid() = user_id);

create policy "Hosts can view holds for their sessions"
  on holds for select using (
    exists (
      select 1 from sessions
      join hosts on hosts.id = sessions.host_id
      where sessions.id = holds.session_id
      and hosts.user_id = auth.uid()
    )
  );

-- ─────────────────────────────────────────────────────────────
-- Host applications
-- ─────────────────────────────────────────────────────────────
create type application_state as enum ('pending', 'approved', 'rejected');

create table host_applications (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid references auth.users not null,
  email        text not null,
  full_name    text not null,
  specialty    text,
  bio          text,
  instagram    text,
  state        application_state not null default 'pending',
  created_at   timestamptz default now()
);

alter table host_applications enable row level security;

create policy "Users can submit applications"
  on host_applications for insert with check (auth.uid() = user_id);

create policy "Users can view their own applications"
  on host_applications for select using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────
-- Indexes
-- ─────────────────────────────────────────────────────────────
create index sessions_starts_at_idx on sessions (starts_at);
create index sessions_state_idx on sessions (state);
create index sessions_movement_type_idx on sessions (movement_type);
create index holds_session_id_idx on holds (session_id);
create index holds_user_id_idx on holds (user_id);
create index holds_state_idx on holds (state);
