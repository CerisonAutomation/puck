/**
 * @file supabase-server.ts
 * @description Supabase server-side client (uses service role key — never expose to browser).
 * Import this ONLY in Server Components, Route Handlers, and Server Actions.
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env: NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing env: SUPABASE_SERVICE_ROLE_KEY');
}

export const supabaseServer = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
