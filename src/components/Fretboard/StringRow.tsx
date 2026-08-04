import React from 'react';
import { THEME } from '../../constants/theme';

interface StringRowProps {
  stringIdx: number;
  children: React.ReactNode;
  isMini?: boolean;
}

export const StringRow: React.FC<StringRowProps> = ({ stringIdx, children, isMini = false }) => {
  // Gauge calculation: string index 0 (high E) is thinnest, 5 (low E) is thickest
  const stringGauge = isMini 
    ? (stringIdx * 0.3 + 0.8)
    : (stringIdx * 0.45 + 1.2);

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
