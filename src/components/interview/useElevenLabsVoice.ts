
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

export type ElevenLabsVoice = {
  id: string;
  name: string;
};

// Default voices from ElevenLabs
const DEFAULT_VOICES: ElevenLabsVoice[] = [
  { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria' },
  { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah' },
  { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte' }
];

export const useElevenLabsVoice = (initialVoiceId?: string) => {
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('elevenlabs_api_key'));
  const [voices, setVoices] = useState<ElevenLabsVoice[]>(DEFAULT_VOICES);
  const [selectedVoice, setSelectedVoice] = useState<string>(initialVoiceId || DEFAULT_VOICES[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize audio element
    const audio = new Audio();
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => {
      toast.error("Error playing audio");
      setIsPlaying(false);
    };
    setAudioElement(audio);

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('elevenlabs_api_key', apiKey);
      fetchVoices().catch(console.error);
    }
  }, [apiKey]);

  const fetchVoices = useCallback(async () => {
    if (!apiKey) return;
    
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': apiKey,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch voices');
      }
      
      const data = await response.json();
      if (data.voices && Array.isArray(data.voices)) {
        const formattedVoices = data.voices.map((voice: any) => ({
          id: voice.voice_id,
          name: voice.name,
        }));
        setVoices(formattedVoices);
      }
    } catch (error) {
      console.error('Error fetching voices:', error);
      toast.error('Failed to fetch voices from ElevenLabs');
    }
  }, [apiKey]);

  const speakText = useCallback(async (text: string) => {
    if (!apiKey || !text || !audioElement) {
      toast.error("Missing API key or text to speak");
      return;
    }

    try {
      setIsLoading(true);
      setIsPlaying(true);
      toast.info("Generating speech...");
      
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}`, {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      audioElement.src = audioUrl;
      await audioElement.play();
      
      setIsLoading(false);
      
      return () => {
        URL.revokeObjectURL(audioUrl);
      };
    } catch (error) {
      console.error('Error generating speech:', error);
      toast.error('Failed to generate speech from ElevenLabs');
      setIsLoading(false);
      setIsPlaying(false);
    }
  }, [apiKey, selectedVoice, audioElement]);

  const stopSpeaking = useCallback(() => {
    if (audioElement && isPlaying) {
      audioElement.pause();
      audioElement.currentTime = 0;
      setIsPlaying(false);
    }
  }, [audioElement, isPlaying]);

  return {
    apiKey,
    setApiKey,
    voices,
    selectedVoice,
    setSelectedVoice,
    speakText,
    stopSpeaking,
    isPlaying,
    isLoading,
    fetchVoices
  };
};
