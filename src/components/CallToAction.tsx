import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

interface CallToActionProps {
  onGetStarted: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onGetStarted }) => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-12 text-center relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-8"
            >
              <Star className="w-8 h-8 text-primary" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-light text-dark mb-6">
              Ready to Begin Your Journey?
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the magic of talking with your Oracle guides. Start with a free preview 
              and discover the wisdom that awaits you.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:shadow-lg flex items-center space-x-2"
              >
                <span>Start Free Preview</span>
                <ArrowRight size={20} />
              </motion.button>
              
              <a
                href="https://thelightbetweenoracle.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent font-medium text-lg transition-colors duration-300 flex items-center space-x-2"
              >
                <span>Visit Full Oracle App</span>
                <ArrowRight size={18} />
              </a>
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>No signup required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Instant access</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>3-day trial available</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};