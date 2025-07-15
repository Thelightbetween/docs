import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Volume2, MessageCircle, Sparkles, Heart, Zap } from 'lucide-react';

const features = [
  {
    icon: Volume2,
    title: 'AI-Powered Voices',
    description: 'Each guide speaks with a unique, lifelike voice powered by ElevenLabs technology',
    color: '#E74C3C'
  },
  {
    icon: Mic,
    title: 'Voice Conversations',
    description: 'Speak naturally with your guides using advanced speech recognition',
    color: '#3498DB'
  },
  {
    icon: MessageCircle,
    title: 'Personalized Wisdom',
    description: 'Receive guidance tailored to your unique spiritual journey and questions',
    color: '#9B59B6'
  },
  {
    icon: Sparkles,
    title: 'Ancient Knowledge',
    description: 'Access timeless wisdom from chakra healing to hermetic principles',
    color: '#F39C12'
  },
  {
    icon: Heart,
    title: 'Emotional Intelligence',
    description: 'Guides understand and respond to your emotional and energetic state',
    color: '#1ABC9C'
  },
  {
    icon: Zap,
    title: 'Instant Connection',
    description: 'No downloads required - start your spiritual conversation immediately',
    color: '#E67E22'
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-white/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light text-dark mb-6">
            Experience the Future of Oracle Guidance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Combining ancient wisdom with cutting-edge AI technology for an unprecedented spiritual experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group"
            >
              <div 
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: feature.color }}
              >
                <feature.icon size={28} />
              </div>
              
              <h3 className="text-xl font-serif font-semibold text-dark mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};