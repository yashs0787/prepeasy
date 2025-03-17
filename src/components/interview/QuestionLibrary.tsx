
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { InterviewQuestion } from './types/interviewTypes';

interface QuestionLibraryProps {
  questions: InterviewQuestion[];
  selectedQuestion: InterviewQuestion | null;
  onSelectQuestion: (question: InterviewQuestion) => void;
  onSearch?: (query: string) => void;
  isSearching?: boolean;
}

export function QuestionLibrary({ 
  questions,
  selectedQuestion,
  onSelectQuestion,
  onSearch,
  isSearching = false
}: QuestionLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="space-y-4">
      {onSearch && (
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search for questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="sm" disabled={isSearching}>
            <Search size={16} className="mr-2" />
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </form>
      )}

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
        
        {questions.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No questions found. Try a different search or category.
          </div>
        )}
      </div>
    </div>
  );
}
