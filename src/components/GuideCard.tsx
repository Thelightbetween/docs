import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle } from 'lucide-react';
import { Guide } from '../types';
import { TalkingAvatar } from './TalkingAvatar';

interface GuideCardProps {
  guide: Guide;
  onStartConversation: (guide: Guide) => void;
  index: number;
}

export const GuideCard: React.FC<GuideCardProps> = ({ guide, onStartConversation, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
    >
      {/* Background Element */}
      <div 
        className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 transform translate-x-8 -translate-y-8"
        style={{ backgroundColor: guide.color }}
      />
      
      {/* Talking Avatar */}
      <TalkingAvatar 
        guide={guide} 
        onStartConversation={() => onStartConversation(guide)}
      />

      {/* Guide Info */}
      <div className="text-center">
        <h3 className="text-2xl font-serif font-semibold text-dark mb-2">
          {guide.name}
        </h3>
        
        <div className="flex items-center justify-center mb-3">
          <Sparkles className="w-4 h-4 text-primary mr-2" />
          <span className="text-primary font-medium">{guide.title}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {guide.description}
        </p>

        {/* Specialties */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {guide.specialties.slice(0, 3).map((specialty, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>

        {/* Connect Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onStartConversation(guide)}
          className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2"
        >
          <MessageCircle size={18} />
          <span>Connect with {guide.name}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};