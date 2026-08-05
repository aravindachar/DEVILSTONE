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

  // Practice Timer States
  const [practiceDuration, setPracticeDuration] = React.useState<number>(0); // in seconds
  const [timeRemaining, setTimeRemaining] = React.useState<number>(0);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Synced remaining countdown
  React.useEffect(() => {
    setTimeRemaining(practiceDuration);
  }, [practiceDuration]);

  // Double synth beep when practice timer finishes
  const playTimerDoneBeep = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      console.error('Timer beep failed:', e);
    }
  };

  // Tick timer countdown
  React.useEffect(() => {
    if (isPlaying && practiceDuration > 0) {
      if (timeRemaining <= 0) {
        setTimeRemaining(practiceDuration);
      }

      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            togglePlay(); // Stop metronome
            playTimerDoneBeep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, practiceDuration, timeRemaining]);

  const formatTime = (secs: number): string => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    alignItems: 'flex-end',
    padding: '20px 24px',
    borderRadius: '16px',
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
        }}
      >
        {isPlaying ? '⏹ STOP' : '▶ START'}
      </Button>

      {/* BPM Tempo Slider (Reduced length & buttons added) */}
      <div style={{ flex: '1 1 200px', maxWidth: '200px', minWidth: '160px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button 
              onClick={() => setBpm(Math.max(40, bpm - 1))}
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(255, 255, 255, 0.04)',
                color: '#F4F4F2',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 'bold',
                outline: 'none',
                transition: 'background-color 0.15s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'}
            >
              -
            </button>
            <span
              style={{
                fontFamily: THEME.fonts.tech,
                fontSize: '13px',
                fontWeight: 700,
                color: THEME.colors.textPrimary,
                minWidth: '52px',
                textAlign: 'center'
              }}
            >
              {bpm} BPM
            </span>
            <button 
              onClick={() => setBpm(Math.min(240, bpm + 1))}
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(255, 255, 255, 0.04)',
                color: '#F4F4F2',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 'bold',
                outline: 'none',
                transition: 'background-color 0.15s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'}
            >
              +
            </button>
          </div>
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
        style={{ minWidth: '150px' }}
      />

      {/* Practice Timer */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: THEME.fonts.tech,
              fontSize: '11px',
              color: THEME.colors.textSecondary,
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Practice Timer
          </span>
          {isPlaying && practiceDuration > 0 && (
            <span style={{ fontSize: '11px', fontWeight: 700, color: THEME.colors.cyberCyan }}>
              {formatTime(timeRemaining)}
            </span>
          )}
        </div>
        <select
          value={practiceDuration.toString()}
          onChange={(e) => setPracticeDuration(Number(e.target.value))}
          style={{
            fontFamily: THEME.fonts.tech,
            padding: '10px 14px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            color: '#F4F4F2',
            fontSize: '13px',
            fontWeight: 500,
            outline: 'none',
            cursor: 'pointer',
            minWidth: '130px'
          }}
        >
          <option value="0" style={{ color: '#F4F4F2', backgroundColor: '#121827' }}>No Limit</option>
          <option value="30" style={{ color: '#F4F4F2', backgroundColor: '#121827' }}>30 Seconds</option>
          <option value="60" style={{ color: '#F4F4F2', backgroundColor: '#121827' }}>1 Minute</option>
          <option value="120" style={{ color: '#F4F4F2', backgroundColor: '#121827' }}>2 Minutes</option>
          <option value="300" style={{ color: '#F4F4F2', backgroundColor: '#121827' }}>5 Minutes</option>
          <option value="600" style={{ color: '#F4F4F2', backgroundColor: '#121827' }}>10 Minutes</option>
        </select>
      </div>

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
              color: THEME.colors.textPrimary,
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
