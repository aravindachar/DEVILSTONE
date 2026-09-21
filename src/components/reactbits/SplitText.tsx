'use client';

import React from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  animationFrom?: { opacity: number; transform: string };
  animationTo?: { opacity: number; transform: string };
  textAlign?: 'left' | 'center' | 'right';
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 35,
  textAlign = 'center',
}) => {
  const letters = text.split('');

  return (
    <span
      className={`inline-block ${className}`}
      style={{ textAlign, whiteSpace: 'normal', wordBreak: 'break-word' }}
    >
      {letters.map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-500 ease-out animate-split-text"
          style={{
            animationDelay: `${index * delay}ms`,
            animationFillMode: 'both',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
