
import { useParams, useNavigate } from "react-router-dom";
import { useJobs } from "@/hooks/useJobs";
import { Navbar } from "@/components/Navbar";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { JobApplyModal } from "@/components/JobApplyModal";

export default function JobCategories() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [selectedJobForApply, setSelectedJobForApply] = useState<string | null>(null);
  
  const { 
    jobs: allJobs, 
    isLoading, 
    error,
    selectedJobId,
    setSelectedJobId,
    toggleSaveJob,
    setFilters
  } = useJobs();
  
  // Set the filter based on the category parameter
  useEffect(() => {
    if (category) {
      setFilters({
        categories: [category]
      });
    }
  }, [category, setFilters]);
  
  const handleSelectJob = (jobId: string) => {
    setSelectedJobId(jobId);
  };

  const handleSaveJob = (jobId: string) => {
    toggleSaveJob(jobId);
  };
  
  const handleApplyJob = (jobId: string) => {
    setSelectedJobForApply(jobId);
  };
  
  const getCategoryTitle = (category: string) => {
    // Replace hyphens with spaces and capitalize each word
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/jobs')}
              className="h-9 w-9"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">
              {category ? getCategoryTitle(category) : 'Jobs'}
            </h1>
          </div>
          
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
              <div className="grid grid-cols-1 gap-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="border rounded-xl p-4 flex gap-3 animate-pulse">
                    <div className="h-12 w-12 rounded-md bg-muted" />
                    <div className="space-y-3 w-full">
                      <div className="h-5 w-3/4 bg-muted rounded" />
                      <div className="h-4 w-1/4 bg-muted rounded" />
                      <div className="flex gap-2">
                        <div className="h-4 w-20 bg-muted rounded" />
                        <div className="h-4 w-24 bg-muted rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium">
                    {allJobs.length} {allJobs.length === 1 ? 'Job' : 'Jobs'} Found in {getCategoryTitle(category || '')}
                  </h2>
                </div>
                
                {allJobs.length === 0 ? (
                  <div className="text-center py-20 max-w-md mx-auto">
                    <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No jobs found</h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find any jobs in this category.
                    </p>
                    <Button onClick={() => navigate('/jobs')}>View All Jobs</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {allJobs.map((job) => (
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
                )}
              </div>
            )}
          </section>
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
