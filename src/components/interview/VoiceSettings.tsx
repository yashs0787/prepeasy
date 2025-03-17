
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, VolumeX } from 'lucide-react';
import { ElevenLabsVoice, useElevenLabsVoice } from './useElevenLabsVoice';

interface VoiceSettingsProps {
  onClose?: () => void;
}

export function VoiceSettings({ onClose }: VoiceSettingsProps) {
  const {
    apiKey,
    setApiKey,
    voices,
    selectedVoice,
    setSelectedVoice,
    speakText,
    stopSpeaking,
    isPlaying,
    fetchVoices
  } = useElevenLabsVoice();

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleTestVoice = () => {
    if (isPlaying) {
      stopSpeaking();
    } else {
      speakText("Hello, I'm your interview practice assistant. I'll help you prepare for your interviews.");
    }
  };

  const handleVoiceSelect = (value: string) => {
    setSelectedVoice(value);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">ElevenLabs API Key</Label>
          <Input
            id="api-key"
            type="password"
            value={apiKey || ''}
            onChange={handleApiKeyChange}
            placeholder="Enter your ElevenLabs API key"
          />
          <p className="text-xs text-muted-foreground">
            Get your API key from <a href="https://elevenlabs.io/app" target="_blank" rel="noreferrer" className="underline">ElevenLabs</a>
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="voice-select">Select Voice</Label>
          <div className="flex gap-2">
            <Select value={selectedVoice} onValueChange={handleVoiceSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                {voices.map((voice: ElevenLabsVoice) => (
                  <SelectItem key={voice.id} value={voice.id}>
                    {voice.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={fetchVoices} 
              disabled={!apiKey}
              className="whitespace-nowrap"
            >
              Refresh Voices
            </Button>
          </div>
        </div>

        <Button 
          onClick={handleTestVoice} 
          disabled={!apiKey}
          className="w-full"
          variant={isPlaying ? "destructive" : "default"}
        >
          {isPlaying ? (
            <>
              <VolumeX className="h-4 w-4 mr-2" />
              Stop Audio
            </>
          ) : (
            <>
              <Volume2 className="h-4 w-4 mr-2" />
              Test Voice
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
