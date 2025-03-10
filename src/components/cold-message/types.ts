
export interface ColdMessageFormData {
  name: string;
  companyName: string;
  role: string;
  personalizedNote: string;
  tone: string;
  platform: string;
}

export interface ColdDmGeneratorProps {
  initialValues?: {
    name: string;
    companyName: string;
    role: string;
    personalizedNote: string;
    tone: string;
    platform: string;
  };
  compact?: boolean;
  jobTitle?: string;
}
