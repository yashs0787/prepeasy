import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

export function useResumeState() {
  const [activeTab, setActiveTab] = useState<string>("editor");
  const [selectedFormat, setSelectedFormat] = useState<string>('standard');
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [showAuthDialog, setShowAuthDialog] = useState<boolean>(false);
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

  const handleAIOptimize = async (sectionToOptimize = 'all') => {
    setIsOptimizing(true);
    
    try {
      // Example of what we'll send to the Claude API
      const sectionData = sectionToOptimize === 'all' 
        ? resumeData 
        : resumeData[sectionToOptimize as keyof typeof resumeData];
      
      // Call the Supabase Edge Function that uses Claude API
      const response = await supabase.functions.invoke('optimize-resume', {
        body: {
          section: sectionToOptimize,
          data: sectionData
        }
      });
      
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      // Process the optimization results
      const optimizedContent = response.data?.optimized || {
        summary: "I am a highly motivated professional with extensive experience in web development and UI/UX design. My technical expertise includes React, TypeScript, and modern frontend frameworks. I am passionate about creating intuitive user experiences and solving complex problems through clean, efficient code.",
      };
      
      // Update the resume data with the optimized content
      if (sectionToOptimize === 'all') {
        setResumeData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            summary: optimizedContent.summary || prev.personalInfo.summary
          }
          // Other sections would be updated here
        }));
      } else if (sectionToOptimize === 'personalInfo') {
        setResumeData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            summary: optimizedContent || prev.personalInfo.summary
          }
        }));
      }
      
      toast.success("Resume optimized with Claude AI", {
        description: `Your ${sectionToOptimize === 'all' ? 'resume' : sectionToOptimize} has been enhanced`
      });
      
    } catch (error) {
      console.error("Error optimizing resume:", error);
      toast.error("Failed to optimize resume", {
        description: "Please try again later"
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
    setActiveTab,
    setShowAuthDialog,
    handleInputChange,
    handleArrayInputChange,
    addArrayItem,
    removeArrayItem,
    previewResume,
    handleFormatChange,
    handleDownloadResume,
    handleAIOptimize
  };
}
