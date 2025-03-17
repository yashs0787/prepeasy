
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FloatingCTAProps {
  scrollY: number;
  scrollToSection: (section: string) => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ scrollY, scrollToSection }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  
  useEffect(() => {
    if (scrollY > 800 && !isDismissed) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [scrollY, isDismissed]);
  
  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <div className="bg-black/80 backdrop-blur-lg rounded-lg p-4 border border-white/10 shadow-lg">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold gradient-text text-lg">Ready to transform your job search?</h3>
          <Button variant="ghost" size="icon" onClick={handleDismiss} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Join thousands of job seekers who are landing their dream jobs faster with ApplyGo.
        </p>
        
        <div className="flex space-x-3">
          <Button 
            className="w-full neon-button"
            onClick={() => scrollToSection('top')}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};
