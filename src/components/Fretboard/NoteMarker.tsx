import React from 'react';
import type { NoteName, DisplayMode } from '../../types/music';
import { THEME } from '../../constants/theme';
import { getNoteLabel, getNoteInspectionInfo } from '../../utils/theoryEngine';
import { useApp } from '../../context/AppContext';

interface NoteMarkerProps {
  noteName: NoteName;
  rootKey: NoteName;
  fullNote: string;
  displayMode: DisplayMode;
  isRoot: boolean;
  isInCagedShape: boolean;
  isCagedActive: boolean;
  isChordTone: boolean;
  isScaleNote?: boolean;
  isCurrentlyPlaying?: boolean;
  onClick: () => void;
  isMini?: boolean;
  isInPosition?: boolean;
  isPositionActive?: boolean;
}

export const NoteMarker: React.FC<NoteMarkerProps> = ({
  noteName,
  rootKey,
  fullNote,
  displayMode,
  isRoot,
  isInCagedShape,
  isCagedActive,
  isChordTone,
  isScaleNote = true,
  isCurrentlyPlaying = false,
  onClick,
  isMini = false,
  isInPosition = true,
  isPositionActive = false,
}) => {
  const { setHoveredNoteInfo, activeChordNotes } = useApp();

  const isChordHighlightActive = activeChordNotes && activeChordNotes.length > 0;
  const isHighlightedChordNote = isChordHighlightActive && activeChordNotes.includes(noteName);

  const getOpacity = (): number => {
    if (isCurrentlyPlaying) return 1;
    if (!isScaleNote) return 0.85;
    if (isChordHighlightActive) {
      return isHighlightedChordNote ? 1 : 0.18;
    }
    if (isPositionActive && !isInPosition) {
      return 0.12; // Dim out notes outside active box position
    }
    if (!isCagedActive) return 1;
    // Dim non-triad tones when CAGED overlays are active
    return isInCagedShape && isChordTone ? 1 : 0.22;
  };

  const getScaleFactor = (): string => {
    if (isCurrentlyPlaying) return 'scale(1.22)';
    if (isMini) return 'scale(1)';
    if (isChordHighlightActive && isHighlightedChordNote) return 'scale(1.18)';
    if (isRoot) return 'scale(1.14)';
    if (isCagedActive && isInCagedShape && isChordTone) return 'scale(1.08)';
    return 'scale(1)';
  };

  const isDotsMode = displayMode === 'dots';
  const dotSize = isMini ? '18px' : (isDotsMode ? '20px' : '29px');

  const getTextColor = (): string => {
    if (isDotsMode) return 'transparent';
    if (isCurrentlyPlaying) return '#00D7FF';
    if (!isScaleNote) return '#475569';
    if (isRoot) return '#FFFFFF';
    if (isChordHighlightActive && isHighlightedChordNote) return '#FFFFFF';
    return '#0F172A'; // High-contrast dark charcoal on white badges
  };

  const getBackgroundColor = (): string => {
    if (isCurrentlyPlaying) return 'rgba(0, 215, 255, 0.25)';
    if (!isScaleNote) return '#EFECE6'; // Bleached bone pill for non-scale open strings
    if (isChordHighlightActive && isHighlightedChordNote) return '#D9531E'; // Highlighted chord notes in warm terracotta
    if (isRoot) return '#D9531E'; // Realistic burnt orange/terracotta root badge from reference
    if (isDotsMode) return '#FFFFFF';
    return '#FFFFFF'; // Crisp white physical badge
  };

  const getBorder = (): string => {
    if (isCurrentlyPlaying) return '2px solid #00D7FF';
    if (isDotsMode) return 'none';
    if (!isScaleNote) return '1px solid rgba(80, 50, 20, 0.25)';
    if (isRoot || (isChordHighlightActive && isHighlightedChordNote)) return '1px solid rgba(255, 255, 255, 0.35)';
    return '1px solid rgba(0, 0, 0, 0.15)';
  };

  const getBoxShadow = (): string => {
    if (isCurrentlyPlaying) {
      return '0 0 0 3px rgba(0, 215, 255, 0.4), 0 0 16px rgba(0, 215, 255, 0.9), 0 3px 6px rgba(0,0,0,0.3)';
    }
    if (!isScaleNote) {
      return '0 1px 3px rgba(80, 50, 20, 0.2)';
    }
    if (isRoot || (isChordHighlightActive && isHighlightedChordNote)) {
      return '0 3px 8px rgba(217, 83, 30, 0.45), 0 1px 2px rgba(0, 0, 0, 0.2)';
    }
    return '0 2px 5px rgba(80, 50, 20, 0.25), 0 1px 2px rgba(0, 0, 0, 0.1)';
  };

  const markerStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.tech,
    width: dotSize,
    height: dotSize,
    borderRadius: '50%',
    color: getTextColor(),
    fontWeight: 800,
    fontSize: isMini ? '9px' : (displayMode === 'octaves' ? '10px' : '11.5px'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    border: getBorder(),
    backgroundColor: getBackgroundColor(),
    boxShadow: getBoxShadow(),
    transform: getScaleFactor(),
    opacity: getOpacity(),
    zIndex: isCurrentlyPlaying ? 10 : 3,
    padding: 0,
    userSelect: 'none',
  };

  const label = getNoteLabel(noteName, rootKey, displayMode, fullNote);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isMini) {
      const info = getNoteInspectionInfo(noteName, rootKey, fullNote);
      setHoveredNoteInfo(info);
    }

    e.currentTarget.style.transform = `${getScaleFactor()} scale(1.08)`;
    if (isRoot) {
      e.currentTarget.style.boxShadow = '0 4px 14px rgba(217, 83, 30, 0.6)';
    } else {
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 215, 255, 0.4)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isMini) {
      setHoveredNoteInfo(null);
    }
    e.currentTarget.style.transform = getScaleFactor();
    e.currentTarget.style.backgroundColor = getBackgroundColor();
    e.currentTarget.style.border = getBorder();
    e.currentTarget.style.boxShadow = getBoxShadow();
  };

  return (
    <button
      onClick={onClick}
      style={markerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={`${noteName} (${fullNote})`}
      aria-label={`Fret note ${fullNote}`}
    >
      {!isDotsMode && label}
    </button>
  );
};

export default NoteMarker;
