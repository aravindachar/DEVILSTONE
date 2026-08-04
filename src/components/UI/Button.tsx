import React from 'react';
import { THEME } from '../../constants/theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'success' | 'cyber' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  style,
  ...props
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'danger':
        return {
          backgroundColor: THEME.colors.accentCrimson,
          color: '#ffffff',
          boxShadow: `0 4px 10px ${THEME.colors.accentCrimsonGlow}`,
        };
      case 'success':
        return {
          backgroundColor: '#10B981', // clean emerald green
          color: '#ffffff',
          boxShadow: '0 4px 10px rgba(16, 185, 129, 0.15)',
        };
      case 'secondary':
      case 'cyber':
        return {
          backgroundColor: '#ffffff',
          color: '#111111',
          border: '1px solid rgba(17, 17, 17, 0.08)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.01)',
        };
      case 'primary':
      default:
        return {
          backgroundColor: '#111111',
          color: '#ffffff',
          boxShadow: '0 4px 10px rgba(17, 17, 17, 0.1)',
        };
    }
  };

  const buttonStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.tech,
    padding: '11px 24px',
    border: (variant === 'cyber' || variant === 'secondary') ? undefined : 'none',
    borderRadius: '12px',
    fontWeight: 600,
    fontSize: '13px',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    outline: 'none',
    ...getVariantStyles(),
    ...style,
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        if (variant === 'danger') {
          e.currentTarget.style.boxShadow = `0 6px 14px ${THEME.colors.accentCrimsonGlow}`;
        } else if (variant === 'success') {
          e.currentTarget.style.boxShadow = '0 6px 14px rgba(16, 185, 129, 0.25)';
        } else if (variant === 'primary') {
          e.currentTarget.style.boxShadow = '0 6px 15px rgba(17, 17, 17, 0.18)';
        } else {
          e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.05)';
          e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.15)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = getVariantStyles().boxShadow || 'none';
        if (variant === 'cyber' || variant === 'secondary') {
          e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.08)';
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
