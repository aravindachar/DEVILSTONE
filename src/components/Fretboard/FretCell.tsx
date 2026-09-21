import React from 'react';
import { FRET_MARKERS } from '../../constants/musicTheory';
import { useApp } from '../../context/AppContext';
import { getFretWidth } from '../../utils/theoryEngine';

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
  const { currentTuningNotes, capoFret } = useApp();
  const numStrings = currentTuningNotes.length;

  const isSingleMarker = FRET_MARKERS.single.includes(fretIdx);
  const isDoubleMarker = FRET_MARKERS.double.includes(fretIdx);

  const isBehindCapo = capoFret > 0 && fretIdx < capoFret;
  const isCapoFret = capoFret > 0 && fretIdx === capoFret;

  const cellWidth = getFretWidth(fretIdx, isMini);

  const cellStyle: React.CSSProperties = {
    width: `${cellWidth}px`,
    minWidth: `${cellWidth}px`,
    maxWidth: `${cellWidth}px`,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    position: 'relative',
    backgroundColor: fretIdx === 0 
      ? '#FAF8F2' // Bleached/vintage bone nut block
      : (isBehindCapo ? 'rgba(100, 60, 20, 0.15)' : 'transparent'),
    opacity: isBehindCapo ? 0.35 : 1,
  };

  const dotStyle: React.CSSProperties = {
    position: 'absolute',
    width: isMini ? '6px' : '10px',
    height: isMini ? '6px' : '10px',
    // Iconic Black Phenolic Inlay Dot for Maple fingerboards
    background: 'radial-gradient(circle at 35% 35%, #27272A 0%, #18181B 65%, #09090B 100%)',
    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), 0 1px 2px rgba(80, 50, 20, 0.4)',
    borderRadius: '50%',
    zIndex: 1,
    left: '50%',
    transform: 'translateX(-50%)',
    pointerEvents: 'none',
  };

  // Single dot placement (between middle strings)
  let showSingleDot = false;
  let singleDotOffsetStyle: React.CSSProperties = {};

  if (isSingleMarker) {
    if (numStrings === 6) {
      if (stringIdx === 2) {
        showSingleDot = true;
        singleDotOffsetStyle = { bottom: '-5px' };
      }
    } else if (numStrings === 4) {
      if (stringIdx === 1) {
        showSingleDot = true;
        singleDotOffsetStyle = { bottom: '-5px' };
      }
    } else if (numStrings === 5) {
      if (stringIdx === 2) {
        showSingleDot = true;
        singleDotOffsetStyle = { top: '50%', transform: 'translate(-50%, -50%)' };
      }
    } else {
      if (stringIdx === Math.floor(numStrings / 2)) {
        showSingleDot = true;
        singleDotOffsetStyle = { top: '50%', transform: 'translate(-50%, -50%)' };
      }
    }
  }

  // Double dot placement (strings 1 and 4 on 6-string)
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
      {/* Centered Black Phenolic Fret Inlays */}
      {showSingleDot && (
        <div style={{ ...dotStyle, ...singleDotOffsetStyle }} />
      )}
      
      {showDoubleDot && (
        <div style={{ ...dotStyle, top: '50%', transform: 'translate(-50%, -50%)' }} />
      )}

      {/* Realistic Crowned Nickel-Silver Fret Wire (On all frets except Nut) */}
      {fretIdx > 0 && (
        <div
          style={{
            position: 'absolute',
            right: '-1.5px',
            top: 0,
            bottom: 0,
            width: isMini ? '2px' : '3px',
            background: 'linear-gradient(90deg, #64748B 0%, #CBD5E1 30%, #FFFFFF 50%, #94A3B8 75%, #475569 100%)',
            boxShadow: '1px 0 2px rgba(80,50,20,0.3), -0.5px 0 0.5px rgba(255,255,255,0.6)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Bleached Vintage Bone Nut Edge */}
      {fretIdx === 0 && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: isMini ? '3px' : '5px',
            background: 'linear-gradient(90deg, #E5E0D8 0%, #FAF8F2 50%, #EFECE6 100%)',
            borderRight: '1.5px solid rgba(80, 50, 20, 0.4)',
            boxShadow: '1px 0 3px rgba(0,0,0,0.15)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Visual Capo Bar Clamp */}
      {isCapoFret && (
        <div
          style={{
            position: 'absolute',
            right: '-3px',
            top: 0,
            bottom: 0,
            width: '6px',
            background: 'linear-gradient(180deg, #38BDF8 0%, #00D7FF 50%, #0284C7 100%)',
            boxShadow: '0 0 10px rgba(0, 215, 255, 0.8)',
            borderRadius: '2px',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        />
      )}

      {children}
    </div>
  );
};

export default FretCell;
