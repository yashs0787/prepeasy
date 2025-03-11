
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColdDmGenerator } from "@/components/ColdDmGenerator";
import { Job } from "@/lib/types";

interface MessageTabProps {
  job: Job;
  hiringManager: {
    name: string;
    role: string;
    company: string;
    platform: string;
  };
  setHiringManager: React.Dispatch<React.SetStateAction<{
    name: string;
    role: string;
    company: string;
    platform: string;
  }>>;
}

export function MessageTab({ job, hiringManager, setHiringManager }: MessageTabProps) {
  return (
    <div className="space-y-4 py-4">
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
  );
}
