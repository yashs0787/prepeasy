
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

interface FloatingCTAProps {
  scrollY: number;
  scrollToSection: (section: string) => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ scrollY, scrollToSection }) => {
  return (
    <div 
      className="fixed bottom-8 right-8 z-50"
      style={{
        opacity: scrollY > 300 ? 1 : 0,
        transform: scrollY > 300 ? 'scale(1)' : 'scale(0.8)',
        transition: 'opacity 0.3s ease, transform 0.3s ease'
      }}
    >
      <Button 
        className="neon-button rounded-full flex items-center gap-2 px-6"
        onClick={() => scrollToSection('features')}
      >
        <Zap size={18} />
        <span>Try ApplyGo Now</span>
      </Button>
    </div>
  );
};
