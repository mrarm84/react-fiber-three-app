import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <motion.div 
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center justify-center text-center p-8 bg-black z-50"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-black mb-4 tracking-tighter text-white">SACRED VISUALS</h1>
        <p className="text-xl text-white/40 mb-12 font-mono">AUDIO REACTIVE • SACRED GEOMETRY • PWA</p>
        
        <button 
          onClick={onStart}
          className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold text-xl rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 opacity-20"></div>
          <Play size={24} fill="currentColor" />
          START SESSION
        </button>
        
        <div className="mt-16 grid grid-cols-2 gap-8 text-left text-xs text-white/30 font-mono uppercase tracking-widest">
          <div>
            <p className="mb-2 text-white/50 border-b border-white/10 pb-1">Controls</p>
            <p>Arrows: Navigate</p>
            <p>Numbers: Select</p>
            <p>Gamepad: Analog/A/B</p>
          </div>
          <div>
            <p className="mb-2 text-white/50 border-b border-white/10 pb-1">Hardware</p>
            <p>Mic: Required</p>
            <p>Sound: recommended</p>
            <p>Full-Screen: PWA</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
