
import React from 'react';

interface EducationItem {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationPreviewProps {
  education: EducationItem[];
}

export function EducationPreview({ education }: EducationPreviewProps) {
  const hasContent = education.some(edu => edu.degree || edu.school);
  
  if (!hasContent) return null;
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Education</h2>
      {education.map((edu) => (
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
  );
}
