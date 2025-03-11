
import React from 'react';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface ExperiencePreviewProps {
  experiences: ExperienceItem[];
}

export function ExperiencePreview({ experiences }: ExperiencePreviewProps) {
  const hasContent = experiences.some(exp => exp.title || exp.company);
  
  if (!hasContent) return null;
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Experience</h2>
      {experiences.map((exp) => (
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
  );
}
