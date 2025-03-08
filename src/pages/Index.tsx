
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { JobScraper } from '@/components/JobScraper';
import { ColdDmGenerator } from '@/components/ColdDmGenerator';
import { toast } from 'sonner';
import { 
  Zap, 
  Rocket, 
  Search, 
  MessageSquare, 
  FileText, 
  BarChart3, 
  Award,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function Index() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
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
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 animated-item">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm border border-neon-purple/30 bg-neon-purple/10 text-neon-purple mb-3">
                  <Zap size={14} className="mr-1" />
                  <span>Job search automation reimagined</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight gradient-text leading-tight">
                  The AI-Powered <br />Job Application <br />Accelerator
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-lg">
                  Apply smarter, not harder. Automate your job search, stand out from the crowd, and land your dream job faster.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-2">
                  <Button 
                    className="neon-button text-lg px-8 py-6" 
                    onClick={() => scrollToSection('features')}
                  >
                    Get Started <ChevronRight size={16} />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-lg px-8 py-6 border-white/20 hover:bg-white/10" 
                    onClick={() => scrollToSection('demo')}
                  >
                    See Demo
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-6 pt-6">
                  <div className="flex items-center text-sm gap-1">
                    <CheckCircle2 className="text-neon-purple" size={18} />
                    <span>AI Job Scraper</span>
                  </div>
                  <div className="flex items-center text-sm gap-1">
                    <CheckCircle2 className="text-neon-purple" size={18} />
                    <span>Smart DM Generator</span>
                  </div>
                  <div className="flex items-center text-sm gap-1">
                    <CheckCircle2 className="text-neon-purple" size={18} />
                    <span>Application Tracker</span>
                  </div>
                </div>
              </div>
              
              <div className="relative animated-item">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 rounded-lg blur-xl"></div>
                <div className="relative glass-card rounded-lg overflow-hidden border border-white/20">
                  {/* Abstract UI representation */}
                  <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-white/70">ApplyGo Dashboard</div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="h-8 bg-white/10 rounded w-2/3"></div>
                      <div className="h-24 bg-white/5 rounded"></div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="h-16 bg-neon-purple/20 rounded animate-pulse-subtle"></div>
                        <div className="h-16 bg-neon-blue/20 rounded animate-pulse-subtle delay-150"></div>
                        <div className="h-16 bg-white/10 rounded animate-pulse-subtle delay-300"></div>
                      </div>
                      <div className="h-10 bg-neon-purple/40 rounded w-1/3 mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-black/40">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2 animated-item">
                <div className="text-4xl font-bold gradient-text">3x</div>
                <p className="text-muted-foreground">Faster Job Search</p>
              </div>
              <div className="space-y-2 animated-item">
                <div className="text-4xl font-bold gradient-text">85%</div>
                <p className="text-muted-foreground">Response Rate</p>
              </div>
              <div className="space-y-2 animated-item">
                <div className="text-4xl font-bold gradient-text">10k+</div>
                <p className="text-muted-foreground">Jobs Scraped Daily</p>
              </div>
              <div className="space-y-2 animated-item">
                <div className="text-4xl font-bold gradient-text">4.9/5</div>
                <p className="text-muted-foreground">User Rating</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16 animated-item">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">How ApplyGo Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered platform simplifies your job search from start to finish
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Search className="h-8 w-8 text-neon-purple" />,
                  title: "AI Job Scraper",
                  description: "Find hidden opportunities across LinkedIn, Twitter, and Reddit that match your skills and preferences."
                },
                {
                  icon: <MessageSquare className="h-8 w-8 text-neon-purple" />,
                  title: "Cold DM Generator",
                  description: "Create personalized outreach messages that get responses from hiring managers and recruiters."
                },
                {
                  icon: <FileText className="h-8 w-8 text-neon-purple" />,
                  title: "Resume Optimizer",
                  description: "Tailor your resume for each application to pass ATS systems and highlight relevant skills."
                },
                {
                  icon: <BarChart3 className="h-8 w-8 text-neon-purple" />,
                  title: "Application Tracker",
                  description: "Keep track of all your applications, interviews, and follow-ups in one organized dashboard."
                },
                {
                  icon: <Rocket className="h-8 w-8 text-neon-purple" />,
                  title: "Interview Prep",
                  description: "Get customized interview preparation based on the company and role you're applying for."
                },
                {
                  icon: <Award className="h-8 w-8 text-neon-purple" />,
                  title: "Skill Validator",
                  description: "Showcase your verified skills and certifications to stand out from other candidates."
                }
              ].map((feature, index) => (
                <div key={index} className="feature-card rounded-lg p-6 animated-item">
                  <div className="rounded-full w-14 h-14 flex items-center justify-center bg-neon-purple/10 border border-neon-purple/30 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Demo Section */}
        <section id="demo" className="py-20 bg-black/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16 animated-item">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Try It Yourself</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                See how ApplyGo can transform your job search experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <div className="bg-black/40 border border-white/10 rounded-xl p-6 md:p-8 animated-item">
                <div className="flex items-center gap-4 mb-6">
                  <Search className="h-6 w-6 text-neon-purple" />
                  <h3 className="text-2xl font-semibold">Job Scraper Demo</h3>
                </div>
                <JobScraper />
              </div>
              
              <div className="bg-black/40 border border-white/10 rounded-xl p-6 md:p-8 animated-item">
                <div className="flex items-center gap-4 mb-6">
                  <MessageSquare className="h-6 w-6 text-neon-purple" />
                  <h3 className="text-2xl font-semibold">Cold DM Generator Demo</h3>
                </div>
                <ColdDmGenerator />
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonial/CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 animated-item">
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
              
              <div className="space-y-8 animated-item">
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">Ready to supercharge your job search?</h2>
                <p className="text-xl text-muted-foreground">
                  Join thousands of job seekers who have already found their dream jobs with ApplyGo. Our AI-powered platform will help you stand out, get noticed, and land interviews faster.
                </p>
                <div className="space-y-4">
                  <Button className="neon-button text-lg w-full py-6">
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
      </main>
      
      <footer className="border-t border-white/10 py-12 bg-black/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-neon-purple" />
                <span className="font-semibold text-lg gradient-text">ApplyGo</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The AI-powered job application platform that helps you land your dream job faster.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-neon-purple">Job Scraper</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-neon-purple">Cold DM Generator</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-neon-purple">Resume Builder</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-neon-purple">Application Tracker</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-neon-purple">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-neon-purple">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-neon-purple">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-neon-purple">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-neon-purple">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-neon-purple">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-neon-purple">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-sm text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} ApplyGo. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
