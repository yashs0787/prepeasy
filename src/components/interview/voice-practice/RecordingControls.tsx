
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, MicOff, PlayCircle, StopCircle, Loader2 } from 'lucide-react';

interface RecordingControlsProps {
  isPracticing: boolean;
  isSpeechRecording: boolean;
  isTranscribing?: boolean; // New prop for Whisper API processing
  userTranscript: string;
  onUserTranscriptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onStartPractice: () => void;
  onStopPractice: () => void;
}

export function RecordingControls({
  isPracticing,
  isSpeechRecording,
  isTranscribing = false,
  userTranscript,
  onUserTranscriptChange,
  onStartRecording,
  onStopRecording,
  onStartPractice,
  onStopPractice
}: RecordingControlsProps) {
  return (
    <div className="space-y-4">
      <Textarea
        placeholder={isPracticing 
          ? (isSpeechRecording 
              ? "Speaking... Your words will appear here in real-time" 
              : isTranscribing
                ? "Processing your speech... Please wait"
                : "Your answer will appear here as you speak...")
          : "Start a practice session to answer interview questions"}
        value={userTranscript}
        onChange={onUserTranscriptChange}
        className="min-h-[150px] resize-none"
        disabled={!isPracticing || isSpeechRecording || isTranscribing}
      />
      
      <div className="flex flex-wrap gap-2">
        {!isPracticing ? (
          <Button onClick={onStartPractice}>
            <PlayCircle className="mr-2 h-4 w-4" /> 
            Start Practice
          </Button>
        ) : (
          <>
            {isTranscribing ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Speech...
              </Button>
            ) : (
              <Button 
                variant={isSpeechRecording ? "destructive" : "default"}
                onClick={isSpeechRecording ? onStopRecording : onStartRecording}
                disabled={!isPracticing || isTranscribing}
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
            )}
            
            <Button
              variant="outline"
              onClick={onStopPractice}
              disabled={isTranscribing}
            >
              <StopCircle className="mr-2 h-4 w-4" /> 
              End Practice
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
