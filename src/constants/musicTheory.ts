import type { TuningType, ScaleType } from '../types/music';

export const TUNING_PRESETS: Record<TuningType, string[]> = {
  'Standard (E)': ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
  'Drop D': ['D2', 'A2', 'D3', 'G3', 'B3', 'E4'],
  'DADGAD': ['D2', 'A2', 'D3', 'G3', 'A3', 'D4'],
  'Open G': ['D2', 'G2', 'D3', 'G3', 'B3', 'D4'],
  'Half Step Down': ['D#2', 'G#2', 'C#3', 'F#3', 'A#3', 'D#4'],
  'Full Step Down': ['D2', 'G2', 'C3', 'F3', 'A3', 'D4'],
  // Bass Presets
  'Standard Bass (E)': ['E1', 'A1', 'D2', 'G2'],
  'Drop D Bass': ['D1', 'A1', 'D2', 'G2'],
  '5-String Bass (B)': ['B0', 'E1', 'A1', 'D2', 'G2'],
  '5-String Bass (Drop A)': ['A0', 'E1', 'A1', 'D2', 'G2'],
  'Half Step Down Bass': ['D#1', 'G#1', 'C#2', 'F#2'],
};

export const SCALES: Record<ScaleType, number[]> = {
  'Major': [0, 2, 4, 5, 7, 9, 11],
  'Natural Minor': [0, 2, 3, 5, 7, 8, 10],
  'Harmonic Minor': [0, 2, 3, 5, 7, 8, 11],
  'Melodic Minor': [0, 2, 3, 5, 7, 9, 11],
  'Major Pentatonic': [0, 2, 4, 7, 9],
  'Minor Pentatonic': [0, 3, 5, 7, 10],
  'Blues': [0, 3, 5, 6, 7, 10],
  'Dorian': [0, 2, 3, 5, 7, 9, 10],
  'Mixolydian': [0, 2, 4, 5, 7, 9, 10],
  'Phrygian': [0, 1, 3, 5, 7, 8, 10],
  'Lydian': [0, 2, 4, 6, 7, 9, 11],
  'Locrian': [0, 1, 3, 5, 6, 8, 10],
  // Harmonic minor modes
  'Locrian 13 or Locrian 6 (Half diminished)': [0, 1, 3, 5, 6, 9, 10],
  'Ionian #5 (Augmented)': [0, 2, 4, 5, 8, 9, 11],
  'Dorian #4 (Ukrainian dorian)': [0, 2, 3, 6, 7, 9, 10],
  'Phrygian dominant': [0, 1, 4, 5, 7, 8, 10],
  'Lydian #2': [0, 3, 4, 6, 7, 9, 11],
  'Super Locrian bb7 (Diminished)': [0, 1, 3, 4, 6, 8, 9],
  // Bebop
  'Dominant (Mixolydian) bebop': [0, 2, 4, 5, 7, 9, 10, 11],
  'Major bebop': [0, 2, 4, 5, 7, 8, 9, 11],
  // Whole tone / Diminished
  'Whole tone ext.': [0, 2, 4, 6, 8, 10],
  'Half Whole diminished': [0, 1, 3, 4, 6, 7, 9, 10],
  'Half Whole diminished ext': [0, 1, 2, 3, 4, 6, 7, 9, 10],
  'Whole Half diminished': [0, 2, 3, 5, 6, 8, 9, 11],
  'Whole Half diminished ext.': [0, 2, 3, 5, 6, 8, 9, 11],
  // 6th Chords
  'Minor 6th': [0, 3, 7, 9],
  'Major 6th': [0, 4, 7, 9],
  '6Add9': [0, 2, 4, 7, 9],
  'Minor 6 Add9': [0, 2, 3, 7, 9],
  // 7th Chords
  'Major 7th': [0, 4, 7, 11],
  'Minor 7th': [0, 3, 7, 10],
  'Dominant 7th': [0, 4, 7, 10],
  'Half diminished 7th': [0, 3, 6, 10],
  'Diminished 7th': [0, 3, 6, 9],
  '7sus4': [0, 5, 7, 10],
  // 9th Chords
  'Major 9th': [0, 2, 4, 7, 11],
  'Minor 9th': [0, 2, 3, 7, 10],
};

export const INTERVAL_MAP: Record<number, string> = {
  0: 'R',
  1: 'b2',
  2: '2',
  3: 'b3',
  4: '3',
  5: '4',
  6: '#4',
  7: '5',
  8: 'b6',
  9: '6',
  10: 'b7',
  11: '7',
};

export const DEGREE_MAP: Record<number, string> = {
  0: '1',
  1: '♭2',
  2: '2',
  3: '♭3',
  4: '3',
  5: '4',
  6: '♭5',
  7: '5',
  8: '♭6',
  9: '6',
  10: '♭7',
  11: '7',
};

export const INTERVAL_SHORT_MAP: Record<number, string> = {
  0: 'R',
  1: 'm2',
  2: 'M2',
  3: 'm3',
  4: 'M3',
  5: 'P4',
  6: 'd5',
  7: 'P5',
  8: 'm6',
  9: 'M6',
  10: 'm7',
  11: 'M7',
};

export const INTERVAL_LONG_MAP: Record<number, string> = {
  0: 'Root',
  1: 'Minor 2nd',
  2: 'Major 2nd',
  3: 'Minor 3rd',
  4: 'Major 3rd',
  5: 'Perfect 4th',
  6: 'Tritone (dim 5th)',
  7: 'Perfect 5th',
  8: 'Minor 6th',
  9: 'Major 6th',
  10: 'Minor 7th',
  11: 'Major 7th',
};

// Double-markers at 12 and 24, single at 3, 5, 7, 9, 15, 17, 19, 21
export const FRET_MARKERS = {
  single: [3, 5, 7, 9, 15, 17, 19, 21],
  double: [12, 24],
};
