import React from 'react';
import { motion } from 'framer-motion';
import { AppPreview } from './AppPreview';

interface GridProps {
  selectedIndex: number;
  onSelect: (index: number) => void;
  dataArray: Uint8Array | null;
}

export const Grid = ({ selectedIndex, onSelect, dataArray }: GridProps) => {
  const apps = Array.from({ length: 16 }, (_, i) => i);

  return (
    <div className="w-full h-full p-4 grid grid-cols-4 grid-rows-4 gap-4 bg-black">
      {apps.map((index) => (
        <motion.div
          key={index}
          layoutId={`app-${index}`}
          onClick={() => onSelect(index)}
          className={`
            relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-300
            ${selectedIndex === index ? 'border-white scale-105 z-10 shadow-[0_0_30px_rgba(255,255,255,0.3)]' : 'border-white/10 hover:border-white/30'}
          `}
        >
          <AppPreview index={index} dataArray={dataArray} isSelected={selectedIndex === index} />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none">
            <div className="absolute bottom-2 left-2 font-mono text-[10px] text-white/40">
              0x{index.toString(16).padStart(2, '0').toUpperCase()}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
