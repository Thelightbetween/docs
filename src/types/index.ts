export interface Guide {
  id: string;
  name: string;
  title: string;
  expertise: string;
  description: string;
  image: string;
  voiceId: string; // ElevenLabs voice ID
  personality: string;
  greeting: string;
  specialties: string[];
  color: string;
  element: string;
}

export interface ConversationMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  audioUrl?: string;
}

export interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style: number;
  use_speaker_boost: boolean;
}