
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
            {/* Personal Info Section */}
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
            
            {/* Summary Section */}
            {resumeData.personalInfo.summary && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Professional Summary</h2>
                <p>{resumeData.personalInfo.summary}</p>
              </div>
            )}
            
            {/* Experience Section */}
            {resumeData.experience.some(exp => exp.title || exp.company) && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Experience</h2>
                {resumeData.experience.map((exp) => (
                  exp.title || exp.company ? (
                    <div key={exp.id} className="mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{exp.title || 'Position Title'}</h3>
                          <p className="text-gray-600">{exp.company || 'Company Name'}{exp.location ? `, ${exp.location}` : ''}</p>
                        </div>
                        <p className="text-sm">
                          {exp.startDate || 'Start Date'} - {exp.current ? 'Present' : exp.endDate || 'End Date'}
                        </p>
                      </div>
                      {exp.description && <p className="mt-1 text-sm">{exp.description}</p>}
                    </div>
                  ) : null
                ))}
              </div>
            )}
            
            {/* Education Section */}
            {resumeData.education.some(edu => edu.degree || edu.school) && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Education</h2>
                {resumeData.education.map((edu) => (
                  edu.degree || edu.school ? (
                    <div key={edu.id} className="mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{edu.degree || 'Degree'}</h3>
                          <p className="text-gray-600">{edu.school || 'School'}{edu.location ? `, ${edu.location}` : ''}</p>
                        </div>
                        <p className="text-sm">
                          {edu.startDate || 'Start Date'} - {edu.endDate || 'End Date'}
                        </p>
                      </div>
                      {edu.description && <p className="mt-1 text-sm">{edu.description}</p>}
                    </div>
                  ) : null
                ))}
              </div>
            )}
            
            {/* Skills Section */}
            {resumeData.skills.some(skill => skill.name) && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills
                    .filter(skill => skill.name)
                    .map((skill) => (
                      <span key={skill.id} className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {skill.name}
                      </span>
                    ))}
                </div>
              </div>
            )}
            
            {/* Projects Section */}
            {resumeData.projects.some(proj => proj.title) && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Projects</h2>
                {resumeData.projects.map((proj) => (
                  proj.title ? (
                    <div key={proj.id} className="mb-4">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium">{proj.title}</h3>
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            View Project
                          </a>
                        )}
                      </div>
                      {proj.description && <p className="mt-1 text-sm">{proj.description}</p>}
                    </div>
                  ) : null
                ))}
              </div>
            )}
            
            {/* Certifications Section */}
            {resumeData.certifications.some(cert => cert.name) && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Certifications</h2>
                {resumeData.certifications.map((cert) => (
                  cert.name ? (
                    <div key={cert.id} className="mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{cert.name}</h3>
                          {cert.issuer && <p className="text-gray-600">{cert.issuer}</p>}
                        </div>
                        {cert.date && <p className="text-sm">{cert.date}</p>}
                      </div>
                      {cert.description && <p className="mt-1 text-sm">{cert.description}</p>}
                    </div>
                  ) : null
                ))}
              </div>
            )}
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
