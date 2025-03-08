
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Job, mockJobs } from '@/lib/mockData';
import { toast } from 'sonner';

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
        
        // Enhance mock data with additional fields for our new features
        const enhancedJobs = mockJobs.map(job => ({
          ...job,
          // Add fields for job categories
          category: getRandomCategory(),
          experienceLevel: getRandomExperienceLevel(),
          industry: getRandomIndustry(),
          // Add hiring manager information
          hiringManager: {
            name: getRandomName(),
            role: job.company.includes('Tech') ? 'CTO' : 'HR Manager',
            platform: 'linkedin'
          },
          // Add application status (null means not applied)
          applicationStatus: null
        }));
        
        setJobs(enhancedJobs);
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

  // Helper functions for generating random data
  function getRandomCategory() {
    const categories = [
      "Full-time", "Part-time", "Freelance/Contract", "Remote", "Hybrid",
      "Internships (Paid)", "Internships (Unpaid)", "Internships (Virtual)"
    ];
    return categories[Math.floor(Math.random() * categories.length)];
  }
  
  function getRandomExperienceLevel() {
    const levels = ["Entry-Level", "Mid-Level", "Senior-Level", "Executive/C-Level"];
    return levels[Math.floor(Math.random() * levels.length)];
  }
  
  function getRandomIndustry() {
    const industries = [
      "Software & IT", "Finance & Accounting", "Marketing & Sales", 
      "Operations & Logistics", "HR & Talent Acquisition", "Consulting & Strategy", 
      "Creative & Design", "Legal & Compliance", "Healthcare & Biotech", 
      "Data Science & Analytics", "Education & Research"
    ];
    return industries[Math.floor(Math.random() * industries.length)];
  }
  
  function getRandomName() {
    const firstNames = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Jamie", "Sam", "Riley"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"];
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  }

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
  }, [jobs, query, filters]);

  // Get selected job details
  const selectedJob = useMemo(() => {
    if (!selectedJobId) return null;
    return jobs.find(job => job.id === selectedJobId) || null;
  }, [jobs, selectedJobId]);

  // Save job (toggle save status)
  const toggleSaveJob = useCallback((jobId: string) => {
    setJobs(prevJobs => {
      const updatedJobs = prevJobs.map(job => 
        job.id === jobId 
          ? { ...job, isSaved: !job.isSaved } 
          : job
      );
      
      const job = updatedJobs.find(j => j.id === jobId);
      if (job) {
        toast.success(
          job.isSaved ? "Job removed from saved jobs" : "Job saved successfully", 
          { 
            description: `${job.title} at ${job.company}`,
            duration: 2000
          }
        );
      }
      
      return updatedJobs;
    });
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
    allJobs: jobs,
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
