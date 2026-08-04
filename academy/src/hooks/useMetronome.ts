import { useState, useEffect, useRef, useCallback } from 'react';
import type { MetronomeAccent, BeatState } from '../types/music';
import { playClickTone } from '../utils/audio';

interface UseMetronomeProps {
  getAudioContext: () => AudioContext;
  bpm: number;
  accentPattern: MetronomeAccent;
  subdivision: 1 | 2; // 1 = quarter, 2 = 8th notes
  swing: number; // 50 (straight) to 67 (swung)
}

export const useMetronome = ({
  getAudioContext,
  bpm,
  accentPattern,
  subdivision,
  swing,
}: UseMetronomeProps) => {
  const [beatState, setBeatState] = useState<BeatState>({
    currentBeat: 0,
    currentSubdivision: 0,
    isPlaying: false,
  });

  const nextNoteTimeRef = useRef<number>(0);
  const currentBeatRef = useRef<number>(0);
  const timerIdRef = useRef<number | null>(null);
  const activeTimeoutsRef = useRef<number[]>([]);

  // Keep latest values in refs to avoid rebuilding the scheduler loop on state updates
  const bpmRef = useRef(bpm);
  const accentPatternRef = useRef(accentPattern);
  const subdivisionRef = useRef(subdivision);
  const swingRef = useRef(swing);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    accentPatternRef.current = accentPattern;
  }, [accentPattern]);

  useEffect(() => {
    subdivisionRef.current = subdivision;
  }, [subdivision]);

  useEffect(() => {
    swingRef.current = swing;
  }, [swing]);

  // Determine if a beat should be accented
  const getIsAccent = useCallback((beat: number, pattern: MetronomeAccent): boolean => {
    if (pattern === 'none') return false;
    if (pattern === 'first') return beat === 0;
    if (pattern === 'one-three') return beat === 0 || beat === 2;
    if (pattern === 'all') return true;
    return false;
  }, []);

  const clearAllTimeouts = useCallback(() => {
    activeTimeoutsRef.current.forEach((id) => clearTimeout(id));
    activeTimeoutsRef.current = [];
  }, []);

  const scheduleMetronomeClick = useCallback(() => {
    const ctx = getAudioContext();
    const lookahead = 25.0; // ms
    const scheduleAheadTime = 0.1; // seconds
    const beatDuration = 60.0 / bpmRef.current;

    while (nextNoteTimeRef.current < ctx.currentTime + scheduleAheadTime) {
      const beatTime = nextNoteTimeRef.current;
      const beat = currentBeatRef.current;

      // 1. Schedule Down-beat (Subdivision 0)
      const isAccent = getIsAccent(beat, accentPatternRef.current);
      const mainFreq = isAccent ? 1200 : 800;
      playClickTone(ctx, beatTime, mainFreq, 0.04);

      // Downbeat UI sync
      const delayDown = (beatTime - ctx.currentTime) * 1000;
      const timeoutDown = window.setTimeout(() => {
        if (isPlayingRef.current) {
          setBeatState({
            currentBeat: beat,
            currentSubdivision: 0,
            isPlaying: true,
          });
        }
      }, Math.max(0, delayDown));
      activeTimeoutsRef.current.push(timeoutDown);

      // 2. Schedule Off-beat (Subdivision 1) if 8th notes are enabled
      if (subdivisionRef.current === 2) {
        // Swing ratio maps 50-67% of the beat duration
        const swingRatio = swingRef.current / 100;
        const offBeatTime = beatTime + beatDuration * swingRatio;
        
        playClickTone(ctx, offBeatTime, 600, 0.03); // Lighter high-hat style click

        // Off-beat UI sync
        const delayOff = (offBeatTime - ctx.currentTime) * 1000;
        const timeoutOff = window.setTimeout(() => {
          if (isPlayingRef.current) {
            setBeatState({
              currentBeat: beat,
              currentSubdivision: 1,
              isPlaying: true,
            });
          }
        }, Math.max(0, delayOff));
        activeTimeoutsRef.current.push(timeoutOff);
      }

      // Advance clock
      nextNoteTimeRef.current += beatDuration;
      currentBeatRef.current = (currentBeatRef.current + 1) % 4;
    }

    timerIdRef.current = window.setTimeout(scheduleMetronomeClick, lookahead);
  }, [getAudioContext, getIsAccent]);

  const start = useCallback(() => {
    if (isPlayingRef.current) return;
    
    const ctx = getAudioContext();
    isPlayingRef.current = true;
    currentBeatRef.current = 0;
    nextNoteTimeRef.current = ctx.currentTime;
    
    setBeatState({
      currentBeat: 0,
      currentSubdivision: 0,
      isPlaying: true,
    });

    scheduleMetronomeClick();
  }, [getAudioContext, scheduleMetronomeClick]);

  const stop = useCallback(() => {
    isPlayingRef.current = false;
    
    if (timerIdRef.current !== null) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
    
    clearAllTimeouts();
    
    setBeatState({
      currentBeat: 0,
      currentSubdivision: 0,
      isPlaying: false,
    });
  }, [clearAllTimeouts]);

  const togglePlay = useCallback(() => {
    if (isPlayingRef.current) {
      stop();
    } else {
      start();
    }
  }, [start, stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIdRef.current !== null) {
        clearTimeout(timerIdRef.current);
      }
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  return {
    isPlaying: beatState.isPlaying,
    currentBeat: beatState.currentBeat,
    currentSubdivision: beatState.currentSubdivision,
    start,
    stop,
    togglePlay,
  };
};
