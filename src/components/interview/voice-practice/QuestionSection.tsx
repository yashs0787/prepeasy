
import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, MicOff, Loader2 } from 'lucide-react';
import { InterviewQuestion } from '../types/interviewTypes';

interface QuestionSectionProps {
  question: InterviewQuestion | null;
  isPracticing: boolean;
  onStartPractice: () => void;
  onReadQuestion: () => void;
  isGeneratingSpeech: boolean;
  isPlaying: boolean;
  onStopSpeaking: () => void;
}

export function QuestionSection({
  question,
  isPracticing,
  onStartPractice,
  onReadQuestion,
  isGeneratingSpeech,
  isPlaying,
  onStopSpeaking
}: QuestionSectionProps) {
  return (
    <div className="bg-muted p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Current Question:</h3>
        {isPracticing && question && (
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 px-2"
            onClick={isPlaying ? onStopSpeaking : onReadQuestion}
            disabled={isGeneratingSpeech || !question}
          >
            {isGeneratingSpeech ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : isPlaying ? (
              <MicOff className="h-3.5 w-3.5" />
            ) : (
              <Volume2 className="h-3.5 w-3.5" />
            )}
          </Button>
        )}
      </div>
      
      <p className="mb-4">
        {isPracticing && question
          ? question.text
          : "Start a practice session to get interview questions"}
      </p>
      
      {isPracticing && question && question.careerTrack === 'consulting' && (
        <div className="text-xs text-muted-foreground mt-2 bg-background/50 p-2 rounded">
          <strong>Tip:</strong> For case questions, structure your answer with a clear problem statement, analytical framework, and recommendation.
        </div>
      )}
    </div>
  );
}
