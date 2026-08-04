import React from 'react';
import { THEME } from '../../constants/theme';

interface BeatIndicatorProps {
  currentBeat: number;
  currentSubdivision: number;
  isPlaying: boolean;
  subdivision: 1 | 2;
}

export const BeatIndicator: React.FC<BeatIndicatorProps> = ({
  currentBeat,
  currentSubdivision,
  isPlaying,
  subdivision,
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  };

  const getBeatDotStyle = (beatIdx: number, subIdx: number): React.CSSProperties => {
    // If subdivision is 2, the sub-beat lights up on its specific subIdx.
    // If subdivision is 1, it lights up for the duration of the beat.
    const isActive =
      isPlaying &&
      currentBeat === beatIdx &&
      (subdivision === 1 ? subIdx === 0 : currentSubdivision === subIdx);

    const activeColor = beatIdx === 0 ? THEME.colors.cyberCyan : THEME.colors.primary;
    const baseSize = 16;
    const size = subIdx === 0 ? `${baseSize}px` : `${baseSize - 6}px`;

    return {
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: isActive ? activeColor : '#e0e0e0',
      boxShadow: isActive ? `0 0 10px ${activeColor}, 0 0 5px ${activeColor}` : 'none',
      border: '2px solid #ffffff',
      transition: 'all 0.05s ease-out',
    };
  };

  return (
    <div style={containerStyle}>
      {[0, 1, 2, 3].map((b) => (
        <div key={b} style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          {/* Down-beat Dot */}
          <div style={getBeatDotStyle(b, 0)} />

          {/* Optional Off-beat Sub-dot */}
          {subdivision === 2 && <div style={getBeatDotStyle(b, 1)} />}
        </div>
      ))}
    </div>
  );
};
export default BeatIndicator;
