
import { useJobs } from "@/hooks/useJobs";
import { Navbar } from "@/components/Navbar";
import { SearchFilters } from "@/components/SearchFilters";
import { JobCard } from "@/components/JobCard";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Briefcase } from "lucide-react";

export default function Jobs() {
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
    toggleSaveJob
  } = useJobs();

  const handleSelectJob = (jobId: string) => {
    setSelectedJobId(jobId);
  };

  const handleSaveJob = (jobId: string) => {
    toggleSaveJob(jobId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-8">
          <h1 className="text-3xl font-bold">Find Your Next Job</h1>
          
          <SearchFilters 
            query={query}
            onQueryChange={setQuery}
            filters={filters}
            onFiltersChange={setFilters}
          />
          
          <section>
            {error && (
              <div className="text-center p-10">
                <p className="text-destructive">{error}</p>
                <Button onClick={() => window.location.reload()} className="mt-4">
                  Try Again
                </Button>
              </div>
            )}
            
            {isLoading ? (
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
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium">
                    {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'} Found
                  </h2>
                  <div className="flex items-center text-sm gap-1">
                    <ArrowUpRight size={14} className="text-primary" />
                    <span>Showing latest jobs first</span>
                  </div>
                </div>
                
                {jobs.length === 0 ? (
                  <div className="text-center py-20 max-w-md mx-auto">
                    <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No jobs found</h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find any jobs matching your search criteria. Try adjusting your filters.
                    </p>
                    <Button onClick={() => setFilters({})}>Clear all filters</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {jobs.map((job) => (
                      <JobCard 
                        key={job.id}
                        job={job}
                        isSelected={job.id === selectedJobId}
                        onClick={() => handleSelectJob(job.id)}
                        onSave={() => handleSaveJob(job.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
