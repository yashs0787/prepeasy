
import React from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';

interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    link: string;
    description: string;
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    description: string;
  }>;
}

interface ResumePreviewProps {
  resumeData: ResumeData;
  resumeRef: React.RefObject<HTMLDivElement>;
  onReturn: () => void;
  onDownload: () => void;
}

export function ResumePreview({ 
  resumeData, 
  resumeRef, 
  onReturn, 
  onDownload 
}: ResumePreviewProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Resume Preview</CardTitle>
        <CardDescription>
          This is how your resume will look when exported. You can return to the editor to make changes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={resumeRef} className="border rounded-md p-8 bg-white text-black min-h-[800px]">
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h1 className="text-2xl font-bold">{resumeData.personalInfo.name || 'Your Name'}</h1>
              <p className="text-gray-600">{resumeData.personalInfo.title || 'Professional Title'}</p>
              <div className="flex flex-wrap gap-x-4 text-sm mt-2">
                {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
                {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
                {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
                {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
              </div>
            </div>
            
            {resumeData.personalInfo.summary && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Summary</h2>
                <p>{resumeData.personalInfo.summary}</p>
              </div>
            )}
            
            <div>
              <h2 className="text-lg font-semibold mb-2">Experience</h2>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{exp.title || 'Position Title'}</h3>
                      <p className="text-gray-600">{exp.company || 'Company Name'}{exp.location ? `, ${exp.location}` : ''}</p>
                    </div>
                    <p className="text-sm">
                      {exp.startDate || 'Start Date'} - {exp.endDate || 'End Date'}
                    </p>
                  </div>
                  <p className="mt-1 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
            
            {/* Additional sections would be displayed here */}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onReturn}>
          Return to Editor
        </Button>
        <Button onClick={onDownload}>
          <DownloadIcon className="mr-2 h-4 w-4" /> Download Resume
        </Button>
      </CardFooter>
    </>
  );
}
