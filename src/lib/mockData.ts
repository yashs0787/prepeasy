
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  applyUrl: string;
  postedDate: string;
  category: 'Tech' | 'Finance' | 'Marketing' | 'Consulting' | 'Startups' | 'Other';
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  workType: 'Remote' | 'On-site' | 'Hybrid';
  companyLogoUrl?: string;
  hiringManager?: {
    name: string;
    position: string;
    linkedIn?: string;
    twitter?: string;
    email?: string;
  };
  isSaved?: boolean;
  applicationStatus?: 'Not Applied' | 'Applied' | 'In Progress' | 'Rejected' | 'Offered';
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  savedJobs: string[];
  appliedJobs: {
    jobId: string;
    status: 'Applied' | 'In Progress' | 'Rejected' | 'Offered';
    appliedDate: string;
  }[];
  preferences: {
    jobTypes: ('Full-time' | 'Part-time' | 'Contract' | 'Internship')[];
    workTypes: ('Remote' | 'On-site' | 'Hybrid')[];
    categories: ('Tech' | 'Finance' | 'Marketing' | 'Consulting' | 'Startups' | 'Other')[];
    locations: string[];
  };
}

export const mockJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Frontend Developer",
    company: "TechNova",
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
    description: "TechNova is looking for a Senior Frontend Developer to join our growing team. You will be responsible for building user interfaces, implementing features, and collaborating with designers and backend developers.",
    requirements: [
      "5+ years of experience with React",
      "Strong understanding of JavaScript, HTML, and CSS",
      "Experience with TypeScript",
      "Familiarity with modern frontend build tools"
    ],
    responsibilities: [
      "Develop and maintain frontend applications",
      "Collaborate with designers to implement UI/UX",
      "Write clean, maintainable code",
      "Participate in code reviews"
    ],
    applyUrl: "https://example.com/apply/job-1",
    postedDate: "2023-06-10",
    category: "Tech",
    jobType: "Full-time",
    workType: "Remote",
    companyLogoUrl: "/placeholder.svg",
    hiringManager: {
      name: "Alex Johnson",
      position: "Engineering Manager",
      linkedIn: "https://linkedin.com/in/alexjohnson",
      email: "alex@technova.com"
    }
  },
  {
    id: "job-2",
    title: "Product Marketing Manager",
    company: "Elevate Marketing",
    location: "New York, NY",
    salary: "$90,000 - $110,000",
    description: "Elevate Marketing is seeking a Product Marketing Manager to develop and execute marketing strategies for our products. The ideal candidate has a proven track record of successful product launches and marketing campaigns.",
    requirements: [
      "3+ years of experience in product marketing",
      "Bachelor's degree in Marketing or related field",
      "Strong analytical skills",
      "Excellent communication skills"
    ],
    responsibilities: [
      "Develop and execute product marketing strategies",
      "Create compelling product messaging and positioning",
      "Collaborate with sales and product teams",
      "Analyze market trends and competitor activities"
    ],
    applyUrl: "https://example.com/apply/job-2",
    postedDate: "2023-06-12",
    category: "Marketing",
    jobType: "Full-time",
    workType: "On-site",
    companyLogoUrl: "/placeholder.svg",
    hiringManager: {
      name: "Sarah Miller",
      position: "Marketing Director",
      linkedIn: "https://linkedin.com/in/sarahmiller"
    }
  },
  {
    id: "job-3",
    title: "Financial Analyst Intern",
    company: "Global Finance Partners",
    location: "Chicago, IL",
    salary: "$25/hour",
    description: "Global Finance Partners is offering a paid internship for a Financial Analyst. This is an excellent opportunity for finance students to gain hands-on experience in financial analysis and reporting.",
    requirements: [
      "Currently pursuing a degree in Finance, Accounting, or related field",
      "Strong analytical and problem-solving skills",
      "Proficiency in Excel",
      "Attention to detail"
    ],
    responsibilities: [
      "Assist with financial analysis and reporting",
      "Support budget preparation and forecasting",
      "Help with data collection and analysis",
      "Prepare presentations for senior management"
    ],
    applyUrl: "https://example.com/apply/job-3",
    postedDate: "2023-06-15",
    category: "Finance",
    jobType: "Internship",
    workType: "Hybrid",
    companyLogoUrl: "/placeholder.svg"
  },
  {
    id: "job-4",
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "Austin, TX",
    salary: "$90,000 - $120,000",
    description: "DesignHub is looking for a talented UX/UI Designer to create beautiful, intuitive interfaces for our products. The ideal candidate has a strong portfolio demonstrating their design skills and user-centered approach.",
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency in Figma, Sketch, or similar tools",
      "Strong portfolio showcasing previous work",
      "Understanding of user-centered design principles"
    ],
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity designs",
      "Conduct user research and usability testing",
      "Collaborate with product managers and developers",
      "Contribute to the design system"
    ],
    applyUrl: "https://example.com/apply/job-4",
    postedDate: "2023-06-18",
    category: "Tech",
    jobType: "Full-time",
    workType: "Remote",
    companyLogoUrl: "/placeholder.svg",
    hiringManager: {
      name: "Michael Chen",
      position: "Design Director",
      linkedIn: "https://linkedin.com/in/michaelchen",
      twitter: "https://twitter.com/michaelchen"
    }
  },
  {
    id: "job-5",
    title: "Business Development Representative",
    company: "SalesPro",
    location: "Denver, CO",
    salary: "$60,000 - $80,000 + Commission",
    description: "SalesPro is seeking a Business Development Representative to identify and pursue new business opportunities. The ideal candidate is a self-starter with excellent communication skills and a passion for sales.",
    requirements: [
      "1+ years of sales experience",
      "Strong communication and negotiation skills",
      "Goal-oriented mindset",
      "Ability to work independently"
    ],
    responsibilities: [
      "Identify and qualify new sales opportunities",
      "Conduct outreach to potential clients",
      "Schedule meetings for account executives",
      "Maintain accurate records in CRM"
    ],
    applyUrl: "https://example.com/apply/job-5",
    postedDate: "2023-06-20",
    category: "Marketing",
    jobType: "Full-time",
    workType: "On-site",
    companyLogoUrl: "/placeholder.svg"
  },
  {
    id: "job-6",
    title: "Backend Developer",
    company: "CodeCraft",
    location: "Seattle, WA",
    salary: "$110,000 - $140,000",
    description: "CodeCraft is looking for a Backend Developer to design and implement server-side applications. The ideal candidate has experience with microservices architecture and cloud platforms.",
    requirements: [
      "4+ years of experience in backend development",
      "Proficiency in Node.js, Python, or Java",
      "Experience with databases (SQL and NoSQL)",
      "Familiarity with cloud platforms (AWS, GCP, or Azure)"
    ],
    responsibilities: [
      "Design and implement APIs and services",
      "Optimize application performance",
      "Ensure security and data protection",
      "Collaborate with frontend developers"
    ],
    applyUrl: "https://example.com/apply/job-6",
    postedDate: "2023-06-22",
    category: "Tech",
    jobType: "Full-time",
    workType: "Hybrid",
    companyLogoUrl: "/placeholder.svg",
    hiringManager: {
      name: "David Park",
      position: "CTO",
      linkedIn: "https://linkedin.com/in/davidpark",
      email: "david@codecraft.com"
    }
  },
  {
    id: "job-7",
    title: "Data Scientist",
    company: "DataMinds",
    location: "Boston, MA",
    salary: "$130,000 - $160,000",
    description: "DataMinds is seeking a Data Scientist to analyze complex data sets and develop predictive models. The ideal candidate has a strong background in statistics, machine learning, and programming.",
    requirements: [
      "Master's or PhD in Computer Science, Statistics, or related field",
      "Experience with machine learning algorithms",
      "Proficiency in Python or R",
      "Knowledge of SQL and data visualization tools"
    ],
    responsibilities: [
      "Analyze large datasets to extract insights",
      "Develop and implement machine learning models",
      "Communicate findings to non-technical stakeholders",
      "Collaborate with engineering teams"
    ],
    applyUrl: "https://example.com/apply/job-7",
    postedDate: "2023-06-25",
    category: "Tech",
    jobType: "Full-time",
    workType: "Remote",
    companyLogoUrl: "/placeholder.svg"
  },
  {
    id: "job-8",
    title: "Project Manager",
    company: "Agile Solutions",
    location: "Atlanta, GA",
    salary: "$95,000 - $120,000",
    description: "Agile Solutions is looking for a Project Manager to lead cross-functional teams and ensure successful project delivery. The ideal candidate has experience with Agile methodologies and a track record of delivering projects on time and within budget.",
    requirements: [
      "3+ years of project management experience",
      "PMP or Agile certification preferred",
      "Strong leadership and communication skills",
      "Experience with project management tools"
    ],
    responsibilities: [
      "Lead project planning and execution",
      "Manage project scope, schedule, and resources",
      "Facilitate team meetings and remove blockers",
      "Report project status to stakeholders"
    ],
    applyUrl: "https://example.com/apply/job-8",
    postedDate: "2023-06-27",
    category: "Consulting",
    jobType: "Full-time",
    workType: "Hybrid",
    companyLogoUrl: "/placeholder.svg",
    hiringManager: {
      name: "Emily Rodriguez",
      position: "Director of Operations",
      linkedIn: "https://linkedin.com/in/emilyrodriguez"
    }
  },
  {
    id: "job-9",
    title: "Content Writer",
    company: "WordCraft",
    location: "Remote",
    salary: "$65,000 - $85,000",
    description: "WordCraft is seeking a Content Writer to create engaging and informative content for our clients. The ideal candidate has excellent writing skills and the ability to adapt to different tones and styles.",
    requirements: [
      "2+ years of content writing experience",
      "Strong portfolio of published work",
      "Excellent grammar and editing skills",
      "Ability to research and write on various topics"
    ],
    responsibilities: [
      "Create blog posts, articles, and website content",
      "Edit and proofread content",
      "Collaborate with SEO specialists",
      "Meet deadlines and quality standards"
    ],
    applyUrl: "https://example.com/apply/job-9",
    postedDate: "2023-06-29",
    category: "Marketing",
    jobType: "Full-time",
    workType: "Remote",
    companyLogoUrl: "/placeholder.svg"
  },
  {
    id: "job-10",
    title: "Product Manager",
    company: "InnovateTech",
    location: "San Jose, CA",
    salary: "$120,000 - $150,000",
    description: "InnovateTech is looking for a Product Manager to lead the development and launch of new products. The ideal candidate has a strategic mindset, technical understanding, and excellent communication skills.",
    requirements: [
      "4+ years of product management experience",
      "Bachelor's degree in Computer Science, Business, or related field",
      "Experience with product lifecycle management",
      "Strong analytical and problem-solving skills"
    ],
    responsibilities: [
      "Define product vision and strategy",
      "Gather and prioritize product requirements",
      "Work closely with engineering, design, and marketing teams",
      "Analyze market trends and customer feedback"
    ],
    applyUrl: "https://example.com/apply/job-10",
    postedDate: "2023-07-01",
    category: "Tech",
    jobType: "Full-time",
    workType: "On-site",
    companyLogoUrl: "/placeholder.svg",
    hiringManager: {
      name: "Jennifer Lee",
      position: "VP of Product",
      linkedIn: "https://linkedin.com/in/jenniferlee",
      twitter: "https://twitter.com/jenniferlee",
      email: "jennifer@innovatetech.com"
    }
  }
];

export const mockUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john.doe@example.com",
  profilePicture: "https://i.pravatar.cc/300",
  savedJobs: ["job-1", "job-4", "job-7"],
  appliedJobs: [
    {
      jobId: "job-2",
      status: "Applied",
      appliedDate: "2023-06-15"
    },
    {
      jobId: "job-5",
      status: "In Progress",
      appliedDate: "2023-06-22"
    },
    {
      jobId: "job-8",
      status: "Rejected",
      appliedDate: "2023-06-28"
    }
  ],
  preferences: {
    jobTypes: ["Full-time", "Contract"],
    workTypes: ["Remote", "Hybrid"],
    categories: ["Tech", "Marketing"],
    locations: ["San Francisco, CA", "Remote"]
  }
};
