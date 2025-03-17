
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
  GraduationCap
} from 'lucide-react';

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

  const careerPaths = [
    { value: 'investment_banking', label: 'Investment Banking', icon: Building2 },
    { value: 'consulting', label: 'Management Consulting', icon: BarChart3 },
    { value: 'tech', label: 'Technology', icon: Code },
    { value: 'finance', label: 'Finance & Accounting', icon: FileCog },
    { value: 'marketing', label: 'Marketing & Creative', icon: PenTool },
    { value: 'legal', label: 'Legal', icon: ShieldCheck },
    { value: 'education', label: 'Education & Research', icon: GraduationCap },
    { value: 'general', label: 'General Professional', icon: BriefcaseIcon },
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
          <RadioGroup
            value={profile.careerPath}
            onValueChange={handleCareerPathChange}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {careerPaths.map((path) => {
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
