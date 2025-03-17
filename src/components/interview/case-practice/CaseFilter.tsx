
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CaseFilterProps } from './types';

export const CaseFilter: React.FC<CaseFilterProps> = ({ selectedCaseType, setSelectedCaseType }) => {
  return (
    <Select 
      value={selectedCaseType} 
      onValueChange={(value) => setSelectedCaseType(value as any)}
    >
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
  );
};
