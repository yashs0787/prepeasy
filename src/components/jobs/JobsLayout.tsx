
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { JobApplyModal } from "@/components/JobApplyModal";
import { MobileFilters } from "./MobileFilters";
import { Sidebar } from "./Sidebar";
import { JobTabs } from "./JobTabs";
import { Job } from "@/lib/types";

interface JobsLayoutProps {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  query: string;
  setQuery: (query: string) => void;
  filters: any;
  setFilters: (filters: any) => void;
  selectedJobId: string | null;
  setSelectedJobId: (id: string) => void;
  toggleSaveJob: (id: string) => void;
  selectedJob: Job | null;
}

export function JobsLayout({
  jobs,
  isLoading,
  error,
  query,
  setQuery,
  filters,
  setFilters,
  selectedJobId,
  setSelectedJobId,
  toggleSaveJob,
  selectedJob
}: JobsLayoutProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedJobForApply, setSelectedJobForApply] = useState<string | null>(null);

  const handleSelectJob = (jobId: string) => {
    setSelectedJobId(jobId);
  };

  const handleSaveJob = (jobId: string) => {
    toggleSaveJob(jobId);
  };
  
  const handleApplyJob = (jobId: string) => {
    setSelectedJobForApply(jobId);
  };
  
  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
    setFilters({
      ...filters,
      categories
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Mobile filters */}
          <MobileFilters 
            selectedCategories={selectedCategories}
            handleCategoryChange={handleCategoryChange}
          />
          
          {/* Desktop sidebar */}
          <Sidebar 
            selectedCategories={selectedCategories}
            handleCategoryChange={handleCategoryChange}
          />
          
          {/* Main content */}
          <JobTabs
            jobs={jobs}
            isLoading={isLoading}
            error={error}
            query={query}
            setQuery={setQuery}
            filters={filters}
            setFilters={setFilters}
            selectedJobId={selectedJobId}
            onSelectJob={handleSelectJob}
            onSaveJob={handleSaveJob}
            onApplyJob={handleApplyJob}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
      </main>
      
      {selectedJobForApply && (
        <JobApplyModal 
          jobId={selectedJobForApply}
          open={!!selectedJobForApply}
          onClose={() => setSelectedJobForApply(null)}
        />
      )}
    </div>
  );
}
