
import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase URL and public anon key when connected
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication functions
export const auth = {
  signUp: async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password });
  },
  
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  
  signOut: async () => {
    return await supabase.auth.signOut();
  },
  
  resetPassword: async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email);
  },
  
  getCurrentUser: async () => {
    return await supabase.auth.getUser();
  }
};

// Database functions
export const getJobs = async () => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const saveJob = async (userId: string, jobId: string) => {
  const { data, error } = await supabase
    .from('saved_jobs')
    .insert([{ user_id: userId, job_id: jobId }]);
  
  if (error) throw error;
  return data;
};

export const updateApplicationStatus = async (userId: string, jobId: string, status: string) => {
  const { data, error } = await supabase
    .from('applications')
    .upsert([{ 
      user_id: userId, 
      job_id: jobId, 
      status: status 
    }]);
  
  if (error) throw error;
  return data;
};

// Profile functions
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateProfile = async (userId: string, profileData: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId);
  
  if (error) throw error;
  return data;
};
