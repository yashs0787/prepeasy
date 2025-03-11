
import { scrapeWithApify } from "../services/apify.ts";
import { scrapeWithBrightData } from "../services/brightdata.ts";
import { storeJobs } from "../utils/database.ts";
import { createSupabaseClient } from "../utils/supabase.ts";

export async function scrapeJobs(
  source: string,
  keywords: string,
  location: string,
  scrapeService: string = 'apify'
) {
  let jobs = [];
  
  // Use the specified scraping service
  if (scrapeService === 'brightdata') {
    // Scrape jobs with BrightData
    if (source === 'all') {
      const [linkedinJobs, twitterJobs, redditJobs] = await Promise.all([
        scrapeWithBrightData('linkedin', keywords, location),
        scrapeWithBrightData('twitter', keywords, location),
        scrapeWithBrightData('reddit', keywords, location)
      ]);
      jobs = [...linkedinJobs, ...twitterJobs, ...redditJobs];
    } else {
      jobs = await scrapeWithBrightData(source, keywords, location);
    }
  } else {
    // Default to Apify
    if (source === 'all') {
      const [linkedinJobs, twitterJobs, redditJobs] = await Promise.all([
        scrapeWithApify('linkedin', keywords, location),
        scrapeWithApify('twitter', keywords, location),
        scrapeWithApify('reddit', keywords, location)
      ]);
      jobs = [...linkedinJobs, ...twitterJobs, ...redditJobs];
    } else {
      jobs = await scrapeWithApify(source, keywords, location);
    }
  }
  
  return jobs;
}

export async function processAndStoreJobs(jobs: any[]) {
  // Create the Supabase client
  const supabase = await createSupabaseClient();
  
  // Process the jobs to add additional fields for categorization
  const processedJobs = jobs.map(job => {
    // Add category based on job title or description
    let category = 'Other';
    if (/developer|engineer|programmer|coding/i.test(job.title || '')) {
      category = 'Engineering';
    } else if (/design|ux|ui|graphic/i.test(job.title || '')) {
      category = 'Design';
    } else if (/marketing|seo|content|social media/i.test(job.title || '')) {
      category = 'Marketing';
    } else if (/sales|account|business development/i.test(job.title || '')) {
      category = 'Sales';
    } else if (/product|manager|project|program/i.test(job.title || '')) {
      category = 'Product';
    }
    
    return {
      ...job,
      category,
      timestamp: new Date().toISOString()
    };
  });
  
  // Store jobs in the database
  const result = await storeJobs(processedJobs, supabase);
  
  return processedJobs;
}
