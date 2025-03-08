
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Job, ApplicationStatus } from '@/lib/types';
import { mockJobs } from '@/lib/mockData';
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
            platform: 'linkedin',
            linkedIn: 'linkedin.com/in/' + getRandomLinkedInUsername(),
            twitter: 'twitter.com/' + getRandomTwitterUsername(),
            email: getRandomEmail(),
            position: job.company.includes('Tech') ? 'CTO' : 'HR Manager'
          },
          // Add application status (null means not applied)
          applicationStatus: null,
          // Add company logo URL
          companyLogoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=random`,
          // Add responsibilities array
          responsibilities: getRandomResponsibilities(),
          // Add apply URL
          applyUrl: `https://example.com/jobs/${job.id}/apply`
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

  function getRandomLinkedInUsername() {
    const usernames = ["alex-tech", "jordan-dev", "taylor-engineer", "morgan-coder", "casey-pm", "jamie-hr", "sam-design", "riley-data"];
    return usernames[Math.floor(Math.random() * usernames.length)];
  }

  function getRandomTwitterUsername() {
    const usernames = ["alextech", "jordandev", "tayloreng", "morgancoder", "caseypm", "jamiehr", "samdesign", "rileydata"];
    return usernames[Math.floor(Math.random() * usernames.length)];
  }

  function getRandomEmail() {
    const domains = ["company.com", "tech.co", "startup.io", "enterprise.net", "hrteam.org"];
    const names = ["hiring", "recruiting", "jobs", "careers", "hr", "talent"];
    const name = names[Math.floor(Math.random() * names.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${name}@${domain}`;
  }

  function getRandomResponsibilities() {
    const responsibilities = [
      "Lead development of new features for our flagship product",
      "Collaborate with cross-functional teams to define product requirements",
      "Optimize application performance and scalability",
      "Implement robust testing strategies to ensure product quality",
      "Mentor junior developers and provide technical guidance",
      "Design and implement APIs for internal and external consumption",
      "Participate in code reviews and ensure code quality standards",
      "Research and propose new technologies to improve our stack"
    ];
    
    // Return 3-5 random responsibilities
    const count = Math.floor(Math.random() * 3) + 3;
    const shuffled = [...responsibilities].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
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
  const updateApplicationStatus = useCallback((jobId: string, status: ApplicationStatus) => {
    setJobs(prevJobs => prevJobs.map(job => 
      job.id === jobId 
        ? { ...job, applicationStatus: status } 
        : job
    ));
    
    // Show toast notification
    const statusMessages = {
      applied: "Application submitted successfully",
      interviewing: "Status updated to 'Interviewing'",
      offered: "Status updated to 'Offered'",
      rejected: "Status updated to 'Rejected'",
      null: "Application removed"
    };
    
    const jobTitle = jobs.find(job => job.id === jobId)?.title;
    if (status && jobTitle) {
      toast.success(statusMessages[status], {
        description: jobTitle,
        duration: 2000
      });
    }
  }, [jobs]);

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
