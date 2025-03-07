
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  BookmarkIcon, 
  CalendarIcon, 
  MapPinIcon, 
  DollarSignIcon, 
  ShareIcon, 
  BriefcaseIcon,
  LinkedinIcon,
  TwitterIcon,
  MailIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Job } from '@/lib/mockData';

interface JobDetailsProps {
  job: Job;
  onSave?: () => void;
  onClose?: () => void;
  onApply?: () => void;
}

export function JobDetails({ job, onSave, onClose, onApply }: JobDetailsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  const workTypeColors = {
    'Remote': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    'On-site': 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    'Hybrid': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
  };

  const applicationStatus = job.applicationStatus || 'Not Applied';
  const statusColors = {
    'Not Applied': 'bg-secondary text-muted-foreground',
    'Applied': 'bg-blue-100 text-blue-700',
    'In Progress': 'bg-amber-100 text-amber-700',
    'Rejected': 'bg-red-100 text-red-700',
    'Offered': 'bg-green-100 text-green-700'
  };

  return (
    <div className="animated-item bg-card rounded-xl border border-border p-6 space-y-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-md border border-muted bg-muted/50 flex items-center justify-center overflow-hidden">
            {job.companyLogoUrl ? (
              <img 
                src={job.companyLogoUrl} 
                alt={`${job.company} logo`} 
                className="w-full h-full object-contain p-2" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                {job.company.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-semibold leading-tight">{job.title}</h1>
            <p className="text-lg text-muted-foreground">{job.company}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={onSave} className={job.isSaved ? "text-primary" : ""}>
            <BookmarkIcon size={18} fill={job.isSaved ? "currentColor" : "none"} />
          </Button>
          <Button variant="outline" size="icon">
            <ShareIcon size={18} />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {job.applicationStatus && (
          <Badge variant="outline" className={statusColors[applicationStatus]}>
            {applicationStatus === 'Not Applied' ? (
              <><ClockIcon size={12} className="mr-1" /> Not Applied</>
            ) : applicationStatus === 'Applied' ? (
              <><CheckCircleIcon size={12} className="mr-1" /> Applied</>
            ) : applicationStatus === 'In Progress' ? (
              <><ClockIcon size={12} className="mr-1" /> In Progress</>
            ) : applicationStatus === 'Rejected' ? (
              <><XCircleIcon size={12} className="mr-1" /> Rejected</>
            ) : (
              <><CheckCircleIcon size={12} className="mr-1" /> Offered</>
            )}
          </Badge>
        )}
        
        {job.workType && (
          <Badge variant="outline" className={workTypeColors[job.workType]}>
            {job.workType}
          </Badge>
        )}
        
        <Badge variant="outline" className="bg-card">
          <BriefcaseIcon size={12} className="mr-1" />
          {job.jobType}
        </Badge>
        
        <Badge variant="outline" className="bg-card">
          {job.category}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPinIcon size={16} className="mr-2" />
          <span>{job.location}</span>
        </div>
        
        {job.salary && (
          <div className="flex items-center text-sm text-muted-foreground">
            <DollarSignIcon size={16} className="mr-2" />
            <span>{job.salary}</span>
          </div>
        )}
        
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarIcon size={16} className="mr-2" />
          <span>Posted on {formatDate(job.postedDate)}</span>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h2 className="text-lg font-medium mb-3">Job Description</h2>
        <p className="text-muted-foreground">{job.description}</p>
      </div>
      
      <div>
        <h2 className="text-lg font-medium mb-3">Responsibilities</h2>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          {job.responsibilities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h2 className="text-lg font-medium mb-3">Requirements</h2>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          {job.requirements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      
      {job.hiringManager && (
        <>
          <Separator />
          <div>
            <h2 className="text-lg font-medium mb-3">Hiring Manager</h2>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <span className="text-lg font-medium">{job.hiringManager.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="font-medium">{job.hiringManager.name}</h3>
                <p className="text-sm text-muted-foreground">{job.hiringManager.position}</p>
                <div className="flex gap-2 mt-2">
                  {job.hiringManager.linkedIn && (
                    <a href={job.hiringManager.linkedIn} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      <LinkedinIcon size={16} />
                    </a>
                  )}
                  {job.hiringManager.twitter && (
                    <a href={job.hiringManager.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      <TwitterIcon size={16} />
                    </a>
                  )}
                  {job.hiringManager.email && (
                    <a href={`mailto:${job.hiringManager.email}`} className="text-muted-foreground hover:text-primary">
                      <MailIcon size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onClose}>
          Back to Jobs
        </Button>
        <Button onClick={onApply}>
          Apply Now
        </Button>
      </div>
    </div>
  );
}
