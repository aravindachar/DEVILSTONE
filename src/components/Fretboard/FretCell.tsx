import React from 'react';
import { THEME } from '../../constants/theme';
import { FRET_MARKERS } from '../../constants/musicTheory';

interface FretCellProps {
  fretIdx: number;
  stringIdx: number;
  children?: React.ReactNode;
  isMini?: boolean;
}

export const FretCell: React.FC<FretCellProps> = ({
  fretIdx,
  stringIdx,
  children,
  isMini = false,
}) => {
  const isSingleMarker = FRET_MARKERS.single.includes(fretIdx);
  const isDoubleMarker = FRET_MARKERS.double.includes(fretIdx);

  const cellStyle: React.CSSProperties = {
    flex: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    position: 'relative',
    borderRight: fretIdx === 0 ? 'none' : `3px solid ${THEME.colors.fretLine}`,
    minWidth: isMini 
      ? (fretIdx === 0 ? '40px' : '32px') 
      : (fretIdx === 0 ? '55px' : '45px'),
  };

  const dotStyle: React.CSSProperties = {
    position: 'absolute',
    width: isMini ? '6px' : '10px',
    height: isMini ? '6px' : '10px',
    backgroundColor: THEME.colors.fretDot,
    borderRadius: '50%',
    zIndex: 1,
    top: `calc(50% - ${isMini ? 3 : 5}px)`,
    pointerEvents: 'none',
  };

  return (
    <div style={cellStyle}>
      {/* Visual Inlay Fret Markers (diminished if mini) */}
      {isSingleMarker && stringIdx === 2 && <div style={dotStyle} />}
      {isDoubleMarker && (stringIdx === 1 || stringIdx === 3) && (
        <div style={dotStyle} />
      )}

      {children}
    </div>
  );
};
export default FretCell;
