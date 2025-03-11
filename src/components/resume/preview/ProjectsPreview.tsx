
import React from 'react';

interface ProjectItem {
  id: string;
  title: string;
  link: string;
  description: string;
}

interface ProjectsPreviewProps {
  projects: ProjectItem[];
}

export function ProjectsPreview({ projects }: ProjectsPreviewProps) {
  const hasContent = projects.some(proj => proj.title);
  
  if (!hasContent) return null;
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Projects</h2>
      {projects.map((proj) => (
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
  );
}
