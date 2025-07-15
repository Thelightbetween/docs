import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { GuideGrid } from './components/GuideGrid';
import { Features } from './components/Features';
import { CallToAction } from './components/CallToAction';
import { ConversationInterface } from './components/ConversationInterface';
import { guides } from './data/guides';
import { Guide } from './types';

function App() {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  const handleStartConversation = (guide: Guide) => {
    setSelectedGuide(guide);
  };

  const handleCloseConversation = () => {
    setSelectedGuide(null);
  };

  const scrollToGuides = () => {
    const guidesSection = document.getElementById('guides');
    guidesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div id="guides">
        <GuideGrid 
          guides={guides} 
          onStartConversation={handleStartConversation}
        />
      </div>
      
      <Features />
      
      <CallToAction onGetStarted={scrollToGuides} />
      
      {/* Footer */}
      <footer className="bg-dark text-white py-12 px-6">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-serif font-light mb-4">The Light Between Oracle</h3>
          <p className="text-gray-400 mb-6">
            Where ancient wisdom meets modern technology
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <a href="https://thelightbetweenoracle.com" className="hover:text-white transition-colors">
              Full Oracle App
            </a>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
          </div>
          <div className="mt-8 text-xs text-gray-500">
            © 2025 The Light Between Oracle. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Conversation Modal */}
      <AnimatePresence>
        {selectedGuide && (
          <ConversationInterface
            guide={selectedGuide}
            onClose={handleCloseConversation}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;