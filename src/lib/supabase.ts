
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hoynmqejkchppvllpuim.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhveW5tcWVqa2NocHB2bGxwdWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNTM1OTEsImV4cCI6MjA1NjcyOTU5MX0.YN3B-jv31yfRh46WTwnM5ssHWnVgrl2ah1krAV-JA5k';

// Optimize client configuration for faster auth responses
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false, // Disable auto URL detection for faster auth
    flowType: 'implicit', // Use implicit flow for faster token processing
  }
});

// Simplified wrapper for authentication functions
export const auth = {
  signUp: async (email: string, password: string, fullName: string) => {
    return await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });
  },
  
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  
  signOut: async () => {
    return await supabase.auth.signOut();
  },
  
  getCurrentUser: async () => {
    return await supabase.auth.getUser();
  },
  
  getSession: async () => {
    return await supabase.auth.getSession();
  }
};
