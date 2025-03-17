
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mic, Send, Play, Pause, RotateCw, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { useSpeechRecognition } from './useSpeechRecognition';
import { CareerTrackSelector } from './CareerTrackSelector';
import { useInterviewAssistant } from './useInterviewAssistant';
import { TranscriptAnalysis } from './TranscriptAnalysis';

interface InterviewAssistantProps {
  profile?: any;
}

export function InterviewAssistant({ profile }: InterviewAssistantProps) {
  // Initialize careerTrack based on user profile
  const initialCareerTrack = mapProfileToCareerTrack(profile?.careerPath);
  
  const {
    careerTrack,
    setCareerTrack,
    interviewType,
    setInterviewType,
    isRecording,
    isPracticing,
    selectedQuestion,
    feedback,
    detailedFeedback,
    activeTab,
    setActiveTab,
    filteredQuestions,
    startRecording,
    stopRecording,
    startPractice,
    stopPractice,
    handleSelectQuestion,
    handleQuestionSubmit,
    question,
    setQuestion
  } = useInterviewAssistant(initialCareerTrack);
  
  // Speech recognition hook
  const {
    transcript,
    isSupported,
    startRecording: startSpeechRecognition,
    stopRecording: stopSpeechRecognition,
    isRecording: isSpeechRecording,
    resetTranscript
  } = useSpeechRecognition();
  
  // Handle career track changes from profile updates
  useEffect(() => {
    if (profile?.careerPath) {
      const mappedTrack = mapProfileToCareerTrack(profile.careerPath);
      setCareerTrack(mappedTrack);
    }
  }, [profile?.careerPath, setCareerTrack]);
  
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
      stopRecording();
    } else {
      startSpeechRecognition();
      startRecording();
    }
  };
  
  // Analysis handlers
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Interview Assistant</CardTitle>
        <CardDescription>
          Practice for interviews with AI-powered feedback and coaching
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="prepare">Prepare</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="analyze">Analyze</TabsTrigger>
          </TabsList>
          
          <TabsContent value="prepare" className="space-y-4">
            {/* Career track selector */}
            <CareerTrackSelector 
              selectedTrack={careerTrack}
              onSelectTrack={setCareerTrack}
            />
            
            {/* Question library */}
            <div className="space-y-4 mt-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Question Library</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse common interview questions for your career track
                </p>
                
                <div className="grid gap-2">
                  {filteredQuestions.map((q, index) => (
                    <div 
                      key={q.id} 
                      className={`p-3 border rounded-md cursor-pointer hover:bg-accent transition-colors ${selectedQuestion?.id === q.id ? 'border-primary bg-primary/10' : ''}`}
                      onClick={() => handleSelectQuestion(q)}
                    >
                      <div className="flex justify-between items-center">
                        <p>{q.text}</p>
                        {q.difficulty && (
                          <span className={`text-xs ${
                            q.difficulty === 'basic' ? 'bg-green-100 text-green-800' :
                            q.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          } px-2 py-1 rounded-full`}>
                            {q.difficulty}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedQuestion && feedback && (
                <div className="mt-6 p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-medium mb-2">Response Strategy:</h4>
                  <p className="text-sm">{feedback}</p>
                </div>
              )}
              
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-medium mb-2">Ask for Advice</h3>
                <form onSubmit={handleQuestionSubmit} className="space-y-4">
                  <Textarea
                    placeholder="Type an interview question you'd like advice on..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button type="submit" className="flex gap-2">
                    <Send size={16} /> Get Advice
                  </Button>
                </form>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="practice" className="space-y-4">
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
                          <Mic className="h-6 w-6" />
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
                <div className="p-4 border rounded-lg space-y-4">
                  <h4 className="font-medium">AI Feedback:</h4>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Score</span>
                    <div className="flex items-center">
                      <span className="text-lg font-bold mr-2">{detailedFeedback.score}</span>
                      <span className="text-sm text-muted-foreground">/100</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-green-600">Strengths</h5>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      {detailedFeedback.strengths.map((strength, idx) => (
                        <li key={idx}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-amber-600">Areas to Improve</h5>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      {detailedFeedback.improvements.map((improvement, idx) => (
                        <li key={idx}>{improvement}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {detailedFeedback.example && (
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Example Strong Response</h5>
                      <div className="text-sm p-3 bg-muted rounded-md">
                        {detailedFeedback.example}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="analyze" className="space-y-4">
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Upload Interview Recording</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload a recording of your interview for AI analysis and feedback
                </p>
                <Input type="file" accept="audio/*,video/*" />
                <p className="text-xs text-muted-foreground mt-2">
                  Supports audio and video files up to 500MB
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Recent Analysis</h3>
                <div className="grid gap-2">
                  <div className="p-3 border rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-medium">Mock Interview #1</p>
                      <p className="text-xs text-muted-foreground">Technical Interview • 15 minutes</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4" />
                      <span className="ml-1">View Feedback</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Practice Stats</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-accent/30 rounded-lg">
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-xs text-muted-foreground">Sessions</p>
                  </div>
                  <div className="p-3 bg-accent/30 rounded-lg">
                    <p className="text-2xl font-bold">45m</p>
                    <p className="text-xs text-muted-foreground">Total Time</p>
                  </div>
                  <div className="p-3 bg-accent/30 rounded-lg">
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-muted-foreground">Questions</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" onClick={() => setActiveTab('prepare')}>
          <RotateCw className="mr-2 h-4 w-4" /> Reset
        </Button>
        <Button>
          Save Progress
        </Button>
      </CardFooter>
    </Card>
  );
}
