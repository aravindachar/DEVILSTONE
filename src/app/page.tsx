'use client';

import React from 'react';
import { AppProvider } from '@/context/AppContext';
import ControlPanel from '@/components/Controls/ControlPanel';
import Metronome from '@/components/Metronome/Metronome';
import Fretboard from '@/components/Fretboard/Fretboard';
import ShapeLibrary from '@/components/Shapes/ShapeLibrary';
import TheoryGrimoire from '@/components/Theory/TheoryGrimoire';
import { THEME } from '@/constants/theme';
import Button from '@/components/UI/Button';
import Link from 'next/link';

function DevilstoneContent() {
  const containerStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.tech,
    color: THEME.colors.textPrimary,
    minHeight: '100vh',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '0 30px 80px 30px',
  };

  // Floating Pill Navbar
  const navbarStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px 8px 24px',
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '100px',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
    maxWidth: '520px',
    width: '100%',
    margin: '24px auto 0 auto',
    position: 'sticky',
    top: '20px',
    zIndex: 100,
    boxSizing: 'border-box',
  };

  const navBrandStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 700,
    fontSize: '15px',
    color: '#111111',
    letterSpacing: '-0.3px',
    cursor: 'pointer',
  };

  const navLinksStyle: React.CSSProperties = {
    display: 'flex',
    gap: '24px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const navLinkItemStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 500,
    color: '#555555',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s',
  };

  const navButtonStyle: React.CSSProperties = {
    backgroundColor: '#111111',
    color: '#ffffff',
    border: 'none',
    borderRadius: '100px',
    padding: '8px 18px',
    fontWeight: 600,
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'transform 0.15s',
  };

  // Hero Section
  const heroStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '80px 20px 90px 20px',
    maxWidth: '850px',
    margin: '0 auto',
  };

  const headlineStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.pixel,
    fontSize: '72px',
    lineHeight: '1.05',
    color: '#111111',
    marginBottom: '24px',
    letterSpacing: '-2px',
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '18px',
    color: '#666666',
    lineHeight: '1.6',
    maxWidth: '580px',
    margin: '0 auto 36px auto',
    letterSpacing: '-0.2px',
  };

  const ctaContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  };

  const logoIconSvg = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 22h20L12 2z" fill="#111111" />
      <circle cx="12" cy="14" r="3" fill="#ffffff" />
    </svg>
  );

  return (
    <div style={containerStyle}>
      {/* Small Floating Pill Navbar */}
      <nav style={navbarStyle}>
        <div style={navBrandStyle}>
          {logoIconSvg}
          <span>DEVILSTONE</span>
        </div>
        <ul style={navLinksStyle}>
          <li><a href="#fretboard" style={navLinkItemStyle}>Console</a></li>
          <li><a href="#shapes" style={navLinkItemStyle}>Shapes</a></li>
          <li><Link href="/academy" style={navLinkItemStyle}>Academy</Link></li>
        </ul>
        <button 
          style={navButtonStyle}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Sign in
        </button>
      </nav>

      {/* Hero Section */}
      <section style={heroStyle}>
        <h1 style={headlineStyle}>DEVILSTONE</h1>
        <p style={descriptionStyle}>
          Master your fretboard through dynamic shape overlays, precision scheduled metronomes, and clean interactive audio theory.
        </p>
        <div style={ctaContainerStyle}>
          <Button 
            variant="primary" 
            onClick={() => document.getElementById('fretboard')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ borderRadius: '100px', padding: '12px 28px' }}
          >
            Get started
          </Button>
          <Button 
            variant="secondary"
            onClick={() => document.getElementById('grimoire')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ borderRadius: '100px', padding: '12px 28px' }}
          >
            Read grimoire
          </Button>
        </div>
      </section>

      {/* Main Glass console Wrapper */}
      <div id="fretboard" style={{ scrollMarginTop: '80px' }}>
        <ControlPanel />
        <Metronome />
        <Fretboard />
      </div>

      {/* Tier 2: Shape & Pattern Library */}
      <div id="shapes" style={{ scrollMarginTop: '80px' }}>
        <ShapeLibrary />
      </div>

      {/* Tier 3: Theory Grimoire */}
      <div id="grimoire" style={{ scrollMarginTop: '80px' }}>
        <TheoryGrimoire />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <DevilstoneContent />
    </AppProvider>
  );
}
