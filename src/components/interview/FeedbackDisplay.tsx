
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FeedbackResult } from './useInterviewAssistant';
import { Check, X } from 'lucide-react';

interface FeedbackDisplayProps {
  feedback: string | null;
  detailedFeedback?: FeedbackResult | null;
}

export function FeedbackDisplay({ feedback, detailedFeedback }: FeedbackDisplayProps) {
  if (!feedback) return null;

  return (
    <div className="space-y-4">
      <Card className="bg-accent/50">
        <CardContent className="pt-4">
          {!detailedFeedback ? (
            <div className="space-y-2">
              <h4 className="font-medium">Response Strategy:</h4>
              <p className="text-sm">{feedback}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Interview Feedback</h4>
                <div className="flex items-center bg-primary/10 px-3 py-1 rounded-full">
                  <span className="text-primary font-medium">{detailedFeedback.score}/100</span>
                </div>
              </div>
              
              <p className="text-sm">{feedback}</p>
              
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-green-600 flex items-center">
                    <Check size={16} className="mr-1" /> Strengths
                  </h5>
                  <ul className="list-disc pl-6 mt-1 space-y-1">
                    {detailedFeedback.strengths.map((strength, index) => (
                      <li key={index} className="text-sm">{strength}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-amber-600 flex items-center">
                    <X size={16} className="mr-1" /> Areas for Improvement
                  </h5>
                  <ul className="list-disc pl-6 mt-1 space-y-1">
                    {detailedFeedback.improvements.map((improvement, index) => (
                      <li key={index} className="text-sm">{improvement}</li>
                    ))}
                  </ul>
                </div>
                
                {detailedFeedback.example && (
                  <div className="mt-4 border-t pt-3">
                    <h5 className="text-sm font-medium">Example Answer:</h5>
                    <p className="text-sm mt-1 italic">{detailedFeedback.example}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
