-- ============================================================
-- Cerison Puck Editor — Supabase Schema
-- Run this in your Supabase SQL Editor (project > SQL Editor)
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── pages ──────────────────────────────────────────────────
create table if not exists public.pages (
  id          uuid        primary key default uuid_generate_v4(),
  slug        text        not null unique,
  title       text        not null default 'Untitled Page',
  description text,
  og_image    text,
  lang        text        not null default 'en',
  data        jsonb       not null default '{}'::jsonb,   -- Puck PageData JSON
  published   boolean     not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  created_by  uuid        references auth.users(id) on delete set null,
  updated_by  uuid        references auth.users(id) on delete set null
);

-- ── page_revisions (full history) ────────────────────────────
create table if not exists public.page_revisions (
  id          uuid        primary key default uuid_generate_v4(),
  page_id     uuid        not null references public.pages(id) on delete cascade,
  data        jsonb       not null,
  label       text,                            -- optional human label e.g. "Before redesign"
  created_at  timestamptz not null default now(),
  created_by  uuid        references auth.users(id) on delete set null
);

-- ── templates ────────────────────────────────────────────────
create table if not exists public.templates (
  id          uuid        primary key default uuid_generate_v4(),
  name        text        not null,
  description text,
  thumbnail   text,
  data        jsonb       not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

-- ── assets (media library) ────────────────────────────────────
create table if not exists public.assets (
  id          uuid        primary key default uuid_generate_v4(),
  filename    text        not null,
  url         text        not null,
  mime_type   text        not null,
  size        bigint,
  alt         text,
  created_at  timestamptz not null default now(),
  created_by  uuid        references auth.users(id) on delete set null
);

-- ── updated_at trigger ──────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger pages_updated_at
  before update on public.pages
  for each row execute function public.set_updated_at();

-- ── RLS policies ────────────────────────────────────────────
alter table public.pages          enable row level security;
alter table public.page_revisions enable row level security;
alter table public.templates      enable row level security;
alter table public.assets         enable row level security;

-- Published pages: readable by anyone (for SSG/ISR rendering)
create policy "public_read_published_pages"
  on public.pages for select
  using (published = true);

-- Authenticated users can do full CRUD on their pages
create policy "auth_crud_pages"
  on public.pages for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Revisions: authenticated only
create policy "auth_crud_revisions"
  on public.page_revisions for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Templates: read by authenticated, write by authenticated
create policy "auth_read_templates"
  on public.templates for select
  using (auth.role() = 'authenticated');

create policy "auth_write_templates"
  on public.templates for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Assets: authenticated CRUD
create policy "auth_crud_assets"
  on public.assets for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ── Indexes ──────────────────────────────────────────────────
create index if not exists idx_pages_slug      on public.pages(slug);
create index if not exists idx_pages_published on public.pages(published);
create index if not exists idx_revisions_page  on public.page_revisions(page_id, created_at desc);
