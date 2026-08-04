'use client';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { getScaleGrimoire } from '../../utils/theoryEngine';
import { THEME } from '../../constants/theme';

export const TheoryGrimoire: React.FC = () => {
  const { selectedKey, selectedScale } = useApp();

  const { formula, notes, description } = getScaleGrimoire(
    selectedKey,
    selectedScale
  );

  const containerStyle: React.CSSProperties = {
    backgroundColor: THEME.colors.cardBackground,
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    padding: '28px 30px',
    borderRadius: '24px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
    marginTop: '10px',
    transition: 'all 0.3s ease',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.tech,
    fontSize: '22px',
    fontWeight: 700,
    color: THEME.colors.textPrimary,
    margin: '0 0 16px 0',
    borderBottom: '2px solid rgba(17, 17, 17, 0.08)',
    paddingBottom: '8px',
    letterSpacing: '-0.5px',
  };

  const badgeContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const badgeStyle: React.CSSProperties = {
    backgroundColor: '#ffffff', // High-contrast clean white card backing
    borderRadius: '16px',
    padding: '16px 20px',
    border: '1px solid rgba(17, 17, 17, 0.06)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.015)',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.tech,
    fontSize: '11px',
    color: THEME.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 700,
    marginBottom: '6px',
    display: 'block',
  };

  const valueStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.tech,
    fontSize: '24px',
    fontWeight: 700,
    color: '#111111',
    letterSpacing: '0.5px',
  };

  const textStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#333333', // highly legible gray-black
    lineHeight: '1.6',
    margin: 0,
  };

  return (
    <div 
      style={containerStyle}
      className="glass-panel"
    >
      {/* Left Column: Musical Spelling & Math */}
      <div style={badgeContainerStyle}>
        <h3 style={sectionTitleStyle}>✦ Music Theory Anatomy</h3>
        
        {/* Scale Notes List */}
        <div style={badgeStyle}>
          <span style={labelStyle}>Scale Spellings ({selectedKey} {selectedScale})</span>
          <div style={valueStyle}>{notes.join(' - ')}</div>
        </div>

        {/* Scale Formula */}
        <div style={badgeStyle}>
          <span style={labelStyle}>Interval Formula</span>
          <div style={{ ...valueStyle, color: '#CB2957' }}>{formula}</div>
        </div>
      </div>

      {/* Right Column: Historical & Practical Context */}
      <div>
        <h3 style={sectionTitleStyle}>✦ Historical Grimoire</h3>
        <div
          style={{
            ...badgeStyle,
            height: 'calc(100% - 70px)',
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          <p style={textStyle}>{description}</p>
        </div>
      </div>
    </div>
  );
};
export default TheoryGrimoire;
