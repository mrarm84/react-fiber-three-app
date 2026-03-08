import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useAudio } from './hooks/useAudio';
import { useInput } from './hooks/useInput';
import { Grid } from './components/Grid';
import { AppScreen } from './components/AppScreen';
import { StartScreen } from './components/StartScreen';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedApp, setSelectedApp] = useState<number | null>(null);
  const { startAudio, dataArray, getAverageFrequency } = useAudio();

  const handleSelect = (index: number) => {
    setSelectedApp(index);
  };

  const handleBack = () => {
    setSelectedApp(null);
  };

  const { selectedIndex, setSelectedIndex } = useInput(handleSelect, handleBack, selectedApp ?? 0);

  const handleStart = () => {
    startAudio();
    setHasStarted(true);
  };

  return (
    <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <StartScreen key="start" onStart={handleStart} />
        ) : (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full relative"
          >
            {selectedApp === null ? (
              <Grid 
                selectedIndex={selectedIndex} 
                onSelect={handleSelect}
                dataArray={dataArray}
              />
            ) : (
              <AppScreen 
                appIndex={selectedApp} 
                onBack={handleBack}
                dataArray={dataArray}
              />
            )}
            
            {/* HUD / Info */}
            <div className="absolute bottom-4 left-4 text-xs font-mono text-white/50 pointer-events-none">
              <p>ARROWS to navigate • 1-0 to select • ESC to go back • GAMEPAD SUPPORTED</p>
              {selectedApp !== null && <p className="mt-1 text-white/30">APP {selectedApp + 1}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
