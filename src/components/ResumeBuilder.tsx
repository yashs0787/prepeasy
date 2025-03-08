import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  FileEditIcon, 
  FileTextIcon, 
  Download, 
  SparklesIcon,
  PlusIcon,
  Trash2Icon,
  Loader2
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RESUME_FORMATS = [
  { id: 'standard', name: 'Standard', description: 'Clean, professional layout' },
  { id: 'modern', name: 'Modern', description: 'Contemporary design with accents' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant design' },
  { id: 'creative', name: 'Creative', description: 'Unique layout for creative fields' },
  { id: 'executive', name: 'Executive', description: 'Sophisticated design for leadership positions' },
  { id: 'technical', name: 'Technical', description: 'Format optimized for technical roles' },
  { id: 'academic', name: 'Academic', description: 'Format suitable for academic positions' },
  { id: 'entry-level', name: 'Entry Level', description: 'Format for those with limited experience' },
];

export function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState("editor");
  const [selectedFormat, setSelectedFormat] = useState('standard');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/johndoe',
      website: 'johndoe.com'
    },
    summary: 'Experienced software engineer with 5+ years of experience in full-stack development. Proficient in React, Node.js, and AWS.',
    workExperience: [
      {
        id: '1',
        title: 'Software Engineer',
        company: 'Tech Company Inc.',
        location: 'San Francisco, CA',
        startDate: '2019-01',
        endDate: '2023-01',
        current: false,
        description: 'Developed and maintained web applications using React, Node.js, and AWS.',
        achievements: [
          'Reduced page load time by 40% through code optimization',
          'Led a team of 3 developers on a critical project',
          'Implemented CI/CD pipeline reducing deployment time by 60%'
        ]
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Technology',
        location: 'Boston, MA',
        startDate: '2015-09',
        endDate: '2019-05',
        gpa: '3.8'
      }
    ],
    skills: [
      'JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS', 'Python', 'Git', 'Docker'
    ]
  });

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value
      }
    });
  };

  const handleSummaryChange = (e) => {
    setResumeData({
      ...resumeData,
      summary: e.target.value
    });
  };

  const addWorkExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };
    
    setResumeData({
      ...resumeData,
      workExperience: [...resumeData.workExperience, newExperience]
    });
  };

  const updateWorkExperience = (id, field, value) => {
    setResumeData({
      ...resumeData,
      workExperience: resumeData.workExperience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeWorkExperience = (id) => {
    setResumeData({
      ...resumeData,
      workExperience: resumeData.workExperience.filter(exp => exp.id !== id)
    });
  };

  const addAchievement = (experienceId) => {
    setResumeData({
      ...resumeData,
      workExperience: resumeData.workExperience.map(exp => 
        exp.id === experienceId 
          ? { ...exp, achievements: [...exp.achievements, ''] } 
          : exp
      )
    });
  };

  const updateAchievement = (experienceId, index, value) => {
    setResumeData({
      ...resumeData,
      workExperience: resumeData.workExperience.map(exp => {
        if (exp.id === experienceId) {
          const newAchievements = [...exp.achievements];
          newAchievements[index] = value;
          return { ...exp, achievements: newAchievements };
        }
        return exp;
      })
    });
  };

  const removeAchievement = (experienceId, index) => {
    setResumeData({
      ...resumeData,
      workExperience: resumeData.workExperience.map(exp => {
        if (exp.id === experienceId) {
          const newAchievements = [...exp.achievements];
          newAchievements.splice(index, 1);
          return { ...exp, achievements: newAchievements };
        }
        return exp;
      })
    });
  };

  const handleAIOptimize = async (sectionToOptimize = 'all') => {
    if (!apiKey && !showApiKeyInput) {
      setShowApiKeyInput(true);
      toast.info("Please enter your OpenAI API key first");
      return;
    }

    setIsOptimizing(true);
    toast.info("Optimizing your resume...");
    
    try {
      let promptContent;
      let updateFunction;
      
      if (sectionToOptimize === 'summary') {
        promptContent = `
        Optimize this professional summary for a resume. Make it concise, impactful, and ATS-friendly:
        
        ${resumeData.summary}
        
        Target job: Software Engineer (or similar technical role)
        `;
        
        updateFunction = (optimizedContent) => {
          setResumeData(prev => ({
            ...prev,
            summary: optimizedContent
          }));
        };
      } else {
        promptContent = `
        I need to optimize my resume for ATS systems and make it more impactful.
        
        Current details:
        - Name: ${resumeData.personalInfo.name}
        - Current/Last Role: ${resumeData.workExperience[0]?.title || "Not provided"}
        - Company: ${resumeData.workExperience[0]?.company || "Not provided"}
        
        Here's my current professional summary:
        ${resumeData.summary}
        
        And my latest job description:
        ${resumeData.workExperience[0]?.description || "Not provided"}
        
        Please provide:
        1. An optimized professional summary (keep it under 3-4 sentences)
        2. An improved job description for my most recent role (keep it under 3-4 sentences)
        3. Three suggested bullet points highlighting achievements (with metrics if possible)
        
        Format as JSON:
        {
          "summary": "optimized summary here",
          "jobDescription": "improved job description here",
          "achievements": ["achievement 1", "achievement 2", "achievement 3"]
        }
        `;
        
        updateFunction = (optimizedContent) => {
          try {
            const jsonContent = JSON.parse(optimizedContent);
            
            setResumeData(prev => {
              const updatedWorkExperience = [...prev.workExperience];
              
              if (updatedWorkExperience.length > 0) {
                updatedWorkExperience[0] = {
                  ...updatedWorkExperience[0],
                  description: jsonContent.jobDescription,
                  achievements: jsonContent.achievements
                };
              }
              
              return {
                ...prev,
                summary: jsonContent.summary,
                workExperience: updatedWorkExperience
              };
            });
          } catch (e) {
            console.error('Failed to parse JSON response:', e);
            toast.error('Error processing AI response. Please try again.');
          }
        };
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an expert in resume writing and optimization. You help job seekers create resumes that are ATS-friendly and appealing to hiring managers.'
            },
            {
              role: 'user',
              content: promptContent
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });
      
      const data = await response.json();
      
      if (data.error) {
        toast.error(`API Error: ${data.error.message}`);
        setIsOptimizing(false);
        return;
      }
      
      const generatedContent = data.choices[0].message.content.trim();
      
      let optimizedContent = generatedContent;
      if (sectionToOptimize !== 'summary') {
        const jsonMatch = generatedContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          optimizedContent = jsonMatch[0];
        }
      }
      
      updateFunction(optimizedContent);
      toast.success(`Resume ${sectionToOptimize === 'summary' ? 'summary' : ''} optimized with AI`);
      
    } catch (error) {
      console.error('Error optimizing resume:', error);
      toast.error('Failed to optimize resume. Please try again.');
    } finally {
      setIsOptimizing(false);
    }
  };

  const downloadResume = () => {
    toast.success(`Resume downloaded in ${RESUME_FORMATS.find(f => f.id === selectedFormat)?.name} format`);
    // In a real implementation, this would generate a PDF and trigger download
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Resume Builder</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleAIOptimize()} 
            disabled={isOptimizing}
          >
            {isOptimizing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
                Optimizing...
              </>
            ) : (
              <>
                <SparklesIcon size={14} className="mr-1" />
                AI Optimize
              </>
            )}
          </Button>
          <Button size="sm" onClick={downloadResume}>
            <Download size={14} className="mr-1" />
            Download
          </Button>
        </div>
      </div>
      
      {showApiKeyInput && (
        <Card className="border border-neon-purple/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Enter Your OpenAI API Key</CardTitle>
            <CardDescription>
              Your API key will be used for this session only and won't be stored permanently
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Input 
                type="password" 
                placeholder="sk-..." 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Don't have an API key? Get one from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-neon-purple hover:underline">OpenAI</a>
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowApiKeyInput(false)} 
              disabled={!apiKey}
              className="w-full"
            >
              Save API Key
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Card className="w-full md:w-2/3">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Choose Resume Format</CardTitle>
            </CardHeader>
            <CardContent>
              <Select 
                value={selectedFormat} 
                onValueChange={setSelectedFormat}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {RESUME_FORMATS.map((format) => (
                    <SelectItem key={format.id} value={format.id}>
                      {format.name} - {format.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          
          <Card className="w-full md:w-1/3">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Selected Format</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="w-20 h-28 border border-dashed rounded-md mx-auto flex items-center justify-center">
                  <FileTextIcon className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="mt-2 text-sm font-medium">
                  {RESUME_FORMATS.find(f => f.id === selectedFormat)?.name}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor" className="flex items-center gap-2">
            <FileEditIcon size={14} />
            <span>Editor</span>
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <FileTextIcon size={14} />
            <span>Preview</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Add your contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input 
                    name="name" 
                    value={resumeData.personalInfo.name} 
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input 
                    name="email" 
                    value={resumeData.personalInfo.email} 
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input 
                    name="phone" 
                    value={resumeData.personalInfo.phone} 
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input 
                    name="location" 
                    value={resumeData.personalInfo.location} 
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">LinkedIn</label>
                  <Input 
                    name="linkedin" 
                    value={resumeData.personalInfo.linkedin} 
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Website</label>
                  <Input 
                    name="website" 
                    value={resumeData.personalInfo.website} 
                    onChange={handlePersonalInfoChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
              <CardDescription>
                Briefly describe your background and key strengths
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Textarea 
                  value={resumeData.summary} 
                  onChange={handleSummaryChange}
                  rows={4}
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleAIOptimize('summary')}
                  disabled={isOptimizing}
                >
                  {isOptimizing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-1" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <SparklesIcon size={14} className="mr-1" />
                      AI-Optimize Summary
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>
                  Add your work history
                </CardDescription>
              </div>
              <Button size="sm" onClick={addWorkExperience}>
                <PlusIcon size={14} className="mr-1" />
                Add Experience
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {resumeData.workExperience.map((experience, index) => (
                  <div key={experience.id} className="space-y-4 pb-4 border-b last:border-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Job {index + 1}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-destructive"
                        onClick={() => removeWorkExperience(experience.id)}
                      >
                        <Trash2Icon size={14} className="mr-1" />
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Job Title</label>
                        <Input 
                          value={experience.title} 
                          onChange={(e) => updateWorkExperience(experience.id, 'title', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Company</label>
                        <Input 
                          value={experience.company} 
                          onChange={(e) => updateWorkExperience(experience.id, 'company', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input 
                          value={experience.location} 
                          onChange={(e) => updateWorkExperience(experience.id, 'location', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Start Date</label>
                        <Input 
                          type="month"
                          value={experience.startDate} 
                          onChange={(e) => updateWorkExperience(experience.id, 'startDate', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">End Date</label>
                        <Input 
                          type="month"
                          value={experience.endDate} 
                          onChange={(e) => updateWorkExperience(experience.id, 'endDate', e.target.value)}
                          disabled={experience.current}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Job Description</label>
                      <Textarea 
                        value={experience.description} 
                        onChange={(e) => updateWorkExperience(experience.id, 'description', e.target.value)}
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Key Achievements</label>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => addAchievement(experience.id)}
                        >
                          <PlusIcon size={14} className="mr-1" />
                          Add Achievement
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {experience.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex gap-2">
                            <Input 
                              value={achievement} 
                              onChange={(e) => updateAchievement(experience.id, idx, e.target.value)}
                              placeholder="Describe your achievement"
                            />
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive"
                              onClick={() => removeAchievement(experience.id, idx)}
                            >
                              <Trash2Icon size={14} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                {resumeData.workExperience.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    No work experience added yet. Click "Add Experience" to begin.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview" className="pt-4">
          <Card>
            <CardContent className="p-6">
              <div className={`space-y-6 ${selectedFormat === 'modern' ? 'modern-format' : ''} ${selectedFormat === 'creative' ? 'creative-format' : ''}`}>
                <div className={`${selectedFormat === 'minimal' ? 'text-left' : 'text-center'} space-y-2 pb-4 border-b ${selectedFormat === 'executive' ? 'border-[#333]' : 'border-gray-200'}`}>
                  <h1 className={`${selectedFormat === 'executive' ? 'text-3xl uppercase tracking-widest' : 'text-2xl'} font-bold`}>
                    {resumeData.personalInfo.name}
                  </h1>
                  <div className={`flex flex-wrap ${selectedFormat === 'minimal' ? 'justify-start' : 'justify-center'} gap-x-4 text-sm text-muted-foreground`}>
                    <span>{resumeData.personalInfo.email}</span>
                    <span>{resumeData.personalInfo.phone}</span>
                    <span>{resumeData.personalInfo.location}</span>
                    {resumeData.personalInfo.linkedin && <span>{resumeData.personalInfo.linkedin}</span>}
                    {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h2 className={`text-lg font-semibold border-b pb-1 ${selectedFormat === 'creative' ? 'text-neon-purple' : ''}`}>
                    Professional Summary
                  </h2>
                  <p>{resumeData.summary}</p>
                </div>
                
                <div className="space-y-4">
                  <h2 className={`text-lg font-semibold border-b pb-1 ${selectedFormat === 'creative' ? 'text-neon-purple' : ''}`}>
                    Work Experience
                  </h2>
                  {resumeData.workExperience.map((exp) => (
                    <div key={exp.id} className="space-y-2">
                      <div className={`${selectedFormat === 'technical' ? 'flex flex-col' : 'flex justify-between'}`}>
                        <div>
                          <h3 className={`font-medium ${selectedFormat === 'executive' ? 'uppercase text-lg' : ''}`}>
                            {exp.title}
                          </h3>
                          <p className="text-muted-foreground">{exp.company}, {exp.location}</p>
                        </div>
                        <div className={`text-sm text-muted-foreground ${selectedFormat === 'technical' ? 'mt-1' : ''}`}>
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      <p>{exp.description}</p>
                      {exp.achievements.length > 0 && (
                        <ul className={`${selectedFormat === 'technical' ? 'list-disc marker:text-neon-purple' : 'list-disc'} pl-5 space-y-1`}>
                          {exp.achievements.map((achievement, idx) => (
                            achievement.trim() && <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                
                {resumeData.education.length > 0 && (
                  <div className="space-y-4">
                    <h2 className={`text-lg font-semibold border-b pb-1 ${selectedFormat === 'creative' ? 'text-neon-purple' : ''}`}>
                      Education
                    </h2>
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="space-y-1">
                        <div className={`${selectedFormat === 'technical' ? 'flex flex-col' : 'flex justify-between'}`}>
                          <div>
                            <h3 className={`font-medium ${selectedFormat === 'academic' ? 'font-bold' : ''}`}>
                              {edu.degree}
                            </h3>
                            <p className="text-muted-foreground">{edu.institution}, {edu.location}</p>
                          </div>
                          <div className={`text-sm text-muted-foreground ${selectedFormat === 'technical' ? 'mt-1' : ''}`}>
                            {edu.startDate} - {edu.endDate}
                          </div>
                        </div>
                        {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                      </div>
                    ))}
                  </div>
                )}
                
                {resumeData.skills.length > 0 && (
                  <div className="space-y-2">
                    <h2 className={`text-lg font-semibold border-b pb-1 ${selectedFormat === 'creative' ? 'text-neon-purple' : ''}`}>
                      Skills
                    </h2>
                    <div className={`flex flex-wrap gap-2 ${selectedFormat === 'technical' ? 'justify-start' : ''}`}>
                      {resumeData.skills.map((skill, idx) => (
                        <div key={idx} className={`px-2 py-1 ${selectedFormat === 'creative' ? 'bg-black/40 border border-neon-purple/30' : 'bg-muted'} rounded text-sm`}>
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
