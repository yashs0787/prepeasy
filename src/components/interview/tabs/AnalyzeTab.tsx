
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Award, ArrowRight } from 'lucide-react';

export function AnalyzeTab() {
  return (
    <div className="space-y-4">
      <div className="bg-muted p-4 rounded-lg">
        <h3 className="font-medium mb-2">Upload Interview Recording</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Upload a recording of your interview for AI analysis and feedback
        </p>
        <Input type="file" accept="audio/*,video/*" />
        <p className="text-xs text-muted-foreground mt-2">
          Supports audio and video files up to 500MB
        </p>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Recent Analysis</h3>
        <div className="grid gap-2">
          <div className="p-3 border rounded-md flex justify-between items-center">
            <div>
              <p className="font-medium">Mock Interview #1</p>
              <p className="text-xs text-muted-foreground">Technical Interview • 15 minutes</p>
            </div>
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4" />
              <span className="ml-1">View Feedback</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <h3 className="font-medium mb-2">Practice Stats</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-accent/30 rounded-lg">
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-muted-foreground">Sessions</p>
          </div>
          <div className="p-3 bg-accent/30 rounded-lg">
            <p className="text-2xl font-bold">45m</p>
            <p className="text-xs text-muted-foreground">Total Time</p>
          </div>
          <div className="p-3 bg-accent/30 rounded-lg">
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-muted-foreground">Questions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
