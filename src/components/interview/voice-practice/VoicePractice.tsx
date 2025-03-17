
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { InterviewQuestion, InterviewType } from '../types/interviewTypes';
import { VoiceSettings } from '../VoiceSettings';
import { VoicePracticeHeader } from './VoicePracticeHeader';
import { QuestionSection } from './QuestionSection';
import { RecordingControls } from './RecordingControls';
import { useVoicePractice } from './useVoicePractice';

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
    stopSpeaking
  } = useVoicePractice();

  const onStartRecording = () => {
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
