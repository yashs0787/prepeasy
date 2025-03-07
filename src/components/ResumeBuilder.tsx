
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  FileEditIcon, 
  FileTextIcon, 
  Upload, 
  Download, 
  SparklesIcon,
  PlusIcon,
  Trash2Icon
} from 'lucide-react';

export function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState("editor");
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

  const handleAIOptimize = () => {
    toast.success("Resume optimized with AI");
    // In a real implementation, this would send the resume data to an AI service
    // and update with optimized content
  };

  const downloadResume = () => {
    toast.success("Resume downloaded");
    // In a real implementation, this would generate a PDF and trigger download
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Resume Builder</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleAIOptimize}>
            <SparklesIcon size={14} className="mr-1" />
            AI Optimize
          </Button>
          <Button size="sm" onClick={downloadResume}>
            <Download size={14} className="mr-1" />
            Download
          </Button>
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
          {/* Personal Information */}
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
          
          {/* Professional Summary */}
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
                <Button variant="outline" size="sm" onClick={handleAIOptimize}>
                  <SparklesIcon size={14} className="mr-1" />
                  AI-Optimize Summary
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Work Experience */}
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
              {/* Resume Preview */}
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-2 pb-4 border-b">
                  <h1 className="text-2xl font-bold">{resumeData.personalInfo.name}</h1>
                  <div className="flex flex-wrap justify-center gap-x-4 text-sm text-muted-foreground">
                    <span>{resumeData.personalInfo.email}</span>
                    <span>{resumeData.personalInfo.phone}</span>
                    <span>{resumeData.personalInfo.location}</span>
                    {resumeData.personalInfo.linkedin && <span>{resumeData.personalInfo.linkedin}</span>}
                    {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
                  </div>
                </div>
                
                {/* Summary */}
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold border-b pb-1">Professional Summary</h2>
                  <p>{resumeData.summary}</p>
                </div>
                
                {/* Work Experience */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold border-b pb-1">Work Experience</h2>
                  {resumeData.workExperience.map((exp) => (
                    <div key={exp.id} className="space-y-2">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{exp.title}</h3>
                          <p className="text-muted-foreground">{exp.company}, {exp.location}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      <p>{exp.description}</p>
                      {exp.achievements.length > 0 && (
                        <ul className="list-disc pl-5 space-y-1">
                          {exp.achievements.map((achievement, idx) => (
                            achievement.trim() && <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Education */}
                {resumeData.education.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold border-b pb-1">Education</h2>
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="space-y-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{edu.degree}</h3>
                            <p className="text-muted-foreground">{edu.institution}, {edu.location}</p>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {edu.startDate} - {edu.endDate}
                          </div>
                        </div>
                        {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Skills */}
                {resumeData.skills.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold border-b pb-1">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, idx) => (
                        <div key={idx} className="px-2 py-1 bg-muted rounded text-sm">
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
