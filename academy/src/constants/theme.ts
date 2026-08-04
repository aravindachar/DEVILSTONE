export const THEME = {
  colors: {
    // Minimal Luxury Light Theme Palette
    background: '#FFFFFF',        // Backup flat color (mesh background in CSS)
    cardBackground: 'rgba(255, 255, 255, 0.65)', // Frosted glass card backing
    textPrimary: '#111111',       // High contrast black
    textSecondary: '#666666',     // Muted gray
    textMuted: '#888888',
    
    // Core brand highlights
    primary: '#111111',           // Primary buttons: solid black
    primaryDark: '#000000',
    primaryGlow: 'rgba(17, 17, 17, 0.1)',
    cyberCyan: '#00eaff',         // Kept for specific neon accents if needed
    
    // Metronome and secondary buttons
    secondary: '#FFFFFF',
    secondaryBorder: '#E5E7EB',
    
    accentCrimson: '#CB2957',      // Kept for stop button & root indicators (excellent contrast)
    accentCrimsonGlow: 'rgba(203, 41, 87, 0.2)',
    
    pitchBlack: '#111111',
    
    // Board Styling (High-contrast slate board)
    nutColor: '#111111',          // Solid black nut
    stringSilver: '#888888',      // Grey strings for visibility
    fretLine: '#E5E7EB',          // Light gray fret borders
    fretDot: '#D1D5DB',           // Subtle silver dot inlays
  },
  fonts: {
    tech: '"Inter", system-ui, sans-serif',
    pixel: '"Silkscreen", "Press Start 2P", monospace',
  },
};
export type ThemeType = typeof THEME;
