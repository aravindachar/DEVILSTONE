'use client';
import React from 'react';
import type { NoteName, DisplayMode, CagedShape } from '../../types/music';
import { THEME } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { getNoteAtFret, getIntervalOffset, isTriadNote, isFretInCagedShape, NOTES } from '../../utils/theoryEngine';
import StringRow from './StringRow';
import FretCell from './FretCell';
import NoteMarker from './NoteMarker';

interface FretboardProps {
  selectedKey?: NoteName;
  activeScaleDegreeIndices?: number[];
  currentTuningNotes?: string[];
  displayMode?: DisplayMode;
  cagedShape?: CagedShape;
  isMinor?: boolean;
  onPlayNote?: (fullNote: string) => void;
  fretRange?: [number, number]; // e.g. [0, 24] or [5, 9]
  cagedHighlight?: CagedShape; // Overrides global caged selection
  isMini?: boolean; // Styles down for isolated visual box shapes
}

const MAX_FRETS = 24;

export const Fretboard: React.FC<FretboardProps> = ({
  fretRange = [0, MAX_FRETS],
  cagedHighlight,
  isMini = false,
  ...props
}) => {
  const global = useApp();

  // Merge context defaults with optional overrides
  const selectedKey = props.selectedKey ?? global.selectedKey;
  const activeScaleDegreeIndices = props.activeScaleDegreeIndices ?? global.activeScaleDegreeIndices;
  const currentTuningNotes = props.currentTuningNotes ?? global.currentTuningNotes;
  const displayMode = props.displayMode ?? global.displayMode;
  const cagedShape = cagedHighlight ?? props.cagedShape ?? global.cagedShape;
  const isMinor = props.isMinor ?? global.isMinor;
  const onPlayNote = props.onPlayNote ?? global.playFretNote;

  const [startFret, endFret] = fretRange;

  const fretboardContainerStyle: React.CSSProperties = {
    overflowX: 'auto',
    paddingBottom: isMini ? '5px' : '15px',
    borderRadius: isMini ? '12px' : '24px',
    backgroundColor: isMini ? 'transparent' : THEME.colors.cardBackground,
    backdropFilter: isMini ? 'none' : 'blur(24px)',
    WebkitBackdropFilter: isMini ? 'none' : 'blur(24px)',
    boxShadow: isMini ? 'none' : '0 10px 40px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
    border: isMini ? 'none' : '1px solid rgba(255, 255, 255, 0.4)',
    padding: isMini ? '10px 5px' : '24px 20px',
    marginBottom: isMini ? '0' : '35px',
  };

  const fretboardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FAF9F6', // Refined Maple neck backing
    borderLeft: startFret === 0 ? `14px solid #1E293B` : 'none', // Dark bone Nut
    padding: isMini ? '8px 0' : '16px 0',
    borderRadius: isMini ? '8px' : '16px',
    minWidth: isMini ? 'auto' : '1280px',
    position: 'relative',
    borderTop: `1px solid rgba(255, 255, 255, 0.05)`,
    borderRight: `1px solid rgba(255, 255, 255, 0.05)`,
    borderBottom: `1px solid rgba(255, 255, 255, 0.05)`,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  };

  const markersRowStyle: React.CSSProperties = {
    display: 'flex',
    marginTop: isMini ? '6px' : '12px',
    minWidth: isMini ? 'auto' : '1280px',
    paddingLeft: startFret === 0 ? '14px' : '0', // align with nut offset
  };

  const markerStyle = (fretIdx: number): React.CSSProperties => {
    return {
      flex: 1,
      textAlign: 'center',
      color: '#94A3B8', // High contrast secondary slate
      fontSize: isMini ? '9px' : '11px',
      fontWeight: 700,
      fontFamily: THEME.fonts.tech,
      textTransform: 'uppercase',
      minWidth: isMini 
        ? (fretIdx === 0 ? '40px' : '32px')
        : (fretIdx === 0 ? '55px' : '45px'),
    };
  };

  // Reversing tuning notes puts High E on top row
  const reversedTuning = [...currentTuningNotes].reverse();

  return (
    <div 
      style={fretboardContainerStyle}
      className={isMini ? "fretboard-wrapper" : "glass-panel fretboard-wrapper"}
    >
      <div className="fretboard-inner-wrapper" style={fretboardStyle}>
        {reversedTuning.map((openNote, reversedIdx) => {
          const originalStringIdx = currentTuningNotes.length - 1 - reversedIdx;

          return (
            <StringRow key={reversedIdx} stringIdx={originalStringIdx} isMini={isMini}>
              {Array.from({ length: MAX_FRETS + 1 }, (_, fretIdx) => {
                // Filter frets outside current visible range
                if (fretIdx < startFret || fretIdx > endFret) return null;

                const { noteName, fullNote } = getNoteAtFret(openNote, fretIdx);
                const isNoteInScale = activeScaleDegreeIndices.includes(
                  NOTES.indexOf(noteName)
                );
                const isRoot = noteName === selectedKey;
                const offset = getIntervalOffset(noteName, selectedKey);
                const isChordTone = isTriadNote(offset, isMinor);

                const inCagedZone = isFretInCagedShape(
                  fretIdx,
                  selectedKey,
                  currentTuningNotes,
                  cagedShape
                );

                return (
                  <FretCell
                    key={fretIdx}
                    fretIdx={fretIdx}
                    stringIdx={originalStringIdx}
                    isMini={isMini}
                  >
                    {isNoteInScale && (
                      <NoteMarker
                        noteName={noteName}
                        rootKey={selectedKey}
                        displayMode={displayMode}
                        isRoot={isRoot}
                        isInCagedShape={inCagedZone}
                        isCagedActive={cagedShape !== 'None'}
                        isChordTone={isChordTone}
                        onClick={() => onPlayNote(fullNote)}
                        isMini={isMini}
                      />
                    )}
                  </FretCell>
                );
              })}
            </StringRow>
          );
        })}

        {/* Fret numbering markers row */}
        <div style={markersRowStyle}>
          {Array.from({ length: MAX_FRETS + 1 }, (_, i) => {
            if (i < startFret || i > endFret) return null;
            const isSingle = [3, 5, 7, 9, 15, 17, 19, 21].includes(i);
            const isDouble = i === 12 || i === 24;

            return (
              <div key={i} style={markerStyle(i)}>
                <div>{i === 0 ? 'Nut' : i}</div>
                <div style={{ fontSize: '14px', lineHeight: '1', marginTop: '2px', color: '#94A3B8', height: '14px' }}>
                  {isSingle ? '•' : isDouble ? '••' : ' '}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Fretboard;
