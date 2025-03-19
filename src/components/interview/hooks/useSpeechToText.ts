
import { useState, useCallback, useEffect } from 'react';
import { useWhisperSpeechToText } from './useWhisperSpeechToText';
import { useSpeechRecognition } from '../useSpeechRecognition';

// This hook can toggle between browser's Speech Recognition and OpenAI's Whisper API
export const useSpeechToText = (useWhisper = true) => {
  const [text, setText] = useState('');
  
  // Browser's native Speech Recognition
  const {
    startRecording: startBrowserRecording,
    stopRecording: stopBrowserRecording,
    isRecording: isBrowserRecording,
    transcript,
    resetTranscript,
    isSupported: isBrowserSupported
  } = useSpeechRecognition();

  // OpenAI's Whisper API
  const {
    startRecording: startWhisperRecording,
    stopRecording: stopWhisperRecording,
    isRecording: isWhisperRecording,
    isProcessing: isWhisperProcessing,
    text: whisperText,
    setText: setWhisperText,
    resetText: resetWhisperText,
    isSupported: isWhisperSupported
  } = useWhisperSpeechToText();

  // Determine which implementation to use
  const isListening = useWhisper ? isWhisperRecording : isBrowserRecording;
  const isProcessing = useWhisper ? isWhisperProcessing : false;
  const isSupported = useWhisper ? isWhisperSupported : isBrowserSupported;

  // Update text when transcript changes (for browser speech recognition)
  useEffect(() => {
    if (!useWhisper && transcript) {
      setText(transcript);
    }
  }, [transcript, useWhisper]);

  // Update text when Whisper text changes
  useEffect(() => {
    if (useWhisper && whisperText) {
      setText(whisperText);
    }
  }, [whisperText, useWhisper]);

  const startListening = useCallback(() => {
    if (useWhisper) {
      startWhisperRecording();
    } else {
      resetTranscript();
      startBrowserRecording();
    }
  }, [useWhisper, startWhisperRecording, startBrowserRecording, resetTranscript]);

  const stopListening = useCallback(async () => {
    if (useWhisper) {
      const transcribedText = await stopWhisperRecording();
      return transcribedText;
    } else {
      stopBrowserRecording();
      return transcript;
    }
  }, [useWhisper, stopWhisperRecording, stopBrowserRecording, transcript]);

  const resetTranscriptText = useCallback(() => {
    if (useWhisper) {
      resetWhisperText();
    } else {
      resetTranscript();
    }
    setText('');
  }, [useWhisper, resetWhisperText, resetTranscript]);

  return {
    isListening,
    isProcessing,
    transcript: text,
    startListening,
    stopListening,
    resetTranscript: resetTranscriptText,
    text,
    setText,
    isSupported
  };
};
