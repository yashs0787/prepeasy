
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, BarChart, ChevronDown, ChevronUp } from 'lucide-react';
import { CaseSolutionTabProps } from './types';
import { useCaseEvaluation } from '../hooks/useCaseEvaluation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export const CaseSolutionTab: React.FC<CaseSolutionTabProps> = ({
  selectedCase,
  userSolution,
  setUserSolution,
  showSolution,
  onSubmitSolution
}) => {
  const { isEvaluating, evaluation, evaluateSolution } = useCaseEvaluation();
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [evaluationSubmitted, setEvaluationSubmitted] = useState(false);
  
  const handleEvaluateSolution = async () => {
    if (userSolution.trim().length < 100) {
      // Solution too short for meaningful evaluation
      return;
    }
    
    await evaluateSolution({
      caseStudy: selectedCase,
      userSolution,
      detailLevel: 'standard'
    });
    
    setEvaluationSubmitted(true);
    setShowEvaluation(true);
  };
  
  const toggleEvaluation = () => {
    setShowEvaluation(!showEvaluation);
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Your Solution</h4>
        <Textarea
          placeholder="Type your solution approach here..."
          value={userSolution}
          onChange={(e) => setUserSolution(e.target.value)}
          className="min-h-[200px]"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <Button 
            onClick={onSubmitSolution}
            disabled={!userSolution.trim() || isEvaluating}
          >
            <Send className="mr-2 h-4 w-4" /> Submit Solution
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleEvaluateSolution}
            disabled={userSolution.trim().length < 100 || isEvaluating}
          >
            {isEvaluating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Evaluating...
              </>
            ) : (
              <>
                <BarChart className="mr-2 h-4 w-4" /> AI Evaluation
              </>
            )}
          </Button>
        </div>
      </div>
      
      {evaluationSubmitted && evaluation && (
        <Card className="mt-6">
          <CardHeader className="py-3 cursor-pointer" onClick={toggleEvaluation}>
            <CardTitle className="text-base flex justify-between items-center">
              <span>AI Evaluation of Your Solution</span>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                {showEvaluation ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          {showEvaluation && (
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Overall Score</p>
                    <p className="text-2xl font-bold">{evaluation.structured?.overallScore || '—'}/100</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Approach Identified</p>
                    <p className="text-sm font-semibold">{evaluation.structured?.approach || 'Custom approach'}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Strengths</p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {evaluation.structured?.strengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Areas for Improvement</p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {evaluation.structured?.areasForImprovement.map((area, i) => (
                      <li key={i}>{area}</li>
                    ))}
                  </ul>
                </div>
                
                {evaluation.structured?.missedInsights && evaluation.structured.missedInsights.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Key Insights You Missed</p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {evaluation.structured.missedInsights.map((insight, i) => (
                        <li key={i}>{insight}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {evaluation.structured?.suggestedNextSteps && evaluation.structured.suggestedNextSteps.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Suggested Next Steps</p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {evaluation.structured.suggestedNextSteps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>
      )}
      
      {showSolution && selectedCase.sampleSolution && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Sample Solution</h4>
          <div className="p-4 bg-muted rounded">
            <p className="text-sm">{selectedCase.sampleSolution}</p>
          </div>
        </div>
      )}
    </div>
  );
}
