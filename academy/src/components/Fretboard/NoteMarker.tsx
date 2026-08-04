import React from 'react';
import type { NoteName, DisplayMode } from '../../types/music';
import { THEME } from '../../constants/theme';
import { getNoteLabel } from '../../utils/theoryEngine';

interface NoteMarkerProps {
  noteName: NoteName;
  rootKey: NoteName;
  displayMode: DisplayMode;
  isRoot: boolean;
  isInCagedShape: boolean;
  isCagedActive: boolean;
  isChordTone: boolean;
  onClick: () => void;
  isMini?: boolean;
}

export const NoteMarker: React.FC<NoteMarkerProps> = ({
  noteName,
  rootKey,
  displayMode,
  isRoot,
  isInCagedShape,
  isCagedActive,
  isChordTone,
  onClick,
  isMini = false,
}) => {
  const getOpacity = (): number => {
    if (!isCagedActive) return 1;
    // Dim non-triad tones when CAGED overlays are active
    return isInCagedShape && isChordTone ? 1 : 0.22;
  };

  const getScaleFactor = (): string => {
    if (isMini) return 'scale(1)';
    if (isRoot) return 'scale(1.18)';
    if (isCagedActive && isInCagedShape && isChordTone) return 'scale(1.1)';
    return 'scale(1)';
  };

  const markerStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.tech,
    width: isMini ? '22px' : '32px',
    height: isMini ? '22px' : '32px',
    borderRadius: '50%',
    color: '#ffffff',
    fontWeight: 700,
    fontSize: isMini ? '9px' : '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    border: isMini ? '1px solid #ffffff' : '2px solid #ffffff',
    backgroundColor: isRoot ? '#CB2957' : '#008170',
    boxShadow: isRoot
      ? '0 0 10px rgba(203, 41, 87, 0.4)'
      : '0 4px 8px rgba(0, 0, 0, 0.15)',
    transform: getScaleFactor(),
    opacity: getOpacity(),
  };

  const label = getNoteLabel(noteName, rootKey, displayMode);

  return (
    <button
      onClick={onClick}
      style={markerStyle}
      onMouseEnter={(e) => {
        if (isRoot) {
          e.currentTarget.style.boxShadow = '0 0 14px #CB2957';
        } else {
          e.currentTarget.style.backgroundColor = '#005B41'; // dark emerald hover
          e.currentTarget.style.boxShadow = '0 0 8px rgba(0, 129, 112, 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isRoot
          ? '#CB2957'
          : '#008170';
        e.currentTarget.style.boxShadow = isRoot
          ? '0 0 10px rgba(203, 41, 87, 0.4)'
          : '0 4px 8px rgba(0, 0, 0, 0.15)';
      }}
    >
      {label}
    </button>
  );
};
export default NoteMarker;
