
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mic, MicOff, RotateCw } from 'lucide-react';
import { toast } from 'sonner';
import { InterviewQuestion, InterviewType } from '../types/interviewTypes';
import { QuestionLibrary } from '../QuestionLibrary';
import { TranscriptAnalysis } from '../TranscriptAnalysis';
import { FeedbackDisplay } from '../FeedbackDisplay';
import { useSpeechToText } from '../hooks/useSpeechToText';
import { useInterviewAssistant } from '../useInterviewAssistant';

interface PracticeTabProps {
  interviewType: InterviewType;
  setInterviewType: (type: InterviewType) => void;
  isPracticing: boolean;
  profile?: any;
}

export function PracticeTab({
  interviewType,
  setInterviewType,
  isPracticing,
  profile
}: PracticeTabProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null);
  const [transcript, setTranscript] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  
  // Sample questions for demonstration
  const [questions, setQuestions] = useState<InterviewQuestion[]>([
    {
      id: '1',
      text: 'Tell me about yourself',
      type: 'general',
      difficulty: 'basic',
      careerTrack: 'general'
    },
    {
      id: '2',
      text: 'What is your greatest strength?',
      type: 'behavioral',
      difficulty: 'basic',
      careerTrack: 'general'
    },
    {
      id: '3',
      text: 'Tell me about a time you faced a challenge at work',
      type: 'behavioral',
      difficulty: 'intermediate',
      careerTrack: 'general'
    }
  ]);
  
  const {
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    setText
  } = useSpeechToText();
  
  const handleSelectQuestion = (question: InterviewQuestion) => {
    setSelectedQuestion(question);
    setCurrentQuestion(question.text);
    setTranscript('');
    setFeedback(null);
    setIsAnalyzed(false);
  };
  
  const handleRecord = () => {
    if (isListening) {
      stopListening();
      setText(transcript);
    } else {
      startListening();
      setTranscript('');
      resetTranscript();
    }
  };

  const handleAnalyzeResponse = useCallback(async () => {
    setIsAnalyzing(true);
    setIsAnalyzed(false);
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsAnalyzing(false);
    setIsAnalyzed(true);
    setFeedback("Great answer! You clearly articulated your strengths and provided specific examples.");
    
    toast.success("Response analyzed");
  }, []);
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="interview-type" className="text-sm font-medium">
          Interview Type
        </Label>
        <Select value={interviewType} onValueChange={(value) => setInterviewType(value as InterviewType)}>
          <SelectTrigger id="interview-type" className="w-full">
            <SelectValue placeholder="Select interview type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
            <SelectItem value="behavioral">Behavioral</SelectItem>
            <SelectItem value="case">Case Study</SelectItem>
            <SelectItem value="financial">Financial</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Question</CardTitle>
            <CardDescription>Select a question to practice</CardDescription>
          </CardHeader>
          <CardContent>
            <QuestionLibrary 
              onSelectQuestion={handleSelectQuestion} 
              questions={questions}
              selectedQuestion={selectedQuestion}
              learningResources={[]}
            />
          </CardContent>
        </Card>
        
        {isPracticing && selectedQuestion && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Practice</CardTitle>
                <CardDescription>Record your answer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Question</Label>
                  <Input 
                    id="question" 
                    value={selectedQuestion.text} 
                    readOnly 
                  />
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleRecord}
                  disabled={isAnalyzing}
                >
                  {isListening ? (
                    <>
                      <MicOff className="h-4 w-4 mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 mr-2" />
                      Start Recording
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
            
            <TranscriptAnalysis 
              transcript={transcript}
              onTranscriptChange={setTranscript}
              onAnalyze={handleAnalyzeResponse}
              isAnalyzing={isAnalyzing}
              isAnalyzed={isAnalyzed}
              currentQuestion={currentQuestion}
              careerTrack={selectedQuestion.careerTrack}
              interviewType={selectedQuestion.type}
            />
          </>
        )}
        
        {isAnalyzed && feedback && (
          <FeedbackDisplay feedback={feedback} />
        )}
      </div>
    </div>
  );
}
