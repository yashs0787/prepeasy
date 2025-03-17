
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
