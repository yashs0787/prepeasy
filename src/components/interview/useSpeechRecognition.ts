
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

export function useSpeechRecognition() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  // Check if speech recognition is supported
  const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  useEffect(() => {
    if (!isSupported) {
      console.warn('Speech recognition is not supported in this browser');
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';

    // Set up event handlers
    recognitionInstance.onstart = () => {
      setIsRecording(true);
      setTranscript('');
      console.log('Speech recognition started');
    };

    recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      // Update transcript state
      setTranscript(prevTranscript => {
        const updatedTranscript = prevTranscript + finalTranscript;
        return interimTranscript ? `${updatedTranscript} ${interimTranscript}` : updatedTranscript;
      });
    };

    recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech') {
        toast.warning("No speech detected. Please speak into your microphone.");
      } else if (event.error === 'audio-capture') {
        toast.error("No microphone detected or microphone is not working.");
      } else if (event.error === 'not-allowed') {
        toast.error("Microphone access denied. Please allow microphone access in your browser settings.");
      } else {
        toast.error(`Speech recognition error: ${event.error}`);
      }
      stopRecording();
    };

    recognitionInstance.onend = () => {
      console.log('Speech recognition ended');
      setIsRecording(false);
    };

    // Store the recognition instance
    setRecognition(recognitionInstance);

    // Cleanup on unmount
    return () => {
      if (recognitionInstance) {
        recognitionInstance.abort();
      }
    };
  }, [isSupported]);

  const startRecording = useCallback(() => {
    if (!recognition) {
      if (!isSupported) {
        toast.error("Speech recognition is not supported in your browser");
        return;
      }
      toast.error("Speech recognition failed to initialize");
      return;
    }

    try {
      recognition.start();
      toast.info("Listening... Speak your answer");
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      toast.error("Failed to start speech recognition");
    }
  }, [recognition, isSupported]);

  const stopRecording = useCallback(() => {
    if (recognition) {
      try {
        recognition.stop();
        toast.success("Recording completed");
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
    setIsRecording(false);
  }, [recognition]);

  return {
    startRecording,
    stopRecording,
    isRecording,
    transcript,
    isSupported,
    resetTranscript: () => setTranscript('')
  };
}

// Add type definitions for browsers that don't have them
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
