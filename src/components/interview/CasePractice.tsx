
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, Building, Users, Handshake, ArrowRight, Send, BookOpen } from 'lucide-react';
import { CaseStudyData, CaseType, CaseFramework } from './types/interviewTypes';
import { consultingCaseStudies, getCaseStudiesByType, getCaseStudyById } from './utils/caseStudyData';
import { consultingFrameworks, getFrameworksForCaseType } from './utils/caseFrameworks';
import { toast } from 'sonner';

interface CasePracticeProps {
  onSelectCase?: (caseStudy: CaseStudyData) => void;
}

export function CasePractice({ onSelectCase }: CasePracticeProps) {
  const [selectedCaseType, setSelectedCaseType] = useState<CaseType | 'all'>('all');
  const [selectedCase, setSelectedCase] = useState<CaseStudyData | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<CaseFramework | null>(null);
  const [userSolution, setUserSolution] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // Filter case studies based on selected type
  const filteredCases = selectedCaseType === 'all' 
    ? consultingCaseStudies 
    : getCaseStudiesByType(selectedCaseType);
  
  // Filter frameworks based on selected case type
  const applicableFrameworks = selectedCase?.caseType 
    ? getFrameworksForCaseType(selectedCase.caseType)
    : [];
    
  const handleSelectCase = (caseStudy: CaseStudyData) => {
    setSelectedCase(caseStudy);
    setSelectedFramework(null);
    setUserSolution('');
    setShowSolution(false);
    setActiveTab('overview');
    
    if (onSelectCase) {
      onSelectCase(caseStudy);
    }
    
    toast.info(`Case selected: ${caseStudy.title}`);
  };
  
  const handleSelectFramework = (frameworkId: string) => {
    const framework = consultingFrameworks.find(f => f.id === frameworkId);
    if (framework) {
      setSelectedFramework(framework);
      toast.info(`Framework selected: ${framework.name}`);
    }
  };
  
  const handleSubmitSolution = () => {
    if (!userSolution.trim()) {
      toast.error("Please enter your solution before submitting");
      return;
    }
    
    setShowSolution(true);
    toast.success("Solution submitted");
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

  const getCaseTypeIcon = (caseType: CaseType) => {
    switch (caseType) {
      case 'market-sizing':
        return <Building className="h-4 w-4" />;
      case 'profitability':
        return <Briefcase className="h-4 w-4" />;
      case 'market-entry':
        return <ArrowRight className="h-4 w-4" />;
      case 'growth-strategy':
        return <HandShake className="h-4 w-4" />; 
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <Select value={selectedCaseType} onValueChange={(value) => setSelectedCaseType(value as CaseType | 'all')}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by case type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Case Types</SelectItem>
            <SelectItem value="market-sizing">Market Sizing</SelectItem>
            <SelectItem value="profitability">Profitability</SelectItem>
            <SelectItem value="market-entry">Market Entry</SelectItem>
            <SelectItem value="growth-strategy">Growth Strategy</SelectItem>
            <SelectItem value="cost-reduction">Cost Reduction</SelectItem>
            <SelectItem value="pricing">Pricing Strategy</SelectItem>
            <SelectItem value="general-case">General Cases</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setSelectedCase(null)}>
            Browse Cases
          </Button>
          <Button variant="outline" onClick={() => window.open('/framework-guide', '_blank')}>
            <BookOpen className="mr-2 h-4 w-4" /> Framework Guide
          </Button>
        </div>
      </div>

      {!selectedCase ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCases.map((caseStudy) => (
            <Card 
              key={caseStudy.id}
              className="cursor-pointer hover:border-primary/50 transition-all"
              onClick={() => handleSelectCase(caseStudy)}
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
                  {getCaseTypeIcon(caseStudy.caseType)}
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
      ) : (
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
                      {getCaseTypeIcon(selectedCase.caseType)}
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
                
                <TabsContent value="overview" className="space-y-4">
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
                </TabsContent>
                
                <TabsContent value="frameworks" className="space-y-4">
                  <p className="mb-4">Select a framework to help structure your approach to this case:</p>
                  <div className="space-y-3">
                    {applicableFrameworks.length > 0 ? (
                      applicableFrameworks.map(framework => (
                        <Card 
                          key={framework.id}
                          className={`cursor-pointer transition-all ${
                            selectedFramework?.id === framework.id ? 'border-primary' : 'hover:border-primary/50'
                          }`}
                          onClick={() => handleSelectFramework(framework.id)}
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
                </TabsContent>
                
                <TabsContent value="solution" className="space-y-4">
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
                      onClick={handleSubmitSolution}
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
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
