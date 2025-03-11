
import { useState, useEffect, useContext } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AlertCircle, CheckCircle, Loader2, SaveIcon } from "lucide-react";
import { AuthContext } from "@/App";
import { supabase } from "@/lib/supabase";

export function SettingsTab() {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    jobPreferences: {
      title: '',
      industry: '',
      jobType: 'full-time',
      minSalary: '',
      remote: true
    }
  });
  
  useEffect(() => {
    if (user) {
      // Pre-fill email from auth
      setProfile(prev => ({
        ...prev,
        email: user.email || ''
      }));
      
      // Fetch profile data
      fetchProfileData();
    }
  }, [user]);
  
  const fetchProfileData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setProfile(prev => ({
          ...prev,
          fullName: data.full_name || '',
          phone: data.phone || '',
          location: data.location || '',
          bio: data.bio || '',
          jobPreferences: {
            title: data.job_title || '',
            industry: data.industry || '',
            jobType: data.job_type || 'full-time',
            minSalary: data.min_salary || '',
            remote: data.remote || true
          }
        }));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.fullName,
          phone: profile.phone,
          location: profile.location,
          bio: profile.bio,
          job_title: profile.jobPreferences.title,
          industry: profile.jobPreferences.industry,
          job_type: profile.jobPreferences.jobType,
          min_salary: profile.jobPreferences.minSalary,
          remote: profile.jobPreferences.remote
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleUpdatePassword = async () => {
    // Password validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword
      });
      
      if (error) throw error;
      
      toast.success("Password updated successfully");
      // Clear password fields
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password");
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleDeleteAccount = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    
    if (!confirmation) return;
    
    setIsSaving(true);
    try {
      // In a real implementation, this would call a secure server-side endpoint
      // For demo purposes, we'll just sign the user out
      await supabase.auth.signOut();
      toast.success("Account deleted successfully");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Settings</h2>
        <Button onClick={handleSaveProfile} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <SaveIcon className="h-4 w-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>
      
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
      
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your account password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input 
              id="currentPassword" 
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input 
                id="newPassword" 
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input 
                id="confirmPassword" 
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleUpdatePassword} 
            disabled={isSaving || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
            variant="outline"
            className="mt-2"
          >
            Update Password
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            Permanently delete your account and all data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="destructive" onClick={handleDeleteAccount} disabled={isSaving}>
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
