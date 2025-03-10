
import React from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PlusIcon, Trash2Icon, GraduationCapIcon } from 'lucide-react';

interface EducationItem {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationSectionProps {
  education: EducationItem[];
  onArrayInputChange: (index: number, field: string, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}

export function EducationSection({ 
  education, 
  onArrayInputChange, 
  onAddItem, 
  onRemoveItem 
}: EducationSectionProps) {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <GraduationCapIcon className="h-5 w-5 mr-2" />
            <span>Education</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onAddItem}
          >
            <PlusIcon className="h-3.5 w-3.5 mr-1" /> Add Education
          </Button>
        </CardTitle>
        <CardDescription>List your educational background, starting with the most recent</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {education.map((edu, index) => (
          <div key={edu.id} className="space-y-4 pt-4 first:pt-0 border-t first:border-t-0">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Education {index + 1}</h4>
              {index > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onRemoveItem(index)}
                  className="h-8 text-destructive hover:text-destructive"
                >
                  <Trash2Icon className="h-3.5 w-3.5 mr-1" /> Remove
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`edu-degree-${index}`}>Degree / Certificate</Label>
                <Input 
                  id={`edu-degree-${index}`} 
                  value={edu.degree} 
                  onChange={(e) => onArrayInputChange(index, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`edu-school-${index}`}>School / University</Label>
                <Input 
                  id={`edu-school-${index}`} 
                  value={edu.school} 
                  onChange={(e) => onArrayInputChange(index, 'school', e.target.value)}
                  placeholder="University of California, Berkeley"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`edu-location-${index}`}>Location</Label>
                <Input 
                  id={`edu-location-${index}`} 
                  value={edu.location} 
                  onChange={(e) => onArrayInputChange(index, 'location', e.target.value)}
                  placeholder="Berkeley, CA"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`edu-start-${index}`}>Start Date</Label>
                  <Input 
                    id={`edu-start-${index}`} 
                    value={edu.startDate} 
                    onChange={(e) => onArrayInputChange(index, 'startDate', e.target.value)}
                    placeholder="Sep 2018"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edu-end-${index}`}>End Date</Label>
                  <Input 
                    id={`edu-end-${index}`} 
                    value={edu.endDate} 
                    onChange={(e) => onArrayInputChange(index, 'endDate', e.target.value)}
                    placeholder="May 2022"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`edu-desc-${index}`}>Description (Optional)</Label>
              <Textarea 
                id={`edu-desc-${index}`} 
                value={edu.description} 
                onChange={(e) => onArrayInputChange(index, 'description', e.target.value)}
                placeholder="Relevant coursework, achievements, or activities"
                rows={3}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </>
  );
}
