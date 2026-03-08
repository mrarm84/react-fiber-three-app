import { useState, useCallback, useRef, useEffect } from 'react';

export const useAudio = () => {
  const [analyzer, setAnalyzer] = useState<AnalyserNode | null>(null);
  const [dataArray, setDataArray] = useState<Uint8Array | null>(null);
  const animationRef = useRef<number>();

  const startAudio = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyzerNode = audioContext.createAnalyser();
      analyzerNode.fftSize = 256;
      source.connect(analyzerNode);
      
      const bufferLength = analyzerNode.frequencyBinCount;
      const data = new Uint8Array(bufferLength);
      
      setAnalyzer(analyzerNode);
      setDataArray(data);
    } catch (err) {
      console.error('Error accessing audio:', err);
    }
  }, []);

  const update = useCallback(() => {
    if (analyzer && dataArray) {
      analyzer.getByteFrequencyData(dataArray);
    }
    animationRef.current = requestAnimationFrame(update);
  }, [analyzer, dataArray]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(update);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [update]);

  const getAverageFrequency = useCallback(() => {
    if (!dataArray) return 0;
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    return sum / dataArray.length;
  }, [dataArray]);

  return { startAudio, analyzer, dataArray, getAverageFrequency };
};
