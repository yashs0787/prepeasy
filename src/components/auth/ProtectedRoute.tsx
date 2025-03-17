
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "@/lib/supabase";
import { LoaderCircle } from "lucide-react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const { data } = await auth.getCurrentUser();
        setIsAuthenticated(!!data.user);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  if (isLoading) {
    // Loading state
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <LoaderCircle className="h-10 w-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
