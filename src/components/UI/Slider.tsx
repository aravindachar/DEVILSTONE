import React from 'react';
import { THEME } from '../../constants/theme';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  style,
  ...props
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.tech,
    fontSize: '11px',
    color: THEME.colors.textSecondary,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  };

  const sliderStyle: React.CSSProperties = {
    cursor: 'pointer',
    accentColor: THEME.colors.cyberCyan, // Electric Cyan thumb
    height: '6px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)', // Translucent track
    outline: 'none',
    width: '100%',
    ...style,
  };

  return (
    <div style={containerStyle}>
      {label && <span style={labelStyle}>{label}</span>}
      <input
        type="range"
        style={sliderStyle}
        {...props}
      />
    </div>
  );
};
export default Slider;
