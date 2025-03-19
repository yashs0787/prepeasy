
import React, { useState } from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, SparklesIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CoverLetterSectionProps {
  coverLetter: string;
  jobDescription: string;
  isGenerating: boolean;
  onInputChange: (text: string) => void;
  onJobDescriptionChange: (text: string) => void;
  onGenerate: () => void;
}

export function CoverLetterSection({
  coverLetter,
  jobDescription,
  isGenerating,
  onInputChange,
  onJobDescriptionChange,
  onGenerate
}: CoverLetterSectionProps) {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Cover Letter</span>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1 text-primary"
            onClick={onGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <SparklesIcon className="h-3.5 w-3.5" />
            )}
            <span className="text-xs">Generate with AI</span>
          </Button>
        </CardTitle>
        <CardDescription>
          Create a tailored cover letter for your job application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="jobDescription">Job Description</Label>
          <Textarea
            id="jobDescription"
            placeholder="Paste the job description here to generate a tailored cover letter..."
            rows={6}
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Adding a job description helps the AI tailor your cover letter to the specific role
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="coverLetter">Cover Letter</Label>
          <Textarea
            id="coverLetter"
            placeholder="Your cover letter will appear here after generation..."
            rows={12}
            value={coverLetter}
            onChange={(e) => onInputChange(e.target.value)}
          />
        </div>
      </CardContent>
    </>
  );
}
