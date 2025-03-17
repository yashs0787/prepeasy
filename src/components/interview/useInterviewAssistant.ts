
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { CareerTrack, InterviewQuestion, InterviewType } from './types/interviewTypes';
import { getQuestionsForTrack } from './utils/questionData';
import { useFeedbackGenerator } from './hooks/useFeedbackGenerator';
import { useRecordingManager } from './hooks/useRecordingManager';

export {
  type InterviewType,
  type CareerTrack,
  type InterviewQuestion,
  type FeedbackResult,
  type LearningResource
} from './types/interviewTypes';

export function useInterviewAssistant(initialCareerTrack: CareerTrack = 'general') {
  const [careerTrack, setCareerTrack] = useState<CareerTrack>(initialCareerTrack);
  const [interviewType, setInterviewType] = useState<InterviewType>('general');
  const [isPracticing, setIsPracticing] = useState(false);
  const [question, setQuestion] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null);
  const [activeTab, setActiveTab] = useState('prepare');

  const { 
    feedback, 
    detailedFeedback, 
    generateFeedback, 
    generateQuestionAdvice,
    generateCustomQuestionAdvice,
    setFeedback 
  } = useFeedbackGenerator();

  const {
    isRecording,
    audioBlob,
    setAudioBlob,
    startRecording,
    stopRecording
  } = useRecordingManager();

  const filteredQuestions = useCallback(() => {
    const allQuestions = getQuestionsForTrack(careerTrack);
    return interviewType === 'general' 
      ? allQuestions 
      : allQuestions.filter(q => q.type === interviewType || q.careerTrack === 'general');
  }, [careerTrack, interviewType]);

  const startPractice = useCallback(() => {
    setIsPracticing(true);
    toast.info("Starting mock interview session");
    
    const questions = filteredQuestions();
    if (questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      setSelectedQuestion(questions[randomIndex]);
    }
  }, [filteredQuestions]);

  const stopPractice = useCallback(() => {
    setIsPracticing(false);
    setSelectedQuestion(null);
    setFeedback(null);
    toast.info("Interview practice session ended");
  }, [setFeedback]);

  const handleSelectQuestion = useCallback((question: InterviewQuestion) => {
    setSelectedQuestion(question);
    toast.info("Question selected");
    
    setTimeout(() => {
      generateQuestionAdvice(question);
    }, 1000);
  }, [generateQuestionAdvice]);

  const handleQuestionSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    toast.info("Processing your question...");
    
    setTimeout(() => {
      generateCustomQuestionAdvice();
    }, 2000);
  }, [question, generateCustomQuestionAdvice]);

  return {
    careerTrack,
    setCareerTrack,
    interviewType,
    setInterviewType,
    isRecording,
    isPracticing,
    question,
    setQuestion,
    selectedQuestion,
    feedback,
    detailedFeedback,
    activeTab,
    setActiveTab,
    audioBlob,
    setAudioBlob,
    filteredQuestions: filteredQuestions(),
    startRecording,
    stopRecording,
    startPractice,
    stopPractice,
    handleSelectQuestion,
    handleQuestionSubmit
  };
}
