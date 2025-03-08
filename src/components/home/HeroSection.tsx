
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap, ChevronRight, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  scrollY: number;
  scrollToSection: (section: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ scrollY, scrollToSection }) => {
  return (
    <section className="relative py-20 md:py-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div 
            className="space-y-6 animated-item"
            style={{
              transform: `translateY(${scrollY * 0.05}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm border border-neon-purple/30 bg-neon-purple/10 text-neon-purple mb-3">
              <Zap size={14} className="mr-1" />
              <span>Job search automation reimagined</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight gradient-text leading-tight">
              The AI-Powered <br />Job Application <br />Accelerator
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              Apply smarter, not harder. Automate your job search, stand out from the crowd, and land your dream job faster.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                className="neon-button text-lg px-8 py-6 animate-pulse" 
                onClick={() => scrollToSection('features')}
              >
                Get Started <ChevronRight size={16} />
              </Button>
              <Button 
                variant="outline" 
                className="text-lg px-8 py-6 border-white/20 hover:bg-white/10" 
                onClick={() => scrollToSection('demo')}
              >
                See Demo
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-6">
              <div className="flex items-center text-sm gap-1">
                <CheckCircle2 className="text-neon-purple" size={18} />
                <span>AI Job Scraper</span>
              </div>
              <div className="flex items-center text-sm gap-1">
                <CheckCircle2 className="text-neon-purple" size={18} />
                <span>Smart DM Generator</span>
              </div>
              <div className="flex items-center text-sm gap-1">
                <CheckCircle2 className="text-neon-purple" size={18} />
                <span>Application Tracker</span>
              </div>
            </div>
          </div>
          
          <div 
            className="relative animated-item"
            style={{
              transform: `translateY(${-scrollY * 0.03}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 rounded-lg blur-xl"></div>
            <div className="relative glass-card rounded-lg overflow-hidden border border-white/20">
              {/* Abstract UI representation */}
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-white/70">ApplyGo Dashboard</div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="h-8 bg-white/10 rounded w-2/3"></div>
                  <div className="h-24 bg-white/5 rounded"></div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-16 bg-neon-purple/20 rounded animate-pulse"></div>
                    <div className="h-16 bg-neon-blue/20 rounded animate-pulse delay-150"></div>
                    <div className="h-16 bg-white/10 rounded animate-pulse delay-300"></div>
                  </div>
                  <div className="h-10 bg-neon-purple/40 rounded w-1/3 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
