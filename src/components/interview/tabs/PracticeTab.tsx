
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { toast } from 'sonner';
import { useSpeechRecognition } from '../useSpeechRecognition';
import { TranscriptAnalysis } from '../TranscriptAnalysis';
import { FeedbackDisplay } from '../FeedbackDisplay';
import { useInterviewAssistant, InterviewType } from '../useInterviewAssistant';

interface PracticeTabProps {
  interviewType: InterviewType;
  setInterviewType: (value: string) => void;
  isPracticing: boolean;
  profile?: any;
}

export function PracticeTab({ 
  interviewType, 
  setInterviewType,
  isPracticing,
  profile 
}: PracticeTabProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  
  const {
    selectedQuestion,
    detailedFeedback,
    startPractice,
    stopPractice
  } = useInterviewAssistant(profile?.careerPath ? mapProfileToCareerTrack(profile.careerPath) : 'general');

  // Speech recognition hook
  const {
    transcript,
    isSupported,
    startRecording: startSpeechRecognition,
    stopRecording: stopSpeechRecognition,
    isRecording: isSpeechRecording,
    resetTranscript
  } = useSpeechRecognition();

  // Map profile career path to interview assistant career track
  function mapProfileToCareerTrack(careerPath: string): 'consulting' | 'investment-banking' | 'tech' | 'general' {
    if (!careerPath) return 'general';
    
    switch (careerPath) {
      case 'consulting':
      case 'management_consulting': 
        return 'consulting';
      case 'investment_banking': 
        return 'investment-banking';
      case 'tech':
      case 'technology': 
        return 'tech';
      default: 
        return 'general';
    }
  }

  // Handle speech recording toggle
  const toggleRecording = () => {
    if (isSpeechRecording) {
      stopSpeechRecognition();
    } else {
      startSpeechRecognition();
    }
  };

  const handleAnalyze = () => {
    if (!transcript.trim()) return;
    
    setIsAnalyzing(true);
    toast.info("Analyzing your response...");
    
    // Simulate analysis (would connect to AI API in production)
    setTimeout(() => {
      setIsAnalyzed(true);
      setIsAnalyzing(false);
      toast.success("Analysis complete!");
    }, 2000);
  };

  // Reset for new practice session
  const handleStartNewSession = () => {
    resetTranscript();
    setIsAnalyzed(false);
    startPractice();
  };
  
  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Interview Type</label>
          <Select value={interviewType} onValueChange={setInterviewType}>
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
          <h3 className="font-medium mb-2">Current Question:</h3>
          <p className="mb-4">{
            selectedQuestion 
              ? selectedQuestion.text
              : isPracticing 
                ? "Describe a challenging project you worked on and how you overcame obstacles to deliver it successfully."
                : "Start a practice session to get interview questions"
          }</p>
          
          {!isPracticing ? (
            <Button onClick={handleStartNewSession} className="w-full">
              <Play className="mr-2 h-4 w-4" /> Start Practice Session
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <Button
                  size="lg"
                  className={`rounded-full h-16 w-16 ${isSpeechRecording ? 'bg-red-500 hover:bg-red-600' : ''}`}
                  onClick={toggleRecording}
                  disabled={!isSupported}
                >
                  <span className="sr-only">
                    {isSpeechRecording ? 'Stop Recording' : 'Start Recording'}
                  </span>
                </Button>
              </div>
              <div className="text-center text-sm">
                {isSpeechRecording ? 'Recording... Click to stop' : 'Click to record your answer'}
              </div>
              
              <TranscriptAnalysis
                transcript={transcript}
                onTranscriptChange={resetTranscript}
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
                isAnalyzed={isAnalyzed}
              />
              
              <Button variant="outline" onClick={stopPractice} className="w-full mt-4">
                <Pause className="mr-2 h-4 w-4" /> End Practice Session
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {isAnalyzed && detailedFeedback && (
        <FeedbackDisplay 
          feedback="Your response has been analyzed."
          detailedFeedback={detailedFeedback}
        />
      )}
    </div>
  );
}
