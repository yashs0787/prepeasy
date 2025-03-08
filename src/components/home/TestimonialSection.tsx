
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

interface TestimonialSectionProps {
  scrollY: number;
  scrollToSection: (section: string) => void;
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({ scrollY, scrollToSection }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div 
            className="space-y-6"
            style={{
              opacity: scrollY > 2300 ? 1 : 0,
              transform: scrollY > 2300 ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease'
            }}
          >
            <div className="glass-card p-6 rounded-lg border border-white/10 relative">
              <div className="absolute -top-3 -left-3 text-4xl">❝</div>
              <p className="text-lg italic mb-4">
                "Using ApplyGo completely transformed my job search. I went from getting no responses to receiving multiple interview requests within a week. The AI-powered outreach messages are a game-changer!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue"></div>
                <div>
                  <div className="font-medium">Michael Chen</div>
                  <div className="text-sm text-muted-foreground">Software Engineer at Meta</div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-lg border border-white/10 relative">
              <div className="absolute -top-3 -left-3 text-4xl">❝</div>
              <p className="text-lg italic mb-4">
                "As a recent graduate with no connections, ApplyGo helped me land a job at a top company. The job scraper found opportunities I never would have discovered on my own."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-blue to-neon-pink"></div>
                <div>
                  <div className="font-medium">Sarah Johnson</div>
                  <div className="text-sm text-muted-foreground">Data Analyst at Google</div>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className="space-y-8"
            style={{
              opacity: scrollY > 2300 ? 1 : 0,
              transform: scrollY > 2300 ? 'translateX(0)' : 'translateX(30px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease'
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">Ready to supercharge your job search?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of job seekers who have already found their dream jobs with ApplyGo. Our AI-powered platform will help you stand out, get noticed, and land interviews faster.
            </p>
            <div className="space-y-4">
              <Button 
                className="neon-button text-lg w-full py-6 hover:animate-pulse"
                onClick={() => scrollToSection('features')}
              >
                Get Started Now
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                No credit card required. 7-day free trial.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="flex items-center text-sm gap-1">
                <CheckCircle2 className="text-neon-purple" size={18} />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center text-sm gap-1">
                <CheckCircle2 className="text-neon-purple" size={18} />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center text-sm gap-1">
                <CheckCircle2 className="text-neon-purple" size={18} />
                <span>30-day money back</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
