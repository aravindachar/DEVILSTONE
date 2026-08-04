import { useRef, useCallback, useEffect } from 'react';

export const useAudioContext = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback((): AudioContext => {
    if (typeof window === 'undefined') {
      throw new Error('AudioContext can only be initialized in the browser.');
    }

    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    return audioCtxRef.current;
  }, []);

  // Clean up AudioContext on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
  }, []);

  return { getAudioContext };
};
export type UseAudioContextReturn = ReturnType<typeof useAudioContext>;
