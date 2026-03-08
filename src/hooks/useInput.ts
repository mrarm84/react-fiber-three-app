import { useState, useEffect, useCallback, useRef } from 'react';

export const useInput = (onSelect: (index: number) => void, onBack: () => void, currentSelection: number) => {
  const [selectedIndex, setSelectedIndex] = useState(currentSelection);
  const rafRef = useRef<number>();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const row = Math.floor(selectedIndex / 4);
    const col = selectedIndex % 4;

    switch (e.key) {
      case 'ArrowUp':
        setSelectedIndex(prev => Math.max(0, prev - 4));
        break;
      case 'ArrowDown':
        setSelectedIndex(prev => Math.min(15, prev + 4));
        break;
      case 'ArrowLeft':
        setSelectedIndex(prev => (col > 0 ? prev - 1 : prev));
        break;
      case 'ArrowRight':
        setSelectedIndex(prev => (col < 3 ? prev + 1 : prev));
        break;
      case 'Enter':
        onSelect(selectedIndex);
        break;
      case 'Escape':
        onBack();
        break;
      default:
        // Handle 1-9 and 0 (for 10) keys
        if (e.key >= '1' && e.key <= '9') {
          const idx = parseInt(e.key) - 1;
          setSelectedIndex(idx);
          onSelect(idx);
        } else if (e.key === '0') {
          setSelectedIndex(9);
          onSelect(9);
        }
    }
  }, [selectedIndex, onSelect, onBack]);

  const updateGamepad = useCallback(() => {
    const gamepads = navigator.getGamepads();
    if (gamepads[0]) {
      const gp = gamepads[0];
      const axeX = gp.axes[0];
      const axeY = gp.axes[1];

      // Simple debounced navigation
      if (Math.abs(axeX) > 0.5 || Math.abs(axeY) > 0.5) {
        // Implementation for gamepad navigation would need a timer/debounce
      }

      if (gp.buttons[0].pressed) { // A button
        onSelect(selectedIndex);
      }
      if (gp.buttons[1].pressed) { // B button
        onBack();
      }
    }
    rafRef.current = requestAnimationFrame(updateGamepad);
  }, [selectedIndex, onSelect, onBack]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    rafRef.current = requestAnimationFrame(updateGamepad);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleKeyDown, updateGamepad]);

  return { selectedIndex, setSelectedIndex };
};
