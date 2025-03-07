
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { SearchFilters } from '@/components/SearchFilters';
import { JobCard } from '@/components/JobCard';
import { JobDetails } from '@/components/JobDetails';
import { JobCategories } from '@/components/JobCategories';
import { Button } from '@/components/ui/button';
import { useJobs } from '@/hooks/useJobs';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { 
  ArrowUpRight, 
  BookmarkCheck, 
  BookmarkPlus, 
  BriefcaseBusiness, 
  FileCheck, 
  Sparkles
} from 'lucide-react';

export default function Index() {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  
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
    selectedJob,
    toggleSaveJob
  } = useJobs();

  // Update filters when category is selected
  useEffect(() => {
    if (selectedCategory) {
      setFilters({
        ...filters,
        categories: [selectedCategory]
      });
    } else if (filters.categories?.length === 1 && selectedCategory === null) {
      // Clear category filter if user deselects it
      const { categories, ...restFilters } = filters;
      setFilters(restFilters);
    }
  }, [selectedCategory]);

  const handleSelectJob = (jobId: string) => {
    setSelectedJobId(jobId);
    setIsDetailView(true);
    // On mobile, scroll to top
    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCloseJobDetails = () => {
    setIsDetailView(false);
    setSelectedJobId(null);
  };

  const handleSaveJob = (jobId: string) => {
    toggleSaveJob(jobId);
    toast.success("Job saved to your bookmarks");
  };

  const handleApplyForJob = () => {
    if (!selectedJob) return;
    
    // This would normally link to the application process
    window.open(selectedJob.applyUrl, '_blank');
    toast.success("Redirecting to application page");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-10">
          {/* Hero Section */}
          {!isDetailView && (
            <section className="text-center space-y-4 py-10 max-w-3xl mx-auto animated-item">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary mb-3">
                <Sparkles size={14} className="mr-1" />
                <span>The smarter way to find your dream job</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Find your next job opportunity
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover thousands of job opportunities with all the information you need.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-4">
                <div className="flex items-center text-sm gap-1">
                  <FileCheck className="text-primary" size={18} />
                  <span>AI Resume Builder</span>
                </div>
                <div className="flex items-center text-sm gap-1">
                  <BookmarkCheck className="text-primary" size={18} />
                  <span>Application Tracker</span>
                </div>
                <div className="flex items-center text-sm gap-1">
                  <BriefcaseBusiness className="text-primary" size={18} />
                  <span>Daily Job Alerts</span>
                </div>
              </div>
            </section>
          )}
          
          {/* Search & Filter Section */}
          <section className={isDetailView ? "mb-6" : "mb-8"}>
            <SearchFilters 
              query={query}
              onQueryChange={setQuery}
              filters={filters}
              onFiltersChange={setFilters}
            />
          </section>
          
          {/* Job Categories */}
          {!isDetailView && !isLoading && (
            <section>
              <JobCategories 
                onSelectCategory={(category) => setSelectedCategory(
                  category === selectedCategory ? null : category
                )}
                selectedCategory={selectedCategory}
              />
            </section>
          )}
          
          {/* Main content: Job list or Job details */}
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
                      <Skeleton className="h-16 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : isDetailView && selectedJob ? (
              <JobDetails 
                job={selectedJob}
                onSave={() => handleSaveJob(selectedJob.id)}
                onClose={handleCloseJobDetails}
                onApply={handleApplyForJob}
              />
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
                    <BriefcaseBusiness className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
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
      
      <footer className="border-t py-8 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-primary" />
                <span className="font-semibold text-lg">JobSeek</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The smarter way to find your next job opportunity and build your career.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">For Job Seekers</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Browse Jobs</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Resume Builder</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Career Advice</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Job Alerts</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">For Employers</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Post a Job</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Search Candidates</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-6 text-sm text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} JobSeek. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
