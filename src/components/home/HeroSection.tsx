
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, FileText, User } from 'lucide-react';

interface HeroSectionProps {
  scrollY?: number;
  scrollToSection?: (section: string) => void;
}

export function HeroSection({ scrollY, scrollToSection }: HeroSectionProps) {
  const navigate = useNavigate();

  return (
    <div className="relative pt-20 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Your Career <span className="text-primary">Success Partner</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
              Create professional resumes, match with your dream jobs, and get AI-powered interview coaching with Friday to land your next role.
            </p>
            
            <div className="bg-slate-900/60 p-6 rounded-lg mb-8 border border-slate-800">
              <p className="text-base text-slate-300 italic">
                "At prepeasy.ai, we envision a world where landing a dream job is no longer a privilege but an accessible, efficient, and intelligent process for everyone. We are building the ultimate AI-powered career acceleration platform that makes high-volume job application preparation—especially in competitive fields like consulting and finance—10x more affordable and 100x faster."
              </p>
            </div>
            
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-lg"
                onClick={() => navigate('/signup')}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto text-lg"
                onClick={() => {
                  if (scrollToSection) {
                    scrollToSection('features');
                  } else {
                    navigate('/about');
                  }
                }}
              >
                Learn More
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-primary mr-2" />
                <span>AI Resume Builder</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="h-6 w-6 text-primary mr-2" />
                <span>Job Matching</span>
              </div>
              <div className="flex items-center">
                <User className="h-6 w-6 text-primary mr-2" />
                <span>Interview Coach</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl p-8 relative z-10">
              <img 
                src="/placeholder.svg" 
                alt="Career platform dashboard" 
                className="rounded-lg shadow-lg border border-border"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-primary/10 to-transparent z-0 blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
