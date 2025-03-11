
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
  // Add more mock jobs as needed
];

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return {
    jobs,
    loading,
    error,
    updateApplicationStatus,
    saveJob
  };
};
