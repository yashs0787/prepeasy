
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { CaseStudyData, CaseType } from './types/interviewTypes';
import { consultingCaseStudies, getCaseStudiesByType } from './utils/caseStudyData';
import { 
  CasePracticeProps,
  CaseFilter,
  CaseList,
  CaseDetail
} from './case-practice';

export function CasePractice({ onSelectCase }: CasePracticeProps) {
  const [selectedCaseType, setSelectedCaseType] = useState<CaseType | 'all'>('all');
  const [selectedCase, setSelectedCase] = useState<CaseStudyData | null>(null);
  
  // Filter case studies based on selected type
  const filteredCases = selectedCaseType === 'all' 
    ? consultingCaseStudies 
    : getCaseStudiesByType(selectedCaseType);
    
  const handleSelectCase = (caseStudy: CaseStudyData) => {
    setSelectedCase(caseStudy);
    
    if (onSelectCase) {
      onSelectCase(caseStudy);
    }
    
    toast.info(`Case selected: ${caseStudy.title}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <CaseFilter 
          selectedCaseType={selectedCaseType}
          setSelectedCaseType={setSelectedCaseType}
        />
        
        <div className="flex gap-2">
          {selectedCase && (
            <Button variant="outline" onClick={() => setSelectedCase(null)}>
              Browse Cases
            </Button>
          )}
          <Button variant="outline" onClick={() => window.open('/framework-guide', '_blank')}>
            <BookOpen className="mr-2 h-4 w-4" /> Framework Guide
          </Button>
        </div>
      </div>

      {!selectedCase ? (
        <CaseList 
          filteredCases={filteredCases}
          onSelectCase={handleSelectCase}
        />
      ) : (
        <CaseDetail 
          selectedCase={selectedCase}
          onBackClick={() => setSelectedCase(null)}
        />
      )}
    </div>
  );
}
