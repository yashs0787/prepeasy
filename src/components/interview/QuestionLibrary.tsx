
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { InterviewQuestion } from './useInterviewAssistant';

interface QuestionLibraryProps {
  questions: InterviewQuestion[];
  selectedQuestion: InterviewQuestion | null;
  onSelectQuestion: (question: InterviewQuestion) => void;
}

export function QuestionLibrary({ questions, selectedQuestion, onSelectQuestion }: QuestionLibraryProps) {
  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">No questions available for the selected criteria</p>
      </div>
    );
  }
  
  // Group questions by category if available
  const groupedQuestions: Record<string, InterviewQuestion[]> = {};
  
  questions.forEach(question => {
    const category = question.category || 'General';
    if (!groupedQuestions[category]) {
      groupedQuestions[category] = [];
    }
    groupedQuestions[category].push(question);
  });

  // If all questions are general, don't group them
  const hasCategories = Object.keys(groupedQuestions).length > 1 || !groupedQuestions['General'];

  const renderQuestion = (question: InterviewQuestion) => (
    <div 
      key={question.id} 
      className={`p-3 border rounded-md cursor-pointer hover:bg-accent transition-colors ${selectedQuestion?.id === question.id ? 'border-primary bg-primary/10' : ''}`}
      onClick={() => onSelectQuestion(question)}
    >
      <div className="flex justify-between items-start">
        <p className="flex-1">{question.text}</p>
        <div className="flex gap-2 ml-2">
          {question.difficulty === 'advanced' && (
            <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
              Advanced
            </Badge>
          )}
          {question.difficulty === 'intermediate' && (
            <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
              Intermediate
            </Badge>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-2">Question Library</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Browse common interview questions for your career track
      </p>
      
      <div className="grid gap-2">
        {hasCategories ? (
          Object.entries(groupedQuestions).map(([category, questions]) => (
            <div key={category} className="mb-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">{category}</h4>
              <div className="space-y-2">
                {questions.map(renderQuestion)}
              </div>
            </div>
          ))
        ) : (
          questions.map(renderQuestion)
        )}
      </div>
    </div>
  );
}
