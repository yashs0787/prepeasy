
import { CaseStudyData } from '../types/interviewTypes';

export const consultingCaseStudies: CaseStudyData[] = [
  {
    id: 'case-1',
    title: 'Luxury Retail Declining Sales',
    industry: 'Retail',
    caseType: 'profitability',
    difficulty: 'intermediate',
    backgroundInfo: 'Your client is a luxury handbag retailer that has experienced declining sales over the past two years despite the overall luxury goods market growing.',
    challengeDescription: 'The CEO has asked you to determine the root causes of the sales decline and recommend strategies to reverse the trend.',
    dataPoints: [
      { label: 'Revenue (2 years ago)', value: '$150M' },
      { label: 'Revenue (last year)', value: '$120M' },
      { label: 'Revenue (current)', value: '$105M' },
      { label: 'Stores', value: '25 (unchanged)' },
      { label: 'Average price point', value: '$2,500 (unchanged)' },
      { label: 'Market growth rate', value: '+5% annually' }
    ],
    suggestedFrameworks: ['profit-framework', '4ps'],
    tips: [
      'Consider both internal and external factors',
      'Analyze customer segmentation and behavior changes',
      'Evaluate the competition and market positioning',
      'Investigate both in-store and online performance'
    ]
  },
  {
    id: 'case-2',
    title: 'Electric Vehicle Market Entry',
    industry: 'Automotive',
    caseType: 'market-entry',
    difficulty: 'advanced',
    backgroundInfo: 'Your client is a traditional automotive manufacturer considering entering the electric vehicle market. They currently have no electric models in production.',
    challengeDescription: 'The board wants to know if they should invest in developing an electric vehicle line, and if so, how they should approach this market entry.',
    dataPoints: [
      { label: 'Current annual production', value: '500,000 vehicles' },
      { label: 'R&D budget', value: '$1.5B annually' },
      { label: 'EV market growth', value: '25% annually' },
      { label: 'EV market share', value: '10% of total auto market' },
      { label: 'Battery technology cost', value: 'Declining 15% annually' }
    ],
    suggestedFrameworks: ['market-entry', 'porter-five'],
    tips: [
      'Consider both consumer and commercial markets',
      'Evaluate build vs. partner options',
      'Analyze regulatory trends and incentives',
      'Consider the timeline for market entry vs. competition'
    ]
  },
  {
    id: 'case-3',
    title: 'Coffee Shop Market Sizing',
    industry: 'Food & Beverage',
    caseType: 'market-sizing',
    difficulty: 'basic',
    backgroundInfo: 'Your client is a coffee chain looking to expand into the Boston market. They need to understand the total market size and potential market share they could capture.',
    challengeDescription: 'Estimate the total annual revenue for coffee shops in Boston and recommend what market share would be realistic for your client to target.',
    suggestedFrameworks: ['market-sizing'],
    tips: [
      'Start with the population of Boston',
      'Make assumptions about coffee consumption habits',
      'Consider different customer segments',
      'Factor in seasonality and competition'
    ]
  },
  {
    id: 'case-4',
    title: 'Hospital Cost Reduction',
    industry: 'Healthcare',
    caseType: 'cost-reduction',
    difficulty: 'intermediate',
    backgroundInfo: 'Your client is a large hospital network facing pressure from insurance companies and government programs to reduce costs while maintaining quality of care.',
    challengeDescription: 'Identify areas for cost reduction and develop a strategy that would save at least 15% in operational costs without compromising patient outcomes.',
    dataPoints: [
      { label: 'Annual operating budget', value: '$750M' },
      { label: 'Staff costs', value: '55% of budget' },
      { label: 'Supplies', value: '20% of budget' },
      { label: 'Facilities', value: '15% of budget' },
      { label: 'Administrative', value: '10% of budget' }
    ],
    suggestedFrameworks: ['profit-framework'],
    tips: [
      'Consider both fixed and variable costs',
      'Evaluate potential for process optimization',
      'Look at supply chain efficiency',
      'Consider technology investments that might reduce long-term costs'
    ]
  }
];

// Function to get case studies by type
export const getCaseStudiesByType = (caseType: string): CaseStudyData[] => {
  if (caseType === 'all') return consultingCaseStudies;
  return consultingCaseStudies.filter(study => study.caseType === caseType);
};

// Function to get case study by ID
export const getCaseStudyById = (id: string): CaseStudyData | undefined => {
  return consultingCaseStudies.find(study => study.id === id);
};

