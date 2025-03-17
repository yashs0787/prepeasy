
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { InterviewQuestion } from '../types/interviewTypes';
import { useElevenLabsVoice } from '../useElevenLabsVoice';
import { useSpeechRecognition } from '../useSpeechRecognition';

export function useVoicePractice() {
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');
  
  const { 
    apiKey, 
    speakText, 
    isPlaying, 
    isLoading: isGeneratingSpeech,
    stopSpeaking 
  } = useElevenLabsVoice();

  const {
    startRecording,
    stopRecording,
    isRecording: isSpeechRecording,
    transcript,
    isSupported,
    resetTranscript
  } = useSpeechRecognition();

  // Update transcript as speech recognition generates it
  useEffect(() => {
    if (transcript) {
      setUserTranscript(transcript);
    }
  }, [transcript]);

  const readQuestionAloud = async (question: InterviewQuestion | null) => {
    if (question && apiKey) {
      await speakText(question.text);
    } else if (!apiKey) {
      toast.error("Please configure your ElevenLabs API key in Voice Settings");
      setShowVoiceSettings(true);
    }
  };

  const handleStartRecording = () => {
    if (!isSupported) {
      toast.error("Speech recognition is not supported in your browser. Try Chrome or Edge.");
      return;
    }
    
    resetTranscript();
    startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserTranscript(e.target.value);
  };

  return {
    showVoiceSettings,
    setShowVoiceSettings,
    userTranscript,
    setUserTranscript,
    isGeneratingSpeech,
    isPlaying,
    isSpeechRecording,
    readQuestionAloud,
    handleStartRecording,
    handleStopRecording,
    handleTextareaChange,
    stopSpeaking,
    isSupported,
    apiKey
  };
}
