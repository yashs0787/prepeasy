import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Copy, Sparkles, CheckCheck, Send, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ColdDmGeneratorProps {
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

export function ColdDmGenerator({ initialValues, compact = false, jobTitle }: ColdDmGeneratorProps) {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    role: '',
    personalizedNote: '',
    tone: 'professional',
    platform: 'linkedin'
  });
  
  const [generatedMessage, setGeneratedMessage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  
  // Update form data when initialValues change
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
  
  const generateWithClaude = async () => {
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
          jobTitle: jobTitle
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
  
  const handleSubmit = () => {
    generateWithClaude();
  };
  
  const copyToClipboard = () => {
    if (generatedMessage) {
      navigator.clipboard.writeText(generatedMessage);
      toast.success("Message copied to clipboard");
    }
  };
  
  const sendMessage = () => {
    toast.success("Message ready to send");
    setTimeout(() => {
      toast.info("This is a demonstration. In the full version, you can send messages directly from here");
    }, 1500);
  };
  
  if (compact) {
    return (
      <div className="space-y-4">
        {showApiKeyInput && (
          <div className="mb-4 p-4 border rounded-md">
            <div className="text-sm font-medium mb-2">Enter Your OpenAI API Key</div>
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
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowApiKeyInput(false)} 
                disabled={!apiKey}
                className="w-full"
              >
                Save API Key
              </Button>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="personalizedNote">Personalized Message or Connection Point</Label>
            <Textarea 
              id="personalizedNote" 
              placeholder="I was impressed by the recent project you shared about..."
              className="min-h-[100px]"
              value={formData.personalizedNote}
              onChange={(e) => handleInputChange('personalizedNote', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select 
                value={formData.tone} 
                onValueChange={(value) => handleInputChange('tone', value)}
              >
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="direct">Direct</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select 
                value={formData.platform} 
                onValueChange={(value) => handleInputChange('platform', value)}
              >
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="twitter">X/Twitter</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleSubmit} 
            disabled={isGenerating} 
            className="neon-button w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Generating...
              </>
            ) : (
              "Generate Cold DM with ChatGPT"
            )}
          </Button>
        </div>
        
        {generatedMessage && (
          <div className="border border-neon-purple/30 rounded-md p-4 bg-black/40">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Your Personalized Message</div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={copyToClipboard} 
                  className="h-8 w-8"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={sendMessage}
                  className="h-8 w-8"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="bg-black/40 p-4 rounded-md whitespace-pre-line text-sm">
              {generatedMessage}
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <CheckCheck className="h-3 w-3" />
              <span>AI optimized for higher response rates</span>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="generator">Cold DM Generator</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        {showApiKeyInput && (
          <Card className="mb-4 border border-neon-purple/30">
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
        
        <TabsContent value="generator" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-neon-purple" /> 
                AI Cold DM Generator
              </CardTitle>
              <CardDescription>
                Create personalized outreach messages for job opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Recipient's Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Jane Smith"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input 
                    id="company" 
                    placeholder="Tech Company Inc."
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Recipient's Role</Label>
                  <Input 
                    id="role" 
                    placeholder="Engineering Manager"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select 
                    value={formData.platform} 
                    onValueChange={(value) => handleInputChange('platform', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="twitter">X/Twitter</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select 
                  value={formData.tone} 
                  onValueChange={(value) => handleInputChange('tone', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="direct">Direct</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="personalizedNote">Personal Note or Connection Point</Label>
                <Textarea 
                  id="personalizedNote" 
                  placeholder="I was impressed by the recent project you shared about..."
                  className="min-h-[100px]"
                  value={formData.personalizedNote}
                  onChange={(e) => handleInputChange('personalizedNote', e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSubmit} 
                disabled={isGenerating} 
                className="neon-button w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Generating...
                  </>
                ) : (
                  "Generate Message with ChatGPT"
                )}
              </Button>
            </CardFooter>
          </Card>
          
          {generatedMessage && (
            <Card className="border border-neon-purple/30 bg-black/40">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Personalized Message</span>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={copyToClipboard} 
                      className="h-8 w-8"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={sendMessage}
                      className="h-8 w-8"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black/40 p-4 rounded-md whitespace-pre-line">
                  {generatedMessage}
                </div>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCheck className="h-3 w-3" />
                  <span>AI optimized for higher response rates</span>
                </div>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Ready-to-Use Templates</CardTitle>
              <CardDescription>
                Select a template as your starting point
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    title: "The Mutual Connection",
                    description: "Leverage a shared connection to build rapport",
                    template: "I noticed we're both connected with [Mutual Connection]. I've been following your work at..."
                  },
                  {
                    title: "The Content Admirer",
                    description: "Reference their content or public work",
                    template: "I recently read your article about [Topic] and was impressed by your insights on..."
                  },
                  {
                    title: "The Value Proposition",
                    description: "Direct approach focusing on what you can offer",
                    template: "Based on your team's recent work on [Project/Initiative], I believe my experience in..."
                  }
                ].map((template, index) => (
                  <Card key={index} className="feature-card cursor-pointer hover:border-neon-purple/50">
                    <CardHeader>
                      <CardTitle className="text-base">{template.title}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{template.template}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Use This Template
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
