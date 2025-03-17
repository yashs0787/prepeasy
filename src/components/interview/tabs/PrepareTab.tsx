
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { CareerTrackSelector } from '../CareerTrackSelector';
import { QuestionLibrary } from '../QuestionLibrary';
import { FeedbackDisplay } from '../FeedbackDisplay';
import { useInterviewAssistant } from '../useInterviewAssistant';
import { CareerTrack, InterviewQuestion } from '../useInterviewAssistant';
import { toast } from 'sonner';

interface PrepareTabProps {
  careerTrack: CareerTrack;
  setCareerTrack: (track: CareerTrack) => void;
}

export function PrepareTab({ careerTrack, setCareerTrack }: PrepareTabProps) {
  const [question, setQuestion] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  // Get filtered questions based on career track
  const { filteredQuestions } = useInterviewAssistant(careerTrack);
  
  const handleSelectQuestion = (question: InterviewQuestion) => {
    setSelectedQuestion(question);
    toast.info("Question selected");
    
    setTimeout(() => {
      let strategy = '';
      
      if (question.careerTrack === 'consulting') {
        strategy = "For this case question, start with clarifying questions to understand the problem scope. Then structure your approach using a relevant framework like profitability analysis or market sizing. Be sure to state your assumptions clearly and walk through your logic step by step.";
      } else if (question.careerTrack === 'investment-banking') {
        strategy = "This technical question tests your financial knowledge. Begin with the fundamental concepts, then demonstrate advanced understanding. Use specific examples from deals or markets you're familiar with, and be prepared to defend your analytical approach.";
      } else if (question.type === 'behavioral') {
        strategy = "Use the STAR method (Situation, Task, Action, Result) to structure your response. Choose a relevant example that highlights your skills and achievements while directly answering the question.";
      } else {
        strategy = "Begin with a concise overview before diving into details. Structure your answer logically and remember to connect your technical knowledge to business impact when possible.";
      }
      
      setFeedback(strategy);
    }, 1000);
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    toast.info("Processing your question...");
    
    setTimeout(() => {
      const advice = "This question evaluates your problem-solving approach and analytical thinking. Structure your answer using a clear framework, state your assumptions explicitly, and walk through your reasoning step by step. Use specific examples from your experience to demonstrate your skills.";
      setFeedback(advice);
    }, 2000);
  };

  return (
    <div className="space-y-4">
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
          
          <QuestionLibrary 
            questions={filteredQuestions}
            selectedQuestion={selectedQuestion}
            onSelectQuestion={handleSelectQuestion}
          />
        </div>
        
        {selectedQuestion && feedback && (
          <FeedbackDisplay feedback={feedback} />
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
    </div>
  );
}
