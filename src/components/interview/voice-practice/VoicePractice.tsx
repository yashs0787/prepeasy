
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InterviewQuestion, InterviewType } from '../types/interviewTypes';
import { VoiceSettings } from '../VoiceSettings';
import { VoicePracticeHeader } from './VoicePracticeHeader';
import { QuestionSection } from './QuestionSection';
import { RecordingControls } from './RecordingControls';
import { useVoicePractice } from './useVoicePractice';
import { Lightbulb, Info, Cpu } from 'lucide-react';

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
    activeModel,
    readQuestionAloud,
    handleStartRecording,
    handleStopRecording,
    handleTextareaChange,
    stopSpeaking,
    switchModel
  } = useVoicePractice();

  const [activeTab, setActiveTab] = useState<string>('practice');

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
      <div className="flex items-center justify-between">
        <VoicePracticeHeader 
          interviewType={interviewType}
          setInterviewType={setInterviewType}
          onOpenVoiceSettings={() => setShowVoiceSettings(true)}
        />
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Cpu className="h-3 w-3" />
            <span>AI Model: {activeModel}</span>
          </Badge>
        </div>
      </div>
      
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
            onSwitchModel={switchModel}
            activeModel={activeModel}
          />
        </TabsContent>
        
        <TabsContent value="tips" className="mt-4">
          <div className="bg-muted p-4 rounded-lg space-y-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Case Framework Structure</h3>
                <p className="text-sm">For case interviews, use frameworks like the Profitability Framework, Market Entry, or Porter's Five Forces depending on the case type. Structure your answer with a clear introduction, analysis, and recommendation.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">AI Model Strategy</h3>
                <p className="text-sm">Our system uses Claude 3 Sonnet for structured reasoning and logical case breakdowns. For detailed explanations or when you need more guidance, you can switch to GPT-4 Turbo using the button below the answer area.</p>
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
