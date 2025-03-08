
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap, MessageSquare, FileText, Rocket, ChevronRight } from 'lucide-react';

interface SolutionSectionProps {
  scrollY: number;
  scrollToSection: (section: string) => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ scrollY, scrollToSection }) => {
  return (
    <section id="solution" className="py-24 relative overflow-hidden">
      <div 
        className="absolute top-1/2 left-1/2 w-1/2 h-96 bg-neon-purple/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0005})`,
          opacity: Math.min(0.8, 0.2 + scrollY * 0.0005)
        }}
      ></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Our Solution</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ApplyGo uses AI to revolutionize your job search workflow
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div 
            className="space-y-6"
            style={{
              opacity: scrollY > 700 ? 1 : 0,
              transform: scrollY > 700 ? 'translateX(0)' : 'translateX(-50px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease'
            }}
          >
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="rounded-full w-10 h-10 flex items-center justify-center bg-neon-purple/20 border border-neon-purple/40 shrink-0 mt-1">
                  <Zap className="h-5 w-5 text-neon-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Job Discovery</h3>
                  <p className="text-muted-foreground">Our algorithms scan LinkedIn, Reddit, and Twitter to find hidden job opportunities that match your skills and preferences.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="rounded-full w-10 h-10 flex items-center justify-center bg-neon-purple/20 border border-neon-purple/40 shrink-0 mt-1">
                  <MessageSquare className="h-5 w-5 text-neon-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Personalized Outreach</h3>
                  <p className="text-muted-foreground">Generate highly customized messages that highlight your relevant experience and show genuine interest in the role.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="rounded-full w-10 h-10 flex items-center justify-center bg-neon-purple/20 border border-neon-purple/40 shrink-0 mt-1">
                  <FileText className="h-5 w-5 text-neon-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Application Management</h3>
                  <p className="text-muted-foreground">Keep track of all your applications, follow-ups, and interviews in one centralized dashboard.</p>
                </div>
              </div>
            </div>
            
            <Button 
              className="neon-button mt-4" 
              onClick={() => scrollToSection('features')}
              style={{
                transform: scrollY > 800 ? 'scale(1)' : 'scale(0.9)',
                transition: 'transform 0.3s ease',
                transitionDelay: '0.3s'
              }}
            >
              Explore All Features <ChevronRight size={16} />
            </Button>
          </div>
          
          <div 
            className="relative"
            style={{
              opacity: scrollY > 700 ? 1 : 0,
              transform: scrollY > 700 ? 'translateX(0)' : 'translateX(50px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 rounded-lg blur-xl"></div>
            <div className="relative glass-card rounded-lg overflow-hidden border border-white/10 p-6">
              <div className="aspect-video bg-black/40 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Rocket className="h-12 w-12 text-neon-purple mx-auto mb-3" />
                  <p className="text-lg font-medium">Product Demo</p>
                  <p className="text-sm text-muted-foreground">See ApplyGo in action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
