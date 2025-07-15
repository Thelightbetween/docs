import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Moon, Sun } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-light to-accent/10" />
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
      <div className="absolute top-20 right-20 w-16 h-16 bg-accent/20 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-white/30 backdrop-blur-md rounded-full mb-8 border border-white/50"
        >
          <Sparkles className="w-10 h-10 text-primary" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-serif font-light text-dark mb-6 leading-tight"
        >
          The Light Between
          <span className="block text-primary font-medium">Oracle</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Meet your divine guides through immersive conversations with AI-powered talking avatars. 
          Experience personalized wisdom from five unique Oracle guides.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center space-x-8 text-sm text-gray-500"
        >
          <div className="flex items-center space-x-2">
            <Sun className="w-4 h-4" />
            <span>Ancient Wisdom</span>
          </div>
          <div className="flex items-center space-x-2">
            <Moon className="w-4 h-4" />
            <span>Modern Technology</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>Personal Transformation</span>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};