
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Linkedin, Twitter, MessageSquare } from "lucide-react";

export function JobScraper() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  
  const handleSearch = (platform: string) => {
    setIsLoading(true);
    
    // Simulating API call to scrape jobs
    setTimeout(() => {
      setResults([
        {
          id: 1,
          title: 'Senior Frontend Developer',
          company: 'TechCorp',
          location: 'Remote',
          salary: '$120k - $150k',
          description: 'Looking for an experienced developer to join our team...',
          platform,
          postedAt: '2 days ago'
        },
        {
          id: 2,
          title: 'UX/UI Designer',
          company: 'DesignHub',
          location: 'New York, NY',
          salary: '$90k - $110k',
          description: 'Join our creative team to design next-gen interfaces...',
          platform,
          postedAt: '5 days ago'
        },
        {
          id: 3,
          title: 'Full Stack Engineer',
          company: 'StartupX',
          location: 'San Francisco, CA',
          salary: '$130k - $160k',
          description: 'Help us build and scale our product...',
          platform,
          postedAt: '1 day ago'
        }
      ]);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="w-full">
      <Tabs defaultValue="linkedin" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="linkedin" className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" /> LinkedIn
          </TabsTrigger>
          <TabsTrigger value="twitter" className="flex items-center gap-2">
            <Twitter className="h-4 w-4" /> X/Twitter
          </TabsTrigger>
          <TabsTrigger value="reddit" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Reddit
          </TabsTrigger>
        </TabsList>
        
        {['linkedin', 'twitter', 'reddit'].map((platform) => (
          <TabsContent key={platform} value={platform} className="space-y-4">
            <Card className="glass-card bg-black/30">
              <CardHeader>
                <CardTitle>
                  Search {platform === 'linkedin' ? 'LinkedIn' : platform === 'twitter' ? 'X/Twitter' : 'Reddit'} Jobs
                </CardTitle>
                <CardDescription>
                  Find the latest job opportunities from {platform === 'linkedin' ? 'LinkedIn' : platform === 'twitter' ? 'X/Twitter' : 'Reddit'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input 
                      id="keywords" 
                      placeholder="React, JavaScript, UI/UX..."
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      placeholder="Remote, New York, London..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleSearch(platform)} 
                  disabled={isLoading} 
                  className="neon-button"
                >
                  {isLoading ? "Searching..." : "Search Jobs"}
                </Button>
              </CardFooter>
            </Card>
            
            {results.length > 0 && (
              <div className="space-y-4 mt-6">
                <h3 className="text-xl font-semibold">Results</h3>
                <div className="grid grid-cols-1 gap-4">
                  {results.map((job) => (
                    <Card key={job.id} className="feature-card">
                      <CardHeader>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription>
                          {job.company} • {job.location} • {job.postedAt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{job.description}</p>
                        <div className="mt-2 font-semibold">{job.salary}</div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          Save
                        </Button>
                        <Button className="neon-button" size="sm">
                          Apply Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
