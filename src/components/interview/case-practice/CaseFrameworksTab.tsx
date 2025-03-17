
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CaseFrameworksTabProps } from './types';

export const CaseFrameworksTab: React.FC<CaseFrameworksTabProps> = ({ 
  selectedCase,
  selectedFramework, 
  onSelectFramework,
  applicableFrameworks
}) => {
  return (
    <div className="space-y-4">
      <p className="mb-4">Select a framework to help structure your approach to this case:</p>
      <div className="space-y-3">
        {applicableFrameworks.length > 0 ? (
          applicableFrameworks.map(framework => (
            <Card 
              key={framework.id}
              className={`cursor-pointer transition-all ${
                selectedFramework?.id === framework.id ? 'border-primary' : 'hover:border-primary/50'
              }`}
              onClick={() => onSelectFramework(framework.id)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{framework.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{framework.description}</p>
                <div className="space-y-1">
                  {framework.steps.map((step, index) => (
                    <div key={index} className="flex gap-2">
                      <span className="font-medium">{index + 1}.</span>
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
                {framework.example && (
                  <div className="mt-3 p-3 bg-muted rounded text-sm">
                    <span className="font-medium">Example: </span>
                    {framework.example}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center p-10 border rounded-lg bg-muted/50">
            <p className="text-muted-foreground">No specific frameworks recommended for this case type.</p>
          </div>
        )}
      </div>
    </div>
  );
};
