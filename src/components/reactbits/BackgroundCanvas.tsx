'use client';

import React from 'react';

export const BackgroundCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#FAF7EE]">
      {/* Subtle warm ambient illumination */}
      <div 
        className="pointer-events-none absolute top-[-15%] left-1/2 -translate-x-1/2 w-[80vw] h-[55vh] rounded-full blur-[140px] opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.12) 0%, rgba(217, 83, 30, 0.06) 40%, transparent 70%)'
        }}
      />
      <div 
        className="pointer-events-none absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vh] rounded-full blur-[120px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(217, 83, 30, 0.08) 0%, transparent 70%)'
        }}
      />
      {/* Tactile SVG Noise Grain Overlay */}
      <div className="bg-noise" />
    </div>
  );
};

export default BackgroundCanvas;
