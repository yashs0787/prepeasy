
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { CareerTrackSelector } from '../CareerTrackSelector';
import { QuestionLibrary } from '../QuestionLibrary';
import { FeedbackDisplay } from '../FeedbackDisplay';
import { CareerTrack, InterviewQuestion, InterviewType, LearningResource } from '../types/interviewTypes';
import { useFeedbackGenerator } from '../hooks/useFeedbackGenerator';
import { getQuestionsForTrack } from '../utils/questionData';
import { useVectorQuestionSearch } from '../hooks/useVectorQuestionSearch';
import { getLearningResources, getRecommendedPath } from '../utils/learningPathData';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface PrepareTabProps {
  careerTrack: CareerTrack;
  setCareerTrack: (track: CareerTrack) => void;
}

export function PrepareTab({ careerTrack, setCareerTrack }: PrepareTabProps) {
  const [question, setQuestion] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null);
  const [showingSearchResults, setShowingSearchResults] = useState(false);
  const [similarQuestions, setSimilarQuestions] = useState<InterviewQuestion[]>([]);
  const [interviewType, setInterviewType] = useState<InterviewType>('general');
  const [learningResources, setLearningResources] = useState<LearningResource[]>([]);
  
  // Get filtered questions based on career track and interview type
  const filteredQuestions = getQuestionsForTrack(careerTrack).filter(q => 
    interviewType === 'general' || q.type === interviewType || q.careerTrack === 'general'
  );
  
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
  
  // Update learning resources when career track or interview type changes
  useEffect(() => {
    const resources = getLearningResources(careerTrack, interviewType);
    setLearningResources(resources);
    
    // Show a toast with a learning path recommendation when career track changes
    const recommendedPath = getRecommendedPath(careerTrack);
    if (recommendedPath) {
      toast.info(`Recommended: ${recommendedPath.title}`, {
        description: recommendedPath.description,
        duration: 5000,
      });
    }
  }, [careerTrack, interviewType]);
  
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
      type: interviewType === 'general' ? undefined : interviewType,
      limit: 10 
    });
    
    setShowingSearchResults(true);
    toast.info(`Found ${results.length} relevant questions`);
  };
  
  const handleResetSearch = () => {
    setShowingSearchResults(false);
  };
  
  const handleInterviewTypeChange = (value: string) => {
    setInterviewType(value as InterviewType);
  };

  return (
    <div className="space-y-4">
      {/* Career track selector */}
      <CareerTrackSelector 
        selectedTrack={careerTrack}
        onSelectTrack={setCareerTrack}
      />
      
      {/* Interview type selector */}
      <div className="space-y-2">
        <label htmlFor="interview-type" className="text-sm font-medium">
          Interview Type
        </label>
        <Select value={interviewType} onValueChange={handleInterviewTypeChange}>
          <SelectTrigger id="interview-type" className="w-full">
            <SelectValue placeholder="Select interview type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
            <SelectItem value="behavioral">Behavioral</SelectItem>
            <SelectItem value="case">Case Study</SelectItem>
            <SelectItem value="financial">Financial</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Question library and learning resources */}
      <div className="space-y-4 mt-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              {showingSearchResults ? 'Search Results' : 'Learning Center'}
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
              : 'Browse questions and resources for your career track'}
          </p>
          
          <QuestionLibrary 
            questions={displayQuestions}
            selectedQuestion={selectedQuestion}
            onSelectQuestion={handleSelectQuestion}
            onSearch={handleSearch}
            isSearching={isSearching}
            learningResources={learningResources}
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
