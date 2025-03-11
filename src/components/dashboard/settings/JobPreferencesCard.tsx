
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface ProfileState {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  jobPreferences: {
    title: string;
    industry: string;
    jobType: string;
    minSalary: string;
    remote: boolean;
  };
}

interface JobPreferencesCardProps {
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>;
}

export function JobPreferencesCard({ profile, setProfile }: JobPreferencesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Preferences</CardTitle>
        <CardDescription>
          Set your job search preferences to find more relevant opportunities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Desired Job Title</Label>
            <Input 
              id="jobTitle" 
              value={profile.jobPreferences.title}
              onChange={(e) => setProfile({
                ...profile, 
                jobPreferences: {
                  ...profile.jobPreferences,
                  title: e.target.value
                }
              })}
              placeholder="Software Engineer, Product Manager, etc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Preferred Industry</Label>
            <Input 
              id="industry" 
              value={profile.jobPreferences.industry}
              onChange={(e) => setProfile({
                ...profile, 
                jobPreferences: {
                  ...profile.jobPreferences,
                  industry: e.target.value
                }
              })}
              placeholder="Technology, Healthcare, Finance, etc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobType">Job Type</Label>
            <Select 
              value={profile.jobPreferences.jobType}
              onValueChange={(value) => setProfile({
                ...profile, 
                jobPreferences: {
                  ...profile.jobPreferences,
                  jobType: value
                }
              })}
            >
              <SelectTrigger id="jobType">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="minSalary">Minimum Salary</Label>
            <Input 
              id="minSalary" 
              type="text"
              value={profile.jobPreferences.minSalary}
              onChange={(e) => setProfile({
                ...profile, 
                jobPreferences: {
                  ...profile.jobPreferences,
                  minSalary: e.target.value
                }
              })}
              placeholder="$80,000"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Switch 
            id="remote"
            checked={profile.jobPreferences.remote}
            onCheckedChange={(checked) => setProfile({
              ...profile, 
              jobPreferences: {
                ...profile.jobPreferences,
                remote: checked
              }
            })}
          />
          <Label htmlFor="remote">Open to remote work</Label>
        </div>
      </CardContent>
    </Card>
  );
}
