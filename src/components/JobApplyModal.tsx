
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, SendIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useJobs } from '@/hooks/useJobs';
import { SignInPrompt } from './job-apply/SignInPrompt';
import { ApplicationTab } from './job-apply/ApplicationTab';
import { MessageTab } from './job-apply/MessageTab';

interface JobApplyModalProps {
  jobId: string;
  open: boolean;
  onClose: () => void;
}

export function JobApplyModal({ jobId, open, onClose }: JobApplyModalProps) {
  const { user } = useAuth();
  const { jobs, updateApplicationStatus } = useJobs();
  const [activeTab, setActiveTab] = useState("apply");
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [hiringManager, setHiringManager] = useState({
    name: '',
    role: '',
    company: '',
    platform: 'linkedin'
  });
  
  const job = jobs.find(j => j.id === jobId);
  
  useEffect(() => {
    if (job) {
      setHiringManager({
        name: job.hiringManager?.name || '',
        role: job.hiringManager?.role || 'Hiring Manager',
        company: job.company,
        platform: 'linkedin'
      });
    }
  }, [job]);
  
  const handleSubmit = async () => {
    if (!job) return;
    
    // Check for authentication before proceeding
    if (!user) {
      toast.error("Please sign in to apply for jobs");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      updateApplicationStatus(jobId, 'applied');
      
      toast.success("Application submitted successfully!", {
        description: `Your application for ${job.title} at ${job.company} has been sent.`
      });
      
      onClose();
    } catch (error) {
      toast.error("Failed to submit application", {
        description: "Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!job) return null;

  // If user is not logged in, show sign in prompt
  if (!user) {
    return (
      <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
        <SignInPrompt job={job} onClose={onClose} />
      </Dialog>
    );
  }
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply to {job.title}</DialogTitle>
          <DialogDescription>
            {job.company} • {job.location} • {job.workType}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="apply">Apply to Job</TabsTrigger>
            <TabsTrigger value="message">Message Hiring Manager</TabsTrigger>
          </TabsList>
          
          <TabsContent value="apply">
            <ApplicationTab 
              job={job}
              resumeFile={resumeFile}
              coverLetter={coverLetter}
              setCoverLetter={setCoverLetter}
              setResumeFile={setResumeFile}
            />
          </TabsContent>
          
          <TabsContent value="message">
            <MessageTab 
              job={job}
              hiringManager={hiringManager}
              setHiringManager={setHiringManager}
            />
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={activeTab === 'apply' ? handleSubmit : () => {
              toast.success("Message ready to send!", {
                description: "In the full version, you can send messages directly to hiring managers."
              });
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <SendIcon className="mr-2 h-4 w-4" />
                {activeTab === 'apply' ? 'Submit Application' : 'Send Message'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
