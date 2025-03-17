
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface TestimonialSectionProps {
  scrollY: number;
  scrollToSection: (section: string) => void;
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({ scrollY, scrollToSection }) => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      image: "/placeholder.svg",
      text: "ApplyGo helped me land my dream job at a top tech company. The AI resume builder and interview prep were game-changers in my job search.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Financial Analyst",
      company: "Global Finance",
      image: "/placeholder.svg",
      text: "The interview prep feature specifically tailored for finance roles helped me nail my interviews. I received three offers within a month of using ApplyGo!",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Marketing Director",
      company: "Creative Solutions",
      image: "/placeholder.svg",
      text: "I was struggling to track my applications across different platforms. ApplyGo's tracking system organized everything in one place and their cold DM templates got me responses.",
      rating: 4
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-black/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Job seekers like you are finding success with ApplyGo
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="glass-card rounded-xl p-6"
              style={{
                opacity: scrollY > 2200 ? 1 : 0,
                transform: scrollY > 2200 ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                transitionDelay: `${index * 0.1}s`
              }}
            >
              <div className="flex items-center space-x-2 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-neon-yellow text-neon-yellow" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i + testimonial.rating} className="h-4 w-4 text-muted" />
                ))}
              </div>
              
              <p className="mb-6 text-muted-foreground">"{testimonial.text}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            size="lg" 
            className="neon-button animate-pulse"
            onClick={() => scrollToSection('top')}
          >
            Start Your Success Story
          </Button>
        </div>
      </div>
    </section>
  );
};
