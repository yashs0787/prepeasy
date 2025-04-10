
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { PersonalInfoSection } from './resume/PersonalInfoSection';
import { ExperienceSection } from './resume/ExperienceSection';
import { EducationSection } from './resume/EducationSection';
import { SkillsSection } from './resume/SkillsSection';
import { ProjectsSection } from './resume/ProjectsSection';
import { CertificationsSection } from './resume/CertificationsSection';
import { CoverLetterSection } from './resume/CoverLetterSection';
import { ResumePreview } from './resume/ResumePreview';
import { ResumeSettings } from './resume/ResumeSettings';
import { AuthDialog } from './resume/AuthDialog';
import { useResumeState } from './resume/useResumeState';
import { useSubscription } from '@/contexts/SubscriptionContext';

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
  const { user } = useAuth();
  const { isSubscribed, setShowSubscribeModal } = useSubscription();
  const {
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
  } = useResumeState();

  const handleAuthRequiredAction = (callback: Function) => {
    if (!user) {
      setShowAuthDialog(true);
      return;
    }
    
    if (!isSubscribed && (callback === handleDownloadResume || callback === handleAIOptimize || callback === handleGenerateCoverLetter)) {
      setShowSubscribeModal(true);
      return;
    }
    
    callback();
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="editor">Resume Editor</TabsTrigger>
          <TabsTrigger value="coverLetter">Cover Letter</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="settings">Settings & Export</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="space-y-8">
          <Card>
            <PersonalInfoSection 
              personalInfo={resumeData.personalInfo}
              isOptimizing={isOptimizing}
              onInputChange={(field, value) => handleInputChange('personalInfo', field, value)}
              onOptimize={() => handleAuthRequiredAction(() => handleAIOptimize('personalInfo', jobDescription))}
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
          
          <Card>
            <EducationSection 
              education={resumeData.education}
              onArrayInputChange={(index, field, value) => 
                handleArrayInputChange('education', index, field, value)
              }
              onAddItem={() => addArrayItem('education')}
              onRemoveItem={(index) => removeArrayItem('education', index)}
            />
          </Card>
          
          <Card>
            <SkillsSection 
              skills={resumeData.skills}
              onArrayInputChange={(index, field, value) => 
                handleArrayInputChange('skills', index, field, value)
              }
              onAddItem={() => addArrayItem('skills')}
              onRemoveItem={(index) => removeArrayItem('skills', index)}
            />
          </Card>
          
          <Card>
            <ProjectsSection 
              projects={resumeData.projects}
              onArrayInputChange={(index, field, value) => 
                handleArrayInputChange('projects', index, field, value)
              }
              onAddItem={() => addArrayItem('projects')}
              onRemoveItem={(index) => removeArrayItem('projects', index)}
            />
          </Card>
          
          <Card>
            <CertificationsSection 
              certifications={resumeData.certifications}
              onArrayInputChange={(index, field, value) => 
                handleArrayInputChange('certifications', index, field, value)
              }
              onAddItem={() => addArrayItem('certifications')}
              onRemoveItem={(index) => removeArrayItem('certifications', index)}
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

        <TabsContent value="coverLetter" className="space-y-6">
          <Card>
            <CoverLetterSection
              coverLetter={coverLetter}
              jobDescription={jobDescription}
              isGenerating={isOptimizing}
              onInputChange={handleCoverLetterChange}
              onJobDescriptionChange={handleJobDescriptionChange}
              onGenerate={() => handleAuthRequiredAction(handleGenerateCoverLetter)}
            />
          </Card>
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
            onOptimize={() => handleAuthRequiredAction(() => handleAIOptimize('all', jobDescription))}
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
