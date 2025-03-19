
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavLinks } from "@/components/NavLinks";
import { Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const { user } = useAuth();

  // Show all navigation items regardless of auth status
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/jobs", label: "Jobs" },
    { path: "/resume-builder", label: "Resume Builder" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-neon-purple" />
            <span className="font-bold text-xl gradient-text">ApplyGo</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <Link 
                key={item.path}
                to={item.path} 
                className="font-medium transition-colors hover:text-neon-purple"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" className="hidden md:inline-flex hover:text-neon-purple hover:bg-neon-purple/10">
                  Dashboard
                </Button>
              </Link>
              {user && (
                <Link to="/jarvis">
                  <Button variant="outline" className="hidden md:inline-flex hover:text-neon-purple hover:bg-neon-purple/10">
                    Friday AI
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <>
              <Link to="/sign-in">
                <Button variant="ghost" className="hidden md:inline-flex hover:text-neon-purple hover:bg-neon-purple/10">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button className="hidden md:inline-flex neon-button">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          
          <div className="md:hidden">
            <NavLinks />
          </div>
        </div>
      </div>
    </header>
  );
}
