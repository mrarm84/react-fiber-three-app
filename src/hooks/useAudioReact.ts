import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export const useAudioReact = (dataArray: Uint8Array | null) => {
  const intensity = useRef(0);
  const smoothedIntensity = useRef(0);
  const color = useRef(new THREE.Color());

  useFrame((state, delta) => {
    if (dataArray) {
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      intensity.current = sum / dataArray.length / 255;
      smoothedIntensity.current = THREE.MathUtils.lerp(smoothedIntensity.current, intensity.current, 0.1);
      
      const hue = (state.clock.elapsedTime * 0.1 + intensity.current * 0.5) % 1;
      color.current.setHSL(hue, 0.8, 0.5 + intensity.current * 0.2);
    }
  });

  return { intensity, smoothedIntensity, color };
};
