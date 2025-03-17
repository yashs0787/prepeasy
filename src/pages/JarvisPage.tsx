
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, Mic, MicOff, ArrowLeft, Sparkles, Brain, Rocket } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { JarvisChat } from '../components/interview/JarvisChat';

// Define available career paths
const CAREER_PATHS = [
  { id: 'consulting', name: 'Consulting', icon: <Brain className="h-5 w-5 text-indigo-500" />, color: 'from-indigo-500 to-purple-600' },
  { id: 'tech', name: 'Tech', icon: <Rocket className="h-5 w-5 text-blue-500" />, color: 'from-blue-500 to-cyan-600' },
  { id: 'finance', name: 'Finance', icon: <Sparkles className="h-5 w-5 text-emerald-500" />, color: 'from-emerald-500 to-green-600' }
];

export default function JarvisPage() {
  const { user } = useAuth();
  const [selectedCareerPath, setSelectedCareerPath] = useState<string | null>(null);
  const [currentModule, setCurrentModule] = useState(1);
  const [showPathSelection, setShowPathSelection] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('chat');
  
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
    // Save the selection
    localStorage.setItem('jarvis_career_path', pathId);
    toast.success(`Career path set to ${CAREER_PATHS.find(p => p.id === pathId)?.name}`);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <Helmet>
          <title>Jarvis - Your AI Interview Coach</title>
          <meta name="description" content="Master interviews with Jarvis, your personal AI interview coach" />
        </Helmet>
        
        <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl">Jarvis</span>
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
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {showPathSelection ? (
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Career Path</h1>
              <p className="text-slate-300 mb-8 text-center">Jarvis will customize your learning experience based on your career goals</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {CAREER_PATHS.map(path => (
                  <button
                    key={path.id}
                    onClick={() => handleCareerPathSelect(path.id)}
                    className={`bg-slate-800 border border-slate-700 hover:border-indigo-500 transition-all p-6 rounded-xl flex flex-col items-center text-center`}
                  >
                    <div className={`h-16 w-16 rounded-full bg-gradient-to-r ${path.color} flex items-center justify-center mb-4`}>
                      {path.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-2">{path.name}</h3>
                    <p className="text-slate-400 text-sm">Specialized training for {path.name.toLowerCase()} careers</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar with Modules */}
              <div className="lg:col-span-1">
                <Card className="bg-slate-800 border-slate-700">
                  <div className="p-4 border-b border-slate-700">
                    <h2 className="font-bold text-lg">Course Modules</h2>
                  </div>
                  <div className="p-2">
                    {modules.map(module => (
                      <button
                        key={module.id}
                        onClick={() => setCurrentModule(module.id)}
                        className={`w-full text-left p-3 rounded-lg mb-2 flex items-center ${
                          currentModule === module.id ? 'bg-indigo-900/50 text-indigo-200' : 'hover:bg-slate-700/50'
                        }`}
                      >
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                          module.progress === 100 
                            ? 'bg-green-500 text-white' 
                            : 'bg-slate-700 text-slate-300'
                        }`}>
                          {module.progress === 100 ? module.id : module.id}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{module.title}</div>
                          <div className="text-sm text-slate-400">
                            {module.progress === 0 ? 'Not started' : `${module.progress}% complete`}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>
              </div>
              
              {/* Main Content Area */}
              <div className="lg:col-span-3">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="bg-slate-800 border-slate-700 p-0 h-auto">
                    <TabsTrigger value="chat" className="data-[state=active]:bg-slate-700 flex-1 py-3">
                      Chat with Jarvis
                    </TabsTrigger>
                    <TabsTrigger value="practice" className="data-[state=active]:bg-slate-700 flex-1 py-3">
                      Practice Case
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="chat" className="border-none p-0 mt-4">
                    <JarvisChat 
                      currentModule={currentModule} 
                      careerPath={selectedCareerPath || 'general'}
                    />
                  </TabsContent>
                  
                  <TabsContent value="practice" className="border-none p-0 mt-4">
                    <Card className="bg-slate-800 border-slate-700 p-6">
                      <h2 className="text-xl font-bold mb-4">Mock Case Interview</h2>
                      <p className="text-slate-300 mb-6">Complete the current module to unlock this mock case interview.</p>
                      
                      {modules[currentModule - 1].progress === 100 ? (
                        <Button 
                          onClick={() => toast.info("Starting mock case interview...")}
                          className="bg-indigo-600 hover:bg-indigo-700"
                        >
                          Start Case Interview
                        </Button>
                      ) : (
                        <Button disabled className="bg-slate-700 text-slate-400 cursor-not-allowed">
                          Complete Module {currentModule} to Unlock
                        </Button>
                      )}
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </main>
        
        <footer className="mt-12 border-t border-white/10 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-slate-400">
                © 2023 Jarvis AI. All rights reserved.
              </p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <Button variant="link" size="sm" className="text-slate-400">
                  Privacy Policy
                </Button>
                <Button variant="link" size="sm" className="text-slate-400">
                  Terms of Service
                </Button>
                <Button variant="link" size="sm" className="text-slate-400">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
