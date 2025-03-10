import React, { useContext, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/App';
import { PersonalInfoSection } from './resume/PersonalInfoSection';
import { ExperienceSection } from './resume/ExperienceSection';
import { ResumePreview } from './resume/ResumePreview';
import { ResumeSettings } from './resume/ResumeSettings';
import { AuthDialog } from './resume/AuthDialog';
import { useResumeState } from './resume/useResumeState';

const RESUME_FORMATS = [
  { id: 'standard', name: 'Standard', description: 'Clean, professional layout' },
  { id: 'modern', name: 'Modern', description: 'Contemporary design with unique elements' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant design' },
  { id: 'creative', name: 'Creative', description: 'Stand out with a distinctive style' },
  { id: 'technical', name: 'Technical', description: 'Focused on technical skills and projects' },
  { id: 'executive', name: 'Executive', description: 'Designed for senior positions' },
  { id: 'academic', name: 'Academic', description: 'Ideal for academic and research positions' }
];

export function ResumeBuilder() {
  const { user } = useContext(AuthContext);
  const {
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
  } = useResumeState();

  const handleAuthRequiredAction = (callback: Function) => {
    if (!user) {
      setShowAuthDialog(true);
      return;
    }
    callback();
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="settings">Settings & Export</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="space-y-8">
          <Card>
            <PersonalInfoSection 
              personalInfo={resumeData.personalInfo}
              isOptimizing={isOptimizing}
              onInputChange={(field, value) => handleInputChange('personalInfo', field, value)}
              onOptimize={() => handleAuthRequiredAction(() => handleAIOptimize('personalInfo'))}
            />
          </Card>
          
          <Card>
            <ExperienceSection 
              experiences={resumeData.experience}
              onArrayInputChange={(index, field, value) => 
                handleArrayInputChange('experience', index, field, value)
              }
              onAddItem={() => addArrayItem('experience')}
              onRemoveItem={(index) => removeArrayItem('experience', index)}
            />
          </Card>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setActiveTab('settings')}>
              Settings & Format
            </Button>
            <Button onClick={previewResume}>
              Preview Resume
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-6">
          <Card>
            <ResumePreview 
              resumeData={resumeData}
              resumeRef={resumeRef}
              onReturn={() => setActiveTab('editor')}
              onDownload={() => handleAuthRequiredAction(handleDownloadResume)}
            />
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <ResumeSettings 
            formats={RESUME_FORMATS}
            selectedFormat={selectedFormat}
            isOptimizing={isOptimizing}
            onFormatChange={handleFormatChange}
            onOptimize={() => handleAuthRequiredAction(() => handleAIOptimize('all'))}
            onPreview={previewResume}
            onDownload={() => handleAuthRequiredAction(handleDownloadResume)}
          />
        </TabsContent>
      </Tabs>
      
      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog} 
      />
    </div>
  );
}
