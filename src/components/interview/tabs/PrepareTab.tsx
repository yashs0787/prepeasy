import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { CareerTrackSelector } from '../CareerTrackSelector';
import { QuestionLibrary } from '../QuestionLibrary';
import { FeedbackDisplay } from '../FeedbackDisplay';
import { CareerTrack, InterviewQuestion } from '../types/interviewTypes';
import { useFeedbackGenerator } from '../hooks/useFeedbackGenerator';
import { getQuestionsForTrack } from '../utils/questionData';
import { toast } from 'sonner';

interface PrepareTabProps {
  careerTrack: CareerTrack;
  setCareerTrack: (track: CareerTrack) => void;
}

export function PrepareTab({ careerTrack, setCareerTrack }: PrepareTabProps) {
  const [question, setQuestion] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null);
  
  // Get filtered questions based on career track
  const filteredQuestions = getQuestionsForTrack(careerTrack);
  
  const { 
    feedback, 
    generateQuestionAdvice, 
    generateCustomQuestionAdvice 
  } = useFeedbackGenerator();
  
  const handleSelectQuestion = (question: InterviewQuestion) => {
    setSelectedQuestion(question);
    toast.info("Question selected");
    
    setTimeout(() => {
      generateQuestionAdvice(question);
    }, 1000);
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    toast.info("Processing your question...");
    
    setTimeout(() => {
      generateCustomQuestionAdvice();
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
