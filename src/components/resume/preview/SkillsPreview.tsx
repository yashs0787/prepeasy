
import React from 'react';

interface SkillItem {
  id: string;
  name: string;
}

interface SkillsPreviewProps {
  skills: SkillItem[];
}

export function SkillsPreview({ skills }: SkillsPreviewProps) {
  const hasContent = skills.some(skill => skill.name);
  
  if (!hasContent) return null;
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skills
          .filter(skill => skill.name)
          .map((skill) => (
            <span key={skill.id} className="bg-gray-100 px-2 py-1 rounded text-sm">
              {skill.name}
            </span>
          ))}
      </div>
    </div>
  );
}
