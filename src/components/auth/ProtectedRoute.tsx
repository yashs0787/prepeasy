
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LoaderCircle } from "lucide-react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Loading state
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <LoaderCircle className="h-10 w-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    // Redirect to login if no user is found
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
}
