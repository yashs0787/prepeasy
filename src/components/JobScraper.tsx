
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Job } from "@/lib/types";
import { Loader2, RefreshCw } from "lucide-react";

export function JobScraper() {
  const [isLoading, setIsLoading] = useState(false);
  const [keywords, setKeywords] = useState("software developer");
  const [location, setLocation] = useState("remote");
  const [source, setSource] = useState("linkedin");
  const [scrapedJobs, setScrapedJobs] = useState<Job[]>([]);
  
  const handleScrape = async () => {
    setIsLoading(true);
    setScrapedJobs([]);
    
    try {
      const { data, error } = await supabase.functions.invoke('job-scraper', {
        body: { source, keywords, location }
      });
      
      if (error) throw error;
      
      toast.success(`Scraped ${data.jobs?.length || 0} jobs from ${source}`);
      setScrapedJobs(data.jobs || []);
    } catch (error) {
      console.error("Error scraping jobs:", error);
      toast.error("Failed to scrape jobs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Job Scraper</h2>
        <Button variant="outline" onClick={handleScrape} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          {isLoading ? "Scraping..." : "Scrape Jobs"}
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Search Parameters</CardTitle>
          <CardDescription>Configure the job scraping parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="twitter">Twitter/X</SelectItem>
                  <SelectItem value="reddit">Reddit</SelectItem>
                  <SelectItem value="all">All Sources</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input 
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. software developer, react"
              />
            </div>
            
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. remote, new york, san francisco"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleScrape} disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isLoading ? "Scraping Jobs..." : "Start Scraping"}
          </Button>
        </CardFooter>
      </Card>
      
      {scrapedJobs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Scraped Jobs</CardTitle>
            <CardDescription>Found {scrapedJobs.length} jobs matching your criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scrapedJobs.map((job, i) => (
                <div key={i} className="border rounded-lg p-4 hover:bg-secondary/10 transition-colors">
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.company} • {job.location || 'Location not specified'}</p>
                  {job.description && (
                    <p className="text-sm mt-2">{job.description.substring(0, 100)}...</p>
                  )}
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs bg-primary/20 text-primary-foreground px-2 py-1 rounded">
                      Source: {job.source}
                    </span>
                    <Button variant="outline" size="sm" asChild>
                      <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">View Job</a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
