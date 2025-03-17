
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RotateCw, Check, RefreshCw } from 'lucide-react';
import { useClaudeFeedback } from './hooks/useClaudeFeedback';
import { FeedbackDisplay } from './FeedbackDisplay';
import { toast } from 'sonner';

interface TranscriptAnalysisProps {
  transcript: string;
  onTranscriptChange: (transcript: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  isAnalyzed: boolean;
  currentQuestion?: string;
  careerTrack?: string;
  interviewType?: string;
}

export function TranscriptAnalysis({
  transcript,
  onTranscriptChange,
  onAnalyze: parentOnAnalyze,
  isAnalyzing: parentIsAnalyzing,
  isAnalyzed: parentIsAnalyzed,
  currentQuestion = "Tell me about yourself",
  careerTrack = "general",
  interviewType = "general"
}: TranscriptAnalysisProps) {
  const [showAiFeedback, setShowAiFeedback] = useState(false);
  const { isLoading, feedback, generateFeedback } = useClaudeFeedback();
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTranscriptChange(e.target.value);
  };
  
  const handleAnalyze = async () => {
    // Call parent onAnalyze to maintain compatibility
    parentOnAnalyze();
    
    if (!transcript.trim()) {
      toast.error("Please provide your answer before analyzing");
      return;
    }
    
    // Only proceed with AI analysis if we have a non-empty transcript
    try {
      await generateFeedback({
        transcript,
        question: currentQuestion,
        careerTrack: careerTrack as any, // Type casting for simplicity
        interviewType: interviewType as any // Type casting for simplicity
      });
      setShowAiFeedback(true);
    } catch (error) {
      console.error("Error analyzing with Claude:", error);
      toast.error("Failed to get AI feedback. Please try again.");
    }
  };

  return (
    <>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-base flex justify-between items-center">
            <span>Your Response</span>
            {(parentIsAnalyzed || showAiFeedback) && (
              <div className="flex items-center text-xs text-green-500 font-normal">
                <Check className="h-3.5 w-3.5 mr-1" />
                Analyzed
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={transcript}
            onChange={handleTextChange}
            placeholder="Your recorded answer will appear here. You can also type or edit your answer manually."
            className="min-h-[150px]"
          />
          <Button 
            className="w-full" 
            onClick={handleAnalyze} 
            disabled={parentIsAnalyzing || isLoading || !transcript.trim()}
          >
            {parentIsAnalyzing || isLoading ? (
              <>
                <RotateCw className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (parentIsAnalyzed || showAiFeedback) ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Analyze Again
              </>
            ) : (
              "Analyze Response"
            )}
          </Button>
        </CardContent>
      </Card>
      
      {showAiFeedback && feedback && (
        <div className="mt-4">
          <FeedbackDisplay 
            feedback="AI Analysis of Your Response" 
            detailedFeedback={feedback} 
          />
        </div>
      )}
    </>
  );
}
