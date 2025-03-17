
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
  embedding?: number[]; // Add support for vector embeddings
}

export interface LearningResource {
  title: string;
  type: 'video' | 'article' | 'practice';
  url?: string;
  description?: string;
  duration?: string; // e.g. "10 min read", "15 min video"
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  careerTrack: CareerTrack;
  type: InterviewType;
  resources: LearningResource[];
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

export interface VectorSearchParams {
  query: string;
  careerTrack?: CareerTrack;
  type?: InterviewType;
  limit?: number;
}

export interface VectorSearchResult {
  question: InterviewQuestion;
  similarity: number;
}
