
import { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

export const useWhisperSpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Check if browser supports audio recording
  const isSupported = 'MediaRecorder' in window;

  const startRecording = useCallback(async () => {
    if (!isSupported) {
      toast.error("Audio recording is not supported in your browser");
      return;
    }

    if (isRecording) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setText('');
      toast.info("Recording started...");
    } catch (error) {
      console.error('Error starting recording:', error);
      toast.error("Failed to access microphone. Please check permissions.");
    }
  }, [isRecording, isSupported]);

  const stopRecording = useCallback(async () => {
    if (!isRecording || !mediaRecorderRef.current) return;

    return new Promise<string>((resolve) => {
      const mediaRecorder = mediaRecorderRef.current;
      
      mediaRecorder.onstop = async () => {
        try {
          setIsProcessing(true);
          toast.info("Processing audio...");
          
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const reader = new FileReader();
          
          reader.onloadend = async () => {
            try {
              const base64data = (reader.result as string).split(',')[1];
              
              const { data, error } = await supabase.functions.invoke('whisper-transcription', {
                body: { audio: base64data },
              });
              
              if (error) {
                throw new Error(`Error calling Whisper API: ${error.message}`);
              }
              
              if (data && data.text) {
                setText(data.text);
                resolve(data.text);
                toast.success("Audio transcription complete");
              } else {
                throw new Error('No transcription returned');
              }
            } catch (error) {
              console.error('Transcription error:', error);
              toast.error("Failed to transcribe audio");
              resolve('');
            } finally {
              setIsProcessing(false);
            }
          };
          
          reader.readAsDataURL(audioBlob);
        } catch (error) {
          console.error('Error processing audio:', error);
          setIsProcessing(false);
          toast.error("Failed to process audio");
          resolve('');
        }
      };
      
      mediaRecorder.stop();
      setIsRecording(false);
      
      // Stop all tracks of the stream
      if (mediaRecorder.stream) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
    });
  }, [isRecording]);

  const resetText = useCallback(() => {
    setText('');
  }, []);

  return {
    startRecording,
    stopRecording,
    isRecording,
    isProcessing,
    text,
    setText,
    resetText,
    isSupported
  };
};
