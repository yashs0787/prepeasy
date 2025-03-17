
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface DemoSectionProps {
  scrollY: number;
}

export const DemoSection: React.FC<DemoSectionProps> = ({ scrollY }) => {
  return (
    <section id="demo" className="py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">See ApplyGo In Action</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch how our platform simplifies the job search process
          </p>
        </div>
        
        <div 
          className="relative rounded-2xl overflow-hidden bg-black/60 border border-white/10"
          style={{
            opacity: scrollY > 1800 ? 1 : 0.5,
            transform: scrollY > 1800 ? 'scale(1)' : 'scale(0.98)',
            transition: 'opacity 0.6s ease, transform 0.6s ease'
          }}
        >
          <div className="aspect-w-16 aspect-h-9">
            <img 
              src="/placeholder.svg" 
              alt="ApplyGo demo video thumbnail" 
              className="object-cover w-full"
            />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <Button 
                className="rounded-full w-16 h-16 bg-neon-purple/90 hover:bg-neon-purple hover:scale-110 transition-all duration-300"
              >
                <Play className="w-6 h-6 text-white" fill="white" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Resume Building</h3>
            <p className="text-muted-foreground">
              See how our AI-powered resume builder creates optimized resumes tailored for each job application.
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Job Matching</h3>
            <p className="text-muted-foreground">
              Discover how our platform finds and recommends the best job opportunities that match your skills.
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Interview Coaching</h3>
            <p className="text-muted-foreground">
              Learn how our interview coach prepares you with personalized feedback for different industries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
