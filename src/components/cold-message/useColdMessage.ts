
import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { ColdMessageFormData, ColdDmGeneratorProps } from './types';

export function useColdMessage({ initialValues, jobTitle }: Pick<ColdDmGeneratorProps, 'initialValues' | 'jobTitle'>) {
  const [formData, setFormData] = useState<ColdMessageFormData>({
    name: '',
    companyName: '',
    role: '',
    personalizedNote: '',
    tone: 'professional',
    platform: 'linkedin'
  });
  
  const [generatedMessage, setGeneratedMessage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || '',
        companyName: initialValues.companyName || '',
        role: initialValues.role || '',
        personalizedNote: initialValues.personalizedNote || '',
        tone: initialValues.tone || 'professional',
        platform: initialValues.platform || 'linkedin'
      });
    }
  }, [initialValues]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateMessage = async () => {
    if (!formData.name || !formData.companyName || !formData.role) {
      toast.error("Please fill in the required fields: Name, Company, and Role");
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await supabase.functions.invoke('generate-message', {
        body: {
          name: formData.name,
          company: formData.companyName,
          role: formData.role,
          tone: formData.tone,
          platform: formData.platform,
          personalizedNote: formData.personalizedNote,
          jobTitle
        }
      });

      if (response.error) throw new Error(response.error.message);
      
      setGeneratedMessage(response.data.message);
      
    } catch (error) {
      console.error('Error generating message:', error);
      toast.error('Failed to generate message. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    formData,
    generatedMessage,
    isGenerating,
    handleInputChange,
    generateMessage
  };
}
