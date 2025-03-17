
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Send, Loader2, Volume2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRecordingManager } from './hooks/useRecordingManager';
import { useSpeechRecognition } from './useSpeechRecognition';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar } from '@/components/ui/avatar';

interface JarvisChatProps {
  currentModule: number;
  careerPath: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function JarvisChat({ currentModule, careerPath }: JarvisChatProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isRecording, startRecording, stopRecording } = useRecordingManager();
  const {
    transcript,
    isSupported,
    startRecording: startSpeechRecognition,
    stopRecording: stopSpeechRecognition,
    isRecording: isSpeechRecording,
    resetTranscript
  } = useSpeechRecognition();

  // Module-specific welcome messages
  const welcomeMessages: { [key: number]: string } = {
    1: "Welcome to the Introduction to Case Interviews module! I'm Jarvis, your AI coach. How can I help you prepare for case interviews today?",
    2: "Welcome to the Problem Structuring module! This is a crucial skill for case interviews. What specific aspect would you like to work on?",
    3: "Welcome to the Market Sizing module! These questions test your analytical thinking. Would you like to practice with an example?",
    4: "Welcome to the Profitability Analysis module! This is often the core of many case interviews. How can I help you master this topic?",
    5: "Welcome to the Mergers & Acquisitions module! These are complex cases that test multiple skills. What would you like to learn first?"
  };

  useEffect(() => {
    // Initialize with a welcome message based on the current module
    const initialMessage = {
      id: 'welcome',
      role: 'assistant' as const,
      content: welcomeMessages[currentModule] || "Hello! I'm Jarvis, your AI interview coach. How can I help you today?",
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);
  }, [currentModule]);

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Update input field with transcribed text
    if (transcript && isSpeechRecording) {
      setInputMessage(transcript);
    }
  }, [transcript, isSpeechRecording]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const moduleResponses: { [key: number]: { [key: string]: string } } = {
        1: {
          "framework": "Great question about frameworks! For case interviews, I recommend starting with these: 1) Profitability Framework, 2) Market Sizing Framework, 3) Competitive Analysis, and 4) M&A Framework. Which one would you like to explore first?",
          "prepare": "To prepare for your case interview: 1) Practice mental math daily, 2) Read business news regularly, 3) Structure your approach before diving into analysis, and 4) Practice cases with peers. Would you like specific practice exercises?",
          "default": "For case interview preparation, I recommend mastering a structured approach to problem-solving. Would you like me to walk you through a sample case now?"
        },
        2: {
          "structure": "Problem structuring is crucial! Start by clarifying the objective, then break down the problem into components. For example, in a profitability case, consider: Revenue (price × quantity) and Costs (fixed + variable). Would you like to practice with a specific scenario?",
          "default": "When structuring problems, remember the MECE principle: Mutually Exclusive, Collectively Exhaustive. This ensures your analysis is comprehensive without overlap. Would you like to see a MECE framework example?"
        }
      };
      
      let responseContent = "";
      
      // Generate response based on module and keywords
      if (moduleResponses[currentModule]) {
        const moduleResponse = moduleResponses[currentModule];
        const lowercaseInput = inputMessage.toLowerCase();
        
        // Check for keywords in the input
        const matchedKeyword = Object.keys(moduleResponse).find(
          keyword => keyword !== "default" && lowercaseInput.includes(keyword)
        );
        
        responseContent = matchedKeyword 
          ? moduleResponse[matchedKeyword] 
          : moduleResponse.default || "I understand. Could you tell me more about your specific question on this topic?";
      } else {
        // Generic responses for modules without specific content
        const genericResponses = [
          "That's a great question! For this topic, experts recommend focusing on structured thinking and clear communication. Would you like me to elaborate?",
          "In my experience, successful candidates master this concept by practicing with real-world examples. Would you like to try one now?",
          "This is a common question in interviews. Let me walk you through how to approach it systematically.",
          "I'd be happy to help with that! This concept is often tested in case interviews because it demonstrates analytical thinking."
        ];
        
        responseContent = genericResponses[Math.floor(Math.random() * genericResponses.length)];
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceRecording = () => {
    if (isSpeechRecording) {
      stopSpeechRecognition();
      stopRecording();
    } else {
      if (!isSupported) {
        toast.error("Speech recognition is not supported in your browser.");
        return;
      }
      
      resetTranscript();
      startSpeechRecognition();
      startRecording();
      toast.info("Listening... Speak your question");
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700 overflow-hidden flex flex-col h-[600px]">
      {/* Chat messages area */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            {message.role === 'assistant' && (
              <Avatar className="h-8 w-8 mr-2 bg-indigo-600">
                <div className="flex items-center justify-center h-full w-full text-xs font-bold">AI</div>
              </Avatar>
            )}
            
            <div 
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-700 text-white'
              }`}
            >
              <div className="prose prose-invert text-sm">
                {message.content}
              </div>
            </div>
            
            {message.role === 'user' && (
              <Avatar className="h-8 w-8 ml-2">
                <div className="flex items-center justify-center h-full w-full bg-slate-600 text-xs font-bold">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              </Avatar>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2 bg-slate-700 text-white p-4 rounded-lg">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Jarvis is thinking...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </CardContent>
      
      {/* Input area */}
      <div className="border-t border-slate-700 p-4 bg-slate-800">
        <div className="flex items-end gap-2">
          <div className="relative flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="w-full bg-slate-700 border-slate-600 text-white rounded-lg py-3 px-4 pr-12 resize-none"
              rows={2}
              style={{ minHeight: "60px" }}
            />
            <Button 
              size="sm" 
              className="absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-700"
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
          
          <Button
            size="icon"
            className={`rounded-full h-12 w-12 ${
              isSpeechRecording 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            onClick={toggleVoiceRecording}
          >
            {isSpeechRecording ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
            <span className="sr-only">
              {isSpeechRecording ? 'Stop Recording' : 'Start Recording'}
            </span>
          </Button>
        </div>
        
        {isSpeechRecording && (
          <div className="mt-2 text-sm text-indigo-300 animate-pulse flex items-center justify-center">
            <Mic className="h-3 w-3 mr-1" /> Listening...
          </div>
        )}
      </div>
    </Card>
  );
}
