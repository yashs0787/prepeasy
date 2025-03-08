
import React from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { JobScraper } from '@/components/JobScraper';
import { ColdDmGenerator } from '@/components/ColdDmGenerator';

interface DemoSectionProps {
  scrollY: number;
}

export const DemoSection: React.FC<DemoSectionProps> = ({ scrollY }) => {
  return (
    <section id="demo" className="py-20 bg-black/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 animated-item">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Try It Yourself</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how ApplyGo can transform your job search experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div 
            className="bg-black/40 border border-white/10 rounded-xl p-6 md:p-8"
            style={{
              opacity: scrollY > 1800 ? 1 : 0,
              transform: scrollY > 1800 ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease'
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Search className="h-6 w-6 text-neon-purple" />
              <h3 className="text-2xl font-semibold">Job Scraper Demo</h3>
            </div>
            <JobScraper />
          </div>
          
          <div 
            className="bg-black/40 border border-white/10 rounded-xl p-6 md:p-8"
            style={{
              opacity: scrollY > 2000 ? 1 : 0,
              transform: scrollY > 2000 ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease'
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <MessageSquare className="h-6 w-6 text-neon-purple" />
              <h3 className="text-2xl font-semibold">Cold DM Generator Demo</h3>
            </div>
            <ColdDmGenerator />
          </div>
        </div>
      </div>
    </section>
  );
};
