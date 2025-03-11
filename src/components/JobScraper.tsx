
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, SearchIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function JobScraper() {
  const [isLoading, setIsLoading] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [source, setSource] = useState('linkedin');
  const [jobCount, setJobCount] = useState(0);

  const handleScrapeJobs = async () => {
    if (!keywords) {
      toast.error("Please enter keywords for your job search");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('job-scraper', {
        body: {
          source,
          keywords,
          location,
          scrapeService: 'apify' // Default to apify as the scraper service
        }
      });

      if (error) throw error;

      const results = data?.results || [];
      setJobCount(results.length || 0);
      
      toast.success(`Found ${results.length} jobs!`, {
        description: "Refresh the jobs page to see the new listings."
      });
    } catch (error) {
      console.error("Error scraping jobs:", error);
      toast.error("Failed to scrape jobs", {
        description: error.message || "Please try again later"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Job Scraper</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Find New Jobs</CardTitle>
          <CardDescription>
            Use our automatic job scraper to find new job opportunities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="keywords">Job Keywords</Label>
            <Input 
              id="keywords" 
              placeholder="React Developer, Frontend Engineer, etc."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location (Optional)</Label>
            <Input 
              id="location" 
              placeholder="Remote, New York, San Francisco, etc."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="source">Job Source</Label>
            <Select 
              value={source} 
              onValueChange={setSource}
            >
              <SelectTrigger id="source">
                <SelectValue placeholder="Select a job source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="indeed">Indeed</SelectItem>
                <SelectItem value="glassdoor">Glassdoor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            className="w-full mt-2" 
            onClick={handleScrapeJobs}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching for jobs...
              </>
            ) : (
              <>
                <SearchIcon className="mr-2 h-4 w-4" />
                Find Jobs
              </>
            )}
          </Button>
          
          {jobCount > 0 && (
            <p className="text-sm text-center text-muted-foreground pt-2">
              Found {jobCount} jobs matching your criteria.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
