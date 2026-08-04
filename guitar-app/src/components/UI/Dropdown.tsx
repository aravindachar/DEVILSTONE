import React from 'react';
import { THEME } from '../../constants/theme';

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[] | string[];
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
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

  const selectStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.tech,
    padding: '10px 14px',
    borderRadius: '12px',
    border: '1px solid rgba(17, 17, 17, 0.08)',
    backgroundColor: '#ffffff',
    color: '#111111', // High contrast black
    fontSize: '13px',
    fontWeight: 500,
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.01)',
    ...style,
  };

  const optionStyle: React.CSSProperties = {
    color: '#111111', // Force black text inside dropdown options list
    backgroundColor: '#ffffff', // Force white background inside options list
  };

  return (
    <div style={containerStyle}>
      {label && <span style={labelStyle}>{label}</span>}
      <select
        style={selectStyle}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = THEME.colors.textPrimary;
          e.currentTarget.style.boxShadow = `0 0 0 3px rgba(17, 17, 17, 0.08)`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.08)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        {...props}
      >
        {options.map((opt) => {
          if (typeof opt === 'string') {
            return (
              <option key={opt} value={opt} style={optionStyle}>
                {opt}
              </option>
            );
          }
          return (
            <option key={opt.value} value={opt.value} style={optionStyle}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default Dropdown;
