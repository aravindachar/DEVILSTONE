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
  | 'Locrian'
  // Harmonic minor modes
  | 'Locrian 13 or Locrian 6 (Half diminished)'
  | 'Ionian #5 (Augmented)'
  | 'Dorian #4 (Ukrainian dorian)'
  | 'Phrygian dominant'
  | 'Lydian #2'
  | 'Super Locrian bb7 (Diminished)'
  // Bebop
  | 'Dominant (Mixolydian) bebop'
  | 'Major bebop'
  // Whole tone / Diminished
  | 'Whole tone ext.'
  | 'Half Whole diminished'
  | 'Half Whole diminished ext'
  | 'Whole Half diminished'
  | 'Whole Half diminished ext.'
  // 6th Chords
  | 'Minor 6th'
  | 'Major 6th'
  | '6Add9'
  | 'Minor 6 Add9'
  // 7th Chords
  | 'Major 7th'
  | 'Minor 7th'
  | 'Dominant 7th'
  | 'Half diminished 7th'
  | 'Diminished 7th'
  | '7sus4'
  // 9th Chords
  | 'Major 9th'
  | 'Minor 9th';

export type TuningType =
  | 'Standard (E)'
  | 'Drop D'
  | 'DADGAD'
  | 'Open G'
  | 'Half Step Down'
  | 'Full Step Down'
  // Bass Tunings
  | 'Standard Bass (E)'
  | 'Drop D Bass'
  | '5-String Bass (B)'
  | '5-String Bass (Drop A)'
  | 'Half Step Down Bass';

export type InstrumentType = 'guitar' | 'bass-4' | 'bass-5';

export type CagedShape = 'None' | 'C' | 'A' | 'G' | 'E' | 'D';

export type DisplayMode = 'notes' | 'intervals';

export type MetronomeAccent = 'none' | 'first' | 'one-three' | 'all';

export interface BeatState {
  currentBeat: number;
  currentSubdivision: number;
  isPlaying: boolean;
}
