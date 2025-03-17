
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { InterviewQuestion } from './useInterviewAssistant';

interface QuestionLibraryProps {
  questions: InterviewQuestion[];
  selectedQuestion: InterviewQuestion | null;
  onSelectQuestion: (question: InterviewQuestion) => void;
}

export function QuestionLibrary({ 
  questions,
  selectedQuestion,
  onSelectQuestion
}: QuestionLibraryProps) {
  return (
    <div className="grid gap-2">
      {questions.map((q) => (
        <div 
          key={q.id} 
          className={`p-3 border rounded-md cursor-pointer hover:bg-accent transition-colors ${
            selectedQuestion?.id === q.id ? 'border-primary bg-primary/10' : ''
          }`}
          onClick={() => onSelectQuestion(q)}
        >
          <div className="flex justify-between items-center">
            <p>{q.text}</p>
            {q.difficulty && (
              <Badge variant={
                q.difficulty === 'basic' ? 'secondary' :
                q.difficulty === 'intermediate' ? 'default' :
                'destructive'
              }>
                {q.difficulty}
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
