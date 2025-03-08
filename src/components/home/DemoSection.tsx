
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface DemoSectionProps {
  scrollY: number;
}

export const DemoSection: React.FC<DemoSectionProps> = ({ scrollY }) => {
  return (
    <section id="demo" className="py-20 bg-black/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 animated-item">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Key Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how ApplyGo can transform your job search experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            className="bg-black/40 border border-white/10 rounded-xl p-6 md:p-8"
            style={{
              opacity: scrollY > 1800 ? 1 : 0,
              transform: scrollY > 1800 ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease'
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="rounded-full w-10 h-10 flex items-center justify-center bg-neon-purple/20 border border-neon-purple/40">
                <Check className="h-6 w-6 text-neon-purple" />
              </div>
              <h3 className="text-2xl font-semibold">AI Job Scraper</h3>
            </div>
            <p className="mb-4 text-muted-foreground">
              Our powerful AI scans multiple platforms to find the best job opportunities tailored to your skills and preferences.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-neon-purple" />
                <span className="text-sm">Multi-platform job discovery</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-neon-purple" />
                <span className="text-sm">Personalized job recommendations</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-neon-purple" />
                <span className="text-sm">Real-time job alerts</span>
              </li>
            </ul>
          </div>
          
          <div 
            className="bg-black/40 border border-white/10 rounded-xl p-6 md:p-8"
            style={{
              opacity: scrollY > 1850 ? 1 : 0,
              transform: scrollY > 1850 ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              transitionDelay: '0.1s'
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="rounded-full w-10 h-10 flex items-center justify-center bg-neon-purple/20 border border-neon-purple/40">
                <Check className="h-6 w-6 text-neon-purple" />
              </div>
              <h3 className="text-2xl font-semibold">Smart DM Generator</h3>
            </div>
            <p className="mb-4 text-muted-foreground">
              Create personalized outreach messages that get responses from hiring managers and recruiters.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-neon-purple" />
                <span className="text-sm">Tailored to each job application</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-neon-purple" />
                <span className="text-sm">Multiple tone options</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-neon-purple" />
                <span className="text-sm">Platform-specific templates</span>
              </li>
            </ul>
          </div>
          
          <div 
            className="bg-black/40 border border-white/10 rounded-xl p-6 md:p-8"
            style={{
              opacity: scrollY > 1900 ? 1 : 0,
              transform: scrollY > 1900 ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              transitionDelay: '0.2s'
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="rounded-full w-10 h-10 flex items-center justify-center bg-neon-purple/20 border border-neon-purple/40">
                <Check className="h-6 w-6 text-neon-purple" />
              </div>
              <h3 className="text-2xl font-semibold">Application Tracker</h3>
            </div>
            <p className="mb-4 text-muted-foreground">
              Keep track of all your job applications in one place with our intuitive application management system.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-neon-purple" />
                <span className="text-sm">Status tracking and updates</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-neon-purple" />
                <span className="text-sm">Interview scheduling</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-neon-purple" />
                <span className="text-sm">Follow-up reminders</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button className="neon-button"
            style={{
              opacity: scrollY > 1950 ? 1 : 0,
              transform: scrollY > 1950 ? 'scale(1)' : 'scale(0.9)',
              transition: 'opacity 0.6s ease, transform 0.3s ease',
              transitionDelay: '0.3s'
            }}
          >
            Try ApplyGo Now
          </Button>
        </div>
      </div>
    </section>
  );
};
