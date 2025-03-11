
import { Job } from "@/lib/types";

/**
 * Filters jobs based on search query and filter criteria
 */
export function filterJobs(
  jobs: Job[],
  query: string,
  filters: {
    categories?: string[];
    jobTypes?: string[];
    workTypes?: string[];
    locations?: string[];
  }
): Job[] {
  return jobs.filter(job => {
    // Filter by search query
    if (query) {
      const searchTerms = query.toLowerCase();
      const matchesQuery = 
        job.title.toLowerCase().includes(searchTerms) ||
        job.company.toLowerCase().includes(searchTerms) ||
        job.location.toLowerCase().includes(searchTerms) ||
        job.description.toLowerCase().includes(searchTerms);
      
      if (!matchesQuery) return false;
    }
    
    // Filter by categories (includes job type, experience level, and industry)
    if (filters.categories && filters.categories.length > 0) {
      const jobCategories = [
        job.category,
        job.experienceLevel,
        job.industry,
        job.workType
      ];
      
      const hasMatchingCategory = filters.categories.some(category => 
        jobCategories.some(jobCategory => jobCategory === category)
      );
      
      if (!hasMatchingCategory) return false;
    }
    
    // Filter by job types
    if (filters.jobTypes && filters.jobTypes.length > 0) {
      if (!filters.jobTypes.includes(job.jobType)) return false;
    }
    
    // Filter by work types
    if (filters.workTypes && filters.workTypes.length > 0) {
      if (!filters.workTypes.includes(job.workType)) return false;
    }
    
    // Filter by locations
    if (filters.locations && filters.locations.length > 0) {
      const matchesLocation = filters.locations.some(location => 
        job.location.includes(location) || 
        (location === 'Remote' && job.workType === 'Remote')
      );
      if (!matchesLocation) return false;
    }
    
    return true;
  });
}
