
import React from 'react';
import { 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2Icon } from 'lucide-react';

interface ProfileFormProps {
  profile: any;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
  onNext: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, setProfile, onNext }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (section: 'education' | 'experience' | 'skills', index: number, field: string, value: any) => {
    setProfile(prev => {
      const sectionArray = [...prev[section]];
      sectionArray[index] = {
        ...sectionArray[index],
        [field]: value
      };
      return {
        ...prev,
        [section]: sectionArray
      };
    });
  };

  const addArrayItem = (section: 'education' | 'experience' | 'skills') => {
    setProfile(prev => {
      const sectionArray = [...prev[section]];
      const newItem = { ...sectionArray[0] };
      
      // Clear all fields except id
      Object.keys(newItem).forEach(key => {
        if (key !== 'id') {
          newItem[key] = key === 'current' ? false : '';
        }
      });
      
      // Generate a unique id
      newItem.id = Date.now().toString();
      
      return {
        ...prev,
        [section]: [...sectionArray, newItem]
      };
    });
  };

  const removeArrayItem = (section: 'education' | 'experience' | 'skills', index: number) => {
    setProfile(prev => {
      const sectionArray = [...prev[section]];
      if (sectionArray.length === 1) {
        return prev;
      }
      
      sectionArray.splice(index, 1);
      return {
        ...prev,
        [section]: sectionArray
      };
    });
  };

  const canProceed = () => {
    return (
      profile.fullName.trim() !== '' &&
      profile.email.trim() !== ''
    );
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Tell us about yourself to help build your profile and resume
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Basic Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={profile.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleInputChange}
                placeholder="johndoe@example.com"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={profile.location}
                onChange={handleInputChange}
                placeholder="New York, NY"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Professional Summary</Label>
            <Textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              placeholder="Brief overview of your professional background and key strengths"
              rows={4}
            />
          </div>
        </div>

        <div className="border-t pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Education</h3>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => addArrayItem('education')}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Education
            </Button>
          </div>
          
          {profile.education.map((edu: any, index: number) => (
            <div key={edu.id} className="space-y-4 border rounded-md p-4">
              <div className="flex justify-between">
                <h4 className="font-medium">Education #{index + 1}</h4>
                {profile.education.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 text-destructive hover:text-destructive"
                    onClick={() => removeArrayItem('education', index)}
                  >
                    <Trash2Icon className="h-4 w-4 mr-1" /> Remove
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`edu-degree-${index}`}>Degree</Label>
                  <Input
                    id={`edu-degree-${index}`}
                    value={edu.degree}
                    onChange={(e) => handleArrayInputChange('education', index, 'degree', e.target.value)}
                    placeholder="Bachelor of Science, Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edu-school-${index}`}>School</Label>
                  <Input
                    id={`edu-school-${index}`}
                    value={edu.school}
                    onChange={(e) => handleArrayInputChange('education', index, 'school', e.target.value)}
                    placeholder="University of Example"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edu-location-${index}`}>Location</Label>
                  <Input
                    id={`edu-location-${index}`}
                    value={edu.location}
                    onChange={(e) => handleArrayInputChange('education', index, 'location', e.target.value)}
                    placeholder="City, State"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor={`edu-start-${index}`}>Start Date</Label>
                    <Input
                      id={`edu-start-${index}`}
                      value={edu.startDate}
                      onChange={(e) => handleArrayInputChange('education', index, 'startDate', e.target.value)}
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edu-end-${index}`}>End Date</Label>
                    <Input
                      id={`edu-end-${index}`}
                      value={edu.endDate}
                      onChange={(e) => handleArrayInputChange('education', index, 'endDate', e.target.value)}
                      placeholder="MM/YYYY or Present"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Work Experience</h3>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => addArrayItem('experience')}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Experience
            </Button>
          </div>
          
          {profile.experience.map((exp: any, index: number) => (
            <div key={exp.id} className="space-y-4 border rounded-md p-4">
              <div className="flex justify-between">
                <h4 className="font-medium">Experience #{index + 1}</h4>
                {profile.experience.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 text-destructive hover:text-destructive"
                    onClick={() => removeArrayItem('experience', index)}
                  >
                    <Trash2Icon className="h-4 w-4 mr-1" /> Remove
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`exp-title-${index}`}>Job Title</Label>
                  <Input
                    id={`exp-title-${index}`}
                    value={exp.title}
                    onChange={(e) => handleArrayInputChange('experience', index, 'title', e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`exp-company-${index}`}>Company</Label>
                  <Input
                    id={`exp-company-${index}`}
                    value={exp.company}
                    onChange={(e) => handleArrayInputChange('experience', index, 'company', e.target.value)}
                    placeholder="Acme Inc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`exp-location-${index}`}>Location</Label>
                  <Input
                    id={`exp-location-${index}`}
                    value={exp.location}
                    onChange={(e) => handleArrayInputChange('experience', index, 'location', e.target.value)}
                    placeholder="City, State"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor={`exp-start-${index}`}>Start Date</Label>
                    <Input
                      id={`exp-start-${index}`}
                      value={exp.startDate}
                      onChange={(e) => handleArrayInputChange('experience', index, 'startDate', e.target.value)}
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`exp-end-${index}`}>End Date</Label>
                    <Input
                      id={`exp-end-${index}`}
                      value={exp.endDate}
                      onChange={(e) => handleArrayInputChange('experience', index, 'endDate', e.target.value)}
                      placeholder="MM/YYYY or Present"
                      disabled={exp.current}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`exp-description-${index}`}>Description</Label>
                <Textarea
                  id={`exp-description-${index}`}
                  value={exp.description}
                  onChange={(e) => handleArrayInputChange('experience', index, 'description', e.target.value)}
                  placeholder="Describe your responsibilities and achievements"
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-6">
        <div></div> {/* Empty div for spacing */}
        <Button 
          onClick={onNext} 
          disabled={!canProceed()}
        >
          Continue
        </Button>
      </CardFooter>
    </>
  );
};

export default ProfileForm;
