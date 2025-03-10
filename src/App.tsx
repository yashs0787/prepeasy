
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import { supabase, auth } from "@/lib/supabase";
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import ResumeBuilder from "./pages/ResumeBuilder";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import JobCategories from "./pages/JobCategories";

const queryClient = new QueryClient();

export const AuthContext = createContext<{
  user: any;
  loading: boolean;
  signOut: () => Promise<void>;
}>({
  user: null,
  loading: true,
  signOut: async () => {}
});

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await auth.getCurrentUser();
        setUser(data.user);
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setUser(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
  };

  const redirectToSignIn = () => <Navigate to="/signin" replace />;

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected routes - redirect to sign in if not authenticated */}
              <Route 
                path="/jobs/*" 
                element={user ? <Jobs /> : redirectToSignIn()} 
              />
              <Route 
                path="/jobs/categories/:category" 
                element={user ? <JobCategories /> : redirectToSignIn()} 
              />
              <Route 
                path="/resume-builder" 
                element={user ? <ResumeBuilder /> : redirectToSignIn()} 
              />
              <Route 
                path="/dashboard" 
                element={user ? <Dashboard /> : redirectToSignIn()} 
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
};

export default App;
