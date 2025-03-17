
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mic, Send, Play, Pause, RotateCw, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface InterviewAssistantProps {
  profile?: any;
}

export function InterviewAssistant({ profile }: InterviewAssistantProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [activeTab, setActiveTab] = useState('prepare');
  const [question, setQuestion] = useState('');
  const [feedback, setFeedback] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [interviewType, setInterviewType] = useState('technical');
  
  // Sample questions based on career path
  const careerPath = profile?.careerPath || 'tech';
  
  const sampleQuestions = {
    tech: [
      "Explain how you would design a scalable microservice architecture.",
      "Describe a challenging technical problem you've solved recently.",
      "How do you stay updated with the latest technology trends?",
    ],
    finance: [
      "How do you analyze financial risk in an investment portfolio?",
      "Explain how you would value a company for acquisition.",
      "What financial metrics do you prioritize when evaluating business performance?",
    ],
    consulting: [
      "Walk me through how you would approach a client with declining sales.",
      "Describe a time when you had to persuade a difficult stakeholder.",
      "How do you structure your approach to solving complex business problems?",
    ],
    general: [
      "Tell me about yourself and your career aspirations.",
      "Describe a time when you faced a significant challenge at work.",
      "What are your greatest professional strengths and weaknesses?",
    ],
  };

  const getQuestionsForPath = () => {
    if (careerPath === 'tech' || careerPath === 'technology') return sampleQuestions.tech;
    if (careerPath === 'finance' || careerPath === 'finance_accounting') return sampleQuestions.finance;
    if (careerPath === 'consulting' || careerPath === 'management_consulting') return sampleQuestions.consulting;
    return sampleQuestions.general;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    toast.info("Microphone recording started");
    // This would normally connect to a speech-to-text API
    setTimeout(() => {
      toast.success("Answer recorded. Processing feedback...");
      setIsRecording(false);
      setFeedback(
        "Great answer! You articulated your technical knowledge well. Consider adding more specific examples of projects where you've implemented these concepts. Also, try to connect your answer more directly to the company's specific needs."
      );
    }, 5000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    toast.info("Recording stopped");
  };

  const handleStartPractice = () => {
    setIsPracticing(true);
    toast.info("Starting mock interview session");
  };

  const handleStopPractice = () => {
    setIsPracticing(false);
    toast.info("Interview practice session ended");
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    toast.info("Processing your question...");
    
    setTimeout(() => {
      setFeedback(
        "This is a common behavioral question focusing on your problem-solving abilities. In your answer, use the STAR method (Situation, Task, Action, Result) to structure a concise response. Focus on a specific example where you successfully overcame a challenge, emphasizing your analytical approach and the positive outcome."
      );
    }, 2000);
  };

  const handleSelectQuestion = (q: string) => {
    setSelectedQuestion(q);
    toast.info("Question selected");
    
    setTimeout(() => {
      setFeedback(
        "This question assesses your technical depth and communication skills. Start with a high-level overview of microservice architecture principles, then dive into specific considerations like service boundaries, communication patterns, and deployment strategies. Include a brief example from your experience if possible."
      );
    }, 1000);
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
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Question Library</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse common interview questions for your career path
                </p>
                
                <div className="grid gap-2">
                  {getQuestionsForPath().map((q, index) => (
                    <div 
                      key={index} 
                      className={`p-3 border rounded-md cursor-pointer hover:bg-accent transition-colors ${selectedQuestion === q ? 'border-primary bg-primary/10' : ''}`}
                      onClick={() => handleSelectQuestion(q)}
                    >
                      <p>{q}</p>
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
                      <SelectItem value="general">General Interview</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Current Question:</h3>
                  <p className="mb-4">{
                    isPracticing 
                      ? "Describe a challenging project you worked on and how you overcame obstacles to deliver it successfully."
                      : "Start a practice session to get interview questions"
                  }</p>
                  
                  {!isPracticing ? (
                    <Button onClick={handleStartPractice} className="w-full">
                      <Play className="mr-2 h-4 w-4" /> Start Practice Session
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <Button
                          size="lg"
                          className={`rounded-full h-16 w-16 ${isRecording ? 'bg-red-500 hover:bg-red-600' : ''}`}
                          onClick={isRecording ? handleStopRecording : handleStartRecording}
                        >
                          <Mic className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="text-center text-sm">
                        {isRecording ? 'Recording... Click to stop' : 'Click to record your answer'}
                      </div>
                      <Button variant="outline" onClick={handleStopPractice} className="w-full">
                        <Pause className="mr-2 h-4 w-4" /> End Practice Session
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {feedback && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">AI Feedback:</h4>
                  <p className="text-sm">{feedback}</p>
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
