# Cerison Puck Editor — Backend

Production-ready Supabase + Next.js App Router backend for the Puck visual editor.

## Stack

| Layer | Technology |
|---|---|
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (JWT Bearer) |
| Storage | Supabase Storage (`puck-assets` bucket) |
| API | Next.js 14+ App Router Route Handlers |
| Validation | Zod |
| Types | Hand-crafted + `supabase gen types` |

## Quick Start

### 1. Set Up Supabase

```bash
# Install Supabase CLI
npm i -g supabase

# Log in
supabase login

# Run the schema in your project's SQL Editor
# Paste contents of: cerison/backend/supabase/schema.sql
# Then (optionally) seed:
# Paste contents of: cerison/backend/supabase/seed.sql
```

### 2. Create Storage Bucket

In Supabase Dashboard → Storage → New Bucket:
- Name: `puck-assets`
- Public: ✅ (so uploaded images are publicly accessible)

### 3. Configure Environment

```bash
cp cerison/backend/.env.example .env.local
# Edit .env.local with your Supabase project credentials
```

### 4. Install Dependencies

```bash
pnpm add @supabase/supabase-js @supabase/ssr zod
```

### 5. Wire the API Routes

Copy `cerison/backend/api/` into your Next.js `app/api/` directory:

```bash
cp -r cerison/backend/api/* app/api/
```

## API Reference

### Pages

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/pages` | ✅ | List all pages (supports `?published=true&search=&limit=&offset=`) |
| `POST` | `/api/pages` | ✅ | Create new page |
| `GET` | `/api/pages/:id` | Public | Get page by UUID or slug |
| `PATCH` | `/api/pages/:id` | ✅ | Update page + auto-saves revision |
| `DELETE` | `/api/pages/:id` | ✅ | Delete page (cascades revisions) |
| `GET` | `/api/pages/:id/revisions` | ✅ | List revision history |
| `POST` | `/api/pages/publish` | ✅ | Toggle published state |

### Templates

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/templates` | ✅ | List templates |
| `POST` | `/api/templates` | ✅ | Create template |

### Assets

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/assets` | ✅ | List media assets |
| `POST` | `/api/assets` | ✅ | Upload file (multipart) — max 10MB |

## usePuckSave Hook

Wire Puck's `onPublish` to the backend in one line:

```tsx
import { usePuckSave } from '@/cerison/backend/hooks/usePuckSave';
import { Puck } from '@measured/puck';

export default function EditorPage({ pageId }: { pageId: string }) {
  const { handlePublish, isSaving, lastSaved } = usePuckSave({ pageId });

  return (
    <div>
      {isSaving && <span>Saving...</span>}
      {lastSaved && <span>Saved at {lastSaved.toLocaleTimeString()}</span>}
      <Puck config={config} data={initialData} onPublish={handlePublish} />
    </div>
  );
}
```

## Security Notes

- `SUPABASE_SERVICE_ROLE_KEY` is **server-only** — never expose to the browser
- All write endpoints require a valid Supabase Auth JWT (Bearer token)
- RLS policies enforce row-level access control at the database layer
- Zod validates all inputs before they touch the database
- Slug uniqueness is enforced at the DB level (unique constraint + 409 response)
