
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CalendarIcon, 
  MapPinIcon, 
  BookmarkIcon, 
  ExternalLinkIcon, 
  DollarSignIcon, 
  BriefcaseIcon 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Job } from '@/lib/types';

interface JobCardProps {
  job: Job;
  isSelected?: boolean;
  onClick?: () => void;
  onSave?: () => void;
  onApply?: () => void;
}

export function JobCard({ job, isSelected, onClick, onSave, onApply }: JobCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const workTypeColors = {
    'Remote': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    'On-site': 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    'Hybrid': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
  };

  return (
    <div 
      className={cn(
        "relative w-full rounded-xl p-4 cursor-pointer transition-all duration-300 animated-item hover-lift", 
        isSelected 
          ? "bg-primary/5 border border-primary/20" 
          : "bg-card border border-transparent hover:border-muted"
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-12 h-12 rounded-md border border-muted bg-muted/50 overflow-hidden">
          {job.companyLogoUrl ? (
            <img 
              src={job.companyLogoUrl} 
              alt={`${job.company} logo`} 
              className="w-full h-full object-contain p-2" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl font-bold text-muted-foreground">
              {job.company.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-lg leading-tight mb-1 truncate pr-8">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onSave?.();
              }}
              className={cn(
                "text-muted-foreground hover:text-primary transition-colors",
                job.isSaved && "text-primary"
              )}
            >
              <BookmarkIcon size={18} fill={job.isSaved ? "currentColor" : "none"} />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {job.workType && (
              <Badge variant="outline" className={workTypeColors[job.workType]}>
                {job.workType}
              </Badge>
            )}
            
            <Badge variant="outline" className="bg-card">
              <BriefcaseIcon size={12} className="mr-1" />
              {job.jobType}
            </Badge>
            
            {job.location && (
              <div className="text-xs flex items-center text-muted-foreground">
                <MapPinIcon size={12} className="inline mr-1" />
                {job.location}
              </div>
            )}
            
            {job.salary && (
              <div className="text-xs flex items-center text-muted-foreground">
                <DollarSignIcon size={12} className="inline mr-1" />
                {job.salary}
              </div>
            )}
            
            <div className="text-xs flex items-center text-muted-foreground ml-auto">
              <CalendarIcon size={12} className="inline mr-1" />
              {formatDate(job.postedAt)}
            </div>
          </div>
          
          <div className="mt-4 text-sm line-clamp-2 text-muted-foreground">
            {job.description}
          </div>
          
          {(isHovering || isSelected) && (
            <div className="mt-4 flex gap-2 items-center justify-end animate-fade-in">
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(job.applyUrl, '_blank');
                }}
              >
                <ExternalLinkIcon size={14} className="mr-1" />
                View Details
              </Button>
              <Button
                size="sm"
                className="text-xs h-8"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onApply) {
                    onApply();
                  } else if (job.applyUrl) {
                    window.open(job.applyUrl, '_blank');
                  }
                }}
              >
                Apply Now
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
