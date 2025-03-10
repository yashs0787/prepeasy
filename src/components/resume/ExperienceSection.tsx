
import React from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PlusIcon, Trash2Icon } from 'lucide-react';

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

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
  onArrayInputChange: (index: number, field: string, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}

export function ExperienceSection({ 
  experiences, 
  onArrayInputChange, 
  onAddItem, 
  onRemoveItem 
}: ExperienceSectionProps) {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Work Experience</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onAddItem}
          >
            <PlusIcon className="h-3.5 w-3.5 mr-1" /> Add Position
          </Button>
        </CardTitle>
        <CardDescription>List your professional experience, starting with the most recent</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="space-y-4 pt-4 first:pt-0 border-t first:border-t-0">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Position {index + 1}</h4>
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
                <Label htmlFor={`exp-title-${index}`}>Job Title</Label>
                <Input 
                  id={`exp-title-${index}`} 
                  value={exp.title} 
                  onChange={(e) => onArrayInputChange(index, 'title', e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`exp-company-${index}`}>Company</Label>
                <Input 
                  id={`exp-company-${index}`} 
                  value={exp.company} 
                  onChange={(e) => onArrayInputChange(index, 'company', e.target.value)}
                  placeholder="Acme Inc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`exp-location-${index}`}>Location</Label>
                <Input 
                  id={`exp-location-${index}`} 
                  value={exp.location} 
                  onChange={(e) => onArrayInputChange(index, 'location', e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`exp-start-${index}`}>Start Date</Label>
                  <Input 
                    id={`exp-start-${index}`} 
                    value={exp.startDate} 
                    onChange={(e) => onArrayInputChange(index, 'startDate', e.target.value)}
                    placeholder="Jan 2020"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`exp-end-${index}`}>End Date</Label>
                  <Input 
                    id={`exp-end-${index}`} 
                    value={exp.endDate} 
                    onChange={(e) => onArrayInputChange(index, 'endDate', e.target.value)}
                    placeholder="Present"
                    disabled={exp.current}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`exp-desc-${index}`}>Job Description & Achievements</Label>
              <Textarea 
                id={`exp-desc-${index}`} 
                value={exp.description} 
                onChange={(e) => onArrayInputChange(index, 'description', e.target.value)}
                placeholder="Describe your responsibilities and key achievements in this role"
                rows={3}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </>
  );
}
