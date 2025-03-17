
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles } from "lucide-react";

const linkClasses =
  "text-sm font-medium transition-colors hover:text-foreground/80";

export function NavLinks() {
  const { user } = useAuth();
  
  return (
    <div className="flex gap-6">
      <NavLink to="/jobs" className={linkClasses}>
        Find Jobs
      </NavLink>
      <NavLink to="/resume-builder" className={linkClasses}>
        Resume Builder
      </NavLink>
      {user && (
        <>
          <NavLink to="/dashboard" className={linkClasses}>
            Dashboard
          </NavLink>
          <NavLink to="/jarvis" className={linkClasses}>
            <div className="flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-amber-400" />
              Jarvis AI
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs px-1.5 py-0.5 rounded-full font-medium ml-1">AI</span>
            </div>
          </NavLink>
        </>
      )}
    </div>
  );
}
