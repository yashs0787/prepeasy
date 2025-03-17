
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Pause, Play } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface RecordingControlsProps {
  isPracticing: boolean;
  isSpeechRecording: boolean;
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
  userTranscript,
  onUserTranscriptChange,
  onStartRecording,
  onStopRecording,
  onStartPractice,
  onStopPractice
}: RecordingControlsProps) {
  if (!isPracticing) {
    return (
      <Button onClick={onStartPractice} className="w-full">
        <Play className="mr-2 h-4 w-4" /> Start Practice Session
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button
          size="lg"
          className={`rounded-full h-16 w-16 ${isSpeechRecording ? 'bg-red-500 hover:bg-red-600' : ''}`}
          onClick={isSpeechRecording ? onStopRecording : onStartRecording}
        >
          {isSpeechRecording ? (
            <MicOff className="h-6 w-6" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </Button>
      </div>
      
      <div className="text-center text-sm">
        {isSpeechRecording ? 'Recording... Click to stop' : 'Click to record your answer'}
      </div>
      
      {/* Transcript Display Area */}
      {(isSpeechRecording || userTranscript) && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Answer:</label>
          <Textarea 
            className={`min-h-[100px] ${isSpeechRecording ? 'border-red-500 animate-pulse' : ''}`}
            value={userTranscript}
            onChange={onUserTranscriptChange}
            placeholder="Your answer will appear here as you speak..."
          />
        </div>
      )}
      
      <Button variant="outline" onClick={onStopPractice} className="w-full">
        <Pause className="mr-2 h-4 w-4" /> End Practice Session
      </Button>
    </div>
  );
}
