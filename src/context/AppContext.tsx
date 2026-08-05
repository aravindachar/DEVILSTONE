'use client';

/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import type { NoteName, ScaleType, TuningType, CagedShape, DisplayMode, MetronomeAccent, InstrumentType } from '../types/music';
import { useAudioContext } from '../hooks/useAudioContext';
import { useMetronome } from '../hooks/useMetronome';
import { useFretboard } from '../hooks/useFretboard';

interface AppContextType {
  // Global Fretboard States
  selectedKey: NoteName;
  setSelectedKey: (k: NoteName) => void;
  selectedScale: ScaleType;
  setSelectedScale: (s: ScaleType) => void;
  selectedTuning: TuningType;
  setSelectedTuning: (t: TuningType) => void;
  displayMode: DisplayMode;
  setDisplayMode: (m: DisplayMode) => void;
  cagedShape: CagedShape;
  setCagedShape: (c: CagedShape) => void;
  
  // Instrument and Fret Range selectors
  instrument: InstrumentType;
  setInstrument: (i: InstrumentType) => void;
  fretRange: [number, number];
  setFretRange: (range: [number, number]) => void;

  // Global Metronome States
  bpm: number;
  setBpm: (bpm: number) => void;
  accentPattern: MetronomeAccent;
  setAccentPattern: (a: MetronomeAccent) => void;
  subdivision: 1 | 2;
  setSubdivision: (s: 1 | 2) => void;
  swing: number;
  setSwing: (s: number) => void;

  // Audio & Playback Hooks Return
  getAudioContext: () => AudioContext;
  isPlaying: boolean;
  currentBeat: number;
  currentSubdivision: number;
  togglePlay: () => void;

  // Fretboard Computations & Playback
  currentTuningNotes: string[];
  activeScaleDegreeIndices: number[];
  isMinor: boolean;
  playFretNote: (fullNote: string) => void;
  strum: () => void;

  // Focus Mode
  isFocusMode: boolean;
  setIsFocusMode: (f: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getAudioContext } = useAudioContext();

  // Fretboard Config
  const [selectedKey, setSelectedKey] = useState<NoteName>('E');
  const [selectedScale, setSelectedScale] = useState<ScaleType>('Minor Pentatonic');
  const [selectedTuning, setSelectedTuning] = useState<TuningType>('Standard (E)');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('notes');
  const [cagedShape, setCagedShape] = useState<CagedShape>('None');

  // Instrument and Fret Range
  const [instrument, setInstrumentState] = useState<InstrumentType>('guitar');
  const [fretRange, setFretRange] = useState<[number, number]>([0, 24]);

  // Metronome Config
  const [bpm, setBpm] = useState<number>(100);
  const [accentPattern, setAccentPattern] = useState<MetronomeAccent>('first');
  const [subdivision, setSubdivision] = useState<1 | 2>(1);
  const [swing, setSwing] = useState<number>(50);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);

  const setInstrument = (i: InstrumentType) => {
    setInstrumentState(i);
    if (i === 'bass') {
      setSelectedTuning('Standard Bass (E)');
    } else {
      setSelectedTuning('Standard (E)');
    }
  };

  const metronome = useMetronome({
    getAudioContext,
    bpm,
    accentPattern,
    subdivision,
    swing,
  });

  const fretboard = useFretboard({
    getAudioContext,
    selectedKey,
    selectedScale,
    selectedTuning,
    cagedShape,
  });

  return (
    <AppContext.Provider
      value={{
        selectedKey,
        setSelectedKey,
        selectedScale,
        setSelectedScale,
        selectedTuning,
        setSelectedTuning,
        displayMode,
        setDisplayMode,
        cagedShape,
        setCagedShape,
        
        instrument,
        setInstrument,
        fretRange,
        setFretRange,
        
        bpm,
        setBpm,
        accentPattern,
        setAccentPattern,
        subdivision,
        setSubdivision,
        swing,
        setSwing,
        
        getAudioContext,
        isPlaying: metronome.isPlaying,
        currentBeat: metronome.currentBeat,
        currentSubdivision: metronome.currentSubdivision,
        togglePlay: metronome.togglePlay,
        
        currentTuningNotes: fretboard.currentTuningNotes,
        activeScaleDegreeIndices: fretboard.activeScaleDegreeIndices,
        isMinor: fretboard.isMinor,
        playFretNote: fretboard.playFretNote,
        strum: fretboard.strum,

        isFocusMode,
        setIsFocusMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
export type UseAppReturn = ReturnType<typeof useApp>;
export default AppContext;
