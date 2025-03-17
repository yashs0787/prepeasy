
import { CaseFramework, CaseType } from '../types/interviewTypes';

export const consultingFrameworks: CaseFramework[] = [
  {
    id: 'profit-framework',
    name: 'Profitability Framework',
    description: 'A structured approach to analyze a company\'s profitability issues',
    steps: [
      'Understand the profit equation (Profit = Revenue - Costs)',
      'Analyze Revenue: Price × Quantity',
      'Analyze Costs: Fixed Costs + Variable Costs',
      'Identify key drivers affecting each component',
      'Develop recommendations to improve profitability'
    ],
    applicableFor: ['profitability', 'cost-reduction', 'pricing'],
    example: 'For a client with declining profits, examine if the issue is revenue decline (price, volume) or cost increase (fixed, variable), then identify specific drivers.'
  },
  {
    id: 'market-entry',
    name: 'Market Entry Framework',
    description: 'Evaluate the attractiveness of entering a new market',
    steps: [
      'Analyze market attractiveness (size, growth, profitability)',
      'Evaluate competitive landscape',
      'Assess company capabilities and fit',
      'Identify entry barriers',
      'Determine optimal entry strategy'
    ],
    applicableFor: ['market-entry', 'growth-strategy'],
    example: 'When evaluating if a client should enter the EV market, assess market size, competitive intensity, company capabilities, entry barriers, and potential strategies.'
  },
  {
    id: 'market-sizing',
    name: 'Market Sizing Framework',
    description: 'Estimate the size of a market using logical assumptions',
    steps: [
      'Define the market clearly',
      'Segment the market if helpful',
      'Identify the key variables needed for estimation',
      'Make reasonable assumptions for each variable',
      'Calculate the final market size using a clear equation'
    ],
    applicableFor: ['market-sizing', 'market-entry'],
    example: 'To estimate the coffee shop market in New York, calculate: (Population) × (% coffee drinkers) × (avg cups per day) × (avg price per cup).'
  },
  {
    id: '4ps',
    name: '4Ps Marketing Framework',
    description: 'Analyze marketing strategy through Product, Price, Place, and Promotion',
    steps: [
      'Product: Evaluate features, quality, branding, etc.',
      'Price: Assess pricing strategy, elasticity, etc.',
      'Place: Analyze distribution channels and strategy',
      'Promotion: Evaluate advertising, PR, sales promotions, etc.'
    ],
    applicableFor: ['growth-strategy', 'pricing', 'market-entry'],
    example: 'For a luxury brand losing market share, examine if the issue is with product quality, pricing strategy, distribution channels, or marketing efforts.'
  },
  {
    id: 'porter-five',
    name: 'Porter\'s Five Forces',
    description: 'Analyze competitive intensity and market attractiveness',
    steps: [
      'Assess threat of new entrants',
      'Evaluate bargaining power of suppliers',
      'Analyze bargaining power of buyers',
      'Examine threat of substitute products',
      'Evaluate competitive rivalry'
    ],
    applicableFor: ['market-entry', 'growth-strategy', 'general-case'],
    example: 'When analyzing the airline industry, consider barriers to entry, supplier power (aircraft manufacturers), buyer power (customers), substitutes (trains, cars), and rivalry among existing airlines.'
  }
];

// Function to get frameworks applicable for a specific case type
export const getFrameworksForCaseType = (caseType: CaseType): CaseFramework[] => {
  return consultingFrameworks.filter(framework => 
    framework.applicableFor.includes(caseType)
  );
};

// Function to get a specific framework by ID
export const getFrameworkById = (id: string): CaseFramework | undefined => {
  return consultingFrameworks.find(framework => framework.id === id);
};

