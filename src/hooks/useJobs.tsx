
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Job, mockJobs } from '@/lib/mockData';

interface UseJobsProps {
  initialQuery?: string;
  initialFilters?: {
    categories?: string[];
    jobTypes?: string[];
    workTypes?: string[];
    locations?: string[];
  }
}

export function useJobs({ initialQuery = '', initialFilters = {} }: UseJobsProps = {}) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState(initialFilters);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Fetch jobs (simulated with mock data)
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setJobs(mockJobs);
        setError(null);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search query and filters
  const filteredJobs = useMemo(() => {
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
      
      // Filter by categories
      if (filters.categories && filters.categories.length > 0) {
        if (!filters.categories.includes(job.category)) return false;
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
  }, [jobs, query, filters]);

  // Get selected job details
  const selectedJob = useMemo(() => {
    if (!selectedJobId) return null;
    return jobs.find(job => job.id === selectedJobId) || null;
  }, [jobs, selectedJobId]);

  // Save job (toggle save status)
  const toggleSaveJob = useCallback((jobId: string) => {
    setJobs(prevJobs => prevJobs.map(job => 
      job.id === jobId 
        ? { ...job, isSaved: !job.isSaved } 
        : job
    ));
  }, []);

  // Update application status
  const updateApplicationStatus = useCallback((jobId: string, status: Job['applicationStatus']) => {
    setJobs(prevJobs => prevJobs.map(job => 
      job.id === jobId 
        ? { ...job, applicationStatus: status } 
        : job
    ));
  }, []);

  return {
    jobs: filteredJobs,
    isLoading,
    error,
    query,
    setQuery,
    filters,
    setFilters,
    selectedJobId,
    setSelectedJobId,
    selectedJob,
    toggleSaveJob,
    updateApplicationStatus
  };
}
