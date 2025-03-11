
// Store jobs in Supabase
export async function storeJobs(jobs: any[], client: any) {
  if (!jobs || jobs.length === 0) {
    return { inserted: 0 };
  }

  try {
    // Get existing job URLs to avoid duplicates
    const { data: existingJobs, error: fetchError } = await client
      .from('jobs')
      .select('url');
      
    if (fetchError) throw fetchError;
    
    const existingUrls = new Set(existingJobs.map((job: any) => job.url));
    
    // Filter out jobs that already exist in the database
    const newJobs = jobs.filter((job: any) => !existingUrls.has(job.applyUrl));
    
    if (newJobs.length === 0) {
      return { inserted: 0 };
    }
    
    // Insert new jobs
    const { data, error } = await client
      .from('jobs')
      .insert(newJobs.map((job: any) => ({
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        url: job.applyUrl,
        source: job.source
      })))
      .select();
      
    if (error) throw error;
    
    return { inserted: newJobs.length, jobs: data };
  } catch (error) {
    console.error("Error storing jobs:", error);
    throw error;
  }
}
