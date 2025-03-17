
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export function useRecordingManager() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const startRecording = useCallback(() => {
    setIsRecording(true);
    toast.info("Microphone recording started");
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    toast.info("Recording stopped");
  }, []);

  return {
    isRecording,
    audioBlob,
    setAudioBlob,
    startRecording,
    stopRecording
  };
}
