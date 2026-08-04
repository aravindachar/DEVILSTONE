import { useMemo, useCallback } from 'react';
import type { NoteName, ScaleType, TuningType, CagedShape } from '../types/music';
import { NOTES } from '../types/music';
import { TUNING_PRESETS, SCALES } from '../constants/musicTheory';
import { getNoteAtFret, getIntervalOffset, isTriadNote, isFretInCagedShape, isScaleMinor } from '../utils/theoryEngine';
import { noteToFreq, playPluckTone } from '../utils/audio';

interface UseFretboardProps {
  getAudioContext: () => AudioContext;
  selectedKey: NoteName;
  selectedScale: ScaleType;
  selectedTuning: TuningType;
  cagedShape: CagedShape;
}

export const useFretboard = ({
  getAudioContext,
  selectedKey,
  selectedScale,
  selectedTuning,
  cagedShape,
}: UseFretboardProps) => {
  const currentTuningNotes = useMemo(() => TUNING_PRESETS[selectedTuning], [selectedTuning]);

  const activeScaleDegreeIndices = useMemo(() => {
    const rootIndex = NOTES.indexOf(selectedKey);
    const intervals = SCALES[selectedScale];
    return intervals.map((interval) => (rootIndex + interval) % 12);
  }, [selectedKey, selectedScale]);

  const isMinor = useMemo(() => isScaleMinor(selectedScale), [selectedScale]);

  // Audio helper
  const playFretNote = useCallback((fullNote: string) => {
    const ctx = getAudioContext();
    const freq = noteToFreq(fullNote);
    playPluckTone(ctx, freq);
  }, [getAudioContext]);

  // Strum scale/chord
  const strum = useCallback(() => {
    const ctx = getAudioContext();
    const strumDelay = 85; // ms between strings

    currentTuningNotes.forEach((openNote, stringIdx) => {
      let targetFret = -1;

      if (cagedShape !== 'None') {
        // Strum CAGED shape (triad notes only within the CAGED range)
        for (let fret = 0; fret <= 24; fret++) {
          const { noteName } = getNoteAtFret(openNote, fret);
          const offset = getIntervalOffset(noteName, selectedKey);
          
          if (
            isTriadNote(offset, isMinor) &&
            isFretInCagedShape(fret, selectedKey, currentTuningNotes, cagedShape)
          ) {
            targetFret = fret;
            break; // Play the first matching note in range
          }
        }
      } else {
        // Strum scale (find lowest active scale fret on this string, prioritizing root/low positions)
        for (let fret = 0; fret <= 12; fret++) {
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
        }, stringIdx * strumDelay);
      }
    });
  }, [getAudioContext, currentTuningNotes, cagedShape, selectedKey, isMinor, activeScaleDegreeIndices]);

  return {
    currentTuningNotes,
    activeScaleDegreeIndices,
    isMinor,
    playFretNote,
    strum,
  };
};
