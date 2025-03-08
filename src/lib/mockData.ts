export interface Job {
  id: string;
  title: string;
  company: string;
  logo?: string;
  location: string;
  salary: string;
  jobType: string; // Full-time, Part-time, Contract
  workType: string; // Remote, On-site, Hybrid
  postedAt: string;
  description: string;
  requirements: string[];
  isSaved?: boolean;
  // New fields
  category?: string; // Job Type category
  experienceLevel?: string; // Experience level
  industry?: string; // Industry/Function
  hiringManager?: {
    name: string;
    role: string;
    platform: string;
  };
  applicationStatus: 'applied' | 'interviewing' | 'offered' | 'rejected' | null;
}

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Tech Innovations Inc.',
    logo: 'tech-innovations-logo.png',
    location: 'San Francisco, CA',
    salary: '$140,000 - $170,000',
    jobType: 'Full-time',
    workType: 'Hybrid',
    postedAt: '2 days ago',
    description: 'We are looking for a passionate software engineer to develop and maintain our cutting-edge applications.',
    requirements: ['5+ years of experience', 'Proficiency in JavaScript, React', 'Strong problem-solving skills'],
    isSaved: false,
    applicationStatus: null
  },
  {
    id: '2',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    logo: 'analytics-pro-logo.png',
    location: 'New York, NY',
    salary: '$120,000 - $150,000',
    jobType: 'Full-time',
    workType: 'On-site',
    postedAt: '5 days ago',
    description: 'Join our team of data experts to analyze complex datasets and provide actionable insights.',
    requirements: ['3+ years of experience', 'Strong knowledge of Python, SQL', 'Experience with machine learning models'],
    isSaved: true,
    applicationStatus: null
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'Creative Solutions Ltd.',
    logo: 'creative-solutions-logo.png',
    location: 'Remote',
    salary: '$100,000 - $130,000',
    jobType: 'Contract',
    workType: 'Remote',
    postedAt: '1 week ago',
    description: 'We are seeking a talented UX/UI designer to create intuitive and visually appealing user interfaces.',
    requirements: ['2+ years of experience', 'Proficiency in Figma, Adobe XD', 'Strong portfolio of design projects'],
    isSaved: false,
    applicationStatus: null
  },
  {
    id: '4',
    title: 'Marketing Manager',
    company: 'Global Marketing Group',
    logo: 'global-marketing-logo.png',
    location: 'Chicago, IL',
    salary: '$90,000 - $120,000',
    jobType: 'Full-time',
    workType: 'Hybrid',
    postedAt: '2 weeks ago',
    description: 'Lead our marketing efforts and develop innovative strategies to promote our brand and products.',
    requirements: ['5+ years of experience', 'Strong knowledge of digital marketing', 'Excellent communication skills'],
    isSaved: false,
    applicationStatus: null
  },
  {
    id: '5',
    title: 'Financial Analyst',
    company: 'Finance First Corp.',
    logo: 'finance-first-logo.png',
    location: 'Boston, MA',
    salary: '$80,000 - $110,000',
    jobType: 'Full-time',
    workType: 'On-site',
    postedAt: '3 weeks ago',
    description: 'Analyze financial data, prepare reports, and provide recommendations to support our business decisions.',
    requirements: ['3+ years of experience', 'Strong knowledge of financial modeling', 'Excellent analytical skills'],
    isSaved: false,
    applicationStatus: null
  },
  {
    id: '6',
    title: 'Project Manager',
    company: 'Managed Projects Inc.',
    logo: 'managed-projects-logo.png',
    location: 'Austin, TX',
    salary: '$110,000 - $140,000',
    jobType: 'Full-time',
    workType: 'Hybrid',
    postedAt: '1 month ago',
    description: 'Oversee and coordinate projects from initiation to completion, ensuring they are on time and within budget.',
    requirements: ['5+ years of experience', 'PMP certification', 'Strong leadership skills'],
    isSaved: false,
    applicationStatus: null
  },
  {
    id: '7',
    title: 'Customer Service Representative',
    company: 'Customer Care Solutions',
    logo: 'customer-care-logo.png',
    location: 'Remote',
    salary: '$40,000 - $60,000',
    jobType: 'Full-time',
    workType: 'Remote',
    postedAt: '2 months ago',
    description: 'Provide excellent customer service and support to our clients, resolving issues and answering inquiries.',
    requirements: ['1+ years of experience', 'Excellent communication skills', 'Strong problem-solving skills'],
    isSaved: false,
    applicationStatus: null
  },
  {
    id: '8',
    title: 'Human Resources Manager',
    company: 'People First HR',
    logo: 'people-first-logo.png',
    location: 'Seattle, WA',
    salary: '$100,000 - $130,000',
    jobType: 'Full-time',
    workType: 'Hybrid',
    postedAt: '3 months ago',
    description: 'Manage all aspects of human resources, including recruitment, employee relations, and benefits administration.',
    requirements: ['5+ years of experience', 'SHRM certification', 'Strong leadership skills'],
    isSaved: false,
    applicationStatus: null
  },
  {
    id: '9',
    title: 'Sales Representative',
    company: 'Sales Success Group',
    logo: 'sales-success-logo.png',
    location: 'Dallas, TX',
    salary: '$60,000 - $90,000',
    jobType: 'Full-time',
    workType: 'On-site',
    postedAt: '4 months ago',
    description: 'Generate new leads, build relationships with clients, and close sales to meet our revenue goals.',
    requirements: ['2+ years of experience', 'Excellent communication skills', 'Strong negotiation skills'],
    isSaved: false,
    applicationStatus: null
  },
  {
    id: '10',
    title: 'Operations Manager',
    company: 'Efficient Operations Ltd.',
    logo: 'efficient-operations-logo.png',
    location: 'Miami, FL',
    salary: '$90,000 - $120,000',
    jobType: 'Full-time',
    workType: 'Hybrid',
    postedAt: '5 months ago',
    description: 'Oversee and improve our operational processes, ensuring efficiency and productivity.',
    requirements: ['5+ years of experience', 'Strong analytical skills', 'Excellent problem-solving skills'],
    isSaved: false,
    applicationStatus: null
  }
];
