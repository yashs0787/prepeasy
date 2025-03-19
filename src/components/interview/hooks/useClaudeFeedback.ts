
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { FeedbackResult, InterviewType, CareerTrack } from '../types/interviewTypes';

type AIModel = 'Claude 3 Sonnet' | 'GPT-4 Turbo';

interface ClaudeFeedbackParams {
  transcript: string;
  question: string;
  careerTrack?: CareerTrack;
  interviewType?: InterviewType;
  model?: AIModel;
}

export const useClaudeFeedback = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [rawFeedback, setRawFeedback] = useState<string | null>(null);
  const [currentModel, setCurrentModel] = useState<AIModel>('Claude 3 Sonnet');

  const generateFeedback = async ({
    transcript,
    question,
    careerTrack = 'general',
    interviewType = 'general',
    model = currentModel
  }: ClaudeFeedbackParams) => {
    if (!transcript || !question) {
      toast.error('Missing transcript or question');
      return null;
    }
    
    setIsLoading(true);
    setCurrentModel(model);
    
    try {
      const { data, error } = await supabase.functions.invoke('interview-feedback', {
        body: {
          transcript,
          question,
          careerTrack,
          interviewType,
          model: model // Pass the model to use
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
  
  const switchModel = () => {
    const newModel = currentModel === 'Claude 3 Sonnet' ? 'GPT-4 Turbo' : 'Claude 3 Sonnet';
    setCurrentModel(newModel);
    toast.info(`Switched to ${newModel}`);
    return newModel;
  };
  
  return {
    isLoading,
    feedback,
    rawFeedback,
    currentModel,
    generateFeedback,
    switchModel,
    resetFeedback: () => {
      setFeedback(null);
      setRawFeedback(null);
    }
  };
};
