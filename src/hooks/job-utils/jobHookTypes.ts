
import { Job } from "@/lib/types";

export interface UseJobsProps {
  initialQuery?: string;
  initialFilters?: {
    categories?: string[];
    jobTypes?: string[];
    workTypes?: string[];
    locations?: string[];
  }
}

export interface UseJobsReturn {
  jobs: Job[];
  allJobs: Job[];
  isLoading: boolean;
  error: string | null;
  query: string;
  setQuery: (query: string) => void;
  filters: {
    categories?: string[];
    jobTypes?: string[];
    workTypes?: string[];
    locations?: string[];
  };
  setFilters: (filters: any) => void;
  selectedJobId: string | null;
  setSelectedJobId: (id: string) => void;
  selectedJob: Job | null;
  toggleSaveJob: (id: string) => void;
  updateApplicationStatus: (jobId: string, status: import('@/lib/types').ApplicationStatus) => void;
}
