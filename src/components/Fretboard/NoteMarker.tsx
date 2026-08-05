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
    if (isRoot) return 'scale(1.15)';
    if (isCagedActive && isInCagedShape && isChordTone) return 'scale(1.08)';
    return 'scale(1)';
  };

  const markerStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.tech,
    width: isMini ? '22px' : '32px',
    height: isMini ? '22px' : '32px',
    borderRadius: '50%',
    color: '#F4F4F2', // Clean off-white text labels for minimal clutter
    fontWeight: 700,
    fontSize: isMini ? '9px' : '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    border: isRoot 
      ? (isMini ? '1px solid rgba(239, 68, 68, 0.7)' : '1.5px solid rgba(239, 68, 68, 0.8)') 
      : (isMini ? '1px solid rgba(0, 215, 255, 0.5)' : '1.5px solid rgba(0, 215, 255, 0.65)'),
    backgroundColor: 'rgba(18, 24, 39, 0.92)', // Dark Surface #121827 glass disc
    backdropFilter: 'blur(4px)',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)', // Clean, single source of depth
    transform: getScaleFactor(),
    opacity: getOpacity(),
  };

  const label = getNoteLabel(noteName, rootKey, displayMode);

  return (
    <button
      onClick={onClick}
      style={markerStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `${getScaleFactor()} scale(1.05)`;
        if (isRoot) {
          e.currentTarget.style.borderColor = '#EF4444';
          e.currentTarget.style.boxShadow = '0 4px 10px rgba(239, 68, 68, 0.2)';
        } else {
          e.currentTarget.style.borderColor = '#00D7FF';
          e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 215, 255, 0.2)';
        }
        e.currentTarget.style.backgroundColor = 'rgba(18, 24, 39, 0.98)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = getScaleFactor();
        e.currentTarget.style.backgroundColor = 'rgba(18, 24, 39, 0.92)';
        e.currentTarget.style.borderColor = isRoot 
          ? (isMini ? 'rgba(239, 68, 68, 0.7)' : 'rgba(239, 68, 68, 0.8)') 
          : (isMini ? 'rgba(0, 215, 255, 0.5)' : 'rgba(0, 215, 255, 0.65)');
        e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.3)';
      }}
    >
      {label}
    </button>
  );
};

export default NoteMarker;
