'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { X, ChevronLeft, ChevronRight, Play, Square, Timer } from 'lucide-react';
import BeatIndicator from './BeatIndicator';

export const MetronomeModal: React.FC = () => {
  const {
    isMetronomeModalOpen,
    setIsMetronomeModalOpen,
    bpm,
    setBpm,
    isPlaying,
    togglePlay,
    currentBeat,
    currentSubdivision,
    subdivision,
    setSubdivision,
    accentPattern,
    setAccentPattern,
  } = useApp();

  if (!isMetronomeModalOpen) return null;

  const handleBpmStep = (delta: number) => {
    setBpm(Math.min(260, Math.max(40, bpm + delta)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-[420px] rounded-2xl bg-[#FAF7EE] border border-stone-200/90 shadow-2xl p-6 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header matching Screenshot 3 */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/80 mb-6">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-[#D9531E]" />
            <h3 className="font-mono text-xs tracking-widest uppercase font-bold text-stone-700">
              Metronome Settings
            </h3>
          </div>
          <button
            onClick={() => setIsMetronomeModalOpen(false)}
            className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tempo Controller matching Screenshot 3 */}
        <div className="flex items-center justify-between gap-4 py-2 mb-6">
          <span className="font-mono text-xs tracking-wider uppercase font-bold text-stone-600">
            Tempo:
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl font-bold text-[#D9531E] w-14 text-right">
              {bpm}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleBpmStep(-1)}
                className="w-8 h-8 rounded-full bg-[#D9531E] hover:bg-[#b84315] text-white flex items-center justify-center font-bold text-sm shadow-sm active:scale-95 transition-all"
                title="Decrease BPM"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleBpmStep(1)}
                className="w-8 h-8 rounded-full bg-[#D9531E] hover:bg-[#b84315] text-white flex items-center justify-center font-bold text-sm shadow-sm active:scale-95 transition-all"
                title="Increase BPM"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* BPM Slider */}
        <div className="mb-6">
          <input
            type="range"
            min="40"
            max="240"
            value={bpm}
            onChange={(e) => setBpm(parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#D9531E]"
          />
          <div className="flex justify-between text-[10px] font-mono text-stone-400 mt-1">
            <span>40 (Grave)</span>
            <span>120 (Moderato)</span>
            <span>240 (Presto)</span>
          </div>
        </div>

        {/* Subdivision & Accent Pills */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div>
            <label className="block text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider mb-1.5">
              Subdivision
            </label>
            <div className="grid grid-cols-2 gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200/60">
              <button
                type="button"
                onClick={() => setSubdivision(1)}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  subdivision === 1
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                1/4
              </button>
              <button
                type="button"
                onClick={() => setSubdivision(2)}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  subdivision === 2
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                1/8
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider mb-1.5">
              Accents
            </label>
            <select
              value={accentPattern}
              onChange={(e) => setAccentPattern(e.target.value as any)}
              className="w-full py-1.5 px-2 text-xs font-semibold rounded-xl bg-white border border-stone-200 text-stone-800 outline-none"
            >
              <option value="first">Beat 1</option>
              <option value="one-three">Beats 1 & 3</option>
              <option value="all">All Beats</option>
              <option value="none">No Accents</option>
            </select>
          </div>
        </div>

        {/* Beat Flash Indicator */}
        <div className="flex justify-center mb-6 py-2">
          <BeatIndicator
            currentBeat={currentBeat}
            currentSubdivision={currentSubdivision}
            isPlaying={isPlaying}
            subdivision={subdivision}
          />
        </div>

        {/* Start / Stop CTA Button */}
        <button
          onClick={togglePlay}
          className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 ${
            isPlaying
              ? 'bg-stone-900 hover:bg-stone-800 text-white'
              : 'bg-[#D9531E] hover:bg-[#c24515] text-white shadow-orange-500/20'
          }`}
        >
          {isPlaying ? (
            <>
              <Square className="w-4 h-4 fill-current" /> Stop Metronome
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current ml-0.5" /> Start Metronome
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MetronomeModal;
