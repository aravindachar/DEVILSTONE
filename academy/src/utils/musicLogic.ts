import { NOTES } from '../types/music';
import type { NoteName, ScaleType, CagedShape, DisplayMode } from '../types/music';
import { INTERVAL_MAP } from '../constants/musicTheory';

/**
 * Calculates the note name and full octave-labeled note at a given fret for a string.
 */
export const getNoteAtFret = (openNoteWithOctave: string, fret: number) => {
  const match = openNoteWithOctave.match(/([A-G]#?)(\d)/);
  if (!match) return { noteName: 'C' as NoteName, fullNote: 'C4' };
  
  const note = match[1] as NoteName;
  const octave = parseInt(match[2], 10);
  
  const openIndex = NOTES.indexOf(note);
  const totalSemitones = openIndex + fret;
  const noteName = NOTES[totalSemitones % 12];
  const newOctave = octave + Math.floor(totalSemitones / 12);
  
  return { noteName, fullNote: `${noteName}${newOctave}` };
};

/**
 * Checks if a scale is a minor scale.
 */
export const isScaleMinor = (scale: ScaleType): boolean => {
  const minorScales: ScaleType[] = [
    'Natural Minor',
    'Harmonic Minor',
    'Melodic Minor',
    'Minor Pentatonic',
    'Blues',
    'Dorian',
    'Phrygian',
    'Locrian',
  ];
  return minorScales.includes(scale);
};

/**
 * Gets the semitone interval of a note relative to the root key (0-11).
 */
export const getIntervalOffset = (note: NoteName, root: NoteName): number => {
  const noteIdx = NOTES.indexOf(note);
  const rootIdx = NOTES.indexOf(root);
  return (noteIdx - rootIdx + 12) % 12;
};

/**
 * Returns the label (either note name or interval) based on the display mode.
 */
export const getNoteLabel = (
  note: NoteName,
  root: NoteName,
  mode: DisplayMode
): string => {
  if (mode === 'notes') return note;
  const offset = getIntervalOffset(note, root);
  return INTERVAL_MAP[offset] || 'R';
};

/**
 * Check if a given interval offset (0-11) is part of the chord triad (Root, 3rd, 5th).
 */
export const isTriadNote = (offset: number, isMinor: boolean): boolean => {
  // Root = 0, 5th = 7
  // Minor 3rd = 3, Major 3rd = 4
  const third = isMinor ? 3 : 4;
  return offset === 0 || offset === third || offset === 7;
};

/**
 * Returns if a fret is within the CAGED shape fretboard zone.
 * CAGED shapes are anchored around the root note's position in standard tuning.
 */
export const getCagedRange = (
  rootKey: NoteName,
  tuningNotes: string[],
  shape: CagedShape
): { start: number; end: number } | null => {
  if (shape === 'None') return null;

  // reference string index in standard string array [Low E (0), A (1), D (2), G (3), B (4), High E (5)]
  let refStringIdx = 0;
  let offsetStart = 0;
  let offsetEnd = 0;

  switch (shape) {
    case 'C':
      refStringIdx = 1; // A string
      offsetStart = -3;
      offsetEnd = 0;
      break;
    case 'A':
      refStringIdx = 1; // A string
      offsetStart = 0;
      offsetEnd = 3;
      break;
    case 'G':
      refStringIdx = 0; // Low E string
      offsetStart = -3;
      offsetEnd = 0;
      break;
    case 'E':
      refStringIdx = 0; // Low E string
      offsetStart = 0;
      offsetEnd = 3;
      break;
    case 'D':
      refStringIdx = 2; // D string
      offsetStart = 0;
      offsetEnd = 3;
      break;
  }

  const openNote = tuningNotes[refStringIdx];
  if (!openNote) return null;

  // Find lowest root note fret on the reference string
  let rootFret = -1;
  for (let f = 0; f < 12; f++) {
    const { noteName } = getNoteAtFret(openNote, f);
    if (noteName === rootKey) {
      rootFret = f;
      break;
    }
  }

  if (rootFret === -1) return null;

  return {
    start: rootFret + offsetStart,
    end: rootFret + offsetEnd,
  };
};

/**
 * Determines if a given fret on a specific string belongs to the selected CAGED shape overlay.
 */
export const isFretInCagedShape = (
  fret: number,
  _stringIdx: number, // 0 = Low E, 5 = High E
  rootKey: NoteName,
  tuningNotes: string[],
  shape: CagedShape
): boolean => {
  const range = getCagedRange(rootKey, tuningNotes, shape);
  if (!range) return false;

  // Check if fret is within the shape range at any octave (0, +12, +24)
  for (const octaveOffset of [0, 12, 24]) {
    const start = range.start + octaveOffset;
    const end = range.end + octaveOffset;
    if (fret >= start && fret <= end) {
      return true;
    }
  }
  return false;
};
