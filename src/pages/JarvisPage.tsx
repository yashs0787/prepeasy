
import React from 'react';
import { Helmet } from 'react-helmet';
import { JarvisInterviewAssistant } from '../components/interview/JarvisInterviewAssistant';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function JarvisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Helmet>
        <title>Jarvis - AI Interview Assistant</title>
        <meta name="description" content="Practice and perfect your interview skills with Jarvis, your AI interview coach" />
      </Helmet>
      
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center">
                <span className="text-white font-medium">J</span>
              </div>
              <span className="font-bold text-xl">Jarvis</span>
            </Link>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard">
                <Home className="h-4 w-4 mr-1" /> Dashboard
              </Link>
            </Button>
            <Button size="sm">Upgrade Plan</Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <JarvisInterviewAssistant />
      </main>
      
      <footer className="mt-12 bg-white border-t py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2023 Jarvis AI. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="link" size="sm" className="text-muted-foreground">
                Privacy Policy
              </Button>
              <Button variant="link" size="sm" className="text-muted-foreground">
                Terms of Service
              </Button>
              <Button variant="link" size="sm" className="text-muted-foreground">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
