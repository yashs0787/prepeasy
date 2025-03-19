
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { CAREER_PATHS } from './CareerPathSelection';

interface JarvisHeaderProps {
  selectedCareerPath: string | null;
  progress: number;
}

export function JarvisHeader({ selectedCareerPath, progress }: JarvisHeaderProps) {
  return (
    <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl">Friday</span>
          </Link>
          {selectedCareerPath && (
            <div className="hidden md:flex items-center ml-4 bg-slate-800/50 py-1 px-3 rounded-full text-sm">
              {CAREER_PATHS.find(p => p.id === selectedCareerPath)?.icon}
              <span className="ml-1">{CAREER_PATHS.find(p => p.id === selectedCareerPath)?.name} Path</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild className="text-slate-300 border-slate-700 hover:bg-slate-800">
            <Link to="/dashboard">
              <Home className="h-4 w-4 mr-1" /> Dashboard
            </Link>
          </Button>
        </div>
      </div>
      
      {selectedCareerPath && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
          <div className="w-full">
            <div className="flex justify-between text-sm text-slate-400 mb-1">
              <span>Overall Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-slate-700" indicatorClassName="bg-indigo-500" />
          </div>
        </div>
      )}
    </header>
  );
}
