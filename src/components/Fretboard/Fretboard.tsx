'use client';
import React from 'react';
import type { NoteName, DisplayMode, CagedShape } from '../../types/music';
import { THEME } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { getNoteAtFret, getIntervalOffset, isTriadNote, isFretInCagedShape, NOTES, getFretWidth, getPentatonicPositionRange } from '../../utils/theoryEngine';
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
  fretRange,
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
  const activePlayingNote = global.activePlayingNote;
  const capoFret = global.capoFret;
  const hoveredNoteInfo = global.hoveredNoteInfo;
  const activePosition = global.activePosition;

  const [startFret, endFret] = fretRange ?? global.fretRange ?? [0, MAX_FRETS];
  
  // Calculate total neck width using realistic progressive fret widths
  let totalNeckWidth = 0;
  for (let i = startFret; i <= endFret; i++) {
    totalNeckWidth += getFretWidth(i, isMini);
  }

  // Active Position Range Bounds
  const positionRange = activePosition !== null
    ? getPentatonicPositionRange(selectedKey, currentTuningNotes, activePosition)
    : null;

  const fretboardContainerStyle: React.CSSProperties = {
    overflowX: 'auto',
    paddingBottom: isMini ? '4px' : '10px',
    borderRadius: isMini ? '8px' : '16px',
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    padding: isMini ? '4px' : '12px 6px',
    marginBottom: isMini ? '0' : '16px',
    position: 'relative',
  };

  const fretboardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    // Authentic Blonde Maple Neck with subtle longitudinal grain
    background: 'linear-gradient(180deg, #F8EAD4 0%, #EEDBBA 25%, #E5CEAA 50%, #EEDBBA 75%, #DCBA82 100%)',
    backgroundImage: `
      repeating-linear-gradient(90deg, rgba(160, 110, 50, 0.035) 0px, rgba(160, 110, 50, 0.035) 1px, transparent 2px, transparent 6px),
      linear-gradient(180deg, #F8EAD4 0%, #EEDBBA 25%, #E5CEAA 50%, #EEDBBA 75%, #DCBA82 100%)
    `,
    borderTop: '2.5px solid #C8A265',
    borderBottom: '2.5px solid #C8A265',
    borderLeft: startFret === 0 ? '5px solid #C8A265' : 'none',
    padding: isMini ? '6px 0' : '10px 0',
    borderRadius: isMini ? '6px' : '10px',
    width: `${totalNeckWidth}px`,
    minWidth: `${totalNeckWidth}px`,
    position: 'relative',
    boxShadow: 'inset 0 2px 5px rgba(160, 110, 50, 0.25), inset 0 -2px 5px rgba(160, 110, 50, 0.25), 0 10px 30px rgba(80, 50, 20, 0.12)',
  };

  const markersRowStyle: React.CSSProperties = {
    display: 'flex',
    marginBottom: isMini ? '4px' : '8px',
    width: `${totalNeckWidth}px`,
    minWidth: `${totalNeckWidth}px`,
    paddingLeft: '0',
  };

  // Reversing tuning notes puts High E on top row
  const reversedTuning = [...currentTuningNotes].reverse();

  const fretboardContent = (
    <div className="fretboard-inner-wrapper" style={fretboardStyle}>
      {/* Fret numbering markers row (Sleek pins matching reference) */}
      <div style={markersRowStyle}>
        {Array.from({ length: MAX_FRETS + 1 }, (_, i) => {
          if (i < startFret || i > endFret) return null;
          const isMarkerFret = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24].includes(i);
          const isNutFret = i === 0;
          const isCapoCol = capoFret > 0 && i === capoFret;
          const colWidth = getFretWidth(i, isMini);

          return (
            <div
              key={i}
              style={{
                width: `${colWidth}px`,
                minWidth: `${colWidth}px`,
                maxWidth: `${colWidth}px`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: isMini ? '18px' : '24px',
              }}
            >
              {isNutFret && (
                <div
                  className="rounded-full bg-slate-700 border border-slate-500/80 flex items-center justify-center font-bold text-white shadow-sm"
                  style={{ width: isMini ? '16px' : '20px', height: isMini ? '16px' : '20px', fontSize: isMini ? '8.5px' : '10px' }}
                  title="Nut"
                >
                  N
                </div>
              )}
              {isCapoCol && !isNutFret && (
                <div
                  className="px-2 rounded-full bg-[#D9531E] border border-orange-300 text-white flex items-center justify-center font-bold shadow-sm"
                  style={{ height: isMini ? '16px' : '20px', fontSize: isMini ? '8.5px' : '10px' }}
                >
                  Capo {i}
                </div>
              )}
              {!isCapoCol && isMarkerFret && (
                <div
                  className="rounded-full bg-slate-500 border border-slate-400/60 flex items-center justify-center font-bold text-white shadow-sm"
                  style={{ width: isMini ? '16px' : '20px', height: isMini ? '16px' : '20px', fontSize: isMini ? '8.5px' : '10.5px' }}
                >
                  {i}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {reversedTuning.map((openNote, reversedIdx) => {
        const originalStringIdx = currentTuningNotes.length - 1 - reversedIdx;

        return (
          <StringRow key={reversedIdx} stringIdx={originalStringIdx} isMini={isMini}>
            {Array.from({ length: MAX_FRETS + 1 }, (_, fretIdx) => {
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
              const inPositionZone = positionRange
                ? ((fretIdx >= positionRange[0] && fretIdx <= positionRange[1]) ||
                   (fretIdx >= positionRange[0] + 12 && fretIdx <= positionRange[1] + 12))
                : true;

              const isCurrentlyPlaying = activePlayingNote === fullNote;

              // Render marker if it's in the scale, OR if it's the nut (fret 0) to show open string tuning badge!
              const shouldRender = fretIdx === 0 ? true : isNoteInScale;

              return (
                <FretCell
                  key={fretIdx}
                  fretIdx={fretIdx}
                  stringIdx={originalStringIdx}
                  isMini={isMini}
                >
                  {shouldRender && (
                    <NoteMarker
                      noteName={noteName}
                      rootKey={selectedKey}
                      fullNote={fullNote}
                      displayMode={displayMode}
                      isRoot={isRoot}
                      isInCagedShape={inCagedZone}
                      isCagedActive={cagedShape !== 'None'}
                      isChordTone={isChordTone}
                      isScaleNote={isNoteInScale}
                      isCurrentlyPlaying={isCurrentlyPlaying}
                      onClick={() => onPlayNote(fullNote)}
                      isMini={isMini}
                      isInPosition={inPositionZone}
                      isPositionActive={activePosition !== null}
                    />
                  )}
                </FretCell>
              );
            })}
          </StringRow>
        );
      })}

      {/* Vintage Olympic White Guitar Body Cutaway Joint at High Register (Right flank) */}
      {!isMini && endFret >= 20 && (
        <div
          style={{
            position: 'absolute',
            right: '-36px',
            top: '-18px',
            bottom: '-18px',
            width: '80px',
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'visible',
          }}
        >
          {/* Body curve */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '75px',
              background: 'linear-gradient(135deg, #FBF8F0 0%, #F5EEDD 45%, #EADBBA 100%)',
              borderRadius: '0 18px 18px 0',
              borderLeft: '2.5px solid rgba(160, 110, 50, 0.4)',
              boxShadow: 'inset 4px 0 12px rgba(80, 50, 20, 0.2), 3px 0 12px rgba(0, 0, 0, 0.15)',
            }}
          />
          {/* Dark Pickguard slice */}
          <div
            style={{
              position: 'absolute',
              right: '6px',
              top: '22%',
              bottom: '22%',
              width: '45px',
              background: '#18181B',
              borderRadius: '0 12px 12px 0',
              borderLeft: '2px solid rgba(255, 255, 255, 0.2)',
              boxShadow: 'inset 2px 0 6px rgba(0, 0, 0, 0.5)',
            }}
          />
        </div>
      )}
    </div>
  );

  return (
    <div 
      style={fretboardContainerStyle}
      className={isMini ? "fretboard-wrapper" : "fretboard-wrapper"}
    >
      {/* Real-time Note Inspector HUD */}
      {!isMini && (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-3.5 py-2 rounded-xl bg-white/90 border border-slate-200/80 shadow-sm text-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D9531E]" />
            <span className="text-[11px] font-mono tracking-wider uppercase text-slate-500 font-bold">
              Note Inspector
            </span>
          </div>

          {hoveredNoteInfo ? (
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-orange-50 border border-[#D9531E]/30 text-[#D9531E] font-bold">
                Pitch: {hoveredNoteInfo.noteName} ({hoveredNoteInfo.fullNote})
              </span>
              <span className="text-slate-600">
                Degree: <strong className="text-slate-900 font-bold">{hoveredNoteInfo.degree}</strong>
              </span>
              <span className="text-slate-600">
                Interval: <strong className="text-amber-700 font-bold">{hoveredNoteInfo.interval}</strong>
              </span>
              <span className="text-slate-600">
                Freq: <strong className="text-emerald-700 font-semibold">{hoveredNoteInfo.freq} Hz</strong>
              </span>
            </div>
          ) : (
            <div className="text-[12px] font-mono text-slate-400">
              Hover or click any fret note to inspect interval, degree & audio frequency
            </div>
          )}
        </div>
      )}

      {fretboardContent}
    </div>
  );
};
export default Fretboard;
