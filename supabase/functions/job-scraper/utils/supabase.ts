
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

export async function storeJobsInDatabase(supabaseClient, jobs) {
  if (!jobs || jobs.length === 0) {
    console.log('No jobs to store in database');
    return { count: 0 };
  }
  
  try {
    console.log(`Storing ${jobs.length} jobs in database`);
    
    // Insert jobs into the database, ignoring duplicates based on the URL
    const { data, error, count } = await supabaseClient
      .from('jobs')
      .upsert(jobs, { 
        onConflict: 'url',
        ignoreDuplicates: true
      })
      .select('id');
    
    if (error) {
      throw error;
    }
    
    console.log(`Successfully stored ${data?.length || 0} new jobs in database`);
    return { count: data?.length || 0 };
  } catch (error) {
    console.error('Error storing jobs in database:', error);
    throw error;
  }
}
