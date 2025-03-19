import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Mic, MicOff, Send, Video, MessageSquare, BookOpen, Lightbulb } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const INTERVIEW_TYPES = [
  { id: 'behavioral', name: 'Behavioral Interview' },
  { id: 'technical', name: 'Technical Interview' },
  { id: 'case', name: 'Case Interview' },
  { id: 'general', name: 'General Practice' },
];

const DIFFICULTY_LEVELS = [
  { id: 'beginner', name: 'Beginner' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'advanced', name: 'Advanced' },
];

export const JarvisInterviewAssistant: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('chat');
  const [interviewType, setInterviewType] = useState('behavioral');
  const [difficultyLevel, setDifficultyLevel] = useState('intermediate');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState<Array<{role: string, content: string}>>([
    {
      role: 'assistant',
      content: "Hello! I'm Friday, your AI interview coach. How can I help you prepare for your interviews today?"
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    const newMessage = { role: 'user', content: userInput };
    setConversation([...conversation, newMessage]);
    setUserInput('');
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('interview-feedback', {
        body: {
          transcript: userInput,
          question: "How can I help you prepare for interviews?",
          careerTrack: interviewType === 'technical' ? 'tech' : 
                       interviewType === 'case' ? 'consulting' : 'general',
          interviewType: interviewType,
          isChat: true,
          difficultyLevel: difficultyLevel
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      let response;
      if (data.rawFeedback) {
        response = data.rawFeedback;
      } else {
        if (userInput.toLowerCase().includes('tell me about yourself')) {
          response = "That's a common interview question! When answering 'Tell me about yourself', structure your response in 3 parts: 1) Present: Start with your current role and responsibilities, 2) Past: Briefly mention relevant experience that led you here, 3) Future: Express why you're excited about this opportunity. Keep it concise (60-90 seconds) and relevant to the job. Would you like to practice this response?";
        } else if (userInput.toLowerCase().includes('weakness')) {
          response = "When discussing weaknesses, choose something genuine but not critical to the job. Explain how you're actively working to improve it. For example: 'I used to struggle with public speaking, so I joined Toastmasters and have been volunteering to lead more team presentations.' Would you like more examples?";
        } else {
          response = "That's a great question to prepare for! Would you like me to provide some structure for your answer, give you example responses, or would you prefer to practice answering it first and I can provide feedback?";
        }
      }
      
      setConversation(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      toast.error("Sorry, I couldn't process your request");
      
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const toggleRecording = () => {
    if (!isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          setIsRecording(true);
          toast.info("Voice recording started");
        })
        .catch(err => {
          toast.error("Microphone access denied");
        });
    } else {
      setIsRecording(false);
      toast.info("Voice recording stopped");
    }
  };
  
  const startPracticeSession = () => {
    const interviewTypeName = INTERVIEW_TYPES.find(t => t.id === interviewType)?.name;
    const difficultyName = DIFFICULTY_LEVELS.find(d => d.id === difficultyLevel)?.name;
    
    setConversation([
      {
        role: 'assistant',
        content: `I'll be your interviewer for this ${interviewTypeName} practice session at ${difficultyName} level. Let's begin with the first question: Tell me about yourself and why you're interested in this position?`
      }
    ]);
    
    setActiveTab('chat');
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle>Friday Interview Assistant</CardTitle>
            <CardDescription>
              Practice interviews and get real-time feedback
            </CardDescription>
          </CardHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="px-6">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="chat">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="video">
                  <Video className="h-4 w-4 mr-2" />
                  Video
                </TabsTrigger>
                <TabsTrigger value="resources">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Resources
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="chat" className="flex-1 flex flex-col px-6 space-y-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto pr-2">
                {conversation.map((message, index) => (
                  <div 
                    key={index} 
                    className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-muted rounded-lg p-4 flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Friday is thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="flex items-end space-x-2">
                <Textarea 
                  placeholder="Type your message..." 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 resize-none"
                  rows={3}
                />
                <div className="flex flex-col space-y-2">
                  <Button 
                    size="icon" 
                    onClick={toggleRecording}
                    variant={isRecording ? "destructive" : "secondary"}
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button size="icon" onClick={handleSendMessage} disabled={!userInput.trim() || isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="video" className="flex-1 flex flex-col items-center justify-center p-6">
              <div className="text-center space-y-4">
                <Video className="h-16 w-16 mx-auto text-muted-foreground" />
                <h3 className="text-xl font-medium">Video Interview Practice</h3>
                <p className="text-muted-foreground max-w-md">
                  Practice with video recording to improve your body language and delivery.
                </p>
                <Button>Start Video Practice</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Common Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Tell me about yourself</li>
                      <li>Why do you want this job?</li>
                      <li>What are your strengths and weaknesses?</li>
                      <li>Where do you see yourself in 5 years?</li>
                      <li>Why should we hire you?</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Interview Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Research the company thoroughly</li>
                      <li>Prepare STAR method responses</li>
                      <li>Dress professionally</li>
                      <li>Arrive 10-15 minutes early</li>
                      <li>Prepare thoughtful questions</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      
      <div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Practice Session</CardTitle>
            <CardDescription>
              Set up a mock interview session
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Interview Type</label>
              <Select value={interviewType} onValueChange={setInterviewType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select interview type" />
                </SelectTrigger>
                <SelectContent>
                  {INTERVIEW_TYPES.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty Level</label>
              <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {DIFFICULTY_LEVELS.map(level => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={startPracticeSession} className="w-full">
              Start Practice Session
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
              Interview Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium">Before the Interview</h4>
              <p className="text-sm text-muted-foreground">
                Research the company, prepare questions, and practice your responses to common questions.
              </p>
            </div>
            <div>
              <h4 className="font-medium">During the Interview</h4>
              <p className="text-sm text-muted-foreground">
                Maintain good eye contact, speak clearly, and use the STAR method for behavioral questions.
              </p>
            </div>
            <div>
              <h4 className="font-medium">After the Interview</h4>
              <p className="text-sm text-muted-foreground">
                Send a thank-you note within 24 hours and follow up if you don't hear back within a week.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
