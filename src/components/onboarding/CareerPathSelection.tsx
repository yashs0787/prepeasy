
import React from 'react';
import { 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { 
  BriefcaseIcon, 
  BarChart3, 
  Building2, 
  Code, 
  PenTool, 
  ShieldCheck,
  FileCog,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CareerPathSelectionProps {
  profile: any;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
  onNext: () => void;
  onBack: () => void;
}

const CareerPathSelection: React.FC<CareerPathSelectionProps> = ({ 
  profile, 
  setProfile, 
  onNext, 
  onBack 
}) => {
  const handleCareerPathChange = (value: string) => {
    setProfile(prev => ({ ...prev, careerPath: value }));
  };

  const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({ ...prev, yearsOfExperience: e.target.value }));
  };

  const primaryPaths = [
    { 
      value: 'consulting', 
      label: 'Management Consulting', 
      icon: BarChart3,
      description: 'Case interviews, frameworks, problem-solving',
      highlight: true
    },
    { 
      value: 'investment_banking', 
      label: 'Investment Banking', 
      icon: Building2,
      description: 'Financial modeling, valuations, deal analysis',
      highlight: true
    },
    { 
      value: 'tech', 
      label: 'Technology', 
      icon: Code,
      description: 'Technical interviews, system design, coding',
      highlight: true
    },
  ];

  const secondaryPaths = [
    { value: 'finance', label: 'Finance & Accounting', icon: FileCog },
    { value: 'marketing', label: 'Marketing & Creative', icon: PenTool },
    { value: 'legal', label: 'Legal', icon: ShieldCheck },
    { value: 'education', label: 'Education & Research', icon: GraduationCap },
    { value: 'general', label: 'General Professional', icon: Briefcase },
  ];

  const canProceed = () => {
    return profile.careerPath !== '';
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Career Path</CardTitle>
        <CardDescription>
          Select your preferred career path to personalize your interview preparation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Featured Career Tracks</h3>
            <RadioGroup
              value={profile.careerPath}
              onValueChange={handleCareerPathChange}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {primaryPaths.map((path) => {
                const Icon = path.icon;
                return (
                  <div key={path.value} className="relative">
                    <RadioGroupItem
                      value={path.value}
                      id={`path-${path.value}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`path-${path.value}`}
                      className="flex flex-col h-full gap-2 border rounded-md p-4 cursor-pointer hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                    >
                      <div className="flex items-center justify-between">
                        <Icon className="h-5 w-5 text-primary" />
                        {path.highlight && (
                          <Badge variant="secondary" className="text-xs">Specialized</Badge>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{path.label}</div>
                        {path.description && (
                          <p className="text-xs text-muted-foreground mt-1">{path.description}</p>
                        )}
                      </div>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Other Career Paths</h3>
            <RadioGroup
              value={profile.careerPath}
              onValueChange={handleCareerPathChange}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {secondaryPaths.map((path) => {
                const Icon = path.icon;
                return (
                  <div key={path.value} className="relative">
                    <RadioGroupItem
                      value={path.value}
                      id={`path-${path.value}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`path-${path.value}`}
                      className="flex items-center space-x-3 border rounded-md p-4 cursor-pointer hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                    >
                      <Icon className="h-5 w-5 text-muted-foreground peer-data-[state=checked]:text-primary" />
                      <div>
                        <div className="font-medium">{path.label}</div>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="yearsOfExperience">Years of Experience</Label>
          <Input
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={profile.yearsOfExperience}
            onChange={handleYearsChange}
            placeholder="e.g. 2"
            className="max-w-xs"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!canProceed()}>
          Continue
        </Button>
      </CardFooter>
    </>
  );
};

export default CareerPathSelection;
