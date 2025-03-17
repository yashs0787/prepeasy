
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { InterviewQuestion, VectorSearchParams, VectorSearchResult, CareerTrack, InterviewType } from '../types/interviewTypes';
import { getQuestionsForTrack } from '../utils/questionData';

// Since we don't have a real vector database yet, we'll simulate one with in-memory search
export function useVectorQuestionSearch() {
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<VectorSearchResult[]>([]);
  
  // Function to search for questions based on vector similarity
  const searchQuestions = useCallback(async ({ 
    query, 
    careerTrack = 'general',
    type,
    limit = 5 
  }: VectorSearchParams) => {
    setIsSearching(true);
    
    try {
      // In a real implementation, we would:
      // 1. Convert the query to an embedding vector using an embedding model
      // 2. Perform a similarity search in the vector database
      
      // For now, we'll implement a simple text search simulation
      const allQuestions = getQuestionsForTrack(careerTrack);
      const filteredQuestions = type ? allQuestions.filter(q => q.type === type) : allQuestions;
      
      // Simple text matching similarity (this would be vector similarity in a real implementation)
      const queryTerms = query.toLowerCase().split(' ');
      
      const searchResults = filteredQuestions
        .map(question => {
          const questionText = question.text.toLowerCase();
          
          // Calculate a simple similarity score based on word matching
          const matchCount = queryTerms.reduce((count, term) => {
            return questionText.includes(term) ? count + 1 : count;
          }, 0);
          
          const similarity = queryTerms.length > 0 ? matchCount / queryTerms.length : 0;
          
          return {
            question,
            similarity
          };
        })
        .filter(result => result.similarity > 0) // Filter out non-matches
        .sort((a, b) => b.similarity - a.similarity) // Sort by similarity (descending)
        .slice(0, limit); // Limit results
      
      setResults(searchResults);
    } catch (error) {
      console.error('Error searching questions:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);
  
  // Function to get semantic recommendations based on a question
  const getSimilarQuestions = useCallback(async (question: InterviewQuestion, limit: number = 3) => {
    try {
      // In a real implementation, we would use the question's embedding vector
      // to find similar questions in the vector database
      
      // For now, we'll simulate this with category/type matching
      const allQuestions = getQuestionsForTrack(question.careerTrack);
      
      return allQuestions
        .filter(q => q.id !== question.id) // Exclude the current question
        .filter(q => {
          // Match by type, category, or difficulty
          return (
            q.type === question.type ||
            (question.category && q.category === question.category) ||
            q.difficulty === question.difficulty
          );
        })
        .slice(0, limit);
    } catch (error) {
      console.error('Error getting similar questions:', error);
      return [];
    }
  }, []);

  return {
    isSearching,
    results,
    searchQuestions,
    getSimilarQuestions
  };
}
