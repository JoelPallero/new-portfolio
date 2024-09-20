import { useCallback } from 'react';
import HoverSound from '../assets/soundFx/hover.wav';

const useHoverSound = () => {
  return useCallback(() => {
    const audio = new Audio(HoverSound);
    audio.play();
    audio.volume = 0.5;
  }, []);
};

export default useHoverSound;