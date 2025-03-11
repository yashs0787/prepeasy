
import React from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusIcon, Trash2Icon, CodeIcon } from 'lucide-react';

interface SkillItem {
  id: string;
  name: string;
}

interface SkillsSectionProps {
  skills: SkillItem[];
  onArrayInputChange: (index: number, field: string, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}

export function SkillsSection({ 
  skills, 
  onArrayInputChange, 
  onAddItem, 
  onRemoveItem 
}: SkillsSectionProps) {
  // Filter out empty skills for display purposes only
  const displaySkills = skills.filter(skill => skill.name.trim() !== '');
  
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <CodeIcon className="h-5 w-5 mr-2" />
            <span>Skills</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onAddItem}
          >
            <PlusIcon className="h-3.5 w-3.5 mr-1" /> Add Skill
          </Button>
        </CardTitle>
        <CardDescription>List your professional skills and competencies</CardDescription>
      </CardHeader>
      <CardContent>
        {displaySkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {displaySkills.map((skill) => {
              // Find the index in the original array
              const originalIndex = skills.findIndex(s => s.id === skill.id);
              return (
                <Badge 
                  key={skill.id} 
                  variant="secondary" 
                  className="px-3 py-1 text-sm flex items-center gap-1"
                >
                  {skill.name}
                  <button 
                    onClick={() => onRemoveItem(originalIndex)} 
                    className="text-gray-500 hover:text-gray-700 ml-1"
                    aria-label="Remove skill"
                  >
                    ×
                  </button>
                </Badge>
              );
            })}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <div key={skill.id} className="space-y-2">
              <Label htmlFor={`skill-${index}`}>
                {index < 3 ? `Skill ${index + 1}` : `Additional Skill`}
              </Label>
              <div className="flex items-center space-x-2">
                <Input 
                  id={`skill-${index}`} 
                  value={skill.name} 
                  onChange={(e) => onArrayInputChange(index, 'name', e.target.value)}
                  placeholder="Enter a skill (e.g., JavaScript)"
                  className="flex-1"
                />
                {index > 2 && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onRemoveItem(index)}
                    className="h-9 px-2 text-destructive hover:text-destructive"
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  );
}
