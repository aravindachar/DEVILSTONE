import type { TuningType, ScaleType } from '../types/music';

export const TUNING_PRESETS: Record<TuningType, string[]> = {
  'Standard (E)': ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
  'Drop D': ['D2', 'A2', 'D3', 'G3', 'B3', 'E4'],
  'DADGAD': ['D2', 'A2', 'D3', 'G3', 'A3', 'D4'],
  'Open G': ['D2', 'G2', 'D3', 'G3', 'B3', 'D4'],
  'Half Step Down': ['D#2', 'G#2', 'C#3', 'F#3', 'A#3', 'D#4'],
  'Full Step Down': ['D2', 'G2', 'C3', 'F3', 'A3', 'D4'],
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

// Double-markers at 12 and 24, single at 3, 5, 7, 9, 15, 17, 19, 21
export const FRET_MARKERS = {
  single: [3, 5, 7, 9, 15, 17, 19, 21],
  double: [12, 24],
};
