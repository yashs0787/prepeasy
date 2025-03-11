
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchFilters } from "@/components/SearchFilters";
import { JobTabsContent } from "./JobTabsContent";
import { Job } from "@/lib/types";

interface JobTabsProps {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  query: string;
  setQuery: (query: string) => void;
  filters: any;
  setFilters: (filters: any) => void;
  selectedJobId: string | null;
  onSelectJob: (jobId: string) => void;
  onSaveJob: (jobId: string) => void;
  onApplyJob: (jobId: string) => void;
  setSelectedCategories: (categories: string[]) => void;
}

export function JobTabs({
  jobs,
  isLoading,
  error,
  query,
  setQuery,
  filters,
  setFilters,
  selectedJobId,
  onSelectJob,
  onSaveJob,
  onApplyJob,
  setSelectedCategories
}: JobTabsProps) {
  return (
    <div className="space-y-6">
      <div className="lg:hidden">
        <h1 className="text-2xl font-bold mb-4">Job Board</h1>
      </div>
      
      <SearchFilters 
        query={query}
        onQueryChange={setQuery}
        filters={filters}
        onFiltersChange={setFilters}
      />
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="all">All Jobs</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="remote">Remote</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        
        <JobTabsContent 
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
      </Tabs>
    </div>
  );
}
