
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Jobs from '@/pages/Jobs';
import JobCategories from '@/pages/JobCategories';
import ResumeBuilderPage from '@/pages/ResumeBuilder';
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/NotFound';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { SubscriptionModal } from './components/subscription/SubscriptionModal';
import { supabase, auth } from './lib/supabase';

// Define the AuthContext type
interface AuthContextType {
  user: any;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, fullName: string) => Promise<any>;
  signOut: () => Promise<void>;
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const { data, error } = await auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user);
      }
      setIsLoading(false);
    };
    
    checkSession();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await auth.signIn(email, password);
      if (error) {
        throw error;
      }
      setUser(data.user);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Sign-in error:', error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await auth.signUp(email, password, fullName);
      if (error) {
        throw error;
      }
      setUser(data.user);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Sign-up error:', error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await auth.signOut();
      setUser(null);
      navigate('/');
    } catch (error: any) {
      console.error('Sign-out error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const value = { user, isLoading, signIn, signUp, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// ProtectedRoute component
const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <div className="min-h-screen">
          <Toaster />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/categories/:category" element={<JobCategories />} />
            <Route path="/resume-builder" element={<ResumeBuilderPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <SubscriptionModal />
        </div>
      </SubscriptionProvider>
    </AuthProvider>
  );
}

export default App;
