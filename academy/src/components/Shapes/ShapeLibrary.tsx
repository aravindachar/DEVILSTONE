'use client';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { getPentatonicPositionRange, getCagedRange, isScalePentatonic } from '../../utils/theoryEngine';
import { Fretboard } from '../Fretboard/Fretboard';
import { THEME } from '../../constants/theme';
import type { CagedShape } from '../../types/music';

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
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
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

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff', // High-contrast clean white card backing
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid rgba(17, 17, 17, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.015)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.tech,
    fontSize: '12px',
    fontWeight: 700,
    color: '#111111',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const fretsSpanStyle: React.CSSProperties = {
    color: THEME.colors.textSecondary,
    fontSize: '11px',
    fontWeight: 400,
  };

  // Render 5 Pentatonic Positions
  const renderPentatonicPositions = () => {
    return [1, 2, 3, 4, 5].map((pos) => {
      const range = getPentatonicPositionRange(selectedKey, currentTuningNotes, pos);
      return (
        <div 
          key={pos} 
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.04)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.015)';
          }}
        >
          <div style={labelStyle}>
            <span>Position {pos}</span>
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
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.04)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.015)';
          }}
        >
          <div style={labelStyle}>
            <span>{shape} Shape Chord</span>
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
