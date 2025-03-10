
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { SearchFilters } from "@/components/SearchFilters";
import { JobCategoriesFilter } from "@/components/JobCategoriesFilter";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobsList } from "./JobsList";
import { JobApplyModal } from "@/components/JobApplyModal";
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
          {/* Mobile filters button */}
          <div className="block lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex gap-2">
                  <ListFilter size={18} />
                  <span>Categories & Filters</span>
                  {selectedCategories.length > 0 && (
                    <div className="ml-1 bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">
                      {selectedCategories.length}
                    </div>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-md overflow-auto">
                <div className="py-6">
                  <h2 className="text-xl font-bold mb-4">Job Filters</h2>
                  <JobCategoriesFilter 
                    onCategoryChange={handleCategoryChange}
                    selectedCategories={selectedCategories}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Desktop sidebar with filters */}
          <aside className="hidden lg:block space-y-6">
            <h1 className="text-2xl font-bold">Job Board</h1>
            <JobCategoriesFilter 
              onCategoryChange={handleCategoryChange}
              selectedCategories={selectedCategories}
            />
          </aside>
          
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
              
              <TabsContent value="all" className="mt-6">
                <JobsList 
                  jobs={jobs}
                  isLoading={isLoading}
                  error={error}
                  selectedJobId={selectedJobId}
                  onSelectJob={handleSelectJob}
                  onSaveJob={handleSaveJob}
                  onApplyJob={handleApplyJob}
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
                  onSelectJob={handleSelectJob}
                  onSaveJob={handleSaveJob}
                  onApplyJob={handleApplyJob}
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
                  onSelectJob={handleSelectJob}
                  onSaveJob={handleSaveJob}
                  onApplyJob={handleApplyJob}
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
                  onSelectJob={handleSelectJob}
                  onSaveJob={handleSaveJob}
                  onApplyJob={handleApplyJob}
                  query={query}
                  setQuery={setQuery}
                  setFilters={setFilters}
                  setSelectedCategories={setSelectedCategories}
                  filter={(j) => j.isSaved}
                />
              </TabsContent>
            </Tabs>
          </div>
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
