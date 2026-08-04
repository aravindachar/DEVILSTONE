import { NOTES } from '../types/music';
import type { NoteName, ScaleType, CagedShape, DisplayMode } from '../types/music';
import { TUNING_PRESETS, SCALES, INTERVAL_MAP } from '../constants/musicTheory';

export { NOTES, TUNING_PRESETS, SCALES, INTERVAL_MAP };

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
 * Checks if a scale is pentatonic.
 */
export const isScalePentatonic = (scale: ScaleType): boolean => {
  return scale === 'Minor Pentatonic' || scale === 'Major Pentatonic' || scale === 'Blues';
};

/**
 * Calculates absolute note and octave name at a fret.
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
 * Gets the semitone interval offset (0-11) of a note relative to the root key.
 */
export const getIntervalOffset = (note: NoteName, root: NoteName): number => {
  const noteIdx = NOTES.indexOf(note);
  const rootIdx = NOTES.indexOf(root);
  return (noteIdx - rootIdx + 12) % 12;
};

/**
 * Returns the text label for a note (either name or interval) based on the display mode.
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
 * Checks if a given interval offset is part of the chord triad (Root, 3rd, 5th).
 */
export const isTriadNote = (offset: number, isMinor: boolean): boolean => {
  const third = isMinor ? 3 : 4;
  return offset === 0 || offset === third || offset === 7;
};

/**
 * Normalizes a fret range to stay within [0, 24].
 */
export const normalizeRange = (start: number, end: number): [number, number] => {
  let s = start;
  let e = end;
  while (s < 0) {
    s += 12;
    e += 12;
  }
  while (e > 24) {
    s -= 12;
    e -= 12;
  }
  return [s, e];
};

/**
 * Returns the fret range span for the selected CAGED shape.
 */
export const getCagedRange = (
  rootKey: NoteName,
  tuningNotes: string[],
  shape: CagedShape
): [number, number] | null => {
  if (shape === 'None') return null;

  let refStringIdx = 0; // Low E
  let offsetStart = 0;
  let offsetEnd = 0;

  switch (shape) {
    case 'C':
      refStringIdx = 1; // A string
      offsetStart = -3;
      offsetEnd = 1;
      break;
    case 'A':
      refStringIdx = 1; // A string
      offsetStart = 0;
      offsetEnd = 4;
      break;
    case 'G':
      refStringIdx = 0; // Low E string
      offsetStart = -3;
      offsetEnd = 1;
      break;
    case 'E':
      refStringIdx = 0; // Low E string
      offsetStart = 0;
      offsetEnd = 4;
      break;
    case 'D':
      refStringIdx = 2; // D string
      offsetStart = 0;
      offsetEnd = 4;
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

  return normalizeRange(rootFret + offsetStart, rootFret + offsetEnd);
};

/**
 * Returns the fret range span for the selected Pentatonic box position.
 */
export const getPentatonicPositionRange = (
  rootKey: NoteName,
  tuningNotes: string[],
  position: number // 1 to 5
): [number, number] => {
  const openNote = tuningNotes[0]; // Low E reference string
  let rootFret = -1;

  for (let f = 0; f < 12; f++) {
    const { noteName } = getNoteAtFret(openNote, f);
    if (noteName === rootKey) {
      rootFret = f;
      break;
    }
  }

  if (rootFret === -1) rootFret = 0;

  // Calculate fret offset from Low E root
  let offsetStart = 0;
  let offsetEnd = 4; // 5 fret span

  switch (position) {
    case 1:
      offsetStart = 0;
      offsetEnd = 4;
      break;
    case 2:
      offsetStart = 2;
      offsetEnd = 6;
      break;
    case 3:
      offsetStart = 5;
      offsetEnd = 9;
      break;
    case 4:
      offsetStart = 7;
      offsetEnd = 11;
      break;
    case 5:
      offsetStart = 9;
      offsetEnd = 13;
      break;
  }

  return normalizeRange(rootFret + offsetStart, rootFret + offsetEnd);
};

/**
 * Determines if a given fret on a specific string belongs to the CAGED shape overlay.
 */
export const isFretInCagedShape = (
  fret: number,
  rootKey: NoteName,
  tuningNotes: string[],
  shape: CagedShape
): boolean => {
  const range = getCagedRange(rootKey, tuningNotes, shape);
  if (!range) return false;

  // Check if fret is within the shape range at any octave (0, +12, +24)
  for (const octaveOffset of [0, 12, 24]) {
    const start = range[0] + octaveOffset;
    const end = range[1] + octaveOffset;
    if (fret >= start && fret <= end) {
      return true;
    }
  }
  return false;
};

// --- GRIMOIRE METADATA & DATA ---
export interface ScaleGrimoire {
  formula: string;
  notes: string[];
  description: string;
}

export const SCALE_GRIMOIRE: Record<ScaleType, string> = {
  'Major':
    'The foundation of Western music theory. Characterized by its bright, happy tone, it is the parent scale from which standard modes are derived. Used universally from classical symphonies to pop anthems.',
  'Natural Minor':
    'Dark, melancholic, and deeply emotional. Also known as the Aeolian mode, it is the backbone of metal, classical tragedy, and dark pop. Favored by composers from Chopin to Iron Maiden.',
  'Harmonic Minor':
    'Exotic, tense, and classical. By raising the 7th degree of the natural minor scale, it introduces an augmented second interval that gives it a Middle Eastern or neoclassical flavor. Used by Yngwie Malmsteen to build blistering neo-classical runs.',
  'Melodic Minor':
    'Mysterious, sophisticated, and jazz-leaning. It raises the 6th and 7th degrees when ascending to resolve tension. Often called the "Jazz Minor" scale, it is crucial for jazz fusion improvisation.',
  'Major Pentatonic':
    'Sweet, uplifting, and vocal. By removing the 4th and 7th degrees of the major scale, it eliminates all harsh half-steps and tritones. Favored by country players, blues legends (B.B. King), and rock guitarists for melodic solos.',
  'Minor Pentatonic':
    'The backbone of rock, metal, and blues. Removing the 2nd and 6th degrees removes dissonant half-steps, making it almost impossible to play a wrong note. Favored by legends like Jimmy Page and Tony Iommi for building massive, heavy riffs.',
  'Blues':
    'Sultry, expressive, and gritty. It adds the legendary "blue note" (a flattened 5th / tritone) to the minor pentatonic scale. This note creates the tension and release that defines the emotional soul of blues and rock solos.',
  'Dorian':
    'Cool, atmospheric, and funky. A minor scale with a raised 6th degree, which gives it a brighter, jazzier flavor. Famously used in Pink Floyd\'s "Breathe" and Santana\'s hits to create smooth, non-resolving modal grooves.',
  'Mixolydian':
    'Dominant, bluesy, and classic rock. A major scale with a flattened 7th degree, which gives it a slightly raw, flat-seven sound. Heard in classic riffs like Jimi Hendrix\'s "Fire" and AC/DC\'s catalog.',
  'Phrygian':
    'Dark, aggressive, and Spanish-flavored. A minor scale with a flat 2nd degree, creating an immediate half-step tension from the root. Crucial for heavy thrash metal riffs (Slayer, Metallica) and flamenco music.',
  'Lydian':
    'Dreamy, spacey, and cinematic. A major scale with a raised 4th degree, giving it an ethereal, unresolved floating quality. Favored by Joe Satriani (e.g. "Flying in a Blue Dream") and sci-fi film composers.',
  'Locrian':
    'Tense, unstable, and dark. With a flat 2nd and flat 5th, it is the only standard mode with a diminished fifth interval from the root. Extremely dissonant, used in extreme metal and specialized avant-garde jazz.',
};

/**
 * Returns grimoire information for the selected key and scale.
 */
export const getScaleGrimoire = (
  rootKey: NoteName,
  scale: ScaleType
): ScaleGrimoire => {
  const rootIndex = NOTES.indexOf(rootKey);
  const intervals = SCALES[scale];
  
  // Spell out the scale notes in key
  const notes = intervals.map((interval) => NOTES[(rootIndex + interval) % 12]);
  
  // Generate formula notation (e.g. 1, b3, 4, 5...)
  const formulaOffsets = intervals;
  const scaleSpellingMap: Record<number, string> = {
    0: '1',
    1: 'b2',
    2: '2',
    3: 'b3',
    4: '3',
    5: '4',
    6: 'b5',
    7: '5',
    8: 'b6',
    9: '6',
    10: 'b7',
    11: '7',
  };
  const formula = formulaOffsets.map((val) => scaleSpellingMap[val] || val.toString()).join(' - ');

  return {
    formula,
    notes,
    description: SCALE_GRIMOIRE[scale] || '',
  };
};
