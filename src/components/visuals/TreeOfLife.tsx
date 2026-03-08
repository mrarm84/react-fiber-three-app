import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioReact } from '../../hooks/useAudioReact';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface VisualProps {
  dataArray: Uint8Array | null;
  isPreview: boolean;
}

export const TreeOfLife = ({ dataArray, isPreview }: VisualProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { smoothedIntensity, color } = useAudioReact(dataArray);

  const sephirot = useMemo(() => {
    const s = [
      { x: 0, y: 3 },    // Keter
      { x: 1, y: 2.3 },  // Chokhmah
      { x: -1, y: 2.3 }, // Binah
      { x: 1, y: 1 },    // Chesed
      { x: -1, y: 1 },   // Gevurah
      { x: 0, y: 0.3 },  // Tiferet
      { x: 1, y: -0.7 }, // Netzach
      { x: -1, y: -0.7 },// Hod
      { x: 0, y: -1.7 }, // Yesod
      { x: 0, y: -3 },   // Malkuth
    ];
    return s.map(p => new THREE.Vector3(p.x * 0.8, p.y * 0.8, 0));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.scale.setScalar(0.7 + smoothedIntensity.current * 0.3);
    }
  });

  return (
    <group ref={groupRef}>
      {sephirot.map((p, i) => (
        <mesh key={i} position={p}>
          <circleGeometry args={[0.2, 32]} />
          <meshBasicMaterial color={color.current} transparent opacity={0.8} />
        </mesh>
      ))}
      <mesh>
        <planeGeometry args={[3, 6]} />
        <meshBasicMaterial color={color.current} wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
};
