import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Mic, MicOff } from 'lucide-react';
import { Guide } from '../types';
import { ElevenLabsService, FallbackTTSService } from '../services/elevenlabs';

interface TalkingAvatarProps {
  guide: Guide;
  onStartConversation?: () => void;
}

export const TalkingAvatar: React.FC<TalkingAvatarProps> = ({ guide, onStartConversation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const elevenLabsService = useRef(new ElevenLabsService());
  const fallbackTTS = useRef(new FallbackTTSService());

  const playGreeting = async () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    setIsPlaying(true);
    setIsSpeaking(true);
    setAudioError(null);

    try {
      // Try ElevenLabs first
      const audioBuffer = await elevenLabsService.current.generateSpeech(
        guide.greeting,
        guide.voiceId
      );
      
      const audioUrl = elevenLabsService.current.createAudioUrl(audioBuffer);
      
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audioRef.current.onerror = () => {
        setAudioError('Audio playback failed');
        setIsPlaying(false);
        setIsSpeaking(false);
      };
      
      await audioRef.current.play();
      
    } catch (error) {
      console.warn('ElevenLabs failed, falling back to Web Speech API:', error);
      
      try {
        await fallbackTTS.current.speak(guide.greeting, parseInt(guide.id.charAt(0)) || 0);
        setIsPlaying(false);
        setIsSpeaking(false);
      } catch (fallbackError) {
        console.error('Fallback TTS failed:', fallbackError);
        setAudioError('Voice synthesis not available');
        setIsPlaying(false);
        setIsSpeaking(false);
      }
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    
    setIsPlaying(false);
    setIsSpeaking(false);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setAudioError('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setAudioError(null);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('User said:', transcript);
      // Here you would typically send this to your conversation handler
      if (onStartConversation) {
        onStartConversation();
      }
    };

    recognition.onerror = (event) => {
      setAudioError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="relative group">
      {/* Avatar Image */}
      <div 
        className={`talking-avatar relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 transition-all duration-300 ${
          isSpeaking ? 'speaking border-primary shadow-lg' : 'border-white/50'
        }`}
        style={{ borderColor: isSpeaking ? guide.color : undefined }}
      >
        <img
          src={guide.image}
          alt={guide.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Speaking indicator */}
        {isSpeaking && (
          <div className="absolute inset-0 bg-gradient-radial from-white/20 to-transparent animate-pulse" />
        )}
      </div>

      {/* Voice Controls */}
      <div className="flex justify-center space-x-2 mb-4">
        <button
          onClick={playGreeting}
          disabled={isListening}
          className={`p-3 rounded-full transition-all duration-300 ${
            isPlaying 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-primary hover:bg-accent text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          title={isPlaying ? 'Stop greeting' : 'Play greeting'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <button
          onClick={startListening}
          disabled={isPlaying}
          className={`p-3 rounded-full transition-all duration-300 ${
            isListening 
              ? 'bg-green-500 hover:bg-green-600 text-white animate-pulse' 
              : 'bg-sage hover:bg-sage/80 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          title={isListening ? 'Listening...' : 'Start voice chat'}
        >
          {isListening ? <Volume2 size={20} /> : <Mic size={20} />}
        </button>
      </div>

      {/* Voice Wave Animation */}
      {isSpeaking && (
        <div className="flex justify-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="voice-wave bg-primary"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      )}

      {/* Error Display */}
      {audioError && (
        <div className="text-red-500 text-sm text-center mb-2 p-2 bg-red-50 rounded">
          {audioError}
        </div>
      )}

      {/* Status Text */}
      <div className="text-center text-sm text-gray-600 mb-4">
        {isListening && "🎤 Listening..."}
        {isSpeaking && "🗣️ Speaking..."}
        {!isListening && !isSpeaking && "Click play to hear my greeting"}
      </div>
    </div>
  );
};