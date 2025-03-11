
import { Job } from "@/lib/types";
import { mockJobs } from "@/lib/mockData";
import {
  getRandomCategory,
  getRandomExperienceLevel,
  getRandomIndustry,
  getRandomName,
  getRandomLinkedInUsername,
  getRandomTwitterUsername,
  getRandomEmail,
  getRandomResponsibilities
} from "./mockDataUtils";

/**
 * Fetches job data (simulated with mock data)
 */
export async function fetchJobsData(): Promise<Job[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Enhance mock data with additional fields for our new features
  const enhancedJobs: Job[] = mockJobs.map(job => ({
    ...job,
    // Add fields for job categories
    category: getRandomCategory(),
    experienceLevel: getRandomExperienceLevel(),
    industry: getRandomIndustry(),
    // Add hiring manager information
    hiringManager: {
      name: getRandomName(),
      role: job.company.includes('Tech') ? 'CTO' : 'HR Manager',
      platform: 'linkedin',
      linkedIn: 'linkedin.com/in/' + getRandomLinkedInUsername(),
      twitter: 'twitter.com/' + getRandomTwitterUsername(),
      email: getRandomEmail(),
      position: job.company.includes('Tech') ? 'CTO' : 'HR Manager'
    },
    // Add application status (null means not applied)
    applicationStatus: null,
    // Add company logo URL
    companyLogoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=random`,
    // Add responsibilities array
    responsibilities: getRandomResponsibilities(),
    // Add apply URL
    applyUrl: `https://example.com/jobs/${job.id}/apply`,
    // Add source
    source: 'Internal Database',
    // Add skills if not present
    skills: job.requirements || ['JavaScript', 'React', 'TypeScript'],
    // Make sure isSaved is always defined
    isSaved: job.isSaved || false
  }));
  
  return enhancedJobs;
}
