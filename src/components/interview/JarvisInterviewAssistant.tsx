
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FeedbackDisplay } from './FeedbackDisplay';
import { TranscriptAnalysis } from './TranscriptAnalysis';
import { CasePractice } from './CasePractice';
import { useInterviewAssistant, CareerTrack } from './useInterviewAssistant';
import { useSpeechRecognition } from './useSpeechRecognition';
import {
  Mic, MicOff, Video, VideoOff, MessageSquare, 
  Play, Pause, RotateCw, Brain, Briefcase, 
  User, Clock, BarChart, Award, Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

interface JarvisInterviewAssistantProps {
  profile?: any;
}

export function JarvisInterviewAssistant({ profile }: JarvisInterviewAssistantProps) {
  const [activeView, setActiveView] = useState<'interview' | 'case-practice'>('interview');
  const [showAITyping, setShowAITyping] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  
  const initialCareerTrack = mapProfileToCareerTrack(profile?.careerPath);
  
  const {
    careerTrack,
    setCareerTrack,
    interviewType,
    setInterviewType,
    isPracticing,
    activeTab,
    setActiveTab,
    startPractice,
    stopPractice,
    selectedQuestion,
    feedback,
    detailedFeedback,
  } = useInterviewAssistant(initialCareerTrack);

  const {
    transcript,
    isSupported,
    startRecording,
    stopRecording,
    isRecording,
    resetTranscript
  } = useSpeechRecognition();

  // Simulate AI typing effect
  useEffect(() => {
    if (!feedback) return;
    
    setShowAITyping(true);
    setAiResponse('');
    
    const fullText = detailedFeedback ? 
      `I've analyzed your response and have some feedback for you.` : 
      feedback;
      
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setAiResponse(prev => prev + fullText.charAt(index));
        index++;
      } else {
        setShowAITyping(false);
        clearInterval(typingInterval);
      }
    }, 15);
    
    return () => clearInterval(typingInterval);
  }, [feedback, detailedFeedback]);

  // Map profile career path to interview assistant career track
  function mapProfileToCareerTrack(careerPath: string): CareerTrack {
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

  const handleStartRecording = () => {
    if (!isSupported) {
      toast.error("Speech recognition is not supported in your browser");
      return;
    }
    
    if (!isPracticing) {
      startPractice();
    }
    
    resetTranscript();
    startRecording();
    toast.info("Recording started");
  };

  const handleStopRecording = async () => {
    stopRecording();
    toast.info("Analyzing your response...");
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleAnalyzeResponse = () => {
    if (!transcript.trim()) {
      toast.error("Please record or type your response first");
      return;
    }
    
    // Simulate a loading state
    toast.info("Analyzing your response...");
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-slate-50 p-4 sm:p-8 rounded-xl shadow-lg">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Jarvis</h1>
              <p className="text-sm text-muted-foreground">Your AI Interview Coach</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={activeView === 'interview' ? 'default' : 'outline'} 
              onClick={() => setActiveView('interview')}
              size="sm"
              className="shadow-sm"
            >
              <User className="h-4 w-4 mr-1" /> Interview Practice
            </Button>
            <Button 
              variant={activeView === 'case-practice' ? 'default' : 'outline'} 
              onClick={() => setActiveView('case-practice')}
              size="sm"
              className="shadow-sm"
            >
              <Briefcase className="h-4 w-4 mr-1" /> Case Practice
            </Button>
          </div>
        </div>

        {activeView === 'interview' ? (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Main interview area - 3/5 width on large screens */}
            <div className="lg:col-span-3 space-y-6">
              <Card className="border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-4 text-white">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold">Active Interview Session</h2>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">12:45</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 space-y-6">
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Current Question:</h3>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <p>{selectedQuestion?.text || "Describe a time when you had to work with a difficult team member. How did you handle it?"}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium">Your Response:</h3>
                      <Badge variant={isRecording ? "destructive" : "outline"} className="animate-pulse">
                        {isRecording ? "Recording..." : "Ready"}
                      </Badge>
                    </div>

                    <Textarea 
                      value={transcript} 
                      onChange={(e) => resetTranscript(e.target.value)}
                      placeholder="Your answer will appear here as you speak..."
                      className={`min-h-[120px] ${isRecording ? 'border-red-500' : ''}`}
                    />

                    <div className="flex justify-center mt-4">
                      <div className="flex gap-3">
                        <Button
                          variant={isRecording ? "destructive" : "default"}
                          size="lg"
                          className="rounded-full h-16 w-16 flex items-center justify-center shadow-md"
                          onClick={isRecording ? handleStopRecording : handleStartRecording}
                        >
                          {isRecording ? (
                            <MicOff className="h-6 w-6" />
                          ) : (
                            <Mic className="h-6 w-6" />
                          )}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="lg"
                          className="rounded-full h-16 w-16 flex items-center justify-center border-dashed"
                          onClick={handleAnalyzeResponse}
                          disabled={!transcript.trim() || isRecording}
                        >
                          <Brain className="h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feedback display area */}
              {(feedback || aiResponse) && (
                <div className="space-y-2">
                  <h3 className="font-medium ml-1">Jarvis Feedback:</h3>
                  
                  {showAITyping ? (
                    <Card className="border border-slate-200 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center flex-shrink-0 mt-1">
                            <Sparkles className="h-4 w-4 text-white" />
                          </div>
                          <div className="space-y-2 flex-1">
                            <p>{aiResponse}</p>
                            <div className="flex gap-1">
                              <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
                              <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse delay-150"></span>
                              <span className="h-2 w-2 rounded-full bg-indigo-300 animate-pulse delay-300"></span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <FeedbackDisplay 
                      feedback={feedback} 
                      detailedFeedback={detailedFeedback} 
                    />
                  )}
                </div>
              )}
            </div>

            {/* Sidebar - 2/5 width on large screens */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border border-slate-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Interview Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs defaultValue="prepare">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="prepare">Prepare</TabsTrigger>
                      <TabsTrigger value="practice">Practice</TabsTrigger>
                      <TabsTrigger value="analyze">Review</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="prepare">
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Career Track</label>
                          <div className="grid grid-cols-2 gap-2">
                            {['general', 'tech', 'consulting', 'investment-banking'].map((track) => (
                              <Button
                                key={track}
                                variant={careerTrack === track ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCareerTrack(track as CareerTrack)}
                                className="justify-start"
                              >
                                <span className="capitalize">{track.replace('-', ' ')}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Interview Type</label>
                          <div className="grid grid-cols-1 gap-2">
                            {['behavioral', 'technical', 'case', 'general'].map((type) => (
                              <Button
                                key={type}
                                variant={interviewType === type ? "default" : "outline"}
                                size="sm"
                                onClick={() => setInterviewType(type as any)}
                                className="justify-start"
                              >
                                <span className="capitalize">{type}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="practice">
                      <div className="space-y-3">
                        <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
                          <h4 className="text-sm font-medium mb-2">Active Session</h4>
                          <div className="flex justify-between">
                            <div className="text-xs text-muted-foreground">Question Count</div>
                            <div className="text-xs font-medium">1 of 5</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-xs text-muted-foreground">Time Elapsed</div>
                            <div className="text-xs font-medium">12:45</div>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full" 
                          variant={isPracticing ? "outline" : "default"}
                          onClick={isPracticing ? stopPractice : startPractice}
                        >
                          {isPracticing ? (
                            <>
                              <Pause className="mr-2 h-4 w-4" /> End Session
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" /> Start Session
                            </>
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="analyze">
                      <div className="space-y-3">
                        <div className="bg-slate-50 p-3 rounded-md border border-slate-200 flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-medium">Performance Score</h4>
                            <div className="text-2xl font-bold text-indigo-600">85/100</div>
                          </div>
                          <BarChart className="h-10 w-10 text-indigo-400" />
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Recent Sessions</h4>
                          <div className="grid grid-cols-1 gap-2">
                            {[
                              {date: "May 15", type: "Behavioral", score: 85},
                              {date: "May 14", type: "Technical", score: 78},
                              {date: "May 12", type: "Case Study", score: 92},
                            ].map((session, i) => (
                              <div key={i} className="flex justify-between items-center p-2 border rounded-md text-sm">
                                <div>
                                  <div>{session.date}</div>
                                  <div className="text-xs text-muted-foreground">{session.type}</div>
                                </div>
                                <Badge variant={session.score > 80 ? "default" : "secondary"}>
                                  {session.score}/100
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Tips & Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Award className="h-5 w-5 text-indigo-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">Structure your answers with the STAR method</h4>
                        <p className="text-xs text-muted-foreground">Situation, Task, Action, Result</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Award className="h-5 w-5 text-indigo-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">Quantify your achievements</h4>
                        <p className="text-xs text-muted-foreground">Use numbers to add credibility</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Award className="h-5 w-5 text-indigo-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">Ask clarifying questions</h4>
                        <p className="text-xs text-muted-foreground">Ensure you understand what's being asked</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <Button variant="outline" className="w-full" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" /> All Interview Tips
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <CasePractice />
        )}
        
        {/* Footer */}
        <div className="flex justify-between items-center mt-8 text-sm text-muted-foreground">
          <div>
            <span>© 2023 Jarvis AI | Your AI-powered interview coach</span>
          </div>
          <div className="flex gap-6">
            <Button variant="link" size="sm" className="text-muted-foreground p-0 h-auto">Help</Button>
            <Button variant="link" size="sm" className="text-muted-foreground p-0 h-auto">Privacy</Button>
            <Button variant="link" size="sm" className="text-muted-foreground p-0 h-auto">Terms</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
