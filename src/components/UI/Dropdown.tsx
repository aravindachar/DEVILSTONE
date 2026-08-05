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
    borderRadius: '10px', // Consistent corner radius
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    color: '#F4F4F2', // Soft off-white text
    fontSize: '13px',
    fontWeight: 500,
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: 'none',
    ...style,
  };

  const optionStyle: React.CSSProperties = {
    color: '#F4F4F2',
    backgroundColor: '#121827',
  };

  return (
    <div style={containerStyle}>
      {label && <span style={labelStyle}>{label}</span>}
      <select
        style={selectStyle}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'rgba(0, 215, 255, 0.4)'; // Subtle cyan focus
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
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
