import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

export type InterviewType = 'technical' | 'behavioral' | 'case' | 'financial' | 'general';
export type CareerTrack = 'consulting' | 'investment-banking' | 'tech' | 'general';

export interface InterviewQuestion {
  id: string;
  text: string;
  careerTrack: CareerTrack;
  type: InterviewType;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  category?: string;
  sampleAnswer?: string;
  tips?: string[];
}

export interface LearningResource {
  title: string;
  type: 'video' | 'article' | 'practice';
  url?: string;
}

export interface FeedbackResult {
  score: number;
  strengths: string[];
  improvements: string[];
  example?: string;
  scoreBreakdown?: Record<string, number>;
  learningResources?: LearningResource[];
  nextSteps?: string;
}

export function useInterviewAssistant(initialCareerTrack: CareerTrack = 'general') {
  const [careerTrack, setCareerTrack] = useState<CareerTrack>(initialCareerTrack);
  const [interviewType, setInterviewType] = useState<InterviewType>('general');
  const [isRecording, setIsRecording] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [question, setQuestion] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [detailedFeedback, setDetailedFeedback] = useState<FeedbackResult | null>(null);
  const [activeTab, setActiveTab] = useState('prepare');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const getQuestionsForTrack = useCallback((): InterviewQuestion[] => {
    const baseQuestions: InterviewQuestion[] = [
      {
        id: 'gen1',
        text: 'Tell me about yourself and your career aspirations.',
        careerTrack: 'general',
        type: 'behavioral',
        difficulty: 'basic',
      },
      {
        id: 'gen2',
        text: 'Describe a time when you faced a significant challenge at work.',
        careerTrack: 'general',
        type: 'behavioral',
        difficulty: 'intermediate',
      },
      {
        id: 'gen3',
        text: 'What are your greatest professional strengths and weaknesses?',
        careerTrack: 'general',
        type: 'behavioral',
        difficulty: 'basic',
      }
    ];

    const techQuestions: InterviewQuestion[] = [
      {
        id: 'tech1',
        text: 'Explain how you would design a scalable microservice architecture.',
        careerTrack: 'tech',
        type: 'technical',
        difficulty: 'advanced',
      },
      {
        id: 'tech2',
        text: 'Describe a challenging technical problem you\'ve solved recently.',
        careerTrack: 'tech',
        type: 'behavioral',
        difficulty: 'intermediate',
      },
      {
        id: 'tech3',
        text: 'How do you stay updated with the latest technology trends?',
        careerTrack: 'tech',
        type: 'behavioral',
        difficulty: 'basic',
      }
    ];

    const consultingQuestions: InterviewQuestion[] = [
      {
        id: 'cons1',
        text: 'Your client is a luxury retail brand facing declining sales. How would you approach this problem?',
        careerTrack: 'consulting',
        type: 'case',
        difficulty: 'intermediate',
        category: 'Profitability',
      },
      {
        id: 'cons2',
        text: 'How would you structure an analysis for a client considering entering the electric vehicle market?',
        careerTrack: 'consulting',
        type: 'case',
        difficulty: 'advanced',
        category: 'Market Entry',
      },
      {
        id: 'cons3',
        text: 'Explain how you would apply the MECE principle to solve a client problem.',
        careerTrack: 'consulting',
        type: 'technical',
        difficulty: 'basic',
        category: 'Frameworks',
        sampleAnswer: 'The MECE principle stands for Mutually Exclusive, Collectively Exhaustive. When using this approach, I would first break down the problem into categories that don\'t overlap (mutually exclusive) but together cover all possibilities (collectively exhaustive). For example, when analyzing a company\'s revenue decline, I would categorize causes into external factors (market conditions, competition) and internal factors (product quality, pricing strategy, operational issues). This ensures no causes are double-counted or missed entirely.'
      }
    ];

    const ibQuestions: InterviewQuestion[] = [
      {
        id: 'ib1',
        text: 'Walk me through a DCF valuation.',
        careerTrack: 'investment-banking',
        type: 'technical',
        difficulty: 'intermediate',
        category: 'Valuation',
      },
      {
        id: 'ib2',
        text: 'How would you advise a client on whether to pursue a stock buyback or issue dividends?',
        careerTrack: 'investment-banking',
        type: 'technical',
        difficulty: 'advanced',
        category: 'Corporate Finance',
      },
      {
        id: 'ib3',
        text: 'What factors would you consider when evaluating a potential M&A target?',
        careerTrack: 'investment-banking',
        type: 'technical',
        difficulty: 'intermediate',
        category: 'M&A',
        sampleAnswer: 'When evaluating an M&A target, I would consider strategic fit, valuation, synergies, cultural compatibility, regulatory concerns, and integration complexity. First, I\'d assess whether the target aligns with the acquirer\'s strategic goals. Then, I\'d determine a fair valuation using methods like DCF, comparable companies, and precedent transactions. I would quantify potential synergies, both revenue and cost, and evaluate cultural fit to gauge integration success probability. Finally, I\'d consider regulatory hurdles and develop a comprehensive integration plan.'
      }
    ];

    switch (careerTrack) {
      case 'tech':
        return [...baseQuestions, ...techQuestions];
      case 'consulting':
        return [...baseQuestions, ...consultingQuestions];
      case 'investment-banking':
        return [...baseQuestions, ...ibQuestions];
      default:
        return baseQuestions;
    }
  }, [careerTrack]);

  const filteredQuestions = useCallback(() => {
    const allQuestions = getQuestionsForTrack();
    return interviewType === 'general' 
      ? allQuestions 
      : allQuestions.filter(q => q.type === interviewType || q.careerTrack === 'general');
  }, [getQuestionsForTrack, interviewType]);

  const startRecording = useCallback(() => {
    setIsRecording(true);
    toast.info("Microphone recording started");
    
    setTimeout(() => {
      toast.success("Answer recorded. Processing feedback...");
      setIsRecording(false);
      
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
    }, 5000);
  }, [selectedQuestion]);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    toast.info("Recording stopped");
  }, []);

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
    setDetailedFeedback(null);
    toast.info("Interview practice session ended");
  }, []);

  const handleSelectQuestion = useCallback((question: InterviewQuestion) => {
    setSelectedQuestion(question);
    toast.info("Question selected");
    
    setTimeout(() => {
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
    }, 1000);
  }, []);

  const handleQuestionSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    toast.info("Processing your question...");
    
    setTimeout(() => {
      const advice = "This question evaluates your problem-solving approach and analytical thinking. Structure your answer using a clear framework, state your assumptions explicitly, and walk through your reasoning step by step. Use specific examples from your experience to demonstrate your skills.";
      setFeedback(advice);
    }, 2000);
  }, [question]);

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
