'use client';
import React from 'react';
import { useApp } from '../../context/AppContext';
import type { MetronomeAccent } from '../../types/music';
import { THEME } from '../../constants/theme';
import BeatIndicator from './BeatIndicator';
import Dropdown from '../UI/Dropdown';
import Slider from '../UI/Slider';
import Button from '../UI/Button';

export const Metronome: React.FC = () => {
  const {
    bpm,
    setBpm,
    accentPattern,
    setAccentPattern,
    subdivision,
    setSubdivision,
    swing,
    setSwing,
    isPlaying,
    currentBeat,
    currentSubdivision,
    togglePlay,
  } = useApp();

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    alignItems: 'flex-end',
    backgroundColor: THEME.colors.cardBackground,
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    padding: '24px 28px',
    borderRadius: '24px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    marginBottom: '35px',
    transition: 'all 0.3s ease',
  };

  const accentOptions = [
    { value: 'first', label: 'Accent Beat 1' },
    { value: 'one-three', label: 'Accent Beats 1 & 3' },
    { value: 'all', label: 'Accent All Beats' },
    { value: 'none', label: 'No Accents' },
  ];

  const subOptions = [
    { value: '1', label: 'Quarter Notes (1x)' },
    { value: '2', label: '8th Notes (2x)' },
  ];

  return (
    <div 
      style={containerStyle}
      className="glass-panel"
    >
      {/* Play/Stop Trigger */}
      <Button
        variant={isPlaying ? 'danger' : 'primary'}
        onClick={togglePlay}
        style={{
          width: '130px',
          alignSelf: 'stretch',
          marginTop: 'auto',
          backgroundColor: isPlaying ? THEME.colors.accentCrimson : '#111111',
          color: '#ffffff',
        }}
      >
        {isPlaying ? '⏹ STOP' : '▶ START'}
      </Button>

      {/* BPM Tempo Slider */}
      <div style={{ flex: 1, minWidth: '160px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '4px',
          }}
        >
          <span
            style={{
              fontFamily: THEME.fonts.tech,
              fontSize: '11px',
              color: THEME.colors.textSecondary,
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Tempo
          </span>
          <span
            style={{
              fontFamily: THEME.fonts.tech,
              fontSize: '13px',
              fontWeight: 700,
              color: '#111111',
            }}
          >
            {bpm} BPM
          </span>
        </div>
        <Slider
          min="40"
          max="240"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
        />
      </div>

      {/* Subdivision */}
      <Dropdown
        label="Subdivision"
        value={subdivision.toString()}
        onChange={(e) => setSubdivision(Number(e.target.value) as 1 | 2)}
        options={subOptions}
        style={{ minWidth: '160px' }}
      />

      {/* Swing Feel (8th notes only) */}
      <div style={{ width: '150px', opacity: subdivision === 2 ? 1 : 0.4 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '4px',
          }}
        >
          <span
            style={{
              fontFamily: THEME.fonts.tech,
              fontSize: '11px',
              color: THEME.colors.textSecondary,
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Swing Feel
          </span>
          <span
            style={{
              fontFamily: THEME.fonts.tech,
              fontSize: '13px',
              fontWeight: 700,
              color: '#111111',
            }}
          >
            {subdivision === 2 ? (swing === 50 ? 'Straight' : `${Math.round((swing - 50) * 5.8)}%`) : 'Off'}
          </span>
        </div>
        <Slider
          min="50"
          max="67"
          value={swing}
          disabled={subdivision !== 2}
          onChange={(e) => setSwing(Number(e.target.value))}
        />
      </div>

      {/* Accent pattern selector */}
      <Dropdown
        label="Accents"
        value={accentPattern}
        onChange={(e) => setAccentPattern(e.target.value as MetronomeAccent)}
        options={accentOptions}
        style={{ minWidth: '160px' }}
      />

      {/* Visual Flash Pulse Dots */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          marginLeft: 'auto',
          alignSelf: 'stretch',
          justifyContent: 'flex-end',
          paddingBottom: '8px',
        }}
      >
        <span
          style={{
            fontFamily: THEME.fonts.tech,
            fontSize: '11px',
            color: THEME.colors.textSecondary,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '4px',
          }}
        >
          Beat Indicator
        </span>
        <BeatIndicator
          currentBeat={currentBeat}
          currentSubdivision={currentSubdivision}
          isPlaying={isPlaying}
          subdivision={subdivision}
        />
      </div>
    </div>
  );
};
export default Metronome;
