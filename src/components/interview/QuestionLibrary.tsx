
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, Video, FileText } from 'lucide-react';
import { InterviewQuestion, LearningResource } from './types/interviewTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface QuestionLibraryProps {
  questions: InterviewQuestion[];
  selectedQuestion: InterviewQuestion | null;
  onSelectQuestion: (question: InterviewQuestion) => void;
  onSearch?: (query: string) => void;
  isSearching?: boolean;
  learningResources?: LearningResource[];
}

export function QuestionLibrary({ 
  questions,
  selectedQuestion,
  onSelectQuestion,
  onSearch,
  isSearching = false,
  learningResources = []
}: QuestionLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'questions' | 'resources'>('questions');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video size={16} className="text-blue-500" />;
      case 'article':
        return <FileText size={16} className="text-green-500" />;
      case 'practice':
        return <BookOpen size={16} className="text-amber-500" />;
      default:
        return <FileText size={16} />;
    }
  };

  const getBadgeVariant = (difficulty: string) => {
    switch (difficulty) {
      case 'basic':
        return 'secondary';
      case 'intermediate':
        return 'default';
      case 'advanced':
        return 'destructive';
      default:
        return 'outline';
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

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'questions' | 'resources')}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="resources">Learning Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="questions" className="mt-0">
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
                    <Badge variant={getBadgeVariant(q.difficulty)}>
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
        </TabsContent>
        
        <TabsContent value="resources" className="mt-0">
          <div className="grid gap-2">
            {learningResources.map((resource, index) => (
              <div 
                key={index} 
                className="p-3 border rounded-md hover:bg-accent transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{resource.title}</h4>
                      <Badge variant={getBadgeVariant(resource.difficulty)}>
                        {resource.difficulty}
                      </Badge>
                    </div>
                    {resource.description && (
                      <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                    )}
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">
                        {resource.duration || ''}
                      </span>
                      {resource.url && (
                        <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            View Resource
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {learningResources.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                No learning resources available for the selected track.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
