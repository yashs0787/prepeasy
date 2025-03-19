
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { InterviewQuestion } from '../types/interviewTypes';
import { useElevenLabsVoice } from '../useElevenLabsVoice';
import { useSpeechRecognition } from '../useSpeechRecognition';

type AIModel = 'Claude 3 Sonnet' | 'GPT-4 Turbo';

export function useVoicePractice() {
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');
  const [activeModel, setActiveModel] = useState<AIModel>('Claude 3 Sonnet');
  
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

  const switchModel = () => {
    const newModel = activeModel === 'Claude 3 Sonnet' ? 'GPT-4 Turbo' : 'Claude 3 Sonnet';
    setActiveModel(newModel);
    toast.info(`Switched to ${newModel} for ${newModel === 'Claude 3 Sonnet' ? 'structured reasoning' : 'detailed explanations'}`);
  };

  return {
    showVoiceSettings,
    setShowVoiceSettings,
    userTranscript,
    setUserTranscript,
    isGeneratingSpeech,
    isPlaying,
    isSpeechRecording,
    activeModel,
    readQuestionAloud,
    handleStartRecording,
    handleStopRecording,
    handleTextareaChange,
    stopSpeaking,
    switchModel,
    isSupported,
    apiKey
  };
}
