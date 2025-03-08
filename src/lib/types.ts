
// Define the types used in the application

export type ApplicationStatus = 'applied' | 'interviewing' | 'offered' | 'rejected' | null;

export interface HiringManager {
  name: string;
  role: string;
  platform: string;
  linkedIn?: string;
  twitter?: string;
  email?: string;
  position?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  jobType: string;
  workType: string;
  postedAt: string;
  skills: string[];
  source: string;
  isSaved: boolean;
  applicationStatus: ApplicationStatus;
  category: string;
  experienceLevel: string;
  industry: string;
  hiringManager: HiringManager;
  companyLogoUrl?: string;
  responsibilities?: string[];
  applyUrl?: string;
  requirements?: string[];
}
