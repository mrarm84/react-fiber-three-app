import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioReact } from '../../hooks/useAudioReact';
import * as THREE from 'three';

interface VisualProps {
  dataArray: Uint8Array | null;
  isPreview: boolean;
}

export const IcosahedronGlow = ({ dataArray, isPreview }: VisualProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { smoothedIntensity, color } = useAudioReact(dataArray);

  useFrame((state) => {
    if (meshRef.current && glowRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      const scale = 1.5 + smoothedIntensity.current * 1.5;
      meshRef.current.scale.setScalar(scale);
      glowRef.current.scale.setScalar(scale * 1.2);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color={color.current} 
          wireframe 
          emissive={color.current} 
          emissiveIntensity={smoothedIntensity.current * 10} 
        />
      </mesh>
      <mesh ref={glowRef}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial 
          color={color.current} 
          transparent 
          opacity={0.1 + smoothedIntensity.current * 0.2} 
        />
      </mesh>
    </group>
  );
};
