
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { FeedbackResult, InterviewType, CareerTrack } from '../types/interviewTypes';

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
      const { data, error } = await supabase.functions.invoke('interview-feedback', {
        body: {
          transcript,
          question,
          careerTrack,
          interviewType
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (!data.success) {
        throw new Error(data.error || 'Unknown error occurred');
      }
      
      setFeedback(data.feedback);
      setRawFeedback(data.rawFeedback);
      
      return data.feedback;
    } catch (error) {
      console.error('Error generating feedback:', error);
      toast.error('Failed to generate feedback: ' + error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    feedback,
    rawFeedback,
    generateFeedback,
    resetFeedback: () => {
      setFeedback(null);
      setRawFeedback(null);
    }
  };
};
