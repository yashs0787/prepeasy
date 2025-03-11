
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { scrapeWithApify } from "./services/apify.ts";
import { scrapeWithBrightData } from "./services/brightdata.ts";
import { corsHeaders } from "./utils/cors.ts";
import { storeJobs } from "./utils/database.ts";

// Main handler
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { source, keywords, location, scrapeService } = await req.json();
    
    console.log(`Job scraping request: source=${source}, keywords=${keywords}, location=${location}, service=${scrapeService || 'apify'}`);
    
    let jobs = [];
    
    // Default to Apify if no service specified
    const service = scrapeService || 'apify';
    
    // Use the specified scraping service
    if (service === 'brightdata') {
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
    
    // Create the Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }
    
    // Import Supabase client for Deno
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Store jobs in the database
    const result = await storeJobs(jobs, supabase);
    
    return new Response(
      JSON.stringify({ 
        message: `Scraped ${jobs.length} jobs, inserted ${result.inserted} new jobs`, 
        jobs: jobs 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error("Error in job scraper function:", error);
    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
