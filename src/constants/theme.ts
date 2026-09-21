export const THEME = {
  colors: {
    // Warm Studio Cream Palette (Linear/Apple/FretMap aesthetic)
    background: '#FAF7EE',        // Warm Studio Parchment
    cardBackground: 'rgba(255, 255, 255, 0.88)', // Studio White surface backing
    textPrimary: '#0F172A',       // Deep Slate / Charcoal
    textSecondary: '#64748B',     // Muted slate gray
    textMuted: '#94A3B8',
    
    // Core brand highlights
    primary: '#0F172A',           // Primary dark button
    primaryDark: '#020617',
    primaryGlow: 'rgba(15, 23, 42, 0.05)',
    cyberCyan: '#00D7FF',         // Electric Cyan accent
    terracotta: '#D9531E',        // Signature burnt orange / root pill
    
    // Translucent surfaces & borders
    secondary: 'rgba(0, 0, 0, 0.04)',
    secondaryBorder: 'rgba(0, 0, 0, 0.08)',
    
    accentCrimson: '#EF4444',      // Desaturated Coral Red
    accentCrimsonGlow: 'rgba(239, 68, 68, 0.15)',
    
    // Board Styling (Authentic Lacquered Maple Neck)
    mapleLight: '#F6EAD5',
    mapleMid: '#EEDBBA',
    mapleDark: '#DFBF88',
    nutColor: '#FAF8F2',           // Bleached Bone Nut
    stringSilver: '#475569',
    fretLine: '#94A3B8',          // Crowned nickel fret wire
    fretDot: '#18181B',           // Iconic Black Phenolic Dots for Maple necks
  },
  fonts: {
    tech: '"Inter", system-ui, sans-serif',
    pixel: '"Silkscreen", "Press Start 2P", monospace',
    display: '"Unbounded", system-ui, sans-serif',
  },
};
export type ThemeType = typeof THEME;
