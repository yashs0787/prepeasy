
// Transform data from scrapers to our job format
export function transformScrapedData(data: any[], source: string) {
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
