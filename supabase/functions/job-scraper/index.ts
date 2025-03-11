
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Apify API client for professional web scraping
async function scrapeWithApify(source: string, keywords: string, location: string) {
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

// BrightData scraping alternative
async function scrapeWithBrightData(source: string, keywords: string, location: string) {
  try {
    const BRIGHTDATA_API_KEY = Deno.env.get('BRIGHTDATA_API_KEY');
    const BRIGHTDATA_ZONE_ID = Deno.env.get('BRIGHTDATA_ZONE_ID');
    
    if (!BRIGHTDATA_API_KEY || !BRIGHTDATA_ZONE_ID) {
      throw new Error('Missing BrightData credentials in environment variables');
    }
    
    console.log(`Starting BrightData scraper for ${source} with keywords: ${keywords}, location: ${location}`);
    
    // Create a scraping job based on the source
    let scrapeUrl = '';
    if (source === 'linkedin') {
      scrapeUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keywords)}&location=${encodeURIComponent(location)}`;
    } else if (source === 'twitter') {
      scrapeUrl = `https://twitter.com/search?q=${encodeURIComponent(`${keywords} hiring`)}&f=live`;
    } else if (source === 'reddit') {
      scrapeUrl = `https://www.reddit.com/r/forhire/search/?q=${encodeURIComponent(keywords)}&restrict_sr=1&sort=new`;
    }
    
    // Create a new scraping task
    const taskResponse = await fetch(`https://api.brightdata.com/zproxy/zones/${BRIGHTDATA_ZONE_ID}/requests`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BRIGHTDATA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: scrapeUrl,
        extract_rules: {
          jobs: {
            selector: source === 'linkedin' ? '.job-search-card' : 
                      source === 'twitter' ? 'article' : 
                      'div[data-testid="post-container"]',
            multiple: true,
            output: {
              title: source === 'linkedin' ? '.job-search-card__title | text' : 
                     source === 'twitter' ? '[data-testid="tweetText"] | text' : 
                     'h3 | text',
              company: source === 'linkedin' ? '.job-search-card__company-name | text' : 
                       source === 'twitter' ? '[data-testid="User-Name"] | text' : 
                       '.author | text',
              link: source === 'linkedin' ? 'a.job-search-card__link | attr:href' : 
                    source === 'twitter' ? 'a[href*="/status/"] | attr:href' : 
                    'a[data-click-id="body"] | attr:href',
              description: source === 'linkedin' ? '.job-search-card__snippet | text' : 
                           source === 'twitter' ? '[data-testid="tweetText"] | text' : 
                           '.post-content | text',
              location: source === 'linkedin' ? '.job-search-card__location | text' : null,
            }
          }
        }
      }),
    });
    
    if (!taskResponse.ok) {
      const errorText = await taskResponse.text();
      throw new Error(`BrightData API error (${taskResponse.status}): ${errorText}`);
    }
    
    const taskData = await taskResponse.json();
    const taskId = taskData.id;
    
    // Poll for task completion
    let isFinished = false;
    let retries = 0;
    const maxRetries = 10;
    let scrapedData = null;
    
    while (!isFinished && retries < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds between checks
      
      const statusResponse = await fetch(`https://api.brightdata.com/zproxy/zones/${BRIGHTDATA_ZONE_ID}/requests/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${BRIGHTDATA_API_KEY}`,
        }
      });
      
      const statusData = await statusResponse.json();
      
      if (statusData.status === 'completed') {
        isFinished = true;
        scrapedData = statusData.output.jobs || [];
      }
      
      retries++;
      console.log(`Checking BrightData task status (${retries}/${maxRetries}): ${statusData.status}`);
    }
    
    if (!isFinished || !scrapedData) {
      throw new Error('BrightData scraper timed out or returned no data');
    }
    
    console.log(`Scraped ${scrapedData.length} items from ${source} using BrightData`);
    
    // Transform the BrightData results to our job format
    const jobs = scrapedData.map((item: any, i: number) => {
      return {
        id: `${source}-${Date.now()}-${i}`,
        title: item.title || `Job on ${source}`,
        company: item.company || `Posted on ${source}`,
        location: item.location || 'Remote',
        description: item.description || '',
        applyUrl: source === 'twitter' ? `https://twitter.com${item.link}` : 
                 source === 'reddit' ? `https://www.reddit.com${item.link}` : 
                 item.link,
        source: source,
        salary: '',
        jobType: source === 'linkedin' ? 'Full-time' : 'Contract',
        workType: 'Remote',
        postedAt: new Date().toISOString(),
        skills: [],
        isSaved: false,
        applicationStatus: null,
        category: '',
        experienceLevel: '',
        industry: '',
        hiringManager: {
          name: source === 'twitter' ? item.company : '',
          role: '',
          platform: source
        }
      };
    });
    
    return jobs;
  } catch (error) {
    console.error(`Error with BrightData scraping for ${source}:`, error);
    return [];
  }
}

// Transform data from Apify to our job format
function transformScrapedData(data: any[], source: string) {
  try {
    console.log(`Transforming ${data.length} scraped items from ${source}`);
    
    return data.map((item, i) => {
      // LinkedIn specific transformation
      if (source === 'linkedin') {
        return {
          id: `linkedin-${Date.now()}-${i}`,
          title: item.title || 'LinkedIn Job',
          company: item.company || 'Company on LinkedIn',
          location: item.location || 'Remote',
          description: item.description || '',
          applyUrl: item.url || item.link || '',
          source: 'LinkedIn',
          salary: item.salary || '',
          jobType: 'Full-time',
          workType: (item.location || '').toLowerCase().includes('remote') ? 'Remote' : 'On-site',
          postedAt: new Date().toISOString(),
          skills: [],
          isSaved: false,
          applicationStatus: null,
          category: '',
          experienceLevel: '',
          industry: '',
          hiringManager: {
            name: '',
            role: '',
            platform: 'LinkedIn'
          }
        };
      }
      
      // Twitter specific transformation
      if (source === 'twitter') {
        return {
          id: `twitter-${Date.now()}-${i}`,
          title: "Job Post",
          company: item.authorUsername || item.author || '',
          location: 'Remote',
          description: item.text || item.content || '',
          applyUrl: item.url || `https://twitter.com${item.tweetUrl || ''}`,
          source: 'Twitter',
          salary: '',
          jobType: 'Full-time',
          workType: 'Remote',
          postedAt: new Date().toISOString(),
          skills: [],
          isSaved: false,
          applicationStatus: null,
          category: '',
          experienceLevel: '',
          industry: '',
          hiringManager: {
            name: item.authorUsername || item.author || '',
            role: '',
            platform: 'Twitter'
          }
        };
      }
      
      // Reddit specific transformation
      if (source === 'reddit') {
        const title = item.title || '';
        const cleanTitle = title.includes('[HIRING]') ? title.replace('[HIRING]', '').trim() : title;
        
        return {
          id: `reddit-${Date.now()}-${i}`,
          title: cleanTitle,
          company: 'Posted on Reddit',
          location: 'Remote',
          description: item.content || item.postText || '',
          applyUrl: item.url || item.postUrl || '',
          source: 'Reddit',
          salary: '',
          jobType: 'Contract',
          workType: 'Remote',
          postedAt: new Date().toISOString(),
          skills: [],
          isSaved: false,
          applicationStatus: null,
          category: '',
          experienceLevel: '',
          industry: '',
          hiringManager: {
            name: item.author || '',
            role: '',
            platform: 'Reddit'
          }
        };
      }
      
      // Default transformation
      return {
        id: `${source}-${Date.now()}-${i}`,
        title: item.title || `Job from ${source}`,
        company: item.company || item.author || `Posted on ${source}`,
        location: item.location || 'Remote',
        description: item.description || item.content || '',
        applyUrl: item.url || item.link || '',
        source: source,
        salary: '',
        jobType: 'Full-time',
        workType: 'Remote',
        postedAt: new Date().toISOString(),
        skills: [],
        isSaved: false,
        applicationStatus: null,
        category: '',
        experienceLevel: '',
        industry: '',
        hiringManager: {
          name: '',
          role: '',
          platform: source
        }
      };
    });
  } catch (error) {
    console.error(`Error transforming data from ${source}:`, error);
    return [];
  }
}

// Store jobs in Supabase
async function storeJobs(jobs: any[], client: any) {
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
