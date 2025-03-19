
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { CareerPathSelection } from '@/components/jarvis/CareerPathSelection';
import { JarvisHeader } from '@/components/jarvis/JarvisHeader';
import { JarvisContent } from '@/components/jarvis/JarvisContent';
import { JarvisFooter } from '@/components/jarvis/JarvisFooter';

export default function JarvisPage() {
  const { user } = useAuth();
  const [selectedCareerPath, setSelectedCareerPath] = useState<string | null>(null);
  const [currentModule, setCurrentModule] = useState(1);
  const [showPathSelection, setShowPathSelection] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Demo modules
  const modules = [
    { id: 1, title: "Introduction to Case Interviews", progress: 100 },
    { id: 2, title: "Problem Structuring", progress: 75 },
    { id: 3, title: "Market Sizing", progress: 40 },
    { id: 4, title: "Profitability Analysis", progress: 0 },
    { id: 5, title: "Mergers & Acquisitions", progress: 0 }
  ];
  
  useEffect(() => {
    // Check if user has a career path saved
    const checkUserPath = async () => {
      // In a real implementation, this would fetch from your database
      // For now, we'll just check local storage
      const savedPath = localStorage.getItem('jarvis_career_path');
      if (!savedPath) {
        setShowPathSelection(true);
      } else {
        setSelectedCareerPath(savedPath);
        // Calculate overall progress
        const totalProgress = modules.reduce((acc, module) => acc + module.progress, 0) / modules.length;
        setProgress(totalProgress);
      }
    };
    
    checkUserPath();
  }, []);
  
  const handleCareerPathSelect = (pathId: string) => {
    setSelectedCareerPath(pathId);
    setShowPathSelection(false);
    // Calculate overall progress
    const totalProgress = modules.reduce((acc, module) => acc + module.progress, 0) / modules.length;
    setProgress(totalProgress);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <Helmet>
          <title>Friday – Your AI-Powered Interview & Job Prep Coach</title>
          <meta name="description" content="Master interviews with Friday, your personal AI interview coach" />
        </Helmet>
        
        <JarvisHeader 
          selectedCareerPath={selectedCareerPath} 
          progress={progress} 
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {showPathSelection ? (
            <CareerPathSelection onSelectPath={handleCareerPathSelect} />
          ) : (
            <JarvisContent 
              currentModule={currentModule}
              setCurrentModule={setCurrentModule}
              modules={modules}
              careerPath={selectedCareerPath || 'general'}
            />
          )}
        </main>
        
        <JarvisFooter />
      </div>
    </ProtectedRoute>
  );
}
