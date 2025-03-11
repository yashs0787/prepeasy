
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Upload } from "lucide-react";
import { toast } from "sonner";
import { Job } from "@/lib/types";

interface ApplicationTabProps {
  job: Job;
  resumeFile: File | null;
  coverLetter: string;
  setCoverLetter: (value: string) => void;
  setResumeFile: (file: File | null) => void;
}

export function ApplicationTab({ 
  job, 
  resumeFile, 
  coverLetter, 
  setCoverLetter, 
  setResumeFile 
}: ApplicationTabProps) {
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      toast.success("Resume uploaded", {
        description: e.target.files[0].name
      });
    }
  };

  return (
    <div className="space-y-4 py-4">
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
    </div>
  );
}
