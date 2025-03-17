
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CaseListProps } from './types';
import { CaseTypeIcon } from './CaseTypeIcon';

export const CaseList: React.FC<CaseListProps> = ({ filteredCases, onSelectCase }) => {
  const getBadgeVariant = (difficulty: string) => {
    switch (difficulty) {
      case 'basic':
        return 'secondary';
      case 'intermediate':
        return 'default';
      case 'advanced':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredCases.map((caseStudy) => (
        <Card 
          key={caseStudy.id}
          className="cursor-pointer hover:border-primary/50 transition-all"
          onClick={() => onSelectCase(caseStudy)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{caseStudy.title}</CardTitle>
              <Badge variant={getBadgeVariant(caseStudy.difficulty)}>
                {caseStudy.difficulty}
              </Badge>
            </div>
            <CardDescription>{caseStudy.industry}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-sm mb-3">
              <CaseTypeIcon caseType={caseStudy.caseType} />
              <span className="capitalize">{caseStudy.caseType.replace('-', ' ')}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {caseStudy.backgroundInfo}
            </p>
          </CardContent>
        </Card>
      ))}
      
      {filteredCases.length === 0 && (
        <div className="col-span-full text-center p-10 border rounded-lg bg-muted/50">
          <p className="text-muted-foreground">No case studies found for this type.</p>
        </div>
      )}
    </div>
  );
};
