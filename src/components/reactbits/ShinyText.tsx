'use client';

import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  shimmerColor?: string;
  style?: React.CSSProperties;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 4,
  className = '',
  shimmerColor = 'rgba(255, 255, 255, 0.95)',
  style,
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block select-none ${disabled ? '' : 'shiny-text-animated'} ${className}`}
      style={{
        backgroundImage: `linear-gradient(120deg, #E2E8F0 0%, #FFFFFF 35%, ${shimmerColor} 50%, #FFFFFF 65%, #E2E8F0 100%)`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animationDuration,
        ...style,
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
