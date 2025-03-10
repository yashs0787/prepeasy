
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "lucide-react";
import { Job } from "@/lib/types";
import { JobCard } from "@/components/JobCard";

interface SavedJobsTabProps {
  savedJobs: Job[];
  toggleSaveJob: (id: string) => void;
}

export function SavedJobsTab({ savedJobs, toggleSaveJob }: SavedJobsTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Saved Jobs</h2>
      {savedJobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-3">
          {savedJobs.map(job => (
            <JobCard 
              key={job.id}
              job={job}
              onSave={() => toggleSaveJob(job.id)}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <BookmarkIcon size={40} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No saved jobs</h3>
            <p className="text-muted-foreground mb-4">
              Start saving jobs you're interested in to revisit them later
            </p>
            <Button>Browse Jobs</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
