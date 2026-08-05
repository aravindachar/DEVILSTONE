import React from 'react';
import { THEME } from '../../constants/theme';
import { FRET_MARKERS } from '../../constants/musicTheory';
import { useApp } from '../../context/AppContext';

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
  const { currentTuningNotes } = useApp();
  const numStrings = currentTuningNotes.length;

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
    backgroundColor: fretIdx === 0 ? '#E2E8F0' : 'transparent', // Differentiate the Nut column
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
    left: '50%',
    transform: 'translateX(-50%)',
    pointerEvents: 'none',
  };

  // Determine single dot placement
  // We want it centered vertically on the neck.
  // For even string count (e.g. 4 or 6), the center is between the two middle strings.
  // - 6 strings: index 2 and 3. We can put it on index 2 and offset it down, or index 3 and offset it up.
  // - 4 strings: index 1 and 2. We can put it on index 1 and offset it down.
  // For odd string count (e.g. 5), the center is exactly on the middle string.
  // - 5 strings: index 2.
  let showSingleDot = false;
  let singleDotOffsetStyle: React.CSSProperties = {};

  if (isSingleMarker) {
    if (numStrings === 6) {
      if (stringIdx === 2) {
        showSingleDot = true;
        // Position exactly between string 2 and string 3
        singleDotOffsetStyle = { bottom: '-5px' };
      }
    } else if (numStrings === 4) {
      if (stringIdx === 1) {
        showSingleDot = true;
        // Position exactly between string 1 and string 2
        singleDotOffsetStyle = { bottom: '-5px' };
      }
    } else if (numStrings === 5) {
      if (stringIdx === 2) {
        showSingleDot = true;
        singleDotOffsetStyle = { top: '50%', transform: 'translate(-50%, -50%)' };
      }
    } else {
      // Fallback
      if (stringIdx === Math.floor(numStrings / 2)) {
        showSingleDot = true;
        singleDotOffsetStyle = { top: '50%', transform: 'translate(-50%, -50%)' };
      }
    }
  }

  // Determine double dot placement
  // - 6 strings: on index 1 and 4
  // - 4 strings: on index 0 and 2
  // - 5 strings: on index 1 and 3
  let showDoubleDot = false;
  if (isDoubleMarker) {
    if (numStrings === 6) {
      showDoubleDot = stringIdx === 1 || stringIdx === 4;
    } else if (numStrings === 4) {
      showDoubleDot = stringIdx === 0 || stringIdx === 2;
    } else if (numStrings === 5) {
      showDoubleDot = stringIdx === 1 || stringIdx === 3;
    } else {
      showDoubleDot = stringIdx === 1 || stringIdx === numStrings - 2;
    }
  }

  return (
    <div style={cellStyle}>
      {/* Centered Inlay Fret Markers */}
      {showSingleDot && (
        <div style={{ ...dotStyle, ...singleDotOffsetStyle }} />
      )}
      
      {showDoubleDot && (
        <div style={{ ...dotStyle, top: '50%', transform: 'translate(-50%, -50%)' }} />
      )}

      {children}
    </div>
  );
};

export default FretCell;
