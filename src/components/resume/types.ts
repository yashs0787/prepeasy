
export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    link: string;
    description: string;
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    description: string;
  }>;
}

export interface ResumePreviewProps {
  resumeData: ResumeData;
  resumeRef: React.RefObject<HTMLDivElement>;
  onReturn: () => void;
  onDownload: () => void;
}

export interface CoverLetterProps {
  coverLetter: string;
  jobDescription: string;
  isGenerating: boolean;
  onInputChange: (text: string) => void;
  onJobDescriptionChange: (text: string) => void;
  onGenerate: () => void;
}
