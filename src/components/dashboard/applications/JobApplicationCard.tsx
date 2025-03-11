
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, PencilIcon } from "lucide-react";
import { Job } from "@/lib/types";

interface JobApplicationCardProps {
  job: Job;
  status: "active" | "offered" | "rejected";
  onScheduleInterview?: () => void;
  onAddNotes: () => void;
}

export function JobApplicationCard({ 
  job, 
  status,
  onScheduleInterview, 
  onAddNotes 
}: JobApplicationCardProps) {
  const getBadgeStyles = () => {
    switch (status) {
      case "active":
        return job.applicationStatus === 'interviewing' 
          ? 'bg-amber-100 text-amber-700' 
          : 'bg-blue-100 text-blue-700';
      case "offered":
        return 'bg-green-100 text-green-700';
      case "rejected":
        return 'bg-red-100 text-red-700';
      default:
        return '';
    }
  };

  const getBadgeText = () => {
    switch (status) {
      case "active":
        return job.applicationStatus === 'interviewing' ? 'Interviewing' : 'Applied';
      case "offered":
        return 'Offered';
      case "rejected":
        return 'Rejected';
      default:
        return '';
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
            </div>
            <Badge variant="outline" className={getBadgeStyles()}>
              {getBadgeText()}
            </Badge>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary">{job.jobType}</Badge>
            <Badge variant="secondary">{job.workType}</Badge>
            {job.salary && <Badge variant="secondary">{job.salary}</Badge>}
          </div>
        </div>
        
        <div className="flex flex-row md:flex-col justify-end gap-2 p-4 bg-muted/30">
          {status === "active" && onScheduleInterview && (
            <Button size="sm" variant="outline" onClick={onScheduleInterview}>
              <CalendarIcon size={14} className="mr-1" /> Schedule
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={onAddNotes}>
            <PencilIcon size={14} className="mr-1" /> Add Notes
          </Button>
        </div>
      </div>
    </Card>
  );
}
