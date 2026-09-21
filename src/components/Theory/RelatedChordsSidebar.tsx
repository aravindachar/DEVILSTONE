'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { getRelatedChords } from '@/utils/theoryEngine';
import { X, Play, Info, Sparkles } from 'lucide-react';
import type { RelatedChord } from '@/types/music';

export const RelatedChordsSidebar: React.FC = () => {
  const {
    selectedKey,
    selectedScale,
    isRelatedChordsOpen,
    setIsRelatedChordsOpen,
    activeChordNotes,
    setActiveChordNotes,
    playChord,
  } = useApp();

  if (!isRelatedChordsOpen) return null;

  const chords: RelatedChord[] = getRelatedChords(selectedKey, selectedScale);

  const handleChordClick = (chord: RelatedChord) => {
    // If already active, toggle off
    if (activeChordNotes && activeChordNotes.join(',') === chord.notes.join(',')) {
      setActiveChordNotes(null);
    } else {
      setActiveChordNotes(chord.notes);
    }
  };

  const handlePlayChord = (e: React.MouseEvent, chord: RelatedChord) => {
    e.stopPropagation();
    playChord(chord.notes);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[380px] bg-[#FAF7EE] border-l border-stone-200 shadow-2xl flex flex-col transition-all duration-300 animate-in slide-in-from-right">
      {/* Header */}
      <div className="p-6 border-b border-stone-200/80 flex items-start justify-between bg-white/60 backdrop-blur-md">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#D9531E] font-bold uppercase block mb-1">
            {selectedKey} {selectedScale}
          </span>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Related Chords
          </h2>
        </div>
        <button
          onClick={() => {
            setIsRelatedChordsOpen(false);
            setActiveChordNotes(null);
          }}
          className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Description */}
      <div className="px-6 py-4 bg-stone-50/70 border-b border-stone-200/60">
        <p className="text-xs text-stone-600 leading-relaxed">
          The below chords are created from the 1st, 3rd, and 5th notes of each degree of the <strong>{selectedKey} {selectedScale}</strong>.
        </p>
      </div>

      {/* Chords List */}
      <div className="flex-1 overflow-y-auto p-5 space-y-2.5">
        {chords.map((chord) => {
          const isActive = activeChordNotes && activeChordNotes.join(',') === chord.notes.join(',');

          return (
            <div
              key={chord.degree}
              onClick={() => handleChordClick(chord)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                isActive
                  ? 'bg-orange-50/80 border-[#D9531E] shadow-sm'
                  : 'bg-white border-stone-200/80 hover:border-stone-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-[11px] font-bold ${
                    isActive
                      ? 'bg-[#D9531E] text-white'
                      : 'bg-stone-100 text-stone-600 group-hover:bg-stone-200'
                  }`}
                >
                  {chord.romanNumeral}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 leading-none mb-1">
                    {chord.name}
                  </h4>
                  <span className="text-[11px] font-mono text-stone-400">
                    {chord.notes.join(', ')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isActive && (
                  <span className="text-[10px] font-mono font-bold text-[#D9531E] uppercase px-1.5 py-0.5 rounded bg-orange-100/60">
                    Active
                  </span>
                )}
                <button
                  onClick={(e) => handlePlayChord(e, chord)}
                  className="w-8 h-8 rounded-lg bg-orange-50 hover:bg-[#D9531E] text-[#D9531E] hover:text-white border border-[#D9531E]/20 flex items-center justify-center transition-all shadow-xs group-hover:scale-105"
                  title="Play Chord Preview"
                >
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Helper Theory Tooltip Card */}
      <div className="p-5 border-t border-stone-200/80 bg-white/70">
        <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60 text-amber-900 text-xs leading-relaxed flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-0.5">Theory Tip</strong>
            In this case, the <strong>{selectedKey} {selectedScale}</strong> will harmonically blend with all chords above. Click any chord to isolate its triad notes across the maple neck.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedChordsSidebar;
