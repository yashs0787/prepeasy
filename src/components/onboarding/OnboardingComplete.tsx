
import React from 'react';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

interface OnboardingCompleteProps {
  profile: any;
  onComplete: () => void;
  onBack: () => void;
  loading: boolean;
}

const OnboardingComplete: React.FC<OnboardingCompleteProps> = ({ 
  profile, 
  onComplete, 
  onBack, 
  loading 
}) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Almost Done!</CardTitle>
        <CardDescription>
          Review your information before completing your profile setup
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
            <h3 className="text-2xl font-medium">Ready to complete your profile</h3>
            <p className="text-muted-foreground mt-2 max-w-md">
              We've collected all the necessary information to set up your profile and find relevant opportunities that match your skills and career goals.
            </p>
          </div>
          
          <div className="border rounded-md p-4 space-y-4">
            <div>
              <h4 className="font-medium">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <div>
                  <span className="text-sm text-muted-foreground">Name</span>
                  <p>{profile.fullName}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Email</span>
                  <p>{profile.email}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Phone</span>
                  <p>{profile.phone || 'Not provided'}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Location</span>
                  <p>{profile.location || 'Not provided'}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium">Career Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <div>
                  <span className="text-sm text-muted-foreground">Career Path</span>
                  <p>{profile.careerPath?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Not selected'}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Years of Experience</span>
                  <p>{profile.yearsOfExperience || 'Not provided'}</p>
                </div>
              </div>
            </div>
            
            {profile.education && profile.education.length > 0 && profile.education[0].school && (
              <div>
                <h4 className="font-medium">Education</h4>
                <div className="space-y-2 mt-2">
                  {profile.education.map((edu: any, index: number) => (
                    edu.school && (
                      <div key={edu.id || index} className="border-l-2 border-muted pl-3">
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-sm">{edu.school}</p>
                        <p className="text-xs text-muted-foreground">
                          {edu.startDate} - {edu.endDate || 'Present'}
                        </p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
            
            {profile.experience && profile.experience.length > 0 && profile.experience[0].company && (
              <div>
                <h4 className="font-medium">Experience</h4>
                <div className="space-y-2 mt-2">
                  {profile.experience.map((exp: any, index: number) => (
                    exp.company && (
                      <div key={exp.id || index} className="border-l-2 border-muted pl-3">
                        <p className="font-medium">{exp.title}</p>
                        <p className="text-sm">{exp.company}</p>
                        <p className="text-xs text-muted-foreground">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
            
            {profile.skills && profile.skills.length > 0 && profile.skills[0].name && (
              <div>
                <h4 className="font-medium">Skills</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.skills.map((skill: any, index: number) => (
                    skill.name && (
                      <div key={skill.id || index} className="bg-muted px-3 py-1 rounded-full text-sm">
                        {skill.name}
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-6">
        <Button variant="outline" onClick={onBack} disabled={loading}>
          Back
        </Button>
        <Button onClick={onComplete} disabled={loading}>
          {loading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
              Saving...
            </>
          ) : (
            'Complete Profile'
          )}
        </Button>
      </CardFooter>
    </>
  );
};

export default OnboardingComplete;
