
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
  
  // Store jobs in the database
  const result = await storeJobs(jobs, supabase);
  
  return {
    message: `Scraped ${jobs.length} jobs, inserted ${result.inserted} new jobs`,
    jobs: jobs
  };
}
