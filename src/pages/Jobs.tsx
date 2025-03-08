
import { useJobs } from "@/hooks/useJobs";
import { Navbar } from "@/components/Navbar";
import { SearchFilters } from "@/components/SearchFilters";
import { JobCard } from "@/components/JobCard";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Briefcase, ListFilter } from "lucide-react";
import { JobCategoriesFilter } from "@/components/JobCategoriesFilter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { JobApplyModal } from "@/components/JobApplyModal";

export default function Jobs() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCategoryFilters, setShowCategoryFilters] = useState(false);
  const [selectedJobForApply, setSelectedJobForApply] = useState<string | null>(null);
  
  const { 
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
  } = useJobs({
    initialFilters: {
      categories: selectedCategories
    }
  });

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
                {renderJobsContent()}
              </TabsContent>
              
              <TabsContent value="recent" className="mt-6">
                {renderJobsContent(j => new Date(j.postedAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000)}
              </TabsContent>
              
              <TabsContent value="remote" className="mt-6">
                {renderJobsContent(j => j.workType === 'Remote')}
              </TabsContent>
              
              <TabsContent value="saved" className="mt-6">
                {renderJobsContent(j => j.isSaved)}
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
  
  function renderJobsContent(filter?: (job: any) => boolean) {
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
          {filteredJobs.map((job) => (
            <JobCard 
              key={job.id}
              job={job}
              isSelected={job.id === selectedJobId}
              onClick={() => handleSelectJob(job.id)}
              onSave={() => handleSaveJob(job.id)}
              onApply={() => handleApplyJob(job.id)}
            />
          ))}
        </div>
      </div>
    );
  }
}
