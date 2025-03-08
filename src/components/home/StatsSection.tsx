
import React from 'react';

interface StatsSectionProps {
  scrollY: number;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ scrollY }) => {
  const stats = [
    { value: "3x", label: "Faster Job Search" },
    { value: "85%", label: "Response Rate" },
    { value: "10k+", label: "Jobs Scraped Daily" },
    { value: "4.9/5", label: "User Rating" }
  ];

  return (
    <section className="py-16 bg-black/40">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="space-y-2"
              style={{
                opacity: scrollY > 1600 ? 1 : 0,
                transform: scrollY > 1600 ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                transitionDelay: `${index * 0.1}s`
              }}
            >
              <div className="text-4xl font-bold gradient-text">{stat.value}</div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
