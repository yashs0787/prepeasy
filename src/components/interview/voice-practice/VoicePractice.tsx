
import React, { useState, useEffect } from 'react';
import { useVoicePractice } from './useVoicePractice';
import { Card } from '@/components/ui/card'; 
import { Button } from '@/components/ui/button';
import { VoicePracticeHeader } from './VoicePracticeHeader';
import { QuestionSection } from './QuestionSection';
import { RecordingControls } from './RecordingControls';
import { TranscriptAnalysis } from '../TranscriptAnalysis';
import { VoiceSettings } from '../VoiceSettings';
import { InterviewQuestion } from '../types/interviewTypes';

interface VoicePracticeProps {
  question: InterviewQuestion | null;
  careerTrack?: string;
  interviewType?: string;
}

export function VoicePractice({ 
  question,
  careerTrack = 'general',
  interviewType = 'general'
}: VoicePracticeProps) {
  const [isPracticing, setIsPracticing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const { 
    showVoiceSettings,
    setShowVoiceSettings,
    userTranscript,
    setUserTranscript,
    isGeneratingSpeech,
    isPlaying,
    isSpeechRecording,
    isTranscribing,
    readQuestionAloud,
    handleStartRecording,
    handleStopRecording,
    handleTextareaChange,
    stopSpeaking,
    apiKey,
    useWhisperApi,
    toggleWhisperApi
  } = useVoicePractice();

  // Reset transcript when a new question is selected
  useEffect(() => {
    if (question) {
      setUserTranscript('');
      setIsAnalyzed(false);
    }
  }, [question, setUserTranscript]);

  const handleStartPractice = async () => {
    setIsPracticing(true);
    setIsAnalyzed(false);
    
    // Read the question aloud if we have an API key
    if (question) {
      await readQuestionAloud(question);
    }
  };

  const handleStopPractice = () => {
    setIsPracticing(false);
    // Stop any speech that might be playing
    stopSpeaking();
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis time
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsAnalyzed(true);
    }, 1500);
  };

  // If showing voice settings, render the settings UI
  if (showVoiceSettings) {
    return (
      <VoiceSettings 
        onClose={() => setShowVoiceSettings(false)} 
        useWhisperApi={useWhisperApi}
        onToggleWhisperApi={toggleWhisperApi}
      />
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <VoicePracticeHeader 
          isPracticing={isPracticing}
          isGeneratingSpeech={isGeneratingSpeech}
          isPlaying={isPlaying}
          hasApiKey={!!apiKey}
          onConfigureVoice={() => setShowVoiceSettings(true)}
        />
        
        {question && (
          <QuestionSection 
            question={question}
            onReadAloud={() => readQuestionAloud(question)}
            isGeneratingSpeech={isGeneratingSpeech}
            isPlaying={isPlaying}
            onStopSpeaking={stopSpeaking}
          />
        )}
        
        <RecordingControls
          isPracticing={isPracticing}
          isSpeechRecording={isSpeechRecording}
          isTranscribing={isTranscribing}
          userTranscript={userTranscript}
          onUserTranscriptChange={handleTextareaChange}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
          onStartPractice={handleStartPractice}
          onStopPractice={handleStopPractice}
        />
      </Card>
      
      {isPracticing && userTranscript && (
        <TranscriptAnalysis
          transcript={userTranscript}
          onTranscriptChange={setUserTranscript}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          isAnalyzed={isAnalyzed}
          currentQuestion={question?.text}
          careerTrack={careerTrack}
          interviewType={interviewType}
        />
      )}
    </div>
  );
}
