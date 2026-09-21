'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { NOTES, SCALES, getScaleIntervalSteps, getScaleGrimoire } from '@/utils/theoryEngine';
import type { NoteName, DisplayMode, TuningType } from '@/types/music';
import Dropdown from '../UI/Dropdown';
import { toPng } from 'html-to-image';
import { Play, Square, Timer, Music, Sparkles, Download, Settings2, Zap, SlidersHorizontal } from 'lucide-react';

export const ControlPanel: React.FC = () => {
  const {
    selectedTuning,
    setSelectedTuning,
    selectedKey,
    setSelectedKey,
    selectedScale,
    setSelectedScale,
    displayMode,
    setDisplayMode,
    capoFret,
    setCapoFret,
    strum,
    isPlayingSequence,
    togglePlaySequence,
    instrument,
    setInstrument,
    activePosition,
    setActivePosition,
    setIsRelatedChordsOpen,
    isRelatedChordsOpen,
    setIsMetronomeModalOpen,
  } = useApp();

  const [showConfigDrawer, setShowConfigDrawer] = React.useState(false);

  const keyOptions = NOTES.map((n) => ({ value: n, label: n }));
  const scaleOptions = Object.keys(SCALES).map((s) => ({ value: s, label: s }));
  const modeOptions = [
    { value: 'notes', label: 'Notes (C, D, E)' },
    { value: 'degrees', label: 'Scale Degrees (1, ♭3, 5)' },
    { value: 'intervals', label: 'Intervals (R, m3, P5)' },
    { value: 'octaves', label: 'Octaves (E2, A2)' },
    { value: 'dots', label: 'Dots Only' },
  ];

  const grimoire = getScaleGrimoire(selectedKey, selectedScale);
  const intervalSteps = getScaleIntervalSteps(selectedScale);

  const exportFretboardImage = () => {
    const node = document.querySelector('.fretboard-inner-wrapper');
    if (!node) return;

    toPng(node as HTMLElement, {
      backgroundColor: '#FAF7EE',
      style: {
        borderRadius: '12px',
        padding: '20px',
        overflow: 'hidden',
      },
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `devilstone-${selectedKey}-${selectedScale.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Error exporting image:', error);
      });
  };

  return (
    <div className="w-full">
      {/* Top Scale Header & Settings Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-3 px-2">
        <div className="flex flex-wrap items-center gap-3">
          {/* Key Dropdown */}
          <div className="flex items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-xl border border-stone-200/80 shadow-xs">
            <span className="text-[11px] font-mono font-bold text-stone-400 uppercase">Key</span>
            <select
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value as NoteName)}
              className="font-bold text-stone-900 text-sm bg-transparent outline-none cursor-pointer"
            >
              {keyOptions.map((k) => (
                <option key={k.value} value={k.value}>{k.label}</option>
              ))}
            </select>
          </div>

          {/* Scale Dropdown */}
          <div className="flex items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-xl border border-stone-200/80 shadow-xs">
            <span className="text-[11px] font-mono font-bold text-stone-400 uppercase">Scale</span>
            <select
              value={selectedScale}
              onChange={(e) => setSelectedScale(e.target.value as any)}
              className="font-bold text-stone-900 text-sm bg-transparent outline-none cursor-pointer max-w-[200px] truncate"
            >
              {scaleOptions.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Display Mode Dropdown */}
          <div className="flex items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-xl border border-stone-200/80 shadow-xs">
            <span className="text-[11px] font-mono font-bold text-stone-400 uppercase">View</span>
            <select
              value={displayMode}
              onChange={(e) => setDisplayMode(e.target.value as DisplayMode)}
              className="font-semibold text-stone-800 text-xs bg-transparent outline-none cursor-pointer"
            >
              {modeOptions.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Tuning & Capo Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowConfigDrawer(!showConfigDrawer)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-stone-100 border border-stone-200/80 text-xs font-semibold text-stone-700 transition-colors shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
            <span>Tuning & Capo</span>
          </button>
        </div>
      </div>

      {/* Expandable Tuning & Capo Bar */}
      {showConfigDrawer && (
        <div className="mb-4 p-4 rounded-2xl bg-white/90 border border-stone-200/80 shadow-sm flex flex-wrap gap-4 items-center animate-in fade-in slide-in-from-top-2 duration-150">
          <div>
            <label className="block text-[10px] font-mono font-bold text-stone-400 uppercase mb-1">
              Instrument
            </label>
            <select
              value={instrument}
              onChange={(e) => setInstrument(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-800 bg-white"
            >
              <option value="guitar">Guitar (6-Str)</option>
              <option value="bass-4">Bass (4-Str)</option>
              <option value="bass-5">Bass (5-Str)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold text-stone-400 uppercase mb-1">
              Tuning
            </label>
            <select
              value={selectedTuning}
              onChange={(e) => setSelectedTuning(e.target.value as TuningType)}
              className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-800 bg-white"
            >
              <option value="Standard (E)">Standard (E A D G B E)</option>
              <option value="Drop D">Drop D (D A D G B E)</option>
              <option value="DADGAD">DADGAD</option>
              <option value="Open G">Open G</option>
              <option value="Half Step Down">Half Step Down (Eb)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold text-stone-400 uppercase mb-1">
              Capo
            </label>
            <select
              value={capoFret}
              onChange={(e) => setCapoFret(parseInt(e.target.value, 10))}
              className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-800 bg-white"
            >
              <option value={0}>No Capo</option>
              <option value={1}>1st Fret</option>
              <option value={2}>2nd Fret</option>
              <option value={3}>3rd Fret</option>
              <option value={4}>4th Fret</option>
              <option value={5}>5th Fret</option>
              <option value={6}>6th Fret</option>
              <option value={7}>7th Fret</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Sub-Fretboard Position Bar matching Screenshot 2
 */
export const SubFretboardPositionBar: React.FC = () => {
  const { selectedTuning, activePosition, setActivePosition } = useApp();

  const positions = [
    { label: 'ALL', value: null },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-3 py-2 mt-1 mb-8">
      {/* Tuning Badge */}
      <div className="text-[11px] font-mono font-semibold tracking-wider text-stone-500 uppercase flex items-center gap-1.5">
        <span>TUNING:</span>
        <span className="font-bold text-stone-800">{selectedTuning.toUpperCase()}</span>
      </div>

      {/* Position Selector Pills matching Screenshot 2 */}
      <div className="flex items-center gap-1.5 bg-white/80 p-1 rounded-full border border-stone-200 shadow-xs">
        {positions.map((pos) => {
          const isActive = activePosition === pos.value;

          return (
            <button
              key={pos.label}
              onClick={() => setActivePosition(pos.value)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#D9531E] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {pos.label}
            </button>
          );
        })}
      </div>

      <div className="hidden sm:block text-[11px] font-mono text-stone-400">
        {activePosition ? `Box Position ${activePosition} Isolated` : 'Full Fretboard View'}
      </div>
    </div>
  );
};

/**
 * Bottom Studio Console Bar matching Screenshot 2
 */
export const BottomStudioConsoleBar: React.FC = () => {
  const {
    selectedKey,
    selectedScale,
    isPlayingSequence,
    togglePlaySequence,
    setIsMetronomeModalOpen,
    setIsRelatedChordsOpen,
    isRelatedChordsOpen,
    strum,
  } = useApp();

  const grimoire = getScaleGrimoire(selectedKey, selectedScale);
  const intervalSteps = getScaleIntervalSteps(selectedScale);

  const exportFretboardImage = () => {
    const node = document.querySelector('.fretboard-inner-wrapper');
    if (!node) return;

    toPng(node as HTMLElement, {
      backgroundColor: '#FAF7EE',
      style: {
        borderRadius: '12px',
        padding: '20px',
        overflow: 'hidden',
      },
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `devilstone-${selectedKey}-${selectedScale.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Error exporting image:', error);
      });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7EE]/95 backdrop-blur-md border-t border-stone-200/90 py-3 px-4 sm:px-8 shadow-lg">
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Left: Notes, Degrees, Intervals formula chips matching Screenshot 2 */}
        <div className="flex flex-wrap items-center gap-6 text-xs">
          <div>
            <span className="block text-[10px] font-mono font-bold text-stone-400 tracking-wider uppercase mb-0.5">
              NOTES
            </span>
            <span className="font-mono font-bold text-stone-800">
              {grimoire.notes.join(', ')}
            </span>
          </div>

          <div className="hidden sm:block">
            <span className="block text-[10px] font-mono font-bold text-stone-400 tracking-wider uppercase mb-0.5">
              DEGREES
            </span>
            <span className="font-mono font-bold text-stone-800">
              {grimoire.formula.split(' - ').join(', ')}
            </span>
          </div>

          <div className="hidden md:block">
            <span className="block text-[10px] font-mono font-bold text-stone-400 tracking-wider uppercase mb-0.5">
              INTERVALS
            </span>
            <span className="font-mono font-bold text-stone-800">
              {intervalSteps}
            </span>
          </div>
        </div>

        {/* Center: Action Capsule Pills matching Screenshot 2 */}
        <div className="flex items-center gap-2.5">
          {/* Play Scale Runner Pill */}
          <button
            onClick={togglePlaySequence}
            className={`px-4 py-2 rounded-full font-bold text-xs tracking-wide flex items-center gap-1.5 transition-all shadow-xs ${
              isPlayingSequence
                ? 'bg-stone-900 text-white'
                : 'bg-[#D9531E] hover:bg-[#c44715] text-white shadow-orange-600/20'
            }`}
            title="Play through scale notes in tempo"
          >
            {isPlayingSequence ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" /> Stop Scale
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" /> Play Scale
              </>
            )}
          </button>

          {/* Metronome Modal Trigger Pill */}
          <button
            onClick={() => setIsMetronomeModalOpen(true)}
            className="px-3.5 py-2 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200/80 text-stone-800 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            title="Open Metronome Settings"
          >
            <Timer className="w-3.5 h-3.5 text-[#D9531E]" />
            <span>Metronome</span>
          </button>

          {/* Related Chords Sidebar Trigger Pill */}
          <button
            onClick={() => setIsRelatedChordsOpen(!isRelatedChordsOpen)}
            className={`px-3.5 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs border ${
              isRelatedChordsOpen
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-stone-100 hover:bg-stone-200 border-stone-200/80 text-stone-800'
            }`}
            title="View Diatonic Related Chords"
          >
            <Music className="w-3.5 h-3.5 text-[#D9531E]" />
            <span>Related Chords</span>
          </button>

          {/* Strum Button */}
          <button
            onClick={strum}
            className="hidden lg:flex items-center gap-1 px-3.5 py-2 rounded-full bg-white hover:bg-stone-50 border border-stone-200/80 text-stone-800 font-bold text-xs transition-colors shadow-xs"
            title="Strum Current Root Chord"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" />
            <span>Strum</span>
          </button>
        </div>

        {/* Right: Export Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={exportFretboardImage}
            className="p-2 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 transition-colors shadow-xs"
            title="Export Fretboard to PNG"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
