-- ─────────────────────────────────────────────────────────────
-- 002 — Fix column names + add missing tables/columns
-- ─────────────────────────────────────────────────────────────

-- ── hosts: rename to match code ───────────────────────────────
alter table hosts rename column user_id to auth_user_id;
alter table hosts rename column display_name to name;

-- Fix policies that reference the old column name
drop policy if exists "Hosts can update their own record" on hosts;
create policy "Hosts can update their own record"
  on hosts for update using (auth.uid() = auth_user_id);

-- ── sessions: add missing columns ─────────────────────────────
alter table sessions
  add column if not exists getting_there      text,
  add column if not exists social_stretch_venue text,
  add column if not exists social_stretch_note  text,
  add column if not exists what_to_bring      text[],
  add column if not exists duration_mins      integer,
  add column if not exists host_paid_at       timestamptz;

-- ── hold_state: add missing enum values ───────────────────────
-- Postgres doesn't allow adding enum values inside a transaction,
-- so these must run outside one. Supabase runs migrations per-statement.
alter type hold_state add value if not exists 'payment_failed';
alter type hold_state add value if not exists 'confirmed';

-- ── attendees table ───────────────────────────────────────────
create table if not exists attendees (
  id                  uuid primary key default uuid_generate_v4(),
  auth_user_id        uuid references auth.users not null unique,
  name                text,
  stripe_customer_id  text,
  stripe_pm_id        text,
  neighbourhoods      text[],
  movement_interests  text[],
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

alter table attendees enable row level security;

create policy "Users can view their own attendee record"
  on attendees for select using (auth.uid() = auth_user_id);

create policy "Users can insert their own attendee record"
  on attendees for insert with check (auth.uid() = auth_user_id);

create policy "Users can update their own attendee record"
  on attendees for update using (auth.uid() = auth_user_id);

-- ── ratings table ─────────────────────────────────────────────
create table if not exists ratings (
  id          uuid primary key default uuid_generate_v4(),
  session_id  uuid references sessions not null,
  user_id     uuid references auth.users not null,
  stars       integer not null check (stars between 1 and 5),
  vibes       text[]  not null default '{}',
  note        text,
  created_at  timestamptz default now(),
  unique (session_id, user_id)
);

alter table ratings enable row level security;

create policy "Users can submit and update their own ratings"
  on ratings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Hosts can view ratings for their sessions"
  on ratings for select using (
    exists (
      select 1 from sessions
      join hosts on hosts.id = sessions.host_id
      where sessions.id = ratings.session_id
      and hosts.auth_user_id = auth.uid()
    )
  );

-- ── notifications table ───────────────────────────────────────
create table if not exists notifications (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references auth.users not null,
  type        text not null,             -- going_ahead | cancelled | rate_it | floor_not_met
  session_id  uuid references sessions,
  data        jsonb not null default '{}',
  read_at     timestamptz,
  created_at  timestamptz default now()
);

alter table notifications enable row level security;

create policy "Users can view their own notifications"
  on notifications for select using (auth.uid() = user_id);

create policy "Users can update their own notifications"
  on notifications for update using (auth.uid() = user_id);

create index if not exists notifications_user_id_idx on notifications (user_id);
create index if not exists notifications_created_at_idx on notifications (created_at desc);

-- ── suggestions table ─────────────────────────────────────────
create table if not exists suggestions (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references auth.users,
  movement_type text,
  neighbourhood text,
  day_of_week   text,
  time_of_day   text,
  note          text,
  votes         integer not null default 1,
  created_at    timestamptz default now()
);

alter table suggestions enable row level security;

create policy "Anyone can view suggestions"
  on suggestions for select using (true);

create policy "Authenticated users can insert suggestions"
  on suggestions for insert with check (auth.uid() = user_id);

-- ── host_applications: add auth_user_id alias ────────────────
-- The initial schema uses user_id; code uses auth_user_id
alter table host_applications rename column user_id to auth_user_id;

drop policy if exists "Users can submit applications" on host_applications;
drop policy if exists "Users can view their own applications" on host_applications;

create policy "Users can submit applications"
  on host_applications for insert with check (auth.uid() = auth_user_id);

create policy "Users can view their own applications"
  on host_applications for select using (auth.uid() = auth_user_id);

-- ── indexes ───────────────────────────────────────────────────
create index if not exists ratings_session_id_idx on ratings (session_id);
create index if not exists suggestions_movement_type_idx on suggestions (movement_type);
