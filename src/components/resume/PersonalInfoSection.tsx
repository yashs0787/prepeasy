
import React from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, SparklesIcon } from 'lucide-react';

interface PersonalInfoSectionProps {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
  };
  isOptimizing: boolean;
  onInputChange: (field: string, value: string) => void;
  onOptimize: () => void;
}

export function PersonalInfoSection({ 
  personalInfo, 
  isOptimizing, 
  onInputChange, 
  onOptimize 
}: PersonalInfoSectionProps) {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Personal Information</span>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 gap-1 text-primary"
            onClick={onOptimize}
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
              value={personalInfo.name} 
              onChange={(e) => onInputChange('name', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Professional Title</Label>
            <Input 
              id="title" 
              value={personalInfo.title} 
              onChange={(e) => onInputChange('title', e.target.value)}
              placeholder="Senior Software Engineer"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={personalInfo.email} 
              onChange={(e) => onInputChange('email', e.target.value)}
              placeholder="johndoe@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone" 
              value={personalInfo.phone} 
              onChange={(e) => onInputChange('phone', e.target.value)}
              placeholder="(123) 456-7890"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              value={personalInfo.location} 
              onChange={(e) => onInputChange('location', e.target.value)}
              placeholder="New York, NY"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website / LinkedIn</Label>
            <Input 
              id="website" 
              value={personalInfo.website} 
              onChange={(e) => onInputChange('website', e.target.value)}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea 
            id="summary" 
            value={personalInfo.summary} 
            onChange={(e) => onInputChange('summary', e.target.value)}
            placeholder="Brief overview of your professional background and key strengths"
            rows={4}
          />
        </div>
      </CardContent>
    </>
  );
}
