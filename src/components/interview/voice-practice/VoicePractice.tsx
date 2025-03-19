
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InterviewQuestion, InterviewType } from '../types/interviewTypes';
import { VoiceSettings } from '../VoiceSettings';
import { VoicePracticeHeader } from './VoicePracticeHeader';
import { QuestionSection } from './QuestionSection';
import { RecordingControls } from './RecordingControls';
import { useVoicePractice } from './useVoicePractice';
import { Lightbulb, Info, Settings } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
  startRecording: parentStartRecording,
  stopRecording: parentStopRecording,
  selectedQuestion
}: VoicePracticeProps) {
  const {
    showVoiceSettings,
    setShowVoiceSettings,
    userTranscript,
    isGeneratingSpeech,
    isPlaying,
    isSpeechRecording,
    isTranscribing,
    readQuestionAloud,
    handleStartRecording,
    handleStopRecording,
    handleTextareaChange,
    stopSpeaking,
    isSupported,
    useWhisperApi,
    toggleWhisperApi
  } = useVoicePractice();

  const [activeTab, setActiveTab] = useState<string>('practice');

  const onStartRecording = () => {
    if (!isSupported) {
      return;
    }
    handleStartRecording();
    parentStartRecording(); // Call the parent component's recording function
  };

  const onStopRecording = () => {
    handleStopRecording();
    parentStopRecording(); // Call the parent component's stop recording function
  };

  const onReadQuestion = () => readQuestionAloud(selectedQuestion);

  return (
    <div className="space-y-4">
      <VoicePracticeHeader 
        interviewType={interviewType}
        setInterviewType={setInterviewType}
        onOpenVoiceSettings={() => setShowVoiceSettings(true)}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="tips">Tips & Strategy</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="practice" className="space-y-4 mt-4">
          <QuestionSection 
            question={selectedQuestion}
            isPracticing={isPracticing}
            onStartPractice={startPractice}
            onReadQuestion={onReadQuestion}
            isGeneratingSpeech={isGeneratingSpeech}
            isPlaying={isPlaying}
            onStopSpeaking={stopSpeaking}
          />

          <RecordingControls 
            isPracticing={isPracticing}
            isSpeechRecording={isSpeechRecording}
            isTranscribing={isTranscribing}
            userTranscript={userTranscript}
            onUserTranscriptChange={handleTextareaChange}
            onStartRecording={onStartRecording}
            onStopRecording={onStopRecording}
            onStartPractice={startPractice}
            onStopPractice={stopPractice}
          />
        </TabsContent>
        
        <TabsContent value="tips" className="mt-4">
          <div className="bg-muted p-4 rounded-lg space-y-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Voice Practice Tips</h3>
                <p className="text-sm">Practice speaking clearly and at a moderate pace. The speech recognition works best when you speak naturally without long pauses or very fast speech.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Interview Strategy</h3>
                <p className="text-sm">Record your answers and listen back to identify areas for improvement. Pay attention to filler words, pacing, and clarity. This tool helps you practice both your content and delivery.</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <div className="bg-muted p-4 rounded-lg space-y-4">
            <div className="flex items-start gap-3">
              <Settings className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-4 w-full">
                <h3 className="font-semibold">Speech Recognition Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="whisper-toggle" className="font-medium">Use OpenAI Whisper API</Label>
                    <p className="text-sm text-muted-foreground">
                      Higher accuracy but takes a few seconds to process
                    </p>
                  </div>
                  <Switch 
                    id="whisper-toggle" 
                    checked={useWhisperApi} 
                    onCheckedChange={toggleWhisperApi}
                  />
                </div>

                <div className="text-sm">
                  <p className="text-muted-foreground">
                    {useWhisperApi 
                      ? "Using OpenAI Whisper API: Better accuracy, especially for technical terms, but with a short processing delay." 
                      : "Using Browser Speech Recognition: Instant results but may be less accurate for complex terms."}
                  </p>
                </div>

                <Button 
                  variant="outline"
                  onClick={() => setShowVoiceSettings(true)}
                  className="w-full mt-2"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Voice Settings
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

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
