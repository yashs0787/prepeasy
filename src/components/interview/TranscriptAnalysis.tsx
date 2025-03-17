
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RotateCw, Check, RefreshCw } from 'lucide-react';

interface TranscriptAnalysisProps {
  transcript: string;
  onTranscriptChange: (transcript: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  isAnalyzed: boolean;
}

export function TranscriptAnalysis({
  transcript,
  onTranscriptChange,
  onAnalyze,
  isAnalyzing,
  isAnalyzed
}: TranscriptAnalysisProps) {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTranscriptChange(e.target.value);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-base flex justify-between items-center">
          <span>Your Response</span>
          {isAnalyzed && (
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
          onClick={onAnalyze} 
          disabled={isAnalyzing || !transcript.trim()}
        >
          {isAnalyzing ? (
            <>
              <RotateCw className="h-4 w-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : isAnalyzed ? (
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
  );
}
