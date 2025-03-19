
export type InterviewType = 'technical' | 'behavioral' | 'case' | 'financial' | 'general';
export type CareerTrack = 'consulting' | 'investment-banking' | 'tech' | 'general';
export type CaseType = 'market-sizing' | 'profitability' | 'market-entry' | 'growth-strategy' | 'cost-reduction' | 'pricing' | 'general-case';

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
  caseType?: CaseType; // Added for consulting case categorization
  framework?: string; // Suggested framework to use (e.g., "Profitability Framework", "4Ps")
  industryContext?: string; // Industry context for the case
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

export interface CaseFramework {
  id: string;
  name: string;
  description: string;
  steps: string[];
  applicableFor: CaseType[];
  example?: string;
}

export interface CaseStudyData {
  id: string;
  title: string;
  industry: string;
  caseType: CaseType;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  backgroundInfo: string;
  challengeDescription: string;
  dataPoints?: { label: string; value: string }[];
  suggestedFrameworks: string[];
  sampleSolution?: string;
  tips?: string[];
  // New fields for advanced case evaluation
  keyInsights?: string[]; // Critical insights any valid solution should identify
  acceptableApproaches?: CaseApproach[]; // Different valid approaches to solve the case
  evaluationCriteria?: EvaluationCriterion[]; // Specific criteria for assessment
}

// New types for case study solutions
export interface CaseApproach {
  id: string;
  name: string; // e.g., "Market Segmentation First", "Cost Analysis Focused"
  description: string;
  strengths: string[];
  keyConcepts: string[]; // Important concepts this approach should demonstrate
  sampleSolution?: string; // Example solution using this approach
}

export interface EvaluationCriterion {
  id: string;
  name: string; // e.g., "Problem Structuring", "Quantitative Analysis"
  description: string;
  weight: number; // Relative importance (0-100)
  checkpoints: string[]; // Specific elements to check for in a solution
}

export interface CaseSolutionEvaluation {
  overallScore: number;
  approach: string; // Identified approach used by the candidate
  criteriaScores: Record<string, number>; // Scores by criterion
  strengths: string[];
  areasForImprovement: string[];
  missedInsights: string[];
  suggestedNextSteps: string[];
  alternativeApproaches?: string[]; // Other approaches that could have worked well
}
