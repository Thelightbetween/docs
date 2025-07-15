import React from 'react';
import { motion } from 'framer-motion';
import { GuideCard } from './GuideCard';
import { Guide } from '../types';

interface GuideGridProps {
  guides: Guide[];
  onStartConversation: (guide: Guide) => void;
}

export const GuideGrid: React.FC<GuideGridProps> = ({ guides, onStartConversation }) => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light text-dark mb-6">
            Meet Your Oracle Guides
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Each guide brings unique wisdom and expertise to support your spiritual journey. 
            Click play to hear their greeting, then connect for a full conversation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {guides.map((guide, index) => (
            <GuideCard
              key={guide.id}
              guide={guide}
              onStartConversation={onStartConversation}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};