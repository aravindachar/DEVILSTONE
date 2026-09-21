'use client';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { getPentatonicPositionRange, getCagedRange, isScalePentatonic } from '../../utils/theoryEngine';
import { Fretboard } from '../Fretboard/Fretboard';
import { THEME } from '../../constants/theme';
import type { CagedShape } from '../../types/music';
import { SpotlightCard } from '../reactbits/SpotlightCard';

export const ShapeLibrary: React.FC = () => {
  const {
    selectedKey,
    selectedScale,
    currentTuningNotes,
  } = useApp();

  const isPentatonic = isScalePentatonic(selectedScale);

  const containerStyle: React.CSSProperties = {
    backgroundColor: THEME.colors.cardBackground,
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    padding: '28px 30px',
    borderRadius: '24px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    marginBottom: '35px',
    transition: 'all 0.3s ease',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '22px',
    fontWeight: 700,
    margin: '0 0 8px 0',
    letterSpacing: '-0.5px',
    color: THEME.colors.textPrimary,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '14px',
    color: THEME.colors.textSecondary,
    marginBottom: '24px',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.tech,
    fontSize: '12px',
    fontWeight: 700,
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  };

  const fretsSpanStyle: React.CSSProperties = {
    color: '#78716C',
    fontSize: '11px',
    fontWeight: 500,
  };

  // Render 5 Pentatonic Positions
  const renderPentatonicPositions = () => {
    return [1, 2, 3, 4, 5].map((pos) => {
      const range = getPentatonicPositionRange(selectedKey, currentTuningNotes, pos);
      return (
        <div
          key={pos}
          className="p-4 rounded-xl bg-white/90 border border-stone-200/80 shadow-xs hover:border-stone-300 transition-all"
        >
          <div style={labelStyle}>
            <span className="font-bold text-stone-900">Position {pos}</span>
            <span style={fretsSpanStyle}>Frets {range[0]} - {range[1]}</span>
          </div>
          <Fretboard
            fretRange={range}
            isMini={true}
          />
        </div>
      );
    });
  };

  // Render 5 CAGED Shapes
  const renderCagedShapes = () => {
    const shapes: CagedShape[] = ['C', 'A', 'G', 'E', 'D'];
    return shapes.map((shape) => {
      const range = getCagedRange(selectedKey, currentTuningNotes, shape) || [0, 4];
      return (
        <div
          key={shape}
          className="p-4 rounded-xl bg-white/90 border border-stone-200/80 shadow-xs hover:border-stone-300 transition-all"
        >
          <div style={labelStyle}>
            <span className="font-bold text-stone-900">{shape} Shape Chord</span>
            <span style={fretsSpanStyle}>Frets {range[0]} - {range[1]}</span>
          </div>
          <Fretboard
            fretRange={range}
            cagedHighlight={shape}
            isMini={true}
          />
        </div>
      );
    });
  };

  return (
    <div 
      style={containerStyle}
      className="glass-panel"
    >
      <h2 style={titleStyle}>
        ✦ Shape & Pattern Library
      </h2>
      <p style={descriptionStyle}>
        {isPentatonic
          ? `Showing the 5 standard box patterns for the active ${selectedKey} ${selectedScale} scale across isolated sections.`
          : `Showing the 5 dynamic CAGED system chord positions for ${selectedKey} ${selectedScale}.`}
      </p>
      <div style={gridStyle}>
        {isPentatonic ? renderPentatonicPositions() : renderCagedShapes()}
      </div>
    </div>
  );
};
export default ShapeLibrary;
