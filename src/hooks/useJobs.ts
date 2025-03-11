
import { useState, useEffect } from 'react';
import { Job, ApplicationStatus } from '@/lib/types';
import { toast } from 'sonner';

// Mock job data for development purposes
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    description: 'We are looking for a skilled Frontend Developer with experience in React and TypeScript to join our growing team.',
    salary: '$80,000 - $120,000',
    jobType: 'Full-time',
    workType: 'Remote',
    postedAt: '2023-04-15',
    skills: ['React', 'TypeScript', 'CSS', 'HTML'],
    source: 'LinkedIn',
    isSaved: true,
    applicationStatus: null,
    category: 'Engineering',
    experienceLevel: 'Mid-level',
    industry: 'Technology',
    hiringManager: {
      name: 'Jane Smith',
      role: 'Engineering Manager',
      platform: 'linkedin'
    }
  },
  // Add more mock jobs here...
  {
    id: '2',
    title: 'UX Designer',
    company: 'DesignStudio',
    location: 'New York, NY',
    description: 'Looking for a talented UX Designer to create intuitive and engaging user experiences.',
    salary: '$70,000 - $90,000',
    jobType: 'Full-time',
    workType: 'Hybrid',
    postedAt: '2023-04-20',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    source: 'Indeed',
    isSaved: false,
    applicationStatus: null,
    category: 'Design',
    experienceLevel: 'Senior',
    industry: 'Creative',
    hiringManager: null
  },
  {
    id: '3',
    title: 'Backend Developer',
    company: 'ServerSystems',
    location: 'Remote',
    description: 'Join our team to build scalable and efficient backend services.',
    salary: '$90,000 - $130,000',
    jobType: 'Full-time',
    workType: 'Remote',
    postedAt: '2023-04-18',
    skills: ['Node.js', 'Python', 'MongoDB', 'AWS'],
    source: 'LinkedIn',
    isSaved: false,
    applicationStatus: null,
    category: 'Engineering',
    experienceLevel: 'Mid-level',
    industry: 'Technology',
    hiringManager: null
  }
];

interface UseJobsOptions {
  initialFilters?: any;
}

export const useJobs = (options?: UseJobsOptions) => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(options?.initialFilters || {});
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const updateApplicationStatus = (jobId: string, status: ApplicationStatus) => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId ? { ...job, applicationStatus: status } : job
      )
    );
  };

  const saveJob = (jobId: string) => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId ? { ...job, isSaved: !job.isSaved } : job
      )
    );
    
    const job = jobs.find(j => j.id === jobId);
    const action = job?.isSaved ? 'removed from' : 'added to';
    
    toast.success(`Job ${action} saved jobs`);
  };
  
  const toggleSaveJob = (jobId: string) => {
    saveJob(jobId);
  };
  
  const selectedJob = selectedJobId ? jobs.find(job => job.id === selectedJobId) || null : null;
  
  // For compatibility with existing code
  const isLoading = loading;

  return {
    jobs,
    loading,
    error,
    isLoading,
    updateApplicationStatus,
    saveJob,
    query,
    setQuery,
    filters,
    setFilters,
    selectedJobId,
    setSelectedJobId,
    toggleSaveJob,
    selectedJob
  };
};
