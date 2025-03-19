
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { JobCard } from "@/components/JobCard";
import { Job } from "@/lib/types";
import { Sparkles, ClockIcon, Info } from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useProfileData } from './settings/useProfileData';

interface RecommendedJob {
  id: string;
  title: string;
  company: string;
  score?: number;
  reason?: string;
  growthRate?: string;
  posted?: string;
}

interface Recommendations {
  bestMatch: RecommendedJob[];
  trending: RecommendedJob[];
  newOpportunities: RecommendedJob[];
}

export function JobRecommendationsTab() {
  const { jobs, isLoading: isJobsLoading, toggleSaveJob } = useJobs();
  const [activeCategory, setActiveCategory] = useState<'best-match' | 'trending' | 'recent'>('best-match');
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { profile, fetchProfileData, isLoading: isProfileLoading } = useProfileData(user);

  useEffect(() => {
    if (user) {
      fetchProfileData();
    }
  }, [user, fetchProfileData]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user || isProfileLoading) return;
      
      setIsLoading(true);
      try {
        // Create a simplified resume data object
        const resumeData = {
          personalInfo: {
            name: profile.fullName,
            location: profile.location,
            bio: profile.bio
          },
          // Here you would include other resume sections if available
        };
        
        // Include job preferences
        const preferences = {
          title: profile.jobPreferences.title,
          industry: profile.jobPreferences.industry,
          jobType: profile.jobPreferences.jobType,
          minSalary: profile.jobPreferences.minSalary,
          remote: profile.jobPreferences.remote
        };
        
        // Call the Supabase Edge Function
        const { data, error } = await supabase.functions.invoke('job-recommendations', {
          body: { resumeData, preferences }
        });
        
        if (error) throw error;
        
        if (data && data.success && data.recommendations) {
          setRecommendations(data.recommendations);
        } else {
          toast.error('Failed to load recommendations');
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        toast.error('Something went wrong while fetching recommendations');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecommendations();
  }, [user, profile, isProfileLoading]);

  // Map recommended jobs to Job format for JobCard
  const mapToJobFormat = (recommendedJobs: RecommendedJob[]): Job[] => {
    return recommendedJobs.map(job => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.reason || job.growthRate || job.posted || '',
      description: job.reason || '',
      salary: '',
      jobType: 'Full-time',
      workType: 'On-site',
      postedAt: job.posted || new Date().toISOString(),
      skills: [],
      source: job.company,
      isSaved: false,
      applicationStatus: null,
      category: 'Technology',
      experienceLevel: 'Mid-level',
      industry: 'Technology',
      hiringManager: {
        name: '',
        role: '',
        platform: ''
      }
    }));
  };

  // Get current recommendations based on active category
  const getCurrentRecommendations = (): Job[] => {
    if (!recommendations) return [];
    
    switch (activeCategory) {
      case 'best-match':
        return mapToJobFormat(recommendations.bestMatch);
      case 'trending':
        return mapToJobFormat(recommendations.trending);
      case 'recent':
        return mapToJobFormat(recommendations.newOpportunities);
      default:
        return mapToJobFormat(recommendations.bestMatch);
    }
  };

  const recommendedJobs = getCurrentRecommendations();

  const handleSelectJob = (jobId: string) => {
    // In a real application, this would track user interactions for better recommendations
    console.log('Selected job:', jobId);
  };

  const handleApplyJob = (jobId: string) => {
    // Handle apply action
    console.log('Apply to job:', jobId);
  };

  const hasProfileData = profile.fullName && profile.jobPreferences.title;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Recommendations</h1>
        <div className="flex items-center gap-1">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-medium">AI-Powered</span>
        </div>
      </div>

      {!hasProfileData && !isProfileLoading && (
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">Complete your profile</p>
                <p className="text-sm text-amber-700">
                  Adding your full name, job title, and preferences will help us provide more accurate job recommendations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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

          {(isLoading || isProfileLoading) ? (
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
