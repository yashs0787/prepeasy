
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { CaseStudyData, CaseSolutionEvaluation } from '../types/interviewTypes';

interface EvaluationParams {
  caseStudy: CaseStudyData;
  userSolution: string;
  detailLevel?: 'basic' | 'standard' | 'detailed';
}

export function useCaseEvaluation() {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<{
    raw: string;
    structured: CaseSolutionEvaluation | null;
  } | null>(null);

  const evaluateSolution = async ({ caseStudy, userSolution, detailLevel = 'standard' }: EvaluationParams) => {
    if (!userSolution || !caseStudy) {
      toast.error('Missing case study or solution');
      return null;
    }
    
    setIsEvaluating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('case-solution-evaluation', {
        body: {
          caseStudyData: caseStudy,
          userSolution,
          detailLevel
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (!data.success) {
        throw new Error(data.error || 'Unknown error occurred');
      }
      
      setEvaluation({
        raw: data.evaluation.rawEvaluation,
        structured: data.evaluation.structuredEvaluation
      });
      
      return data.evaluation;
    } catch (error) {
      console.error('Error evaluating case solution:', error);
      toast.error('Failed to evaluate your solution. Please try again later.');
      return null;
    } finally {
      setIsEvaluating(false);
    }
  };
  
  const resetEvaluation = () => {
    setEvaluation(null);
  };
  
  return {
    isEvaluating,
    evaluation,
    evaluateSolution,
    resetEvaluation
  };
}
