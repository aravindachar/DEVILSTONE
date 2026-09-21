import { NOTES } from '../types/music';
import type { NoteName } from '../types/music';

/**
 * Converts a note string (e.g., "E2", "C#3") into its frequency in Hertz.
 */
export const noteToFreq = (noteWithOctave: string): number => {
  const match = noteWithOctave.match(/([A-G]#?)(\d)/);
  if (!match) return 440;
  const [, note, octave] = match;
  
  // Calculate semitones relative to C4
  const semitonesFromC4 = NOTES.indexOf(note as NoteName) + (parseInt(octave, 10) - 4) * 12;
  
  // A4 is 440Hz, which is 9 semitones above C4 (C, C#, D, D#, E, F, F#, G, G#, A)
  // Distance from A4 = semitonesFromC4 - 9
  return 440 * Math.pow(2, (semitonesFromC4 - 9) / 12);
};

/**
 * Plays a clean synth pluck tone using Web Audio API nodes.
 */
export const playPluckTone = (
  ctx: AudioContext,
  freq: number,
  duration = 0.55,
  gainValue = 0.28
) => {
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const osc3 = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filterNode = ctx.createBiquadFilter();

  const now = ctx.currentTime;

  // Primary warm triangle wave for rich fundamental body
  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(freq, now);

  // Subtle sine wave at 2x octave for crisp string overtone
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq * 2, now);

  // 3x harmonic transient for guitar pick attack
  osc3.type = 'sine';
  osc3.frequency.setValueAtTime(freq * 3, now);

  // Dynamic low-pass filter to simulate string vibration decay
  filterNode.type = 'lowpass';
  filterNode.Q.setValueAtTime(1.5, now);
  filterNode.frequency.setValueAtTime(Math.min(freq * 4.5, 9000), now);
  filterNode.frequency.exponentialRampToValueAtTime(Math.max(freq * 1.1, 120), now + duration);

  // Natural string envelope: immediate pick strike, logarithmic decay
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(gainValue, now + 0.004);
  gainNode.gain.exponentialRampToValueAtTime(gainValue * 0.45, now + 0.08);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  // Connect nodes
  osc1.connect(filterNode);

  const osc2Gain = ctx.createGain();
  osc2Gain.gain.setValueAtTime(0.12, now);
  osc2.connect(osc2Gain);
  osc2Gain.connect(filterNode);

  const osc3Gain = ctx.createGain();
  osc3Gain.gain.setValueAtTime(0.06, now);
  osc3Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
  osc3.connect(osc3Gain);
  osc3Gain.connect(filterNode);

  filterNode.connect(gainNode);
  gainNode.connect(ctx.destination);

  // Start & Stop
  osc1.start(now);
  osc2.start(now);
  osc3.start(now);
  osc1.stop(now + duration);
  osc2.stop(now + duration);
  osc3.stop(now + duration);

  return {
    stop: () => {
      try {
        osc1.stop();
        osc2.stop();
      } catch {
        // Suppress errors if already stopped
      }
    },
  };
};

/**
 * Plays a short metronome click.
 */
export const playClickTone = (
  ctx: AudioContext,
  time: number,
  freq: number,
  duration = 0.04
) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, time);

  gain.gain.setValueAtTime(0.18, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(time);
  osc.stop(time + duration);
};

/**
 * Plays a strummed polyphonic chord from note names (e.g. ['C', 'E', 'G'])
 */
export const playChordTones = (
  ctx: AudioContext,
  noteNames: NoteName[],
  baseOctave = 3
) => {
  if (!ctx || ctx.state === 'suspended') {
    ctx?.resume();
  }
  noteNames.forEach((note, idx) => {
    const delay = idx * 0.045; // Subtle strum delay
    const rootIdx = NOTES.indexOf(noteNames[0]);
    const currIdx = NOTES.indexOf(note);
    const octave = idx === 0 ? baseOctave : (currIdx < rootIdx ? baseOctave + 1 : baseOctave);
    const fullNote = `${note}${octave}`;
    const freq = noteToFreq(fullNote);
    setTimeout(() => {
      playPluckTone(ctx, freq, 0.95, 0.22);
    }, delay * 1000);
  });
};
