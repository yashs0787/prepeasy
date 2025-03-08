
import React from 'react';
import { Zap } from 'lucide-react';

export const FooterSection: React.FC = () => {
  return (
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
  );
};
