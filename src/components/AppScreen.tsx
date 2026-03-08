import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Glitch, ChromaticAberration, Noise, Vignette, Bloom } from '@react-three/postprocessing';
import { VisualSelector } from './VisualSelector';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Vector2 } from 'three';

interface AppScreenProps {
  appIndex: number;
  onBack: () => void;
  dataArray: Uint8Array | null;
}

export const AppScreen = ({ appIndex, onBack, dataArray }: AppScreenProps) => {
  return (
    <motion.div 
      layoutId={`app-${appIndex}`}
      className="absolute inset-0 z-50 bg-black"
    >
      <div className="w-full h-full relative">
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <OrbitControls enablePan={false} enableZoom={true} />
          
          <Suspense fallback={null}>
            <VisualSelector index={appIndex} dataArray={dataArray} isPreview={false} />
            
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            
            <EffectComposer>
              <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
              <ChromaticAberration 
                offset={new Vector2(0.002, 0.002)} 
              />
              <Glitch 
                delay={new Vector2(1.5, 3.5)} 
                duration={new Vector2(0.6, 1.0)}
                strength={new Vector2(0.3, 1.0)}
                mode={1}
                active={true}
              />
              <Noise opacity={0.1} />
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
          </Suspense>
        </Canvas>

        <button 
          onClick={onBack}
          className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all border border-white/10 z-[60]"
        >
          <X size={24} />
        </button>
      </div>
    </motion.div>
  );
};
