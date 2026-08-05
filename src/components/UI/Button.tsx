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
          backgroundColor: 'rgba(239, 68, 68, 0.06)',
          color: '#EF4444',
          border: '1px solid rgba(239, 68, 68, 0.15)',
        };
      case 'success':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.06)',
          color: '#10B981',
          border: '1px solid rgba(16, 185, 129, 0.15)',
        };
      case 'cyber':
        return {
          backgroundColor: 'rgba(0, 215, 255, 0.05)',
          color: '#00D7FF',
          border: '1px solid rgba(0, 215, 255, 0.18)',
        };
      case 'secondary':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          color: '#94A3B8', // Visually recedes
          border: '1px solid rgba(255, 255, 255, 0.05)',
        };
      case 'primary':
      default:
        return {
          backgroundColor: '#ffffff',
          color: '#080B14',
          border: 'none',
        };
    }
  };

  const buttonStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.tech,
    padding: '9px 18px',
    borderRadius: '8px', // Consistent Apple/Linear corner radius
    fontWeight: 600,
    fontSize: '13px',
    letterSpacing: '0.1px',
    cursor: 'pointer',
    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    outline: 'none',
    boxSizing: 'border-box',
    ...getVariantStyles(),
    ...style,
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-0.5px)';
        if (variant === 'danger') {
          e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
          e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.25)';
        } else if (variant === 'success') {
          e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
          e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.25)';
        } else if (variant === 'cyber') {
          e.currentTarget.style.backgroundColor = 'rgba(0, 215, 255, 0.08)';
          e.currentTarget.style.borderColor = 'rgba(0, 215, 255, 0.3)';
        } else if (variant === 'primary') {
          e.currentTarget.style.backgroundColor = '#f1f5f9';
        } else { // secondary
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.color = '#F4F4F2';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        const defaultStyles = getVariantStyles();
        e.currentTarget.style.backgroundColor = defaultStyles.backgroundColor || '';
        e.currentTarget.style.color = defaultStyles.color || '';
        if (variant === 'secondary') {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
        } else if (variant === 'cyber') {
          e.currentTarget.style.borderColor = 'rgba(0, 215, 255, 0.18)';
        } else if (variant === 'danger') {
          e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.15)';
        } else if (variant === 'success') {
          e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.15)';
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
