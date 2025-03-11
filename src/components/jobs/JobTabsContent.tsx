
import { TabsContent } from "@/components/ui/tabs";
import { JobsList } from "./JobsList";
import { Job } from "@/lib/types";

interface JobTabsContentProps {
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
}

export function JobTabsContent({
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
  setSelectedCategories
}: JobTabsContentProps) {
  return (
    <>
      <TabsContent value="all" className="mt-6">
        <JobsList 
          jobs={jobs}
          isLoading={isLoading}
          error={error}
          selectedJobId={selectedJobId}
          onSelectJob={onSelectJob}
          onSaveJob={onSaveJob}
          onApplyJob={onApplyJob}
          query={query}
          setQuery={setQuery}
          setFilters={setFilters}
          setSelectedCategories={setSelectedCategories}
        />
      </TabsContent>
      
      <TabsContent value="recent" className="mt-6">
        <JobsList 
          jobs={jobs}
          isLoading={isLoading}
          error={error}
          selectedJobId={selectedJobId}
          onSelectJob={onSelectJob}
          onSaveJob={onSaveJob}
          onApplyJob={onApplyJob}
          query={query}
          setQuery={setQuery}
          setFilters={setFilters}
          setSelectedCategories={setSelectedCategories}
          filter={(j) => new Date(j.postedAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000}
        />
      </TabsContent>
      
      <TabsContent value="remote" className="mt-6">
        <JobsList 
          jobs={jobs}
          isLoading={isLoading}
          error={error}
          selectedJobId={selectedJobId}
          onSelectJob={onSelectJob}
          onSaveJob={onSaveJob}
          onApplyJob={onApplyJob}
          query={query}
          setQuery={setQuery}
          setFilters={setFilters}
          setSelectedCategories={setSelectedCategories}
          filter={(j) => j.workType === 'Remote'}
        />
      </TabsContent>
      
      <TabsContent value="saved" className="mt-6">
        <JobsList 
          jobs={jobs}
          isLoading={isLoading}
          error={error}
          selectedJobId={selectedJobId}
          onSelectJob={onSelectJob}
          onSaveJob={onSaveJob}
          onApplyJob={onApplyJob}
          query={query}
          setQuery={setQuery}
          setFilters={setFilters}
          setSelectedCategories={setSelectedCategories}
          filter={(j) => j.isSaved}
        />
      </TabsContent>
    </>
  );
}
