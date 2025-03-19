
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { InterviewType } from '../types/interviewTypes';

interface VoicePracticeHeaderProps {
  interviewType?: InterviewType;
  setInterviewType?: (type: InterviewType) => void;
  onOpenVoiceSettings?: () => void;
  isPracticing?: boolean;
  isGeneratingSpeech?: boolean;
  isPlaying?: boolean;
  hasApiKey?: boolean;
  onConfigureVoice?: () => void;
}

export function VoicePracticeHeader({
  interviewType,
  setInterviewType,
  onOpenVoiceSettings,
  isPracticing,
  isGeneratingSpeech,
  isPlaying,
  hasApiKey,
  onConfigureVoice
}: VoicePracticeHeaderProps) {
  // If both old and new props are provided, prefer the new ones
  const handleOpenSettings = onConfigureVoice || onOpenVoiceSettings;
  
  if (interviewType && setInterviewType) {
    // Render the interview type selector
    return (
      <div className="grid gap-4">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">Interview Type</label>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs" 
              onClick={handleOpenSettings}
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
  
  // Render the new simplified header with voice settings button
  return (
    <div className="flex justify-between items-center pb-3 border-b mb-4">
      <h3 className="font-medium text-lg">Interview Practice</h3>
      <Button
        variant="outline"
        size="sm"
        onClick={handleOpenSettings}
        className="h-8"
      >
        <Settings className="h-4 w-4 mr-1" />
        Voice Settings
      </Button>
    </div>
  );
}
