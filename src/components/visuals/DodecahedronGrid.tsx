import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioReact } from '../../hooks/useAudioReact';
import * as THREE from 'three';

interface VisualProps {
  dataArray: Uint8Array | null;
  isPreview: boolean;
}

export const DodecahedronGrid = ({ dataArray, isPreview }: VisualProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { smoothedIntensity, color } = useAudioReact(dataArray);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.scale.setScalar(0.7 + smoothedIntensity.current * 0.4);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial color={color.current} wireframe />
      </mesh>
      <mesh scale={0.6}>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial color={color.current} wireframe />
      </mesh>
      <mesh scale={1.4}>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color={color.current} wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
};
