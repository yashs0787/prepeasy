
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FeedbackResult } from './useInterviewAssistant';
import { Check, X, Award, BookOpen, LineChart, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FeedbackDisplayProps {
  feedback: string | null;
  detailedFeedback?: FeedbackResult | null;
}

export function FeedbackDisplay({ feedback, detailedFeedback }: FeedbackDisplayProps) {
  if (!feedback) return null;

  // Helper function to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-500';
  };

  // Helper function to get progress bar color
  const getProgressColor = (score: number) => {
    if (score >= 85) return 'bg-green-600';
    if (score >= 70) return 'bg-amber-600';
    return 'bg-red-500';
  };

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
                  <span className={`font-medium ${getScoreColor(detailedFeedback.score)}`}>
                    {detailedFeedback.score}/100
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Score</span>
                  <span className={getScoreColor(detailedFeedback.score)}>{detailedFeedback.score}%</span>
                </div>
                <Progress className="h-2" value={detailedFeedback.score} style={{
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  '--progress-fill': getProgressColor(detailedFeedback.score)
                } as React.CSSProperties} />
                
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {detailedFeedback.scoreBreakdown && (
                    Object.entries(detailedFeedback.scoreBreakdown).map(([category, score]) => (
                      <div key={category} className="flex items-center justify-between text-xs p-1">
                        <span className="text-muted-foreground">{category}:</span>
                        <Badge variant="outline" className={getScoreColor(score)}>{score}/100</Badge>
                      </div>
                    ))
                  )}
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
                    <h5 className="text-sm font-medium flex items-center">
                      <Award className="h-4 w-4 mr-2 text-primary" /> Example Answer:
                    </h5>
                    <p className="text-sm mt-1 italic">{detailedFeedback.example}</p>
                  </div>
                )}
                
                {detailedFeedback.learningResources && (
                  <div className="mt-4 border-t pt-3">
                    <h5 className="text-sm font-medium flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-primary" /> Recommended Resources:
                    </h5>
                    <div className="grid gap-2 mt-2">
                      {detailedFeedback.learningResources.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-background rounded-md text-xs">
                          <div className="flex items-center">
                            {resource.type === 'video' && <LineChart className="h-3 w-3 mr-2 text-blue-500" />}
                            {resource.type === 'article' && <BookOpen className="h-3 w-3 mr-2 text-green-500" />}
                            {resource.type === 'practice' && <Award className="h-3 w-3 mr-2 text-amber-500" />}
                            <span>{resource.title}</span>
                          </div>
                          <Button size="sm" variant="ghost" className="h-6 px-2">
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {detailedFeedback.nextSteps && (
                  <div className="mt-4 border-t pt-3">
                    <h5 className="text-sm font-medium">Recommended Next Steps:</h5>
                    <p className="text-sm mt-1">{detailedFeedback.nextSteps}</p>
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
