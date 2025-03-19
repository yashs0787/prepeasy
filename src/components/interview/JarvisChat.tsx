
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface JarvisChatProps {
  currentModule: number;
  careerPath: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function JarvisChat({ currentModule, careerPath }: JarvisChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi there! I'm Friday, your AI interview coach for the ${careerPath} career path. How can I help you prepare for interviews today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Getting module context based on the current module
      const moduleContext = getModuleContext(currentModule, careerPath);
      
      // Call Claude via our edge function
      const { data, error } = await supabase.functions.invoke('interview-feedback', {
        body: {
          transcript: input,
          question: "How can I help you prepare for interviews?",
          careerTrack: careerPath,
          interviewType: "general",
          isChat: true,
          context: moduleContext
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data.rawFeedback) {
        // Add assistant message
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.rawFeedback 
        }]);
      } else {
        // Fallback response if Claude doesn't return expected format
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "I'd be happy to help you with that. Could you provide more details about what you're looking for?" 
        }]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
      
      // Provide fallback response
      setMessages(prev => [...prev, { 
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
      sendMessage();
    }
  };
  
  // Helper function to get module context based on current module
  const getModuleContext = (moduleId: number, careerPath: string) => {
    // This could be expanded with more detailed content for each module
    const moduleContexts = {
      tech: [
        "Introduction to Technical Interviews",
        "Data Structures and Algorithms",
        "System Design",
        "Coding Problems",
        "Behavioral Questions for Tech Roles"
      ],
      consulting: [
        "Introduction to Case Interviews",
        "Problem Structuring",
        "Market Sizing",
        "Profitability Analysis",
        "Mergers & Acquisitions"
      ],
      finance: [
        "Introduction to Finance Interviews",
        "Valuation Methods",
        "Financial Modeling",
        "Investment Analysis",
        "Market Trends"
      ],
      general: [
        "Introduction to Interviews",
        "Common Interview Questions",
        "Behavioral Interviews",
        "STAR Method",
        "Interview Preparation"
      ]
    };
    
    const path = careerPath in moduleContexts ? careerPath : 'general';
    const module = moduleId - 1;
    const validModule = module >= 0 && module < moduleContexts[path].length ? module : 0;
    
    return `Current learning module: ${moduleContexts[path][validModule]}`;
  };
  
  return (
    <Card className="h-[600px] flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-700'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-slate-700 rounded-lg p-3 flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Friday is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-slate-700 flex gap-2">
        <Textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="resize-none bg-slate-800 border-slate-700"
          rows={2}
        />
        <Button 
          onClick={sendMessage} 
          disabled={isLoading || !input.trim()}
          className="bg-indigo-600 hover:bg-indigo-700"
          size="icon"
        >
          <Send size={18} />
        </Button>
      </div>
    </Card>
  );
}
