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
          backgroundColor: '#FEF2F2',
          color: '#DC2626',
          border: '1px solid #FECACA',
        };
      case 'success':
        return {
          backgroundColor: '#F0FDF4',
          color: '#16A34A',
          border: '1px solid #BBF7D0',
        };
      case 'cyber':
        return {
          backgroundColor: '#EFF6FF',
          color: '#0284C7',
          border: '1px solid #BAE6FD',
        };
      case 'secondary':
        return {
          backgroundColor: '#FFFFFF',
          color: '#334155',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
        };
      case 'primary':
      default:
        return {
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          border: 'none',
          boxShadow: '0 2px 6px rgba(15, 23, 42, 0.15)',
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
