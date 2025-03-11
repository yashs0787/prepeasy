
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to fetch and parse HTML content
async function scrapeWebsite(url: string) {
  try {
    console.log(`Scraping: ${url}`);
    const response = await fetch(url);
    const html = await response.text();
    return cheerio.load(html);
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    throw error;
  }
}

// LinkedIn job scraper
async function scrapeLinkedIn(keywords = "software developer", location = "remote") {
  try {
    const searchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keywords)}&location=${encodeURIComponent(location)}`;
    const $ = await scrapeWebsite(searchUrl);
    
    const jobs: any[] = [];
    
    // LinkedIn structure might change, this is a basic example
    $('.job-search-card').each((i, el) => {
      const title = $(el).find('.job-search-card__title').text().trim();
      const company = $(el).find('.job-search-card__company-name').text().trim();
      const location = $(el).find('.job-search-card__location').text().trim();
      const link = $(el).find('a.job-search-card__link').attr('href') || '';
      
      if (title && company) {
        jobs.push({
          id: `linkedin-${Date.now()}-${i}`,
          title,
          company,
          location,
          description: "Job posted on LinkedIn",
          applyUrl: link,
          source: 'LinkedIn',
          salary: '',
          jobType: 'Full-time',
          workType: location.toLowerCase().includes('remote') ? 'Remote' : 'On-site',
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
        });
      }
    });
    
    return jobs;
  } catch (error) {
    console.error("LinkedIn scraping error:", error);
    return [];
  }
}

// Twitter/X job scraper
async function scrapeTwitter(hashtag = "techjobs") {
  try {
    const searchUrl = `https://twitter.com/search?q=%23${encodeURIComponent(hashtag)}&src=typed_query&f=live`;
    const $ = await scrapeWebsite(searchUrl);
    
    const jobs: any[] = [];
    
    // Twitter structure
    $('article').each((i, el) => {
      const text = $(el).find('[data-testid="tweetText"]').text().trim();
      const link = $(el).find('a[href*="/status/"]').attr('href') || '';
      const author = $(el).find('[data-testid="User-Name"]').text().trim();
      
      // Simple job post detection (could be improved with AI)
      if (text && (text.toLowerCase().includes('hiring') || text.toLowerCase().includes('job'))) {
        jobs.push({
          id: `twitter-${Date.now()}-${i}`,
          title: "Job Post",
          company: author,
          location: 'Remote',
          description: text,
          applyUrl: `https://twitter.com${link}`,
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
            name: author,
            role: '',
            platform: 'Twitter'
          }
        });
      }
    });
    
    return jobs;
  } catch (error) {
    console.error("Twitter scraping error:", error);
    return [];
  }
}

// Reddit job scraper
async function scrapeReddit(subreddit = "forhire") {
  try {
    const searchUrl = `https://www.reddit.com/r/${subreddit}/new/`;
    const $ = await scrapeWebsite(searchUrl);
    
    const jobs: any[] = [];
    
    // Reddit structure
    $('div[data-testid="post-container"]').each((i, el) => {
      const title = $(el).find('h3').text().trim();
      const link = $(el).find('a[data-click-id="body"]').attr('href') || '';
      
      // Filter for job posts (usually start with [HIRING])
      if (title && title.includes('[HIRING]')) {
        const cleanTitle = title.replace('[HIRING]', '').trim();
        jobs.push({
          id: `reddit-${Date.now()}-${i}`,
          title: cleanTitle,
          company: 'Posted on Reddit',
          location: 'Remote',
          description: cleanTitle,
          applyUrl: `https://www.reddit.com${link}`,
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
            name: '',
            role: '',
            platform: 'Reddit'
          }
        });
      }
    });
    
    return jobs;
  } catch (error) {
    console.error("Reddit scraping error:", error);
    return [];
  }
}

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
    const { source, keywords, location } = await req.json();
    let jobs = [];
    
    // Scrape jobs based on the requested source
    if (source === 'linkedin') {
      jobs = await scrapeLinkedIn(keywords, location);
    } else if (source === 'twitter') {
      jobs = await scrapeTwitter(keywords);
    } else if (source === 'reddit') {
      jobs = await scrapeReddit();
    } else if (source === 'all') {
      const [linkedinJobs, twitterJobs, redditJobs] = await Promise.all([
        scrapeLinkedIn(keywords, location),
        scrapeTwitter(keywords),
        scrapeReddit()
      ]);
      jobs = [...linkedinJobs, ...twitterJobs, ...redditJobs];
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
