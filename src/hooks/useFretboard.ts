import { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import type { NoteName, ScaleType, TuningType, CagedShape } from '../types/music';
import { NOTES } from '../types/music';
import { TUNING_PRESETS, SCALES } from '../constants/musicTheory';
import {
  getNoteAtFret,
  getIntervalOffset,
  isTriadNote,
  isFretInCagedShape,
  isScaleMinor,
  getScaleSequenceNotes,
} from '../utils/theoryEngine';
import { noteToFreq, playPluckTone } from '../utils/audio';

interface UseFretboardProps {
  getAudioContext: () => AudioContext;
  selectedKey: NoteName;
  selectedScale: ScaleType;
  selectedTuning: TuningType;
  cagedShape: CagedShape;
  capoFret?: number;
  bpm?: number;
  fretRange?: [number, number];
}

export const useFretboard = ({
  getAudioContext,
  selectedKey,
  selectedScale,
  selectedTuning,
  cagedShape,
  capoFret = 0,
  bpm = 100,
  fretRange = [0, 24],
}: UseFretboardProps) => {
  const currentTuningNotes = useMemo(() => TUNING_PRESETS[selectedTuning], [selectedTuning]);

  const activeScaleDegreeIndices = useMemo(() => {
    const rootIndex = NOTES.indexOf(selectedKey);
    const intervals = SCALES[selectedScale];
    return intervals.map((interval) => (rootIndex + interval) % 12);
  }, [selectedKey, selectedScale]);

  const isMinor = useMemo(() => isScaleMinor(selectedScale), [selectedScale]);

  const [activePlayingNote, setActivePlayingNote] = useState<string | null>(null);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const sequenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio helper
  const playFretNote = useCallback(
    (fullNote: string) => {
      const ctx = getAudioContext();
      const freq = noteToFreq(fullNote);
      playPluckTone(ctx, freq);
      setActivePlayingNote(fullNote);
      setTimeout(() => {
        setActivePlayingNote((prev) => (prev === fullNote ? null : prev));
      }, 420);
    },
    [getAudioContext]
  );

  const stopSequence = useCallback(() => {
    if (sequenceTimerRef.current) {
      clearInterval(sequenceTimerRef.current);
      sequenceTimerRef.current = null;
    }
    setIsPlayingSequence(false);
    setActivePlayingNote(null);
  }, []);

  // Play-Along scale sequence runner
  const togglePlaySequence = useCallback(() => {
    if (isPlayingSequence) {
      stopSequence();
      return;
    }

    const seqNotes = getScaleSequenceNotes(
      currentTuningNotes,
      activeScaleDegreeIndices,
      fretRange,
      capoFret
    );

    if (seqNotes.length === 0) return;

    setIsPlayingSequence(true);
    const ctx = getAudioContext();
    let currentIndex = 0;
    let direction = 1;

    const stepInterval = Math.max(160, Math.min(600, (60 / Math.max(bpm, 40)) * 500));

    // Play first note
    const first = seqNotes[0];
    playPluckTone(ctx, first.freq);
    setActivePlayingNote(first.fullNote);

    sequenceTimerRef.current = setInterval(() => {
      currentIndex += direction;
      if (currentIndex >= seqNotes.length) {
        direction = -1;
        currentIndex = Math.max(0, seqNotes.length - 2);
      } else if (currentIndex < 0) {
        direction = 1;
        currentIndex = Math.min(seqNotes.length - 1, 1);
      }

      const note = seqNotes[currentIndex];
      if (note) {
        playPluckTone(ctx, note.freq);
        setActivePlayingNote(note.fullNote);
      }
    }, stepInterval);
  }, [
    isPlayingSequence,
    stopSequence,
    currentTuningNotes,
    activeScaleDegreeIndices,
    fretRange,
    capoFret,
    getAudioContext,
    bpm,
  ]);

  // Clean up timer on unmount or scale/tuning change
  useEffect(() => {
    return () => {
      if (sequenceTimerRef.current) {
        clearInterval(sequenceTimerRef.current);
      }
    };
  }, [selectedScale, selectedKey, selectedTuning]);

  // Strum scale/chord
  const strum = useCallback(() => {
    const ctx = getAudioContext();
    const strumDelay = 85; // ms between strings
    const effectiveStartFret = capoFret > 0 ? capoFret : 0;

    currentTuningNotes.forEach((openNote, stringIdx) => {
      let targetFret = -1;

      if (cagedShape !== 'None') {
        // Strum CAGED shape (triad notes only within the CAGED range)
        for (let fret = effectiveStartFret; fret <= 24; fret++) {
          const { noteName } = getNoteAtFret(openNote, fret);
          const offset = getIntervalOffset(noteName, selectedKey);

          if (
            isTriadNote(offset, isMinor) &&
            isFretInCagedShape(fret, selectedKey, currentTuningNotes, cagedShape)
          ) {
            targetFret = fret;
            break;
          }
        }
      } else {
        // Strum scale
        for (let fret = effectiveStartFret; fret <= 12; fret++) {
          const { noteName } = getNoteAtFret(openNote, fret);
          const noteIndex = NOTES.indexOf(noteName);
          if (activeScaleDegreeIndices.includes(noteIndex)) {
            targetFret = fret;
            break;
          }
        }
      }

      if (targetFret !== -1) {
        const { fullNote } = getNoteAtFret(openNote, targetFret);
        const freq = noteToFreq(fullNote);
        setTimeout(() => {
          playPluckTone(ctx, freq);
          setActivePlayingNote(fullNote);
          setTimeout(() => {
            setActivePlayingNote((prev) => (prev === fullNote ? null : prev));
          }, 350);
        }, stringIdx * strumDelay);
      }
    });
  }, [
    getAudioContext,
    currentTuningNotes,
    cagedShape,
    selectedKey,
    isMinor,
    activeScaleDegreeIndices,
    capoFret,
  ]);

  return {
    currentTuningNotes,
    activeScaleDegreeIndices,
    isMinor,
    playFretNote,
    strum,
    activePlayingNote,
    isPlayingSequence,
    togglePlaySequence,
  };
};
