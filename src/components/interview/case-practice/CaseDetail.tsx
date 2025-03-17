
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CaseDetailProps } from './types';
import { CaseTypeIcon } from './CaseTypeIcon';
import { CaseOverviewTab } from './CaseOverviewTab';
import { CaseFrameworksTab } from './CaseFrameworksTab';
import { CaseSolutionTab } from './CaseSolutionTab';
import { consultingFrameworks } from '../utils/caseFrameworks';
import { useState } from 'react';

export const CaseDetail: React.FC<CaseDetailProps> = ({ selectedCase, onBackClick }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedFramework, setSelectedFramework] = useState<any>(null);
  const [userSolution, setUserSolution] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  
  // Filter frameworks based on selected case type
  const applicableFrameworks = selectedCase?.caseType 
    ? consultingFrameworks.filter(f => f.applicableFor.includes(selectedCase.caseType))
    : [];
  
  const handleSelectFramework = (frameworkId: string) => {
    const framework = consultingFrameworks.find(f => f.id === frameworkId);
    if (framework) {
      setSelectedFramework(framework);
    }
  };
  
  const handleSubmitSolution = () => {
    if (!userSolution.trim()) return;
    setShowSolution(true);
  };
  
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <CardTitle>{selectedCase.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                {selectedCase.industry}
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-1">
                  <CaseTypeIcon caseType={selectedCase.caseType} />
                  <span className="capitalize">{selectedCase.caseType.replace('-', ' ')}</span>
                </div>
              </CardDescription>
            </div>
            <Badge variant={getBadgeVariant(selectedCase.difficulty)}>
              {selectedCase.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
              <TabsTrigger value="solution">Your Solution</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <CaseOverviewTab selectedCase={selectedCase} />
            </TabsContent>
            
            <TabsContent value="frameworks">
              <CaseFrameworksTab 
                selectedCase={selectedCase}
                selectedFramework={selectedFramework}
                onSelectFramework={handleSelectFramework}
                applicableFrameworks={applicableFrameworks}
              />
            </TabsContent>
            
            <TabsContent value="solution">
              <CaseSolutionTab 
                selectedCase={selectedCase}
                userSolution={userSolution}
                setUserSolution={setUserSolution}
                showSolution={showSolution}
                onSubmitSolution={handleSubmitSolution}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
