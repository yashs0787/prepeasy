
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { JarvisChat } from '../interview/JarvisChat';
import { ModuleSidebar } from './ModuleSidebar';

interface Module {
  id: number;
  title: string;
  progress: number;
}

interface JarvisContentProps {
  currentModule: number;
  setCurrentModule: (id: number) => void;
  modules: Module[];
  careerPath: string;
}

export function JarvisContent({ currentModule, setCurrentModule, modules, careerPath }: JarvisContentProps) {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar with Modules */}
      <div className="lg:col-span-1">
        <ModuleSidebar 
          modules={modules} 
          currentModule={currentModule} 
          setCurrentModule={setCurrentModule} 
        />
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
              careerPath={careerPath || 'general'}
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
  );
}
