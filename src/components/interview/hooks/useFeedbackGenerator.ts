
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { FeedbackResult, InterviewQuestion } from '../types/interviewTypes';

export function useFeedbackGenerator() {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [detailedFeedback, setDetailedFeedback] = useState<FeedbackResult | null>(null);

  const generateFeedback = useCallback((selectedQuestion: InterviewQuestion | null) => {
    let feedbackMessage = '';
    let detailedResult: FeedbackResult = {
      score: Math.floor(Math.random() * 30) + 70,
      strengths: ['Clear communication', 'Well-structured response'],
      improvements: ['Could provide more specific examples', 'Consider quantifying your impact']
    };
    
    if (selectedQuestion) {
      if (selectedQuestion.careerTrack === 'consulting') {
        feedbackMessage = "Your case analysis was structured but could use more quantitative reasoning. You correctly identified the key issues but missed an opportunity to segment the market further. Your framework application was solid.";
        detailedResult.strengths.push('Good application of frameworks');
        detailedResult.improvements.push('Deepen quantitative analysis');
      } else if (selectedQuestion.careerTrack === 'investment-banking') {
        feedbackMessage = "Your technical knowledge is sound. You explained the valuation concepts well but could improve on linking them to real-world market conditions. Consider mentioning relevant industry benchmarks next time.";
        detailedResult.strengths.push('Strong technical foundation');
        detailedResult.improvements.push('Add more market context');
      } else {
        feedbackMessage = "Your answer demonstrated good knowledge and communication skills. Try to be more concise and provide specific examples from your experience to support your points.";
      }
      
      if (selectedQuestion.sampleAnswer) {
        detailedResult.example = selectedQuestion.sampleAnswer;
      }
    }
    
    setFeedback(feedbackMessage);
    setDetailedFeedback(detailedResult);
    return { feedbackMessage, detailedResult };
  }, []);

  const generateQuestionAdvice = useCallback((question: InterviewQuestion) => {
    let strategy = '';
    
    if (question.careerTrack === 'consulting') {
      strategy = "For this case question, start with clarifying questions to understand the problem scope. Then structure your approach using a relevant framework like profitability analysis or market sizing. Be sure to state your assumptions clearly and walk through your logic step by step.";
    } else if (question.careerTrack === 'investment-banking') {
      strategy = "This technical question tests your financial knowledge. Begin with the fundamental concepts, then demonstrate advanced understanding. Use specific examples from deals or markets you're familiar with, and be prepared to defend your analytical approach.";
    } else if (question.type === 'behavioral') {
      strategy = "Use the STAR method (Situation, Task, Action, Result) to structure your response. Choose a relevant example that highlights your skills and achievements while directly answering the question.";
    } else {
      strategy = "Begin with a concise overview before diving into details. Structure your answer logically and remember to connect your technical knowledge to business impact when possible.";
    }
    
    setFeedback(strategy);
    return strategy;
  }, []);

  const generateCustomQuestionAdvice = useCallback(() => {
    const advice = "This question evaluates your problem-solving approach and analytical thinking. Structure your answer using a clear framework, state your assumptions explicitly, and walk through your reasoning step by step. Use specific examples from your experience to demonstrate your skills.";
    setFeedback(advice);
    return advice;
  }, []);

  return {
    feedback,
    detailedFeedback,
    generateFeedback,
    generateQuestionAdvice,
    generateCustomQuestionAdvice,
    setFeedback,
    setDetailedFeedback
  };
}
