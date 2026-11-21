import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your_supabase')) {
    // Return null or dummy client if not yet configured by owner
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
