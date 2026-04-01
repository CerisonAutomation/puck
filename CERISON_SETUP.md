# Cerison Puck — Enterprise Setup Guide

> Branch: `cerison/setup` | Base: `puckeditor/puck` v0.20.x

## Quick Start

```bash
# 1. Clone
git clone -b cerison/setup https://github.com/CerisonAutomation/puck.git
cd puck

# 2. Install (uses yarn workspaces + turborepo)
yarn install

# 3. Build all packages
yarn build

# 4. Run demo app
cd apps/demo && yarn dev
```

---

## Official Packages Installed

| Package | NPM | Purpose |
|---|---|---|
| `@measured/puck` | core | Main editor + renderer |
| `@measured/puck-plugin-heading-analyzer` | plugin | SEO heading structure panel |
| `@measured/puck-plugin-emotion-cache` | plugin | CSS-in-JS Emotion fix for Next.js |
| `@measured/puck-field-contentful` | field | Contentful CMS asset picker |

---

## Install in Your Next.js App

```bash
npm i @measured/puck \
  @measured/puck-plugin-heading-analyzer \
  @measured/puck-plugin-emotion-cache \
  @measured/puck-field-contentful
```

---

## File Map

```
cerison/
  puck.config.tsx          ← Full production config with all plugins + components
  CERISON_SETUP.md         ← This file
```

---

## Editor Route (Next.js App Router)

```tsx
// app/puck/[...puckPath]/page.tsx
import { Puck } from '@measured/puck';
import { config } from '../../../cerison/puck.config';
import '@measured/puck/puck.css';

export default function EditorPage() {
  return (
    <Puck
      config={config}
      data={{}}
      onPublish={async (data) => {
        await fetch('/api/puck/save', {
          method: 'POST',
          body: JSON.stringify(data),
        });
      }}
    />
  );
}
```

## Render Route

```tsx
// app/[...slug]/page.tsx
import { Render } from '@measured/puck';
import { config } from '../../cerison/puck.config';
import '@measured/puck/puck.css';
import db from '../../lib/db'; // your Supabase client

export default async function Page({ params }) {
  const slug = params.slug?.join('/') ?? 'home';
  const { data: page } = await db.from('pages').select('content').eq('slug', slug).single();
  return <Render config={config} data={page.content} />;
}
```

---

## Supabase Schema

```sql
create table pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  content jsonb not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS: only authenticated users can write
alter table pages enable row level security;
create policy "Public read" on pages for select using (true);
create policy "Auth write" on pages for all using (auth.role() = 'authenticated');
```

---

## API Route (Save)

```ts
// app/api/puck/save/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { slug, content } = body;

  const { error } = await supabase
    .from('pages')
    .upsert({ slug, content, updated_at: new Date().toISOString() }, { onConflict: 'slug' });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
```
