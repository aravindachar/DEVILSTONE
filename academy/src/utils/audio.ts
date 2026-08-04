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
  duration = 0.4,
  gainValue = 0.25
) => {
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filterNode = ctx.createBiquadFilter();

  const now = ctx.currentTime;

  // Primary sine wave for solid fundamental
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, now);

  // Subtle triangle harmonic one octave up for a crisp "pluck" transient
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(freq * 2, now);

  // Filter sweep for cyber synth feel
  filterNode.type = 'lowpass';
  filterNode.Q.setValueAtTime(1, now);
  filterNode.frequency.setValueAtTime(freq * 3, now);
  filterNode.frequency.exponentialRampToValueAtTime(freq * 1.2, now + duration);

  // Pluck envelope: rapid attack, exponential decay
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(gainValue, now + 0.005);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

  // Connect nodes
  osc1.connect(filterNode);
  // Layer in the upper octave at lower gain
  const osc2Gain = ctx.createGain();
  osc2Gain.gain.setValueAtTime(0.05, now);
  osc2.connect(osc2Gain);
  osc2Gain.connect(filterNode);

  filterNode.connect(gainNode);
  gainNode.connect(ctx.destination);

  // Start & Stop
  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + duration);
  osc2.stop(now + duration);

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
