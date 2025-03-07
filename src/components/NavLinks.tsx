
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  HomeIcon, 
  UserIcon, 
  SearchIcon, 
  BriefcaseIcon,
  BookmarkIcon, 
  BellIcon, 
  MenuIcon,
  XIcon
} from 'lucide-react';

export function NavLinks() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const links = [
    { icon: HomeIcon, label: 'Home', path: '/' },
    { icon: SearchIcon, label: 'Jobs', path: '/jobs' },
    { icon: BriefcaseIcon, label: 'Dashboard', path: '/dashboard' },
    { icon: BellIcon, label: 'Notifications', path: '/notifications' },
  ];
  
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1">
        {links.map((link) => (
          <Button
            key={link.path}
            variant="ghost"
            size="sm"
            className={cn(
              "gap-2",
              isActive(link.path) && "bg-accent text-accent-foreground"
            )}
            asChild
          >
            <Link to={link.path}>
              <link.icon size={16} />
              <span>{link.label}</span>
            </Link>
          </Button>
        ))}
      </div>
      
      {/* Authentication Links */}
      <div className="hidden md:flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link to="/signin">Sign In</Link>
        </Button>
        <Button size="sm" asChild>
          <Link to="/signin?tab=signup">Sign Up</Link>
        </Button>
      </div>
      
      {/* Mobile Menu Button */}
      <Button 
        variant="ghost" 
        size="icon"
        className="md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <XIcon className="h-5 w-5" />
        ) : (
          <MenuIcon className="h-5 w-5" />
        )}
      </Button>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-background p-4 flex flex-col space-y-4 animated-item">
          {links.map((link) => (
            <Button
              key={link.path}
              variant={isActive(link.path) ? "default" : "ghost"}
              className="w-full justify-start gap-2"
              asChild
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link to={link.path}>
                <link.icon size={18} />
                <span>{link.label}</span>
              </Link>
            </Button>
          ))}
          <div className="pt-4 mt-4 border-t grid grid-cols-2 gap-2">
            <Button variant="outline" asChild onClick={() => setIsMobileMenuOpen(false)}>
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button asChild onClick={() => setIsMobileMenuOpen(false)}>
              <Link to="/signin?tab=signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
