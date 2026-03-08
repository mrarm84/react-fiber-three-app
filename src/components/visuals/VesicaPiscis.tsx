import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioReact } from '../../hooks/useAudioReact';
import * as THREE from 'three';

interface VisualProps {
  dataArray: Uint8Array | null;
  isPreview: boolean;
}

export const VesicaPiscis = ({ dataArray, isPreview }: VisualProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { smoothedIntensity, color } = useAudioReact(dataArray);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2;
      groupRef.current.scale.setScalar(0.8 + smoothedIntensity.current * 0.4);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-0.7, 0, 0]}>
        <ringGeometry args={[1.4, 1.45, 64]} />
        <meshBasicMaterial color={color.current} transparent opacity={0.5} />
      </mesh>
      <mesh position={[0.7, 0, 0]}>
        <ringGeometry args={[1.4, 1.45, 64]} />
        <meshBasicMaterial color={color.current} transparent opacity={0.5} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.5, 32]} />
        <meshBasicMaterial color={color.current} transparent opacity={0.2} />
      </mesh>
    </group>
  );
};
