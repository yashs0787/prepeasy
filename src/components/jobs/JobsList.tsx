
import { Job } from "@/lib/types";
import { JobCard } from "@/components/JobCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Briefcase, LockIcon } from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useAuth } from "@/App";

interface JobsListProps {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  selectedJobId: string | null;
  onSelectJob: (jobId: string) => void;
  onSaveJob: (jobId: string) => void;
  onApplyJob: (jobId: string) => void;
  query: string;
  setQuery: (query: string) => void;
  setFilters: (filters: any) => void;
  setSelectedCategories: (categories: string[]) => void;
  filter?: (job: Job) => boolean;
}

export function JobsList({
  jobs,
  isLoading,
  error,
  selectedJobId,
  onSelectJob,
  onSaveJob,
  onApplyJob,
  query,
  setQuery,
  setFilters,
  setSelectedCategories,
  filter
}: JobsListProps) {
  const { isSubscribed, setShowSubscribeModal } = useSubscription();
  const { user } = useAuth();
  
  if (error) {
    return (
      <div className="text-center p-10">
        <p className="text-destructive">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="border rounded-xl p-4 flex gap-3">
            <Skeleton className="h-12 w-12 rounded-md flex-shrink-0" />
            <div className="space-y-3 w-full">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  const filteredJobs = filter ? jobs.filter(filter) : jobs;
  
  if (filteredJobs.length === 0) {
    return (
      <div className="text-center py-20 max-w-md mx-auto">
        <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No jobs found</h3>
        <p className="text-muted-foreground mb-6">
          We couldn't find any jobs matching your search criteria. Try adjusting your filters.
        </p>
        <Button onClick={() => {
          setQuery('');
          setFilters({});
          setSelectedCategories([]);
        }}>Clear all filters</Button>
      </div>
    );
  }

  // Determine if we need to limit the jobs shown
  const shouldLimitJobs = !isSubscribed && filteredJobs.length > 5;
  const displayedJobs = shouldLimitJobs ? filteredJobs.slice(0, 5) : filteredJobs;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">
          {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
        </h2>
        <div className="flex items-center text-sm gap-1">
          <ArrowUpRight size={14} className="text-primary" />
          <span>Showing latest jobs first</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {displayedJobs.map((job) => (
          <JobCard 
            key={job.id}
            job={job}
            isSelected={job.id === selectedJobId}
            onClick={() => onSelectJob(job.id)}
            onSave={() => onSaveJob(job.id)}
            onApply={() => onApplyJob(job.id)}
          />
        ))}
      </div>

      {shouldLimitJobs && (
        <div className="mt-6 border border-primary/20 rounded-xl p-6 bg-primary/5 text-center">
          <div className="flex justify-center mb-4">
            <LockIcon className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">
            {filteredJobs.length - 5} more jobs available with Premium
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Subscribe to our Premium plan to access all job listings and unlock all features
          </p>
          <Button 
            onClick={() => setShowSubscribeModal(true)}
            className="px-8"
          >
            Upgrade to Premium
          </Button>
        </div>
      )}
    </div>
  );
}
