
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, MicOff, RefreshCw, PlayCircle, StopCircle, Cpu } from 'lucide-react';

interface RecordingControlsProps {
  isPracticing: boolean;
  isSpeechRecording: boolean;
  userTranscript: string;
  onUserTranscriptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onStartPractice: () => void;
  onStopPractice: () => void;
  onSwitchModel?: () => void;
  activeModel?: string;
}

export function RecordingControls({
  isPracticing,
  isSpeechRecording,
  userTranscript,
  onUserTranscriptChange,
  onStartRecording,
  onStopRecording,
  onStartPractice,
  onStopPractice,
  onSwitchModel,
  activeModel = 'Claude 3 Sonnet'
}: RecordingControlsProps) {
  return (
    <div className="space-y-4">
      <Textarea
        placeholder={isPracticing ? "Your answer will appear here as you speak..." : "Start a practice session to answer interview questions"}
        value={userTranscript}
        onChange={onUserTranscriptChange}
        className="min-h-[150px] resize-none"
        disabled={!isPracticing}
      />
      
      <div className="flex flex-wrap gap-2 justify-between">
        <div className="flex gap-2">
          {!isPracticing ? (
            <Button onClick={onStartPractice}>
              <PlayCircle className="mr-2 h-4 w-4" /> 
              Start Practice
            </Button>
          ) : (
            <>
              <Button 
                variant={isSpeechRecording ? "destructive" : "default"}
                onClick={isSpeechRecording ? onStopRecording : onStartRecording}
                disabled={!isPracticing}
              >
                {isSpeechRecording ? (
                  <>
                    <MicOff className="mr-2 h-4 w-4" /> 
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-4 w-4" /> 
                    Record Answer
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={onStopPractice}
              >
                <StopCircle className="mr-2 h-4 w-4" /> 
                End Practice
              </Button>
            </>
          )}
        </div>
        
        {isPracticing && onSwitchModel && (
          <Button 
            variant="outline" 
            size="sm" 
            className="flex gap-1.5 items-center" 
            onClick={onSwitchModel}
          >
            <Cpu className="h-3.5 w-3.5" />
            Switch to {activeModel === 'Claude 3 Sonnet' ? 'GPT-4 Turbo' : 'Claude 3 Sonnet'}
          </Button>
        )}
      </div>
    </div>
  );
}
