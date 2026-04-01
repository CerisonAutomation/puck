/**
 * @file supabase-browser.ts
 * @description Supabase browser/anon client for client-side usage.
 * Import this in Client Components and browser-safe utilities.
 */

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './database.types';

export const supabaseBrowser = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
