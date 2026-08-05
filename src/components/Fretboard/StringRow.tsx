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
  const isBass = instrument === 'bass';
  const multiplier = isBass ? 0.75 : 0.45;
  const baseSize = isBass ? (isMini ? 1.4 : 2.0) : (isMini ? 0.8 : 1.2);

  const stringGauge = gaugeIdx * multiplier + baseSize;

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    height: isMini ? '32px' : '46px',
    position: 'relative',
    alignItems: 'center',
  };

  const lineStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    height: `${stringGauge}px`,
    backgroundColor: THEME.colors.stringSilver,
    zIndex: 1,
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.08)',
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
