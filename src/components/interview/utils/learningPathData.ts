
import { CareerTrack, InterviewType, LearningPath, LearningResource } from '../types/interviewTypes';

// Base learning resources that apply to all career tracks
const generalBehavioralResources: LearningResource[] = [
  {
    title: "STAR Method for Behavioral Interviews",
    type: "article",
    description: "Learn how to structure your answers using the Situation, Task, Action, Result framework",
    url: "https://www.themuse.com/advice/star-interview-method",
    difficulty: "basic",
    duration: "7 min read"
  },
  {
    title: "Common Behavioral Questions - Practice Guide",
    type: "practice",
    description: "Interactive practice session with the most common behavioral questions",
    difficulty: "intermediate",
    duration: "30 min practice"
  },
  {
    title: "Body Language and Interview Presence",
    type: "video",
    description: "Expert tips on body language and professional presence during interviews",
    url: "https://www.youtube.com/watch?v=example",
    difficulty: "basic",
    duration: "12 min video"
  }
];

// Technology career track learning resources
const techResources: Record<InterviewType, LearningResource[]> = {
  technical: [
    {
      title: "Data Structures and Algorithms Fundamentals",
      type: "article",
      description: "Comprehensive guide to the core data structures and algorithms for tech interviews",
      url: "https://www.interviewcake.com/data-structures-and-algorithms-guide",
      difficulty: "intermediate",
      duration: "25 min read"
    },
    {
      title: "System Design Interview Preparation",
      type: "video",
      description: "Learn how to approach system design questions with practical examples",
      url: "https://www.youtube.com/watch?v=example-system-design",
      difficulty: "advanced",
      duration: "45 min video"
    },
    {
      title: "Technical Interview Coding Problems",
      type: "practice",
      description: "Practice coding problems commonly asked in tech interviews",
      difficulty: "intermediate",
      duration: "60 min practice"
    }
  ],
  behavioral: generalBehavioralResources,
  case: [
    {
      title: "Tech Case Study Framework",
      type: "article",
      description: "How to analyze and solve technology case studies",
      difficulty: "intermediate",
      duration: "15 min read"
    }
  ],
  financial: [
    {
      title: "Financial Metrics for Tech Companies",
      type: "article",
      description: "Understanding key financial metrics for technology businesses",
      difficulty: "intermediate",
      duration: "18 min read"
    }
  ],
  general: [
    {
      title: "Tech Industry Interview Overview",
      type: "video",
      description: "A comprehensive overview of the interview process at tech companies",
      difficulty: "basic",
      duration: "20 min video"
    }
  ]
};

// Consulting career track learning resources
const consultingResources: Record<InterviewType, LearningResource[]> = {
  case: [
    {
      title: "Case Interview Fundamentals",
      type: "video",
      description: "Learn the basics of consulting case interviews with expert guidance",
      url: "https://www.youtube.com/watch?v=example-case",
      difficulty: "basic",
      duration: "30 min video"
    },
    {
      title: "Market Sizing and Estimation",
      type: "article",
      description: "Techniques for market sizing questions in consulting interviews",
      difficulty: "intermediate",
      duration: "12 min read"
    },
    {
      title: "Profitability Case Practice",
      type: "practice",
      description: "Interactive practice with profitability case frameworks",
      difficulty: "advanced",
      duration: "45 min practice"
    }
  ],
  behavioral: generalBehavioralResources,
  technical: [
    {
      title: "Business Frameworks for Consulting",
      type: "article",
      description: "Key frameworks every consulting candidate should know",
      difficulty: "intermediate",
      duration: "20 min read"
    }
  ],
  financial: [
    {
      title: "Financial Analysis for Consultants",
      type: "article",
      description: "How to analyze financial statements in consulting cases",
      difficulty: "intermediate",
      duration: "25 min read"
    }
  ],
  general: [
    {
      title: "Consulting Interview Process Guide",
      type: "video",
      description: "Understanding the end-to-end consulting interview process",
      difficulty: "basic",
      duration: "15 min video"
    }
  ]
};

// Investment Banking career track learning resources
const investmentBankingResources: Record<InterviewType, LearningResource[]> = {
  financial: [
    {
      title: "DCF Valuation Masterclass",
      type: "video",
      description: "Detailed explanation of Discounted Cash Flow analysis for IB interviews",
      url: "https://www.youtube.com/watch?v=example-dcf",
      difficulty: "advanced",
      duration: "40 min video"
    },
    {
      title: "Financial Statements Analysis",
      type: "article",
      description: "How to analyze and interpret financial statements for IB interviews",
      difficulty: "intermediate",
      duration: "30 min read"
    },
    {
      title: "Valuation Methods Practice",
      type: "practice",
      description: "Practice problems on different valuation methodologies",
      difficulty: "advanced",
      duration: "60 min practice"
    }
  ],
  behavioral: generalBehavioralResources,
  technical: [
    {
      title: "Technical Questions for Investment Banking",
      type: "article",
      description: "Comprehensive list of technical questions for IB interviews",
      difficulty: "intermediate",
      duration: "25 min read"
    }
  ],
  case: [
    {
      title: "M&A Case Study Analysis",
      type: "article",
      description: "How to approach M&A case studies in banking interviews",
      difficulty: "advanced",
      duration: "35 min read"
    }
  ],
  general: [
    {
      title: "Investment Banking Interview Guide",
      type: "video",
      description: "Complete overview of the IB interview process",
      difficulty: "basic",
      duration: "25 min video"
    }
  ]
};

// General career track learning resources
const generalResources: Record<InterviewType, LearningResource[]> = {
  behavioral: generalBehavioralResources,
  technical: [
    {
      title: "Industry-Specific Technical Knowledge",
      type: "article",
      description: "How to research and prepare technical knowledge for any industry",
      difficulty: "intermediate",
      duration: "15 min read"
    }
  ],
  case: [
    {
      title: "Basic Case Interview Preparation",
      type: "video",
      description: "Introduction to case interviews for non-consulting roles",
      difficulty: "basic",
      duration: "20 min video"
    }
  ],
  financial: [
    {
      title: "Financial Literacy for Interviews",
      type: "article",
      description: "Essential financial concepts every professional should know",
      difficulty: "basic",
      duration: "12 min read"
    }
  ],
  general: [
    {
      title: "Universal Interview Preparation",
      type: "article",
      description: "Preparation strategies that work across all industries",
      difficulty: "basic",
      duration: "10 min read"
    },
    {
      title: "Tell Me About Yourself - Perfect Answers",
      type: "video",
      description: "How to craft the perfect response to the most common interview question",
      difficulty: "basic",
      duration: "15 min video"
    }
  ]
};

// Map of all resources by career track and interview type
const resourcesByTrack: Record<CareerTrack, Record<InterviewType, LearningResource[]>> = {
  'tech': techResources,
  'consulting': consultingResources,
  'investment-banking': investmentBankingResources,
  'general': generalResources
};

// Learning paths based on career tracks
export const learningPaths: LearningPath[] = [
  {
    id: 'tech-technical',
    title: 'Technical Interview Mastery for Tech Roles',
    description: 'Master the technical aspects of coding interviews, system design, and algorithm questions',
    careerTrack: 'tech',
    type: 'technical',
    resources: techResources.technical
  },
  {
    id: 'consulting-case',
    title: 'Consulting Case Interview Preparation',
    description: 'Learn frameworks and practice techniques for solving consulting case interviews',
    careerTrack: 'consulting',
    type: 'case',
    resources: consultingResources.case
  },
  {
    id: 'ib-financial',
    title: 'Financial Analysis for Investment Banking',
    description: 'Prepare for investment banking technical questions and financial modeling',
    careerTrack: 'investment-banking',
    type: 'financial',
    resources: investmentBankingResources.financial
  },
  {
    id: 'behavioral-all',
    title: 'Behavioral Interview Excellence',
    description: 'Master the STAR method and prepare compelling stories for any behavioral question',
    careerTrack: 'general',
    type: 'behavioral',
    resources: generalBehavioralResources
  }
];

// Get learning resources based on career track and interview type
export const getLearningResources = (
  careerTrack: CareerTrack = 'general', 
  interviewType: InterviewType = 'general'
): LearningResource[] => {
  return resourcesByTrack[careerTrack][interviewType] || generalResources.general;
};

// Get recommended learning path based on career track
export const getRecommendedPath = (careerTrack: CareerTrack): LearningPath | undefined => {
  return learningPaths.find(path => path.careerTrack === careerTrack);
};

// Get all learning paths for a specific career track
export const getPathsForTrack = (careerTrack: CareerTrack): LearningPath[] => {
  return learningPaths.filter(path => 
    path.careerTrack === careerTrack || path.careerTrack === 'general'
  );
};
