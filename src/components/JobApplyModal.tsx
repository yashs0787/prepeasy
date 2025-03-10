
import { useState, useEffect, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ColdDmGenerator } from "@/components/ColdDmGenerator";
import { useJobs } from '@/hooks/useJobs';
import { Badge } from "@/components/ui/badge";
import { Loader2, SendIcon, Sparkles, Upload, UserIcon } from "lucide-react";
import { AuthContext } from "@/App";
import { Link } from "react-router-dom";

interface JobApplyModalProps {
  jobId: string;
  open: boolean;
  onClose: () => void;
}

export function JobApplyModal({ jobId, open, onClose }: JobApplyModalProps) {
  const { user } = useContext(AuthContext);
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
  
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      toast.success("Resume uploaded", {
        description: e.target.files[0].name
      });
    }
  };
  
  if (!job) return null;

  // If user is not logged in, show sign in prompt
  if (!user) {
    return (
      <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Sign in required</DialogTitle>
            <DialogDescription>
              You need to sign in to apply for jobs and access all features.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <UserIcon className="h-12 w-12 text-muted-foreground" />
            <p className="text-center">
              Sign in to apply for <span className="font-medium">{job.title}</span> at <span className="font-medium">{job.company}</span>
            </p>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={onClose} className="sm:flex-1">
              Cancel
            </Button>
            <Link to="/signin" className="sm:flex-1 w-full">
              <Button className="w-full neon-button">
                Sign In
              </Button>
            </Link>
            <Link to="/signup" className="sm:flex-1 w-full">
              <Button variant="outline" className="w-full">
                Sign Up
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
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
          
          <TabsContent value="apply" className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Job Details</h3>
                  <p className="text-sm text-muted-foreground">Review the job before applying</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={job.applicationStatus ? "default" : "outline"}>
                    {job.applicationStatus || "Not Applied"}
                  </Badge>
                  {job.isSaved && <Badge variant="secondary">Saved</Badge>}
                </div>
              </div>
              
              <div className="p-4 rounded-md bg-muted/50 text-sm">
                <p className="whitespace-pre-line">{job.description}</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t">
              <div>
                <h3 className="text-lg font-medium">Your Application</h3>
                <p className="text-sm text-muted-foreground">Upload your resume and write a cover letter</p>
              </div>
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="resume">Resume</Label>
                  <div className="flex gap-2 items-center">
                    <Input 
                      id="resume" 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById("resume")?.click()}
                      className="w-full justify-start text-muted-foreground"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {resumeFile ? resumeFile.name : "Upload your resume (.pdf, .doc, .docx)"}
                    </Button>
                    {resumeFile && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive"
                        onClick={() => setResumeFile(null)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="coverLetter">Cover Letter</Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 gap-1 text-primary"
                      onClick={() => {
                        setCoverLetter(`Dear Hiring Team at ${job.company},\n\nI am writing to express my interest in the ${job.title} position. With my background in this field, I believe I can be a valuable addition to your team.\n\nThank you for considering my application.\n\nSincerely,\n[Your Name]`);
                      }}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span className="text-xs">Generate Template</span>
                    </Button>
                  </div>
                  <Textarea 
                    id="coverLetter" 
                    placeholder="Write your cover letter here..."
                    rows={8}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="message" className="py-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Message the Hiring Manager</h3>
                <p className="text-sm text-muted-foreground">
                  Send a personalized message to increase your chances of getting noticed
                </p>
              </div>
              
              <div className="space-y-4 border rounded-lg p-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Hiring Manager's Name</Label>
                      <Input 
                        id="contactName" 
                        placeholder="Jane Smith"
                        value={hiringManager.name}
                        onChange={(e) => setHiringManager({...hiringManager, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactRole">Hiring Manager's Role</Label>
                      <Input 
                        id="contactRole" 
                        placeholder="Hiring Manager / CTO"
                        value={hiringManager.role}
                        onChange={(e) => setHiringManager({...hiringManager, role: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <ColdDmGenerator 
                    initialValues={{
                      name: hiringManager.name,
                      companyName: job.company,
                      role: hiringManager.role,
                      personalizedNote: `I'm interested in the ${job.title} position at ${job.company} and would like to discuss my qualifications.`,
                      tone: 'professional',
                      platform: 'linkedin'
                    }}
                    compact
                    jobTitle={job.title}
                  />
                </div>
              </div>
            </div>
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
