'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  NOTES,
  getScaleGrimoire,
  getRelatedChords,
  getScaleIntervalSteps,
  getIntervalOffset,
  DEGREE_MAP,
  INTERVAL_SHORT_MAP,
  INTERVAL_LONG_MAP,
} from '../../utils/theoryEngine';
import type { NoteName, ScaleType, RelatedChord } from '../../types/music';
import { Volume2, Play, Sparkles, BookOpen, Music, Layers } from 'lucide-react';

const POPULAR_SCALES: ScaleType[] = [
  'Major',
  'Natural Minor',
  'Minor Pentatonic',
  'Major Pentatonic',
  'Blues',
  'Dorian',
  'Mixolydian',
  'Harmonic Minor',
  'Melodic Minor',
  'Phrygian',
  'Lydian',
];

export const TheoryGrimoire: React.FC = () => {
  const {
    selectedKey,
    setSelectedKey,
    selectedScale,
    setSelectedScale,
    playFretNote,
    playChord,
    setActiveChordNotes,
    activeChordNotes,
  } = useApp();

  const [activePlayingNote, setActivePlayingNote] = useState<string | null>(null);
  const [activePlayingChordName, setActivePlayingChordName] = useState<string | null>(null);
  const [isSequencePlaying, setIsSequencePlaying] = useState(false);

  const { formula, notes, description } = getScaleGrimoire(
    selectedKey,
    selectedScale
  );

  const diatonicChords = getRelatedChords(selectedKey, selectedScale);
  const stepProgression = getScaleIntervalSteps(selectedScale);

  // Play a single note audio preview
  const handlePlayNote = (note: NoteName) => {
    try {
      playFretNote(`${note}4`);
      setActivePlayingNote(note);
      setTimeout(() => setActivePlayingNote(null), 350);
    } catch (err) {
      console.error('Error playing note:', err);
    }
  };

  // Play full scale sequentially (ascending)
  const handlePlayFullScale = () => {
    if (isSequencePlaying) return;
    setIsSequencePlaying(true);

    notes.forEach((note, idx) => {
      setTimeout(() => {
        try {
          playFretNote(`${note}4`);
          setActivePlayingNote(note);
        } catch (e) {
          console.error(e);
        }
        if (idx === notes.length - 1) {
          setTimeout(() => {
            setActivePlayingNote(null);
            setIsSequencePlaying(false);
          }, 350);
        }
      }, idx * 240);
    });
  };

  // Play and highlight a diatonic triad chord
  const handlePlayChord = (chord: RelatedChord) => {
    try {
      playChord(chord.notes);
      setActiveChordNotes(chord.notes);
      setActivePlayingChordName(chord.name);
      setTimeout(() => {
        setActivePlayingChordName(null);
      }, 700);
    } catch (err) {
      console.error('Error playing chord:', err);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-white/85 border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-8">
      {/* Top Header & Direct Interactive Key / Scale Selectors */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#D9531E]" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#D9531E] uppercase">
                THEORY GRIMOIRE & HARMONY
              </span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-stone-900">
              {selectedKey} {selectedScale} Anatomy
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Click any note or chord for real-time audio playback. Switch keys or scales directly below.
            </p>
          </div>

          {/* Quick Play Scale Sequence Button */}
          <button
            onClick={handlePlayFullScale}
            disabled={isSequencePlaying}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs self-start sm:self-center ${
              isSequencePlaying
                ? 'bg-[#D9531E] text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-95'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isSequencePlaying ? 'animate-spin' : 'fill-white'}`} />
            <span>{isSequencePlaying ? 'Playing Scale...' : 'Hear Scale Audio'}</span>
          </button>
        </div>

        {/* Direct Root Key Selector Pills */}
        <div className="mt-5">
          <span className="text-[10px] font-mono font-bold tracking-wider text-stone-400 uppercase block mb-2">
            Select Root Key
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {NOTES.map((note) => {
              const isSelected = selectedKey === note;
              return (
                <button
                  key={note}
                  onClick={() => setSelectedKey(note)}
                  className={`w-9 h-9 rounded-lg font-mono font-bold text-xs transition-all ${
                    isSelected
                      ? 'bg-[#D9531E] text-white shadow-xs scale-105 ring-2 ring-[#D9531E]/30'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900'
                  }`}
                >
                  {note}
                </button>
              );
            })}
          </div>
        </div>

        {/* Common Scales Quick Switcher */}
        <div className="mt-4">
          <span className="text-[10px] font-mono font-bold tracking-wider text-stone-400 uppercase block mb-2">
            Quick Scale Filter
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {POPULAR_SCALES.map((scale) => {
              const isSelected = selectedScale === scale;
              return (
                <button
                  key={scale}
                  onClick={() => setSelectedScale(scale)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-stone-900 text-white font-bold shadow-xs'
                      : 'bg-stone-100/90 hover:bg-stone-200 text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {scale}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grimoire Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Notes & Math (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Interactive Scale Notes Badges */}
          <div className="p-5 rounded-xl bg-stone-50/90 border border-stone-200/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono font-bold text-stone-500 uppercase tracking-wider">
                Interactive Scale Notes (Click to Play)
              </span>
              <span className="text-[10px] font-mono text-stone-400">
                {notes.length} notes in scale
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {notes.map((note, idx) => {
                const isRoot = note === selectedKey;
                const isPlaying = activePlayingNote === note;
                const offset = getIntervalOffset(note as NoteName, selectedKey);
                const degree = DEGREE_MAP[offset] || `${idx + 1}`;
                const intervalName = INTERVAL_LONG_MAP[offset] || 'Root';

                return (
                  <button
                    key={`${note}-${idx}`}
                    onClick={() => handlePlayNote(note as NoteName)}
                    title={`Play ${note} (${intervalName})`}
                    className={`group relative flex flex-col items-center justify-center min-w-[56px] py-2.5 px-3 rounded-xl border transition-all active:scale-95 shadow-xs ${
                      isRoot
                        ? 'bg-[#D9531E] border-[#D9531E] text-white hover:bg-[#c24616]'
                        : isPlaying
                        ? 'bg-orange-100 border-[#D9531E] text-[#D9531E] ring-2 ring-[#D9531E]/40'
                        : 'bg-white hover:bg-stone-100/80 border-stone-200/90 text-stone-900'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-base font-bold font-mono tracking-tight">
                        {note}
                      </span>
                      <Volume2 className={`w-3 h-3 ${isRoot ? 'text-white/80' : 'text-stone-400 group-hover:text-stone-700'}`} />
                    </div>
                    <span className={`text-[10px] font-mono font-semibold ${isRoot ? 'text-white/90' : 'text-stone-500'}`}>
                      {degree}
                    </span>
                    <span className={`text-[9px] font-mono truncate max-w-[50px] ${isRoot ? 'text-white/70' : 'text-stone-400'}`}>
                      {intervalName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scale Formula & Step Interval Progressions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-stone-50/90 border border-stone-200/80">
              <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
                Degree Formula
              </span>
              <div className="text-lg font-bold font-mono text-stone-900 tracking-wider">
                {formula}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50/90 border border-stone-200/80">
              <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
                Step Intervals
              </span>
              <div className="text-sm font-bold font-mono text-[#D9531E]">
                {stepProgression}
              </div>
            </div>
          </div>

          {/* Diatonic Triad Chords Matrix */}
          <div className="p-5 rounded-xl bg-stone-50/90 border border-stone-200/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono font-bold text-stone-500 uppercase tracking-wider">
                Diatonic Triad Chords (Harmonization)
              </span>
              <span className="text-[10px] font-mono text-stone-400">
                Click to preview & highlight
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {diatonicChords.map((chord) => {
                const isPlaying = activePlayingChordName === chord.name;
                const isHighlighted = activeChordNotes && activeChordNotes.join(',') === chord.notes.join(',');

                return (
                  <button
                    key={chord.degree}
                    onClick={() => handlePlayChord(chord)}
                    title={`Preview ${chord.name} (${chord.notes.join(' - ')})`}
                    className={`p-3 rounded-xl border text-left transition-all active:scale-95 flex flex-col justify-between ${
                      isPlaying || isHighlighted
                        ? 'bg-[#D9531E] text-white border-[#D9531E] shadow-sm ring-2 ring-[#D9531E]/30'
                        : 'bg-white hover:bg-stone-100 border-stone-200/80 text-stone-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-mono font-bold ${isPlaying || isHighlighted ? 'text-white' : 'text-[#D9531E]'}`}>
                        {chord.romanNumeral}
                      </span>
                      <Volume2 className={`w-3 h-3 ${isPlaying || isHighlighted ? 'text-white' : 'text-stone-400'}`} />
                    </div>

                    <div className="text-xs font-bold truncate">
                      {chord.name}
                    </div>

                    <div className={`text-[10px] font-mono mt-1 ${isPlaying || isHighlighted ? 'text-white/80' : 'text-stone-500'}`}>
                      {chord.notes.join(' · ')}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Historical & Harmonic Context (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div className="p-6 rounded-xl bg-stone-50/90 border border-stone-200/80 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-[#D9531E]" />
                <h4 className="text-sm font-bold text-stone-900 tracking-tight">
                  Historical & Harmonic Insight
                </h4>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">
                {description ||
                  `The ${selectedKey} ${selectedScale} scale provides a foundational tonal palette for guitar composition and soloing. With its characteristic interval formula (${formula}), it establishes strong harmonic centers and memorable melodic resolutions.`}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-stone-200/80 space-y-3 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  <strong className="text-stone-800">Root Note:</strong> {selectedKey}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-blue-500" />
                <span>
                  <strong className="text-stone-800">Intervals:</strong> {formula}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Music className="w-3.5 h-3.5 text-emerald-500" />
                <span>
                  <strong className="text-stone-800">Diatonic Triads:</strong> {diatonicChords.map(c => c.name).join(', ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheoryGrimoire;
