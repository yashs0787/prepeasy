
export async function createSupabaseClient() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  // Import Supabase client for Deno
  const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
  return createClient(supabaseUrl, supabaseKey);
}
