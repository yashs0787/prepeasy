
import React from 'react';
import { Brain, Rocket, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

// Define available career paths
export const CAREER_PATHS = [
  { id: 'consulting', name: 'Consulting', icon: <Brain className="h-5 w-5 text-indigo-500" />, color: 'from-indigo-500 to-purple-600' },
  { id: 'tech', name: 'Tech', icon: <Rocket className="h-5 w-5 text-blue-500" />, color: 'from-blue-500 to-cyan-600' },
  { id: 'finance', name: 'Finance', icon: <Sparkles className="h-5 w-5 text-emerald-500" />, color: 'from-emerald-500 to-green-600' }
];

interface CareerPathSelectionProps {
  onSelectPath: (pathId: string) => void;
}

export function CareerPathSelection({ onSelectPath }: CareerPathSelectionProps) {
  const handleCareerPathSelect = (pathId: string) => {
    onSelectPath(pathId);
    // Save the selection
    localStorage.setItem('jarvis_career_path', pathId);
    toast.success(`Career path set to ${CAREER_PATHS.find(p => p.id === pathId)?.name}`);
  };

  return (
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
  );
}
