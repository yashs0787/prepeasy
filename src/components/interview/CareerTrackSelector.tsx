
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Code, LineChart, User } from 'lucide-react';
import { CareerTrack } from './useInterviewAssistant';

interface CareerTrackSelectorProps {
  selectedTrack: CareerTrack;
  onSelectTrack: (track: CareerTrack) => void;
}

export function CareerTrackSelector({ selectedTrack, onSelectTrack }: CareerTrackSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select Career Track</h3>
      <p className="text-sm text-muted-foreground">
        Choose a specialized track for targeted interview practice
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card 
          className={`cursor-pointer transition-colors ${selectedTrack === 'consulting' ? 'border-primary bg-primary/5' : 'hover:bg-accent'}`}
          onClick={() => onSelectTrack('consulting')}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Briefcase className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-medium">Consulting</h3>
            <p className="text-xs text-muted-foreground mt-2">Case studies & frameworks</p>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-colors ${selectedTrack === 'investment-banking' ? 'border-primary bg-primary/5' : 'hover:bg-accent'}`}
          onClick={() => onSelectTrack('investment-banking')}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <LineChart className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-medium">Investment Banking</h3>
            <p className="text-xs text-muted-foreground mt-2">Financial modeling & valuation</p>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-colors ${selectedTrack === 'tech' ? 'border-primary bg-primary/5' : 'hover:bg-accent'}`}
          onClick={() => onSelectTrack('tech')}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Code className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-medium">Tech</h3>
            <p className="text-xs text-muted-foreground mt-2">Technical & system design</p>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-colors ${selectedTrack === 'general' ? 'border-primary bg-primary/5' : 'hover:bg-accent'}`}
          onClick={() => onSelectTrack('general')}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <User className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-medium">General</h3>
            <p className="text-xs text-muted-foreground mt-2">Common questions for all roles</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
