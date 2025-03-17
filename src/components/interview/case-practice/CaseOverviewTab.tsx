
import React from 'react';
import { CaseOverviewTabProps } from './types';

export const CaseOverviewTab: React.FC<CaseOverviewTabProps> = ({ selectedCase }) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Background</h4>
        <p className="text-muted-foreground">{selectedCase.backgroundInfo}</p>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Challenge</h4>
        <p className="text-muted-foreground">{selectedCase.challengeDescription}</p>
      </div>
      
      {selectedCase.dataPoints && selectedCase.dataPoints.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Data Points</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedCase.dataPoints.map((point, index) => (
              <div key={index} className="flex justify-between p-2 bg-muted rounded">
                <span className="text-sm">{point.label}:</span>
                <span className="text-sm font-medium">{point.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {selectedCase.tips && (
        <div>
          <h4 className="font-medium mb-2">Tips</h4>
          <ul className="list-disc pl-5 space-y-1">
            {selectedCase.tips.map((tip, index) => (
              <li key={index} className="text-sm text-muted-foreground">{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
