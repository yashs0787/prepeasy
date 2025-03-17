
import React from 'react';
import { Card } from '@/components/ui/card';

interface Module {
  id: number;
  title: string;
  progress: number;
}

interface ModuleSidebarProps {
  modules: Module[];
  currentModule: number;
  setCurrentModule: (id: number) => void;
}

export function ModuleSidebar({ modules, currentModule, setCurrentModule }: ModuleSidebarProps) {
  return (
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
  );
}
