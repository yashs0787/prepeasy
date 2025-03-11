
import React from 'react';
import { PersonalInfoPreview } from './PersonalInfoPreview';
import { ExperiencePreview } from './ExperiencePreview';
import { EducationPreview } from './EducationPreview';
import { SkillsPreview } from './SkillsPreview';
import { ProjectsPreview } from './ProjectsPreview';
import { CertificationsPreview } from './CertificationsPreview';
import { ResumeData } from '../types';

interface ResumeDocumentProps {
  resumeData: ResumeData;
  resumeRef: React.RefObject<HTMLDivElement>;
}

export function ResumeDocument({ resumeData, resumeRef }: ResumeDocumentProps) {
  return (
    <div ref={resumeRef} className="border rounded-md p-8 bg-white text-black min-h-[800px]">
      <div className="space-y-6">
        <PersonalInfoPreview 
          name={resumeData.personalInfo.name}
          title={resumeData.personalInfo.title}
          email={resumeData.personalInfo.email}
          phone={resumeData.personalInfo.phone}
          location={resumeData.personalInfo.location}
          website={resumeData.personalInfo.website}
          summary={resumeData.personalInfo.summary}
        />
        
        <ExperiencePreview experiences={resumeData.experience} />
        <EducationPreview education={resumeData.education} />
        <SkillsPreview skills={resumeData.skills} />
        <ProjectsPreview projects={resumeData.projects} />
        <CertificationsPreview certifications={resumeData.certifications} />
      </div>
    </div>
  );
}
