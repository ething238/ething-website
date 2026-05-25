-- Run this in your Supabase SQL editor.
create extension if not exists pgcrypto;

create table if not exists public.visitor_visits (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null,
  visited_at timestamptz not null default now(),
  path text not null,
  ip text not null,
  user_agent text not null,
  referrer text not null,
  language text not null,
  timezone text not null,
  screen text not null,
  country text not null,
  region text not null,
  city text not null,
  source text not null
);

create index if not exists visitor_visits_visited_at_idx
  on public.visitor_visits (visited_at desc);

create index if not exists visitor_visits_visitor_id_idx
  on public.visitor_visits (visitor_id);

alter table public.visitor_visits enable row level security;

revoke all on table public.visitor_visits from anon, authenticated;

-- No anon/authenticated policies are created because writes/reads happen
-- through server-side service-role access only.
