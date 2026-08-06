export const THEME = {
  colors: {
    // Refined Dark Theme Palette (Designed by Apple/Linear/Raycast aesthetic)
    background: '#000000',        // Pitch Black
    cardBackground: 'rgba(18, 24, 39, 0.65)', // Surface #121827 backing
    textPrimary: '#F4F4F2',       // Soft off-white text
    textSecondary: '#94A3B8',     // Muted slate gray
    textMuted: '#4B5563',
    
    // Core brand highlights
    primary: '#FFFFFF',           // Primary buttons
    primaryDark: '#F4F4F2',
    primaryGlow: 'rgba(255, 255, 255, 0.05)',
    cyberCyan: '#00D7FF',         // Electric Cyan accent
    
    // Translucent surfaces & borders
    secondary: 'rgba(255, 255, 255, 0.04)',
    secondaryBorder: 'rgba(255, 255, 255, 0.06)',
    
    accentCrimson: '#EF4444',      // Desaturated Coral Red
    accentCrimsonGlow: 'rgba(239, 68, 68, 0.15)',
    
    pitchBlack: '#000000',
    
    // Board Styling (High-contrast slate board)
    nutColor: '#1E293B',
    stringSilver: '#64748B',
    fretLine: '#94A3B8', // Solid nickel fret wire
    fretDot: '#475569',                // dark clay dots
  },
  fonts: {
    tech: '"Inter", system-ui, sans-serif',
    pixel: '"Silkscreen", "Press Start 2P", monospace',
    display: '"Unbounded", system-ui, sans-serif',
  },
};
export type ThemeType = typeof THEME;
