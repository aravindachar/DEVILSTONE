'use client';

import React from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import ControlPanel from '@/components/Controls/ControlPanel';
import Metronome from '@/components/Metronome/Metronome';
import Fretboard from '@/components/Fretboard/Fretboard';
import ShapeLibrary from '@/components/Shapes/ShapeLibrary';
import TheoryGrimoire from '@/components/Theory/TheoryGrimoire';
import { THEME } from '@/constants/theme';
import Button from '@/components/UI/Button';
import Link from 'next/link';

function DevilstoneContent() {
  const { isFocusMode, setIsFocusMode } = useApp();

  const containerStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.tech,
    color: THEME.colors.textPrimary,
    minHeight: '100vh',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: isFocusMode ? '0' : '0 30px 80px 30px',
  };

  // Floating Pill Navbar (Using Surface colors and 8px spacing system)
  const navbarStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px 8px 24px',
    backgroundColor: 'rgba(18, 24, 39, 0.7)', /* Translucent Surface */
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '100px', /* Keeps pill style for main nav */
    border: '1px solid rgba(255, 255, 255, 0.05)', /* Subtle border */
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    maxWidth: '560px',
    width: '100%',
    margin: '24px auto 0 auto',
    position: 'sticky',
    top: '24px',
    zIndex: 100,
    boxSizing: 'border-box',
  };

  const navBrandStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 700,
    fontSize: '15px',
    color: '#F4F4F2',
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
    color: '#94A3B8',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s',
  };

  const navButtonStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    color: '#080B14',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 18px',
    fontWeight: 600,
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'transform 0.15s',
  };

  // Hero Section (Increased whitespace/breathing room)
  const heroStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '130px 20px 140px 20px',
    maxWidth: '850px',
    margin: '0 auto',
  };

  const headlineStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.pixel,
    fontSize: '72px',
    lineHeight: '1.05',
    color: '#F4F4F2',
    marginBottom: '32px',
    letterSpacing: '-2px',
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '18px',
    color: '#94A3B8',
    lineHeight: '1.6',
    maxWidth: '580px',
    margin: '0 auto 48px auto',
    letterSpacing: '-0.2px',
  };

  const ctaContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
  };

  const logoIconSvg = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 22h20L12 2z" fill="#F4F4F2" />
      <circle cx="12" cy="14" r="3" fill="#0B1020" />
    </svg>
  );

  return (
    <div className={isFocusMode ? "focus-mode-active" : ""} style={containerStyle}>
      {/* Floating Exit Focus Mode Button */}
      {isFocusMode && (
        <div style={{ position: 'fixed', top: '24px', right: '30px', zIndex: 1000 }}>
          <Button 
            variant="secondary"
            onClick={() => setIsFocusMode(false)}
            style={{ 
              padding: '10px 24px', 
              background: 'rgba(18, 24, 39, 0.85)', 
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              color: '#F4F4F2',
              backdropFilter: 'blur(10px)'
            }}
          >
            ✕ Exit Focus Mode
          </Button>
        </div>
      )}

      {/* Small Floating Pill Navbar */}
      <nav style={navbarStyle}>
        <div style={navBrandStyle}>
          {logoIconSvg}
          <span>DEVILSTONE</span>
        </div>
        <ul style={navLinksStyle}>
          <li><a href="#fretboard" style={navLinkItemStyle}>Console</a></li>
          <li><a href="#shapes" style={navLinkItemStyle}>Shapes</a></li>
          <li><a href="#about" style={navLinkItemStyle}>About</a></li>
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
            style={{ padding: '12px 28px' }}
          >
            Get started
          </Button>
          <Button 
            variant="secondary"
            onClick={() => document.getElementById('grimoire')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ padding: '12px 28px' }}
          >
            Read grimoire
          </Button>
        </div>
      </section>

      {/* Main Glass console Wrapper */}
      <div id="fretboard" style={{ scrollMarginTop: '120px', marginTop: '40px' }}>
        <ControlPanel />
        <Metronome />
        <Fretboard />
      </div>

      {/* Tier 2: Shape & Pattern Library */}
      <div id="shapes" style={{ scrollMarginTop: '120px', marginTop: '140px' }}>
        <ShapeLibrary />
      </div>

      {/* Tier 3: Theory Grimoire */}
      <div id="grimoire" style={{ scrollMarginTop: '120px', marginTop: '140px' }}>
        <TheoryGrimoire />
      </div>

      {/* Tier 4: About Section */}
      <div id="about" style={{ scrollMarginTop: '120px', marginTop: '160px' }}>
        <div className="glass-panel" style={{ padding: '60px 45px', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#00D7FF', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>THE PHILOSOPHY</span>
              <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#F4F4F2', lineHeight: '1.2', marginBottom: '20px', letterSpacing: '-0.8px' }}>
                Bridging Music Theory and Physical Intuition.
              </h2>
              <p style={{ fontSize: '15px', color: '#94A3B8', lineHeight: '1.7', marginBottom: '24px' }}>
                DEVILSTONE is an advanced guitar visualization console. Designed for serious students and professional guitarists alike, the platform translates abstract chord structures, scale relations, and CAGED patterns into immediate, geometric layouts.
              </p>
              <p style={{ fontSize: '15px', color: '#94A3B8', lineHeight: '1.7' }}>
                By isolating fingerboard patterns and syncing them with an audio-backed rhythm metronome, we build muscular and auditory memory maps simultaneously. Built on top of the comprehensive Gibson guitar curriculum.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div style={{ padding: '24px', background: 'rgba(18, 24, 39, 0.35)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <div style={{ fontSize: '20px', marginBottom: '10px' }}>🎸</div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#F4F4F2', marginBottom: '8px' }}>Active Fretboard</h4>
                <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.5', margin: 0 }}>
                  Interact with a 24-fret digital neck configured with customizable tunings and scale mappings.
                </p>
              </div>
              <div style={{ padding: '24px', background: 'rgba(18, 24, 39, 0.35)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <div style={{ fontSize: '20px', marginBottom: '10px' }}>⚡</div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#F4F4F2', marginBottom: '8px' }}>Pattern Isolation</h4>
                <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.5', margin: 0 }}>
                  Master Pentatonic shapes and CAGED systems with visual highlighted fingerboard overlays.
                </p>
              </div>
              <div style={{ padding: '24px', background: 'rgba(18, 24, 39, 0.35)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <div style={{ fontSize: '20px', marginBottom: '10px' }}>⏱️</div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#F4F4F2', marginBottom: '8px' }}>Metronome Sync</h4>
                <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.5', margin: 0 }}>
                  Practice in time with a high-accuracy, Web Audio-scheduled metronome sequencer.
                </p>
              </div>
              <div style={{ padding: '24px', background: 'rgba(18, 24, 39, 0.35)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <div style={{ fontSize: '20px', marginBottom: '10px' }}>🎓</div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#F4F4F2', marginBottom: '8px' }}>Academy LMS</h4>
                <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.5', margin: 0 }}>
                  Step-by-step progress tracking for all 20 lessons of the structured guitar curriculum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer style={{ marginTop: '180px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '50px', paddingBottom: '30px' }}>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-[60px] max-w-[1200px] mx-auto mb-10" style={{ boxSizing: 'border-box' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '16px', color: '#F4F4F2', marginBottom: '16px' }}>
              {logoIconSvg}
              <span>DEVILSTONE</span>
            </div>
            <p style={{ fontSize: '13.5px', color: '#94A3B8', lineHeight: '1.6', maxWidth: '320px', margin: 0 }}>
              The ultimate interactive fretboard console and learning management system for guitarists. Master your theory with precision.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#F4F4F2', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#fretboard" style={{ fontSize: '13px', color: '#94A3B8', textDecoration: 'none' }}>Console</a></li>
              <li><a href="#shapes" style={{ fontSize: '13px', color: '#94A3B8', textDecoration: 'none' }}>Shapes</a></li>
              <li><a href="#about" style={{ fontSize: '13px', color: '#94A3B8', textDecoration: 'none' }}>About</a></li>
              <li><Link href="/academy" style={{ fontSize: '13px', color: '#94A3B8', textDecoration: 'none' }}>Academy</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#F4F4F2', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Status</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
              <span style={{ fontSize: '13px', color: '#94A3B8' }}>Engine: Active</span>
            </div>
            <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, lineHeight: '1.4' }}>
              Currently in active development. Version 2.0-Alpha.
            </p>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.04)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontSize: '12px', color: '#4B5563', margin: 0 }}>
            © 2026 DEVILSTONE. All rights reserved. Designed and copywritten for aspiring guitarists.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ fontSize: '12px', color: '#4B5563', cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ fontSize: '12px', color: '#4B5563', cursor: 'pointer' }}>Terms of Service</span>
            <span style={{ fontSize: '12px', color: '#4B5563', cursor: 'pointer' }}>Licensing</span>
          </div>
        </div>
      </footer>
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
