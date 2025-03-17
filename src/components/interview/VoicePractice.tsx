
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mic, Pause, Play, Volume2, Settings, Loader2 } from 'lucide-react';
import { InterviewQuestion, InterviewType } from './useInterviewAssistant';
import { VoiceSettings } from './VoiceSettings';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useElevenLabsVoice } from './useElevenLabsVoice';

interface VoicePracticeProps {
  interviewType: InterviewType;
  setInterviewType: (type: InterviewType) => void;
  isPracticing: boolean;
  isRecording: boolean;
  startPractice: () => void;
  stopPractice: () => void;
  startRecording: () => void;
  stopRecording: () => void;
  selectedQuestion: InterviewQuestion | null;
}

export function VoicePractice({
  interviewType,
  setInterviewType,
  isPracticing,
  isRecording,
  startPractice,
  stopPractice,
  startRecording,
  stopRecording,
  selectedQuestion
}: VoicePracticeProps) {
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const { 
    apiKey, 
    speakText, 
    isPlaying, 
    stopSpeaking 
  } = useElevenLabsVoice();

  const readQuestionAloud = async () => {
    if (selectedQuestion && apiKey) {
      await speakText(selectedQuestion.text);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">Interview Type</label>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs" 
              onClick={() => setShowVoiceSettings(true)}
            >
              <Settings className="h-3.5 w-3.5 mr-1" />
              Voice Settings
            </Button>
          </div>
          <Select value={interviewType} onValueChange={(value) => setInterviewType(value as InterviewType)}>
            <SelectTrigger>
              <SelectValue placeholder="Select interview type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technical">Technical Interview</SelectItem>
              <SelectItem value="behavioral">Behavioral Interview</SelectItem>
              <SelectItem value="case">Case Study Interview</SelectItem>
              <SelectItem value="financial">Financial Interview</SelectItem>
              <SelectItem value="general">General Interview</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Current Question:</h3>
            {isPracticing && selectedQuestion && apiKey && (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 px-2"
                onClick={isPlaying ? stopSpeaking : readQuestionAloud}
                disabled={!selectedQuestion}
              >
                {isPlaying ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5" />
                )}
              </Button>
            )}
          </div>
          <p className="mb-4">{
            isPracticing && selectedQuestion
              ? selectedQuestion.text
              : "Start a practice session to get interview questions"
          }</p>
          
          {!isPracticing ? (
            <Button onClick={startPractice} className="w-full">
              <Play className="mr-2 h-4 w-4" /> Start Practice Session
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <Button
                  size="lg"
                  className={`rounded-full h-16 w-16 ${isRecording ? 'bg-red-500 hover:bg-red-600' : ''}`}
                  onClick={isRecording ? stopRecording : startRecording}
                >
                  <Mic className="h-6 w-6" />
                </Button>
              </div>
              <div className="text-center text-sm">
                {isRecording ? 'Recording... Click to stop' : 'Click to record your answer'}
              </div>
              <Button variant="outline" onClick={stopPractice} className="w-full">
                <Pause className="mr-2 h-4 w-4" /> End Practice Session
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Voice Settings Dialog */}
      <Dialog open={showVoiceSettings} onOpenChange={setShowVoiceSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Voice Settings</DialogTitle>
          </DialogHeader>
          <VoiceSettings onClose={() => setShowVoiceSettings(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
