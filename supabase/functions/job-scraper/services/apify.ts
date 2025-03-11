
import { transformScrapedData } from "../utils/transform.ts";

// Apify API client for professional web scraping
export async function scrapeWithApify(source: string, keywords: string, location: string) {
  try {
    const APIFY_API_TOKEN = Deno.env.get('APIFY_API_KEY');
    
    if (!APIFY_API_TOKEN) {
      throw new Error('Missing APIFY_API_KEY environment variable');
    }
    
    console.log(`Starting Apify scraper for ${source} with keywords: ${keywords}, location: ${location}`);
    
    // Different actor IDs for different platforms
    const actorMapping: Record<string, string> = {
      'linkedin': 'apify/linkedin-jobs-scraper',
      'twitter': 'apify/twitter-scraper',
      'reddit': 'apify/reddit-scraper',
    };
    
    const actorId = actorMapping[source] || actorMapping['linkedin'];
    
    // Configure input based on the platform
    let input = {};
    if (source === 'linkedin') {
      input = {
        queries: keywords,
        locationOrFilters: location,
        maxItems: 25
      };
    } else if (source === 'twitter') {
      input = {
        searchTerms: [`${keywords} job hiring`],
        maxItems: 25
      };
    } else if (source === 'reddit') {
      input = {
        subreddits: ['forhire', 'jobs', 'jobsearch'],
        searchQuery: keywords,
        maxItems: 25
      };
    }
    
    // Run the Apify actor (scraper)
    const response = await fetch(`https://api.apify.com/v2/acts/${actorId}/runs?token=${APIFY_API_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Apify API error (${response.status}): ${errorText}`);
    }
    
    const runInfo = await response.json();
    const runId = runInfo.data.id;
    console.log(`Apify scraper started with run ID: ${runId}`);
    
    // Wait for the run to finish (poll status)
    let isFinished = false;
    let retries = 0;
    const maxRetries = 10;
    
    while (!isFinished && retries < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds between checks
      
      const statusResponse = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_API_TOKEN}`);
      const statusData = await statusResponse.json();
      
      if (statusData.data.status === 'SUCCEEDED') {
        isFinished = true;
      }
      
      retries++;
      console.log(`Checking run status (${retries}/${maxRetries}): ${statusData.data.status}`);
    }
    
    if (!isFinished) {
      throw new Error('Apify scraper timed out');
    }
    
    // Get the results from the dataset
    const datasetId = runInfo.data.defaultDatasetId;
    const dataResponse = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_API_TOKEN}`);
    
    if (!dataResponse.ok) {
      throw new Error(`Failed to fetch dataset: ${dataResponse.statusText}`);
    }
    
    const scrapedData = await dataResponse.json();
    console.log(`Scraped ${scrapedData.length} items from ${source}`);
    
    // Transform data to our job format
    const jobs = transformScrapedData(scrapedData, source);
    
    return jobs;
  } catch (error) {
    console.error(`Error with Apify scraping for ${source}:`, error);
    return [];
  }
}
