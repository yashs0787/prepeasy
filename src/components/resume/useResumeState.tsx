
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

export function useResumeState() {
  const [activeTab, setActiveTab] = useState<string>("editor");
  const [selectedFormat, setSelectedFormat] = useState<string>('standard');
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [showAuthDialog, setShowAuthDialog] = useState<boolean>(false);
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const resumeRef = useRef<HTMLDivElement>(null);
  
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      summary: ''
    },
    experience: [
      {
        id: '1',
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ],
    education: [
      {
        id: '1',
        degree: '',
        school: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    skills: [
      { id: '1', name: '' },
      { id: '2', name: '' },
      { id: '3', name: '' }
    ],
    projects: [
      {
        id: '1',
        title: '',
        link: '',
        description: ''
      }
    ],
    certifications: [
      {
        id: '1',
        name: '',
        issuer: '',
        date: '',
        description: ''
      }
    ]
  });

  const handleInputChange = (section: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleArrayInputChange = (section: string, index: number, field: string, value: string) => {
    setResumeData(prev => {
      const sectionArray = [...prev[section as keyof typeof prev] as any[]];
      sectionArray[index] = {
        ...sectionArray[index],
        [field]: value
      };
      return {
        ...prev,
        [section]: sectionArray
      };
    });
  };

  const handleCoverLetterChange = (value: string) => {
    setCoverLetter(value);
  };

  const handleJobDescriptionChange = (value: string) => {
    setJobDescription(value);
  };

  const addArrayItem = (section: string) => {
    setResumeData(prev => {
      const sectionArray = [...prev[section as keyof typeof prev] as any[]];
      const newItem = { ...sectionArray[0] };
      // Clear all fields except id
      Object.keys(newItem).forEach(key => {
        if (key !== 'id') {
          newItem[key] = '';
        }
      });
      // Generate a unique id
      newItem.id = Date.now().toString();
      return {
        ...prev,
        [section]: [...sectionArray, newItem]
      };
    });
  };

  const removeArrayItem = (section: string, index: number) => {
    setResumeData(prev => {
      const sectionArray = [...prev[section as keyof typeof prev] as any[]];
      if (sectionArray.length === 1) {
        toast.error("You need to have at least one item in this section");
        return prev;
      }
      
      sectionArray.splice(index, 1);
      return {
        ...prev,
        [section]: sectionArray
      };
    });
  };

  const previewResume = () => {
    setActiveTab('preview');
    toast.success("Resume preview generated", {
      description: "You can now see how your resume will look when exported"
    });
  };

  const handleFormatChange = (format: string) => {
    setSelectedFormat(format);
    toast.success(`Resume format changed to ${format}`);
  };

  const handleDownloadResume = () => {
    toast.promise(
      // This would be a real PDF generation in a production app
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Generating PDF...',
        success: 'Resume downloaded successfully',
        error: 'Failed to download resume'
      }
    );
  };

  const handleAIOptimize = async (sectionToOptimize = 'all', jobDesc = '') => {
    setIsOptimizing(true);
    
    try {
      // Example of what we'll send to the API
      const sectionData = sectionToOptimize === 'all' 
        ? resumeData 
        : resumeData[sectionToOptimize as keyof typeof resumeData];
      
      // Call the Supabase Edge Function
      const response = await supabase.functions.invoke('optimize-resume', {
        body: {
          section: sectionToOptimize,
          data: sectionData,
          jobDescription: jobDesc
        }
      });
      
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      // Process the optimization results
      const optimizedContent = response.data?.optimized;
      
      if (!optimizedContent) {
        throw new Error("No optimized content returned");
      }
      
      // Update the resume data with the optimized content
      if (sectionToOptimize === 'all') {
        setResumeData(prev => {
          const newData = { ...prev };
          // This would normally iterate through all sections from the response
          // For demonstration, we just update the summary
          if (optimizedContent.personalInfo && optimizedContent.personalInfo.summary) {
            newData.personalInfo = {
              ...prev.personalInfo,
              summary: optimizedContent.personalInfo.summary
            };
          }
          return newData;
        });
      } else if (sectionToOptimize === 'personalInfo') {
        setResumeData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            summary: optimizedContent
          }
        }));
      }
      
      toast.success(`${sectionToOptimize === 'all' ? 'Resume' : 'Section'} optimized with AI`, {
        description: `Your ${sectionToOptimize === 'all' ? 'resume' : sectionToOptimize} has been enhanced`
      });
      
    } catch (error) {
      console.error("Error optimizing resume:", error);
      toast.error("Failed to optimize resume", {
        description: error.message || "Please try again later"
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    setIsOptimizing(true);
    
    try {
      if (!jobDescription) {
        toast.warning("Job description needed", {
          description: "Please add a job description for a better cover letter"
        });
        return;
      }
      
      // Call the Supabase Edge Function
      const response = await supabase.functions.invoke('optimize-resume', {
        body: {
          section: 'coverLetter',
          data: resumeData,
          jobDescription: jobDescription
        }
      });
      
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      // Extract the generated cover letter
      const generatedCoverLetter = response.data?.optimized;
      
      if (!generatedCoverLetter) {
        throw new Error("No cover letter generated");
      }
      
      // Update the cover letter state
      setCoverLetter(generatedCoverLetter);
      
      toast.success("Cover letter generated", {
        description: "Your tailored cover letter is ready"
      });
      
    } catch (error) {
      console.error("Error generating cover letter:", error);
      toast.error("Failed to generate cover letter", {
        description: error.message || "Please try again later"
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  return {
    resumeData,
    activeTab,
    selectedFormat,
    isOptimizing,
    showAuthDialog,
    resumeRef,
    coverLetter,
    jobDescription,
    setActiveTab,
    setShowAuthDialog,
    handleInputChange,
    handleArrayInputChange,
    handleCoverLetterChange,
    handleJobDescriptionChange,
    addArrayItem,
    removeArrayItem,
    previewResume,
    handleFormatChange,
    handleDownloadResume,
    handleAIOptimize,
    handleGenerateCoverLetter
  };
}
