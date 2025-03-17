
import { CaseStudyData, CaseType, CaseFramework } from '../types/interviewTypes';

export interface CasePracticeProps {
  onSelectCase?: (caseStudy: CaseStudyData) => void;
}

export interface CaseFilterProps {
  selectedCaseType: CaseType | 'all';
  setSelectedCaseType: (type: CaseType | 'all') => void;
}

export interface CaseListProps {
  filteredCases: CaseStudyData[];
  onSelectCase: (caseStudy: CaseStudyData) => void;
}

export interface CaseDetailProps {
  selectedCase: CaseStudyData;
  onBackClick: () => void;
}

export interface CaseOverviewTabProps {
  selectedCase: CaseStudyData;
}

export interface CaseFrameworksTabProps {
  selectedCase: CaseStudyData;
  selectedFramework: CaseFramework | null;
  onSelectFramework: (frameworkId: string) => void;
  applicableFrameworks: CaseFramework[];
}

export interface CaseSolutionTabProps {
  selectedCase: CaseStudyData;
  userSolution: string;
  setUserSolution: (solution: string) => void;
  showSolution: boolean;
  onSubmitSolution: () => void;
}

export interface CaseTypeIconProps {
  caseType: CaseType;
}
