
// BrightData scraping alternative
export async function scrapeWithBrightData(source: string, keywords: string, location: string) {
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
