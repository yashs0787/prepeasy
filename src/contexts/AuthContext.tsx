
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize auth methods to prevent unnecessary re-renders
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error("Sign in exception:", error);
      toast.error(error.message || "Failed to sign in");
      throw error;
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error("Sign up exception:", error);
      toast.error(error.message || "Failed to create account");
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error("Sign out exception:", error);
      toast.error(error.message || "Failed to sign out");
      throw error;
    }
  }, []);

  // Optimize auth state initialization
  useEffect(() => {
    // Prepare flag to track component mounted state
    let isMounted = true;
    
    const initializeAuth = async () => {
      try {
        // First set up the auth state listener to catch any changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, newSession) => {
            if (!isMounted) return;
            
            console.log("Auth state changed:", event);
            
            if (newSession) {
              setSession(newSession);
              setUser(newSession.user);
              
              if (event === 'SIGNED_IN') {
                toast.success('Signed in successfully!');
              }
            } else {
              setSession(null);
              setUser(null);
              
              if (event === 'SIGNED_OUT') {
                toast.success('Signed out successfully!');
              }
            }
            
            setIsLoading(false);
          }
        );

        // Then check for existing session
        const { data, error } = await supabase.auth.getSession();
        
        if (isMounted) {
          if (error) {
            console.error("Error getting session:", error);
          } else if (data?.session) {
            setSession(data.session);
            setUser(data.session.user);
          }
          
          setIsLoading(false);
        }

        return () => {
          isMounted = false;
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
