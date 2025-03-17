
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
import { useVectorQuestionSearch } from '../hooks/useVectorQuestionSearch';
import { toast } from 'sonner';

interface PrepareTabProps {
  careerTrack: CareerTrack;
  setCareerTrack: (track: CareerTrack) => void;
}

export function PrepareTab({ careerTrack, setCareerTrack }: PrepareTabProps) {
  const [question, setQuestion] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null);
  const [showingSearchResults, setShowingSearchResults] = useState(false);
  const [similarQuestions, setSimilarQuestions] = useState<InterviewQuestion[]>([]);
  
  // Get filtered questions based on career track
  const filteredQuestions = getQuestionsForTrack(careerTrack);
  
  const { 
    feedback, 
    generateQuestionAdvice, 
    generateCustomQuestionAdvice 
  } = useFeedbackGenerator();
  
  const {
    isSearching,
    results,
    searchQuestions,
    getSimilarQuestions
  } = useVectorQuestionSearch();
  
  // Questions to display - either filtered by track or search results
  const displayQuestions = showingSearchResults 
    ? results.map(r => r.question) 
    : filteredQuestions;
  
  const handleSelectQuestion = async (question: InterviewQuestion) => {
    setSelectedQuestion(question);
    toast.info("Question selected");
    setShowingSearchResults(false); // Reset search results view
    
    // Generate advice for the selected question
    setTimeout(() => {
      generateQuestionAdvice(question);
    }, 1000);
    
    // Also get similar questions
    try {
      const similar = await getSimilarQuestions(question);
      setSimilarQuestions(similar);
    } catch (error) {
      console.error("Error getting similar questions:", error);
    }
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    toast.info("Processing your question...");
    
    setTimeout(() => {
      generateCustomQuestionAdvice();
    }, 2000);
  };
  
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    // Search for questions using vector search
    await searchQuestions({ 
      query, 
      careerTrack,
      limit: 10 
    });
    
    setShowingSearchResults(true);
    toast.info(`Found ${results.length} relevant questions`);
  };
  
  const handleResetSearch = () => {
    setShowingSearchResults(false);
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              {showingSearchResults ? 'Search Results' : 'Question Library'}
            </h3>
            
            {showingSearchResults && (
              <Button variant="outline" size="sm" onClick={handleResetSearch}>
                Back to Library
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            {showingSearchResults 
              ? 'Showing questions relevant to your search' 
              : 'Browse common interview questions for your career track'}
          </p>
          
          <QuestionLibrary 
            questions={displayQuestions}
            selectedQuestion={selectedQuestion}
            onSelectQuestion={handleSelectQuestion}
            onSearch={handleSearch}
            isSearching={isSearching}
          />
        </div>
        
        {selectedQuestion && feedback && (
          <div className="space-y-4">
            <FeedbackDisplay feedback={feedback} />
            
            {similarQuestions.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Related Questions</h4>
                <div className="space-y-2">
                  {similarQuestions.map(q => (
                    <div 
                      key={q.id} 
                      className="p-2 border rounded-md text-sm cursor-pointer hover:bg-accent"
                      onClick={() => handleSelectQuestion(q)}
                    >
                      {q.text}
                    </div>
                  ))}
                </div>
              </div>
            )}
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
    </div>
  );
}
