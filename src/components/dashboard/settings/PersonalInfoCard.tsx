
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

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

interface PersonalInfoCardProps {
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>;
}

export function PersonalInfoCard({ profile, setProfile }: PersonalInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your personal details and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input 
              id="fullName" 
              value={profile.fullName}
              onChange={(e) => setProfile({...profile, fullName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              value={profile.email}
              readOnly
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">Email cannot be changed</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              value={profile.phone}
              onChange={(e) => setProfile({...profile, phone: e.target.value})}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              value={profile.location}
              onChange={(e) => setProfile({...profile, location: e.target.value})}
              placeholder="City, State, Country"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">Professional Bio</Label>
          <Textarea 
            id="bio" 
            value={profile.bio}
            onChange={(e) => setProfile({...profile, bio: e.target.value})}
            placeholder="Write a short bio describing your professional background..."
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
}
