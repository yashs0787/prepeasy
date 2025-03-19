import { CaseStudyData, CaseApproach, EvaluationCriterion } from '../types/interviewTypes';

// Define common evaluation criteria that can be reused across cases
const commonEvaluationCriteria: EvaluationCriterion[] = [
  {
    id: 'structure',
    name: 'Problem Structuring',
    description: 'How well the candidate organized their approach and broke down the problem',
    weight: 25,
    checkpoints: [
      'Clearly defined the problem',
      'Created a logical framework',
      'Approached the problem systematically',
      'Prioritized key areas correctly'
    ]
  },
  {
    id: 'analysis',
    name: 'Analytical Rigor',
    description: 'Depth and accuracy of analysis performed',
    weight: 20,
    checkpoints: [
      'Used appropriate calculations',
      'Made reasonable assumptions',
      'Interpreted data correctly',
      'Drew logical conclusions from analysis'
    ]
  },
  {
    id: 'creativity',
    name: 'Creative Thinking',
    description: 'Novel ideas and approaches to solving the problem',
    weight: 15,
    checkpoints: [
      'Generated multiple solution options',
      'Thought beyond conventional approaches',
      'Identified innovative opportunities'
    ]
  },
  {
    id: 'communication',
    name: 'Communication',
    description: 'Clarity and effectiveness of communication',
    weight: 15,
    checkpoints: [
      'Articulated thoughts clearly',
      'Structured response coherently',
      'Used appropriate business terminology',
      'Summarized key points effectively'
    ]
  },
  {
    id: 'business-judgment',
    name: 'Business Judgment',
    description: 'Quality of recommendations and business instincts',
    weight: 25,
    checkpoints: [
      'Made practical recommendations',
      'Considered implementation challenges',
      'Addressed key business objectives',
      'Demonstrated commercial awareness'
    ]
  }
];

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
    ],
    keyInsights: [
      'Luxury market is growing while client is declining, indicating loss of market share',
      'Revenue decline is accelerating (-20% then -12.5%)',
      'Store count unchanged, suggesting per-store performance issues',
      'Price point unchanged, suggesting potential value perception problems',
      'Digital transformation in luxury retail may be impacting traditional sales channels'
    ],
    acceptableApproaches: [
      {
        id: 'customer-focus',
        name: 'Customer-Centric Analysis',
        description: 'Focus on changing customer preferences and behaviors',
        strengths: ['Identifies shifts in target demographics', 'Addresses brand perception issues'],
        keyConcepts: ['Customer segmentation', 'Brand positioning', 'Customer journey analysis'],
        sampleSolution: 'The analysis shows our client has failed to adapt to changing customer preferences in the luxury segment. I recommend a three-part strategy: 1) Refresh brand positioning through collaborations with contemporary designers, 2) Enhance the omnichannel experience to capture digital-first luxury shoppers, and 3) Implement a data-driven personalization program to rebuild customer loyalty.'
      },
      {
        id: 'competitive-focus',
        name: 'Competitive Landscape Analysis',
        description: 'Focus on competitive dynamics and market positioning',
        strengths: ['Identifies competitive threats', 'Addresses market positioning'],
        keyConcepts: ['Competitive analysis', 'Market positioning', 'Differentiation strategy'],
        sampleSolution: 'My analysis reveals that new market entrants and repositioned competitors have eroded our client\'s market share. I recommend: 1) Redefine the brand\'s unique value proposition to differentiate from competitors, 2) Invest in product innovation focused on sustainability and exclusivity, and 3) Optimize pricing strategy with limited editions and tiered product offerings to create multiple entry points while maintaining luxury positioning.'
      },
      {
        id: 'operational-focus',
        name: 'Operational Excellence Approach',
        description: 'Focus on internal operations and efficiency',
        strengths: ['Identifies internal inefficiencies', 'Addresses execution problems'],
        keyConcepts: ['Store operations', 'Supply chain optimization', 'Inventory management'],
        sampleSolution: 'The data suggests our client\'s declining sales stem from operational inefficiencies rather than market conditions. I recommend: 1) Optimize store staffing and training to improve conversion rates, 2) Implement just-in-time inventory management to ensure product availability and reduce markdowns, and 3) Restructure the supply chain to reduce lead times and improve responsiveness to trends.'
      }
    ],
    evaluationCriteria: commonEvaluationCriteria
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
