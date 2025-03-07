
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavLinks } from "@/components/NavLinks";
import { Briefcase } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">JobSeek</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/jobs" className="font-medium transition-colors hover:text-primary">
              Jobs
            </Link>
            <Link to="/resume-builder" className="font-medium transition-colors hover:text-primary">
              Resume Builder
            </Link>
            <Link to="/dashboard" className="font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/signin">
            <Button variant="ghost" className="hidden md:inline-flex">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="hidden md:inline-flex">
              Sign Up
            </Button>
          </Link>
          
          {/* Mobile menu (hidden for desktop) */}
          <div className="md:hidden">
            <NavLinks />
          </div>
        </div>
      </div>
    </header>
  );
}
