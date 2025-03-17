
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { CaseSolutionTabProps } from './types';

export const CaseSolutionTab: React.FC<CaseSolutionTabProps> = ({
  selectedCase,
  userSolution,
  setUserSolution,
  showSolution,
  onSubmitSolution
}) => {
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
        <Button 
          className="mt-4 w-full"
          onClick={onSubmitSolution}
          disabled={!userSolution.trim()}
        >
          <Send className="mr-2 h-4 w-4" /> Submit Solution
        </Button>
      </div>
      
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
};
