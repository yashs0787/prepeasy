
import React from 'react';
import { Building, Briefcase, ArrowRight, Handshake, Users } from 'lucide-react';
import { CaseType } from '../types/interviewTypes';
import { CaseTypeIconProps } from './types';

export const CaseTypeIcon: React.FC<CaseTypeIconProps> = ({ caseType }) => {
  switch (caseType) {
    case 'market-sizing':
      return <Building className="h-4 w-4" />;
    case 'profitability':
      return <Briefcase className="h-4 w-4" />;
    case 'market-entry':
      return <ArrowRight className="h-4 w-4" />;
    case 'growth-strategy':
      return <Handshake className="h-4 w-4" />; 
    default:
      return <Users className="h-4 w-4" />;
  }
};
