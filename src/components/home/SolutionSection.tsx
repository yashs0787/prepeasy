
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Zap, Clock, DollarSign, BriefcaseBusiness } from 'lucide-react';

interface SolutionSectionProps {
  scrollY: number;
  scrollToSection: (section: string) => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ scrollY, scrollToSection }) => {
  const solutions = [
    "One-stop platform for finding and applying to jobs",
    "AI-powered resume builder optimized for ATS systems",
    "Smart job recommendations based on your skills",
    "Automated application tracking and follow-ups",
    "Interview preparation with industry-specific coaching"
  ];

  const insights = [
    {
      icon: <Clock className="h-8 w-8 text-neon-green" />,
      title: "100x Faster",
      description: "Our AI accelerates job preparation and application process by 100x"
    },
    {
      icon: <DollarSign className="h-8 w-8 text-neon-yellow" />,
      title: "10x More Affordable",
      description: "Access premium career services at a fraction of traditional coaching costs"
    },
    {
      icon: <BriefcaseBusiness className="h-8 w-8 text-neon-blue" />,
      title: "Competitive Edge",
      description: "Specialized for competitive fields like consulting and finance"
    }
  ];

  return (
    <section id="solution" className="py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 order-2 md:order-1">
            <div 
              className="bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 rounded-3xl p-8 relative"
              style={{
                opacity: scrollY > 600 ? 1 : 0,
                transform: scrollY > 600 ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease'
              }}
            >
              <img 
                src="/placeholder.svg" 
                alt="ApplyGo solution showcase" 
                className="rounded-lg shadow-lg border border-border w-full"
              />
            </div>
          </div>
          
          <div className="md:w-1/2 order-1 md:order-2">
            <div 
              style={{
                opacity: scrollY > 550 ? 1 : 0,
                transform: scrollY > 550 ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease'
              }}
            >
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Our Solution</h2>
              <p className="text-xl text-muted-foreground mb-8">
                ApplyGo streamlines the entire job application process from start to finish
              </p>
              
              <ul className="space-y-3 mb-8">
                {solutions.map((solution, index) => (
                  <li 
                    key={index} 
                    className="flex items-start"
                    style={{
                      opacity: scrollY > (550 + index * 30) ? 1 : 0,
                      transform: scrollY > (550 + index * 30) ? 'translateY(0)' : 'translateY(10px)',
                      transition: 'opacity 0.5s ease, transform 0.5s ease',
                      transitionDelay: `${index * 0.1}s`
                    }}
                  >
                    <Check className="h-5 w-5 text-neon-green mr-2 mt-1 flex-shrink-0" />
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {insights.map((insight, index) => (
                  <div 
                    key={index}
                    className="bg-slate-900/70 p-6 rounded-lg border border-slate-800"
                    style={{
                      opacity: scrollY > (600 + index * 30) ? 1 : 0,
                      transform: scrollY > (600 + index * 30) ? 'translateY(0)' : 'translateY(10px)',
                      transition: 'opacity 0.5s ease, transform 0.5s ease',
                      transitionDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="flex justify-center mb-3">
                      {insight.icon}
                    </div>
                    <h3 className="text-lg font-bold text-center mb-2">{insight.title}</h3>
                    <p className="text-sm text-slate-300 text-center">{insight.description}</p>
                  </div>
                ))}
              </div>
              
              <Button 
                size="lg" 
                className="neon-button"
                onClick={() => scrollToSection('features')}
              >
                Explore Features
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
