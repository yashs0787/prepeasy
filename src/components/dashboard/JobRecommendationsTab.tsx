
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { JobCard } from "@/components/JobCard";
import { Job } from "@/lib/types";
import { Sparkles, ClockIcon } from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import { Button } from "@/components/ui/button";

export function JobRecommendationsTab() {
  const { jobs, isLoading, toggleSaveJob } = useJobs();
  const [activeCategory, setActiveCategory] = useState<'best-match' | 'trending' | 'recent'>('best-match');

  // Filter jobs based on active category
  const getFilteredJobs = () => {
    // In a real application, we would use Mixtral/GPT-4 to intelligently recommend jobs
    // For now, we'll just simulate the functionality with basic filtering
    
    switch (activeCategory) {
      case 'best-match':
        // In a real app, this would use ML to match user skills with job requirements
        return jobs.slice(0, 5);
      case 'trending':
        // In a real app, this would use analytics data to identify trending jobs
        return jobs.filter(job => job.category === 'Engineering').slice(0, 3);
      case 'recent':
        // Sort by most recent first
        return [...jobs].sort((a, b) => 
          new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
        ).slice(0, 5);
      default:
        return jobs.slice(0, 5);
    }
  };

  const recommendedJobs = getFilteredJobs();

  const handleSelectJob = (jobId: string) => {
    // In a real application, this would track user interactions for better recommendations
    console.log('Selected job:', jobId);
  };

  const handleApplyJob = (jobId: string) => {
    // Handle apply action
    console.log('Apply to job:', jobId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Recommendations</h1>
        <div className="flex items-center gap-1">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-medium">AI-Powered</span>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Personalized For You</CardTitle>
          <CardDescription>
            Jobs tailored to your skills and experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex space-x-2">
              <Button 
                variant={activeCategory === 'best-match' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveCategory('best-match')}
              >
                <Sparkles className="mr-1 h-4 w-4 text-amber-400" />
                Best Match
              </Button>
              <Button 
                variant={activeCategory === 'trending' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveCategory('trending')}
              >
                Trending
              </Button>
              <Button 
                variant={activeCategory === 'recent' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveCategory('recent')}
              >
                <ClockIcon className="mr-1 h-4 w-4" />
                Recent
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
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
            <div className="space-y-4">
              {recommendedJobs.length > 0 ? (
                recommendedJobs.map((job: Job) => (
                  <JobCard 
                    key={job.id}
                    job={job}
                    isSelected={false}
                    onClick={() => handleSelectJob(job.id)}
                    onSave={() => toggleSaveJob(job.id)}
                    onApply={() => handleApplyJob(job.id)}
                  />
                ))
              ) : (
                <div className="text-center p-6">
                  <p className="text-muted-foreground">No recommendations available yet.</p>
                  <p className="text-sm">Complete your profile to get personalized recommendations.</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
