export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;
export type NoteName = typeof NOTES[number];

export type ScaleType =
  | 'Major'
  | 'Natural Minor'
  | 'Harmonic Minor'
  | 'Melodic Minor'
  | 'Major Pentatonic'
  | 'Minor Pentatonic'
  | 'Blues'
  | 'Dorian'
  | 'Mixolydian'
  | 'Phrygian'
  | 'Lydian'
  | 'Locrian';

export type TuningType =
  | 'Standard (E)'
  | 'Drop D'
  | 'DADGAD'
  | 'Open G'
  | 'Half Step Down'
  | 'Full Step Down';

export type CagedShape = 'None' | 'C' | 'A' | 'G' | 'E' | 'D';

export type DisplayMode = 'notes' | 'intervals';

export type MetronomeAccent = 'none' | 'first' | 'one-three' | 'all';

export interface BeatState {
  currentBeat: number;
  currentSubdivision: number;
  isPlaying: boolean;
}
