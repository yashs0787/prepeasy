
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RotateCw } from 'lucide-react';
import { toast } from 'sonner';
import { useInterviewAssistant, CareerTrack } from './useInterviewAssistant';
import { PrepareTab } from './tabs/PrepareTab';
import { PracticeTab } from './tabs/PracticeTab';
import { AnalyzeTab } from './tabs/AnalyzeTab';
import { Input } from '@/components/ui/input';

interface InterviewAssistantProps {
  profile?: any;
}

export function InterviewAssistant({ profile }: InterviewAssistantProps) {
  // Initialize careerTrack based on user profile
  const initialCareerTrack = mapProfileToCareerTrack(profile?.careerPath);
  
  const {
    careerTrack,
    setCareerTrack,
    interviewType,
    setInterviewType,
    isPracticing,
    activeTab,
    setActiveTab,
    stopPractice
  } = useInterviewAssistant(initialCareerTrack);
  
  // Map profile career path to interview assistant career track
  function mapProfileToCareerTrack(careerPath: string): CareerTrack {
    if (!careerPath) return 'general';
    
    switch (careerPath) {
      case 'consulting':
      case 'management_consulting': 
        return 'consulting';
      case 'investment_banking': 
        return 'investment-banking';
      case 'tech':
      case 'technology': 
        return 'tech';
      default: 
        return 'general';
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Interview Assistant</CardTitle>
        <CardDescription>
          Practice for interviews with AI-powered feedback and coaching
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="prepare">Prepare</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="analyze">Analyze</TabsTrigger>
          </TabsList>
          
          <TabsContent value="prepare">
            <PrepareTab 
              careerTrack={careerTrack} 
              setCareerTrack={setCareerTrack} 
            />
          </TabsContent>
          
          <TabsContent value="practice">
            <PracticeTab
              interviewType={interviewType}
              setInterviewType={(value: string) => setInterviewType(value as any)}
              isPracticing={isPracticing}
              profile={profile}
            />
          </TabsContent>
          
          <TabsContent value="analyze">
            <AnalyzeTab />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" onClick={() => setActiveTab('prepare')}>
          <RotateCw className="mr-2 h-4 w-4" /> Reset
        </Button>
        <Button>
          Save Progress
        </Button>
      </CardFooter>
    </Card>
  );
}
