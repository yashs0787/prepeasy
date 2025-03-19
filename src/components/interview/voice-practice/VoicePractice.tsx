
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InterviewQuestion, InterviewType } from '../types/interviewTypes';
import { VoiceSettings } from '../VoiceSettings';
import { VoicePracticeHeader } from './VoicePracticeHeader';
import { QuestionSection } from './QuestionSection';
import { RecordingControls } from './RecordingControls';
import { useVoicePractice } from './useVoicePractice';
import { Lightbulb, Info } from 'lucide-react';

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
    readQuestionAloud,
    handleStartRecording,
    handleStopRecording,
    handleTextareaChange,
    stopSpeaking,
    isSupported
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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="tips">Tips & Strategy</TabsTrigger>
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
