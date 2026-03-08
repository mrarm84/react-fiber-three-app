import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { VisualSelector } from './VisualSelector';

interface AppPreviewProps {
  index: number;
  dataArray: Uint8Array | null;
  isSelected: boolean;
}

export const AppPreview = ({ index, dataArray, isSelected }: AppPreviewProps) => {
  return (
    <div className="w-full h-full bg-[#050505]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: isSelected, stencil: false, depth: true }}
        dpr={isSelected ? 1 : 0.5}
      >
        <Suspense fallback={null}>
          <VisualSelector index={index} dataArray={dataArray} isPreview={true} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
        </Suspense>
      </Canvas>
    </div>
  );
};
