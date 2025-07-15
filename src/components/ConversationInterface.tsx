import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mic, MicOff, Volume2 } from 'lucide-react';
import { Guide, ConversationMessage } from '../types';
import { ElevenLabsService, FallbackTTSService } from '../services/elevenlabs';

interface ConversationInterfaceProps {
  guide: Guide;
  onClose: () => void;
}

export const ConversationInterface: React.FC<ConversationInterfaceProps> = ({ guide, onClose }) => {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const elevenLabsService = useRef(new ElevenLabsService());
  const fallbackTTS = useRef(new FallbackTTSService());
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Add initial greeting message
    const initialMessage: ConversationMessage = {
      id: '1',
      text: guide.greeting,
      isUser: false,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
    
    // Speak the greeting
    speakMessage(guide.greeting);
  }, [guide]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const speakMessage = async (text: string) => {
    setIsSpeaking(true);
    
    try {
      const audioBuffer = await elevenLabsService.current.generateSpeech(text, guide.voiceId);
      const audioUrl = elevenLabsService.current.createAudioUrl(audioBuffer);
      
      const audio = new Audio(audioUrl);
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
    } catch (error) {
      console.warn('ElevenLabs failed, using fallback TTS:', error);
      try {
        await fallbackTTS.current.speak(text);
        setIsSpeaking(false);
      } catch (fallbackError) {
        console.error('Fallback TTS failed:', fallbackError);
        setIsSpeaking(false);
      }
    }
  };

  const generateResponse = (userMessage: string): string => {
    // Simple response generation based on guide's expertise
    const responses = {
      kundali: [
        "I sense beautiful energy flowing through you. Let's explore which chakras need attention today.",
        "Your root chakra speaks of grounding. Take three deep breaths and feel your connection to Mother Earth.",
        "The kundalini energy within you is awakening. Trust this sacred process of transformation."
      ],
      hermia: [
        "As above, so below. Your question reflects the universal principle of correspondence.",
        "The hermetic wisdom whispers that you already hold the answer within. What does your inner knowing tell you?",
        "In the sacred geometry of your life, every pattern has meaning. Let's decode this mystery together."
      ],
      luna: [
        "Your heart speaks volumes, dear one. What emotions are asking to be honored today?",
        "I feel the lunar tides moving through your emotional body. Trust these natural rhythms.",
        "Your intuition is your greatest gift. Let's strengthen this inner compass together."
      ],
      sophia: [
        "Ancient wisdom flows through this moment. You are exactly where you need to be on your journey.",
        "The divine feminine within you holds infinite wisdom. What is she trying to tell you?",
        "Life transitions are sacred portals. You are being called to step into your greater truth."
      ],
      aurora: [
        "Your light body is activating, starlight being. Feel the cosmic frequencies aligning within you.",
        "The galactic councils send their blessings. You are remembering your cosmic origins.",
        "Dimensional healing is occurring now. Allow these higher frequencies to recalibrate your being."
      ]
    };

    const guideResponses = responses[guide.id as keyof typeof responses] || responses.sophia;
    return guideResponses[Math.floor(Math.random() * guideResponses.length)];
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ConversationMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate thinking time
    setTimeout(async () => {
      const responseText = generateResponse(text);
      const guideMessage: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, guideMessage]);
      setIsLoading(false);
      
      // Speak the response
      await speakMessage(responseText);
    }, 1000 + Math.random() * 2000);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    recognitionRef.current.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full overflow-hidden border-2 border-white ${isSpeaking ? 'animate-pulse' : ''}`}>
                <img src={guide.image} alt={guide.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-semibold">{guide.name}</h2>
                <p className="text-white/80 text-sm">{guide.title}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.isUser
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-dark'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <span className="text-xs opacity-70 mt-2 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 p-4 rounded-2xl">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
                placeholder={`Ask ${guide.name} anything...`}
                className="w-full p-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading || isSpeaking}
              />
              
              {isSpeaking && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Volume2 className="w-5 h-5 text-primary animate-pulse" />
                </div>
              )}
            </div>
            
            <button
              onClick={isListening ? stopListening : startListening}
              className={`p-3 rounded-xl transition-colors ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                  : 'bg-sage hover:bg-sage/80 text-white'
              }`}
              disabled={isLoading || isSpeaking}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            
            <button
              onClick={() => sendMessage(inputText)}
              className="bg-primary hover:bg-accent text-white p-3 rounded-xl transition-colors disabled:opacity-50"
              disabled={!inputText.trim() || isLoading || isSpeaking}
            >
              <Send size={20} />
            </button>
          </div>
          
          {isListening && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              🎤 Listening... Speak now
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};