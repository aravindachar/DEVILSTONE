import React from 'react';
import { THEME } from '../../constants/theme';
import { useApp } from '../../context/AppContext';

interface StringRowProps {
  stringIdx: number;
  children: React.ReactNode;
  isMini?: boolean;
}

export const StringRow: React.FC<StringRowProps> = ({ stringIdx, children, isMini = false }) => {
  const { currentTuningNotes, instrument } = useApp();
  const numStrings = currentTuningNotes.length;

  // Invert the index so stringIdx 0 (Low string / lowest pitch) is thickest,
  // and stringIdx (numStrings - 1) (High string / highest pitch) is thinnest.
  const gaugeIdx = numStrings - 1 - stringIdx;

  // Apply higher gauges for Bass strings to feel authentic
  const isBass = instrument === 'bass-4' || instrument === 'bass-5';
  const multiplier = isBass ? 0.75 : 0.45;
  const baseSize = isBass ? (isMini ? 1.4 : 2.0) : (isMini ? 0.8 : 1.2);

  const stringGauge = gaugeIdx * multiplier + baseSize;
  const isWound = gaugeIdx >= 2; // Bottom 4 strings are wound nickel

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    height: isMini ? '32px' : '44px',
    position: 'relative',
    alignItems: 'center',
  };

  const lineStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    height: `${stringGauge}px`,
    background: isWound
      ? 'linear-gradient(180deg, #F8FAFC 0%, #CBD5E1 25%, #64748B 70%, #334155 100%)'
      : 'linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 50%, #94A3B8 100%)',
    backgroundImage: isWound
      ? 'repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, rgba(0,0,0,0.3) 1.5px, transparent 3px)'
      : 'none',
    zIndex: 1,
    boxShadow: '0 1.5px 2.5px rgba(90, 50, 20, 0.35)',
    pointerEvents: 'none',
  };

  return (
    <div style={rowStyle}>
      <div style={lineStyle} />
      {children}
    </div>
  );
};

export default StringRow;
