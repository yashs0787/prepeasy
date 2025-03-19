import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Track scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (section: string) => {
    if (section === 'get-started') {
      if (user) {
        navigate('/dashboard');
      } else {
        navigate('/sign-in?tab=signup');
      }
      return;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-dark-mesh opacity-40"></div>
        <div className="absolute top-0 left-1/4 w-1/3 h-80 bg-neon-purple/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-1/3 h-80 bg-neon-blue/20 rounded-full blur-3xl"></div>
      </div>
      
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* All content sections are now hidden */}
      </main>
    </div>
  );
}
