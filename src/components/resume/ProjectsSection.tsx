
import React from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PlusIcon, Trash2Icon, FolderIcon } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  link: string;
  description: string;
}

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onArrayInputChange: (index: number, field: string, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}

export function ProjectsSection({ 
  projects, 
  onArrayInputChange, 
  onAddItem, 
  onRemoveItem 
}: ProjectsSectionProps) {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <FolderIcon className="h-5 w-5 mr-2" />
            <span>Projects</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onAddItem}
          >
            <PlusIcon className="h-3.5 w-3.5 mr-1" /> Add Project
          </Button>
        </CardTitle>
        <CardDescription>Showcase your relevant projects and portfolio work</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {projects.map((project, index) => (
          <div key={project.id} className="space-y-4 pt-4 first:pt-0 border-t first:border-t-0">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Project {index + 1}</h4>
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
                <Label htmlFor={`project-title-${index}`}>Project Title</Label>
                <Input 
                  id={`project-title-${index}`} 
                  value={project.title} 
                  onChange={(e) => onArrayInputChange(index, 'title', e.target.value)}
                  placeholder="E-commerce Website"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`project-link-${index}`}>Project Link (Optional)</Label>
                <Input 
                  id={`project-link-${index}`} 
                  value={project.link} 
                  onChange={(e) => onArrayInputChange(index, 'link', e.target.value)}
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`project-desc-${index}`}>Project Description</Label>
              <Textarea 
                id={`project-desc-${index}`} 
                value={project.description} 
                onChange={(e) => onArrayInputChange(index, 'description', e.target.value)}
                placeholder="Describe the project, your role, technologies used, and key achievements"
                rows={3}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </>
  );
}
