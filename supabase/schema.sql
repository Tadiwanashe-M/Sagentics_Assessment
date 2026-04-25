-- Client Feedback Dashboard — run in Supabase SQL Editor
-- https://supabase.com/dashboard/project/_/sql

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  rating int not null check (rating >= 1 and rating <= 5),
  comment text not null,
  created_at timestamptz not null default now(),
  archived boolean not null default false
);

create index if not exists feedback_created_at_idx on public.feedback (created_at desc);
create index if not exists feedback_archived_idx on public.feedback (archived);

grant usage on schema public to anon, authenticated;
grant insert on public.feedback to anon;
grant select, update, delete on public.feedback to authenticated;

alter table public.feedback enable row level security;

-- Anonymous (anon key, no session) may insert submissions
create policy "feedback_insert_anon"
  on public.feedback
  for insert
  to anon
  with check (true);

-- Authenticated dashboard users
create policy "feedback_select_authenticated"
  on public.feedback
  for select
  to authenticated
  using (true);

create policy "feedback_update_authenticated"
  on public.feedback
  for update
  to authenticated
  using (true)
  with check (true);

create policy "feedback_delete_authenticated"
  on public.feedback
  for delete
  to authenticated
  using (true);
