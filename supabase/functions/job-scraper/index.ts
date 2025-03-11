
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "./utils/cors.ts";
import { scrapeJobs, processAndStoreJobs } from "./controllers/scraperController.ts";

// Main handler
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { source, keywords, location, scrapeService } = await req.json();
    
    console.log(`Job scraping request: source=${source}, keywords=${keywords}, location=${location}, service=${scrapeService || 'apify'}`);
    
    // Scrape jobs using the appropriate service
    const jobs = await scrapeJobs(source, keywords, location, scrapeService);
    
    // Process and store the jobs
    const result = await processAndStoreJobs(jobs);
    
    return new Response(
      JSON.stringify(result),
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
