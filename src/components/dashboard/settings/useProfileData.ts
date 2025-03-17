
import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface ProfileState {
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

export interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function useProfileData(user: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [profile, setProfile] = useState<ProfileState>({
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
  
  const fetchProfileData = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Pre-fill email from auth
      setProfile(prev => ({
        ...prev,
        email: user.email || ''
      }));
      
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
  }, [user]);

  return {
    profile,
    setProfile,
    passwordForm,
    setPasswordForm,
    isLoading,
    fetchProfileData
  };
}
