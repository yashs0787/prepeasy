
import { useState, useCallback } from 'react';
import { useSpeechRecognition } from '../useSpeechRecognition';

export const useSpeechToText = () => {
  const [text, setText] = useState('');
  const {
    startRecording,
    stopRecording,
    isRecording: isListening,
    transcript,
    resetTranscript
  } = useSpeechRecognition();

  const startListening = useCallback(() => {
    startRecording();
    resetTranscript();
  }, [startRecording, resetTranscript]);

  const stopListening = useCallback(() => {
    stopRecording();
    setText(transcript);
  }, [stopRecording, transcript]);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    text,
    setText
  };
};
