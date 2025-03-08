
import React from 'react';
import { Search, MessageSquare, BarChart3 } from 'lucide-react';

interface ProblemSectionProps {
  scrollY: number;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ scrollY }) => {
  const problems = [
    {
      icon: <Search className="h-8 w-8 text-red-400" />,
      title: "Time-Consuming Search",
      description: "Hours spent scouring multiple job boards and social platforms for relevant opportunities."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-red-400" />,
      title: "Generic Outreach",
      description: "Cold messages that sound like templates get ignored by hiring managers and recruiters."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-red-400" />,
      title: "Disorganized Process",
      description: "Tracking applications across dozens of companies becomes overwhelming and leads to missed opportunities."
    },
  ];

  return (
    <section id="problem" className="py-24 bg-black/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">The Problem</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Job searching has become a frustrating numbers game
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div 
              key={index} 
              className="feature-card rounded-lg p-6 animated-item"
              style={{
                opacity: scrollY > 300 ? 1 : 0,
                transform: scrollY > 300 ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                transitionDelay: `${index * 0.1}s`
              }}
            >
              <div className="rounded-full w-14 h-14 flex items-center justify-center bg-red-400/10 border border-red-400/30 mb-4">
                {problem.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
