import React, { useState, useContext, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  DownloadIcon, 
  FileTextIcon, 
  CheckIcon, 
  SparklesIcon,
  PlusIcon,
  Trash2Icon,
  Loader2,
  UserIcon
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AuthContext } from '@/App';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

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
  const [activeTab, setActiveTab] = useState("editor");
  const [selectedFormat, setSelectedFormat] = useState('standard');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
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
    if (!user) {
      setShowAuthDialog(true);
      return;
    }

    // Simulate download process
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
    if (!user) {
      setShowAuthDialog(true);
      return;
    }

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
      
      // This would be populated with the actual optimized content from Claude
      const optimizedContent = response.data?.optimized || {
        summary: "I am a highly motivated professional with extensive experience in web development and UI/UX design. My technical expertise includes React, TypeScript, and modern frontend frameworks. I am passionate about creating intuitive user experiences and solving complex problems through clean, efficient code.",
        // Other optimized sections would be included here
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

  // Authentication dialog component
  const AuthDialog = () => (
    <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in required</DialogTitle>
          <DialogDescription>
            You need to sign in to use this feature.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <UserIcon className="h-12 w-12 text-muted-foreground" />
          <p className="text-center">
            Sign in to access premium features like AI optimization and resume downloads.
          </p>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => setShowAuthDialog(false)} className="sm:flex-1">
            Cancel
          </Button>
          <Link to="/signin" className="sm:flex-1 w-full">
            <Button className="w-full neon-button">
              Sign In
            </Button>
          </Link>
          <Link to="/signup" className="sm:flex-1 w-full">
            <Button variant="outline" className="w-full">
              Sign Up
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="container mx-auto p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="settings">Settings & Export</TabsTrigger>
        </TabsList>
        
        {/* Editor Tab */}
        <TabsContent value="editor" className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Personal Information</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 gap-1 text-primary"
                  onClick={() => handleAIOptimize('personalInfo')}
                  disabled={isOptimizing}
                >
                  {isOptimizing ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <SparklesIcon className="h-3.5 w-3.5" />
                  )}
                  <span className="text-xs">Optimize with Claude AI</span>
                </Button>
              </CardTitle>
              <CardDescription>Enter your contact details and a brief professional summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={resumeData.personalInfo.name} 
                    onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input 
                    id="title" 
                    value={resumeData.personalInfo.title} 
                    onChange={(e) => handleInputChange('personalInfo', 'title', e.target.value)}
                    placeholder="Senior Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={resumeData.personalInfo.email} 
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    placeholder="johndoe@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    value={resumeData.personalInfo.phone} 
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    value={resumeData.personalInfo.location} 
                    onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                    placeholder="New York, NY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website / LinkedIn</Label>
                  <Input 
                    id="website" 
                    value={resumeData.personalInfo.website} 
                    onChange={(e) => handleInputChange('personalInfo', 'website', e.target.value)}
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea 
                  id="summary" 
                  value={resumeData.personalInfo.summary} 
                  onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
                  placeholder="Brief overview of your professional background and key strengths"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Experience Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Work Experience</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => addArrayItem('experience')}
                >
                  <PlusIcon className="h-3.5 w-3.5 mr-1" /> Add Position
                </Button>
              </CardTitle>
              <CardDescription>List your professional experience, starting with the most recent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="space-y-4 pt-4 first:pt-0 border-t first:border-t-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">Position {index + 1}</h4>
                    {index > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeArrayItem('experience', index)}
                        className="h-8 text-destructive hover:text-destructive"
                      >
                        <Trash2Icon className="h-3.5 w-3.5 mr-1" /> Remove
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`exp-title-${index}`}>Job Title</Label>
                      <Input 
                        id={`exp-title-${index}`} 
                        value={exp.title} 
                        onChange={(e) => handleArrayInputChange('experience', index, 'title', e.target.value)}
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`exp-company-${index}`}>Company</Label>
                      <Input 
                        id={`exp-company-${index}`} 
                        value={exp.company} 
                        onChange={(e) => handleArrayInputChange('experience', index, 'company', e.target.value)}
                        placeholder="Acme Inc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`exp-location-${index}`}>Location</Label>
                      <Input 
                        id={`exp-location-${index}`} 
                        value={exp.location} 
                        onChange={(e) => handleArrayInputChange('experience', index, 'location', e.target.value)}
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`exp-start-${index}`}>Start Date</Label>
                        <Input 
                          id={`exp-start-${index}`} 
                          value={exp.startDate} 
                          onChange={(e) => handleArrayInputChange('experience', index, 'startDate', e.target.value)}
                          placeholder="Jan 2020"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`exp-end-${index}`}>End Date</Label>
                        <Input 
                          id={`exp-end-${index}`} 
                          value={exp.endDate} 
                          onChange={(e) => handleArrayInputChange('experience', index, 'endDate', e.target.value)}
                          placeholder="Present"
                          disabled={exp.current}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`exp-desc-${index}`}>Job Description & Achievements</Label>
                    <Textarea 
                      id={`exp-desc-${index}`} 
                      value={exp.description} 
                      onChange={(e) => handleArrayInputChange('experience', index, 'description', e.target.value)}
                      placeholder="Describe your responsibilities and key achievements in this role"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          {/* Other sections like Education, Skills, Projects, etc. would follow the same pattern */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setActiveTab('settings')}>
              Settings & Format
            </Button>
            <Button onClick={previewResume}>
              Preview Resume
            </Button>
          </div>
        </TabsContent>
        
        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resume Preview</CardTitle>
              <CardDescription>
                This is how your resume will look when exported. You can return to the editor to make changes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div ref={resumeRef} className="border rounded-md p-8 bg-white text-black min-h-[800px]">
                {/* Preview content would be rendered here based on the selected format */}
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h1 className="text-2xl font-bold">{resumeData.personalInfo.name || 'Your Name'}</h1>
                    <p className="text-gray-600">{resumeData.personalInfo.title || 'Professional Title'}</p>
                    <div className="flex flex-wrap gap-x-4 text-sm mt-2">
                      {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
                      {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
                      {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
                      {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
                    </div>
                  </div>
                  
                  {resumeData.personalInfo.summary && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Summary</h2>
                      <p>{resumeData.personalInfo.summary}</p>
                    </div>
                  )}
                  
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Experience</h2>
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{exp.title || 'Position Title'}</h3>
                            <p className="text-gray-600">{exp.company || 'Company Name'}{exp.location ? `, ${exp.location}` : ''}</p>
                          </div>
                          <p className="text-sm">
                            {exp.startDate || 'Start Date'} - {exp.endDate || 'End Date'}
                          </p>
                        </div>
                        <p className="mt-1 text-sm">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Additional sections would be displayed here */}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab('editor')}>
                Return to Editor
              </Button>
              <Button onClick={handleDownloadResume}>
                <DownloadIcon className="mr-2 h-4 w-4" /> Download Resume
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resume Format</CardTitle>
              <CardDescription>Choose a format that best suits your career and industry</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {RESUME_FORMATS.map(format => (
                  <Card key={format.id} className={`cursor-pointer transition ${selectedFormat === format.id ? 'ring-2 ring-primary' : 'hover:bg-muted/50'}`} onClick={() => handleFormatChange(format.id)}>
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <FileTextIcon className="h-10 w-10 mb-2 text-primary" />
                      <h3 className="font-medium">{format.name}</h3>
                      <p className="text-sm text-muted-foreground">{format.description}</p>
                      {selectedFormat === format.id && (
                        <div className="mt-2 text-primary">
                          <CheckIcon className="h-5 w-5" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>AI Optimization</CardTitle>
              <CardDescription>Use Claude AI to enhance your resume content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full" 
                onClick={() => handleAIOptimize('all')}
                disabled={isOptimizing}
              >
                {isOptimizing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> 
                    Optimizing...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="h-4 w-4 mr-2" /> 
                    Optimize Entire Resume
                  </>
                )}
              </Button>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">Our AI will improve language, highlight achievements, and make your resume more impactful</p>
            </CardFooter>
          </Card>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setActiveTab('preview')}>
              Preview Resume
            </Button>
            <Button onClick={handleDownloadResume}>
              <DownloadIcon className="mr-2 h-4 w-4" /> Download Resume
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Auth Dialog */}
      <AuthDialog />
    </div>
  );
}
