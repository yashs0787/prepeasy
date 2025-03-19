import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { FeedbackResult, InterviewType, CareerTrack } from '../types/interviewTypes';

// Hidden from user interface
type AIModel = 'Claude 3 Sonnet' | 'GPT-4 Turbo';

interface ClaudeFeedbackParams {
  transcript: string;
  question: string;
  careerTrack?: CareerTrack;
  interviewType?: InterviewType;
}

export const useClaudeFeedback = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [rawFeedback, setRawFeedback] = useState<string | null>(null);
  // Keep track of model internally but don't expose to user
  const [currentModel, setCurrentModel] = useState<AIModel>('Claude 3 Sonnet');

  const generateFeedback = async ({
    transcript,
    question,
    careerTrack = 'general',
    interviewType = 'general'
  }: ClaudeFeedbackParams) => {
    if (!transcript || !question) {
      toast.error('Missing transcript or question');
      return null;
    }
    
    setIsLoading(true);
    
    try {
      // Initial attempt with Claude 3 Sonnet (primary model)
      const { data, error } = await supabase.functions.invoke('interview-feedback', {
        body: {
          transcript,
          question,
          careerTrack,
          interviewType,
          model: 'Claude 3 Sonnet' // Always start with Claude
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (!data.success) {
        throw new Error(data.error || 'Unknown error occurred');
      }
      
      // Track which model was actually used
      setCurrentModel(data.modelUsed || 'Claude 3 Sonnet');
      setFeedback(data.feedback);
      setRawFeedback(data.rawFeedback);
      
      return data.feedback;
    } catch (error) {
      console.error('Error generating feedback with primary model:', error);
      
      // Fallback to GPT-4 if Claude fails
      try {
        console.log('Attempting fallback to GPT-4 Turbo...');
        const { data, error } = await supabase.functions.invoke('interview-feedback', {
          body: {
            transcript,
            question,
            careerTrack,
            interviewType,
            model: 'GPT-4 Turbo',
            isFallback: true
          }
        });
        
        if (error) {
          throw new Error(error.message);
        }
        
        if (!data.success) {
          throw new Error(data.error || 'Unknown error occurred with fallback model');
        }
        
        // Update model tracking internally
        setCurrentModel('GPT-4 Turbo');
        setFeedback(data.feedback);
        setRawFeedback(data.rawFeedback);
        
        return data.feedback;
      } catch (fallbackError) {
        console.error('Error with fallback model:', fallbackError);
        toast.error('Failed to generate feedback. Please try again later.');
        return null;
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Keep this method for internal use, but don't expose it to UI
  const resetFeedback = () => {
    setFeedback(null);
    setRawFeedback(null);
  };
  
  return {
    isLoading,
    feedback,
    rawFeedback,
    generateFeedback,
    resetFeedback
  };
};
