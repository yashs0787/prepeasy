
import { CareerTrack, InterviewQuestion } from '../types/interviewTypes';

export const getQuestionsForTrack = (careerTrack: CareerTrack): InterviewQuestion[] => {
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
};
