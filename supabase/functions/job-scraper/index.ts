
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "./utils/cors.ts";
import { scrapeJobs, processAndStoreJobs } from "./controllers/scraperController.ts";
import { createSupabaseClient, storeJobsInDatabase } from "./utils/supabase.ts";

// Default scraping parameters
const DEFAULT_SOURCES = ['linkedin', 'twitter', 'reddit'];
const DEFAULT_KEYWORDS = ['react developer', 'frontend engineer', 'web developer', 'software engineer'];
const DEFAULT_LOCATIONS = ['remote', 'san francisco', 'new york'];

// Main handler
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let source, keywords, location, scrapeService;
    
    // Check if this is a scheduled/admin request or a manual request with parameters
    if (req.method === 'POST') {
      // Manual request with parameters
      const params = await req.json();
      source = params.source;
      keywords = params.keywords;
      location = params.location;
      scrapeService = params.scrapeService;
    } else {
      // Automatic/scheduled run - use defaults
      source = 'all';
      // Randomly select a keyword and location combination to get varied results
      keywords = DEFAULT_KEYWORDS[Math.floor(Math.random() * DEFAULT_KEYWORDS.length)];
      location = DEFAULT_LOCATIONS[Math.floor(Math.random() * DEFAULT_LOCATIONS.length)];
      scrapeService = 'apify';
    }
    
    console.log(`Job scraping request: source=${source}, keywords=${keywords}, location=${location}, service=${scrapeService || 'apify'}`);
    
    // Scrape jobs using the appropriate service
    const jobs = await scrapeJobs(source, keywords, location, scrapeService);
    
    // Create Supabase client for database operations
    const supabaseClient = await createSupabaseClient();
    
    // Process and store the jobs
    const processedJobs = await processAndStoreJobs(jobs);
    
    // Store jobs in the database
    const storageResult = await storeJobsInDatabase(supabaseClient, processedJobs);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully scraped and stored jobs`,
        count: processedJobs.length,
        newJobsCount: storageResult.count,
        results: processedJobs
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error("Error in job scraper function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || 'An error occurred' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
