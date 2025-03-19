
import { useState, useCallback, useEffect } from 'react';
import { useSpeechRecognition } from '../useSpeechRecognition';

export const useSpeechToText = () => {
  const [text, setText] = useState('');
  const {
    startRecording,
    stopRecording,
    isRecording: isListening,
    transcript,
    resetTranscript,
    isSupported
  } = useSpeechRecognition();

  // Update text when transcript changes
  useEffect(() => {
    if (transcript) {
      setText(transcript);
    }
  }, [transcript]);

  const startListening = useCallback(() => {
    resetTranscript();
    startRecording();
  }, [startRecording, resetTranscript]);

  const stopListening = useCallback(() => {
    stopRecording();
  }, [stopRecording]);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    text,
    setText,
    isSupported
  };
};
