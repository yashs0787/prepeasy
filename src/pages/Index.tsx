
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/home/HeroSection';
import { ProblemSection } from '@/components/home/ProblemSection';
import { SolutionSection } from '@/components/home/SolutionSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { StatsSection } from '@/components/home/StatsSection';
import { DemoSection } from '@/components/home/DemoSection';
import { TestimonialSection } from '@/components/home/TestimonialSection';
import { FooterSection } from '@/components/home/FooterSection';
import { FloatingCTA } from '@/components/home/FloatingCTA';

export default function Index() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Track scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-dark-mesh opacity-40"></div>
        <div className="absolute top-0 left-1/4 w-1/3 h-80 bg-neon-purple/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-1/3 h-80 bg-neon-blue/20 rounded-full blur-3xl"></div>
      </div>
      
      <Navbar />
      
      <main className="flex-1 pt-16 overflow-hidden">
        <HeroSection scrollY={scrollY} scrollToSection={scrollToSection} />
        <ProblemSection scrollY={scrollY} />
        <SolutionSection scrollY={scrollY} scrollToSection={scrollToSection} />
        <FeaturesSection scrollY={scrollY} />
        <StatsSection scrollY={scrollY} />
        <DemoSection scrollY={scrollY} />
        <TestimonialSection scrollY={scrollY} scrollToSection={scrollToSection} />
        <FloatingCTA scrollY={scrollY} scrollToSection={scrollToSection} />
      </main>
      
      <FooterSection />
    </div>
  );
}
