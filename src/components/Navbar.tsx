
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthDialog } from '@/components/AuthDialog';
import { 
  Menu, 
  User, 
  Bell, 
  Briefcase,
  ChevronDown,
  Plus
} from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be from your auth context
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const openAuthDialog = () => {
    setIsAuthDialogOpen(true);
  };
  
  const closeAuthDialog = () => {
    setIsAuthDialogOpen(false);
  };
  
  // Demo logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  return (
    <>
      <header className="border-b sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="font-semibold text-xl">JobSeek</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium">Home</Link>
              <div className="relative group">
                <button className="text-sm font-medium flex items-center gap-1">
                  Jobs <ChevronDown size={14} />
                </button>
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-card p-2 rounded-lg shadow-lg border min-w-44">
                    <Link to="/" className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors">Browse Jobs</Link>
                    <Link to="/" className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors">Job Categories</Link>
                    <Link to="/" className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors">Companies</Link>
                    <Link to="/" className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors">Remote Jobs</Link>
                  </div>
                </div>
              </div>
              <Link to="/" className="text-sm font-medium">Resume Builder</Link>
              <Link to="/" className="text-sm font-medium">Dashboard</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Bell size={20} />
                </Button>
                <div className="relative hidden md:block">
                  <button className="flex items-center gap-2 rounded-full">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <User size={16} />
                    </div>
                  </button>
                </div>
                <Button 
                  variant="ghost" 
                  className="hidden md:flex items-center gap-1"
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  className="h-9 px-4"
                  onClick={openAuthDialog}
                >
                  Sign In
                </Button>
                <Button 
                  className="h-9 px-4"
                  onClick={openAuthDialog}
                >
                  Sign Up
                </Button>
              </div>
            )}
            
            <Button 
              variant="outline" 
              size="icon" 
              className="md:hidden"
              onClick={toggleMenu}
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-4 border-t animated-item">
            <nav className="flex flex-col gap-2">
              <Link to="/" className="px-2 py-2 rounded-md hover:bg-muted transition-colors">Home</Link>
              <Link to="/" className="px-2 py-2 rounded-md hover:bg-muted transition-colors">Browse Jobs</Link>
              <Link to="/" className="px-2 py-2 rounded-md hover:bg-muted transition-colors">Job Categories</Link>
              <Link to="/" className="px-2 py-2 rounded-md hover:bg-muted transition-colors">Resume Builder</Link>
              <Link to="/" className="px-2 py-2 rounded-md hover:bg-muted transition-colors">Dashboard</Link>
            </nav>
            
            {!isLoggedIn && (
              <div className="mt-4 flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={openAuthDialog}
                >
                  Sign In
                </Button>
                <Button 
                  className="flex-1"
                  onClick={openAuthDialog}
                >
                  Sign Up
                </Button>
              </div>
            )}
            
            {isLoggedIn && (
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            )}
          </div>
        )}
      </header>
      
      <AuthDialog isOpen={isAuthDialogOpen} onClose={closeAuthDialog} />
    </>
  );
}
