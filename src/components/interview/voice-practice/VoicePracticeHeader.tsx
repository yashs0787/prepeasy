
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings } from 'lucide-react';
import { InterviewType } from '../types/interviewTypes';

interface VoicePracticeHeaderProps {
  interviewType: InterviewType;
  setInterviewType: (type: InterviewType) => void;
  onOpenVoiceSettings: () => void;
}

export function VoicePracticeHeader({
  interviewType,
  setInterviewType,
  onOpenVoiceSettings
}: VoicePracticeHeaderProps) {
  return (
    <div className="grid gap-4">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium">Interview Type</label>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-xs" 
            onClick={onOpenVoiceSettings}
          >
            <Settings className="h-3.5 w-3.5 mr-1" />
            Voice Settings
          </Button>
        </div>
        <Select value={interviewType} onValueChange={(value) => setInterviewType(value as InterviewType)}>
          <SelectTrigger>
            <SelectValue placeholder="Select interview type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technical">Technical Interview</SelectItem>
            <SelectItem value="behavioral">Behavioral Interview</SelectItem>
            <SelectItem value="case">Case Study Interview</SelectItem>
            <SelectItem value="financial">Financial Interview</SelectItem>
            <SelectItem value="general">General Interview</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
