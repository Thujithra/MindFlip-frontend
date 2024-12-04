import { useRef, useEffect } from "react";

export const useWithSound = (audioSource) => {
  const soundRef = useRef();

  useEffect(() => {
    soundRef.current = new Audio(audioSource);
  }, [audioSource]);

  const playSound = () => {
    if (soundRef.current) {
      soundRef.current.play();
    }
  };

  const pauseSound = () => {
    if (soundRef.current) {
      soundRef.current.pause();
    }
  };

  return { playSound, pauseSound };
};
