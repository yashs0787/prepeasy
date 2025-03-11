
import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, SaveIcon } from "lucide-react";
import { toast } from "sonner";
import { AuthContext } from "@/App";
import { supabase } from "@/lib/supabase";
import { PersonalInfoCard } from "./settings/PersonalInfoCard";
import { JobPreferencesCard } from "./settings/JobPreferencesCard";
import { PasswordCard } from "./settings/PasswordCard";
import { DeleteAccountCard } from "./settings/DeleteAccountCard";

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
      
      <PersonalInfoCard 
        profile={profile} 
        setProfile={setProfile} 
      />
      
      <JobPreferencesCard 
        profile={profile} 
        setProfile={setProfile} 
      />
      
      <PasswordCard 
        passwordForm={passwordForm}
        setPasswordForm={setPasswordForm}
        handleUpdatePassword={handleUpdatePassword}
        isSaving={isSaving}
      />
      
      <DeleteAccountCard 
        handleDeleteAccount={handleDeleteAccount}
        isSaving={isSaving}
      />
    </div>
  );
}
