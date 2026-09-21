'use client';

import React from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { ControlPanel, SubFretboardPositionBar, BottomStudioConsoleBar } from '@/components/Controls/ControlPanel';
import Fretboard from '@/components/Fretboard/Fretboard';
import ShapeLibrary from '@/components/Shapes/ShapeLibrary';
import TheoryGrimoire from '@/components/Theory/TheoryGrimoire';
import RelatedChordsSidebar from '@/components/Theory/RelatedChordsSidebar';
import MetronomeModal from '@/components/Metronome/MetronomeModal';
import { THEME } from '@/constants/theme';
import Button from '@/components/UI/Button';
import Link from 'next/link';
import MaestroAssistant from '@/components/Assistant/MaestroAssistant';
import { Info, Compass, Guitar, LayoutGrid, Timer, Music, Mail } from 'lucide-react';

function DevilstoneContent() {
  const {
    isFocusMode,
    setIsFocusMode,
    selectedKey,
    selectedScale,
    activePosition,
    setIsRelatedChordsOpen,
    setIsMetronomeModalOpen,
  } = useApp();

  const containerStyle: React.CSSProperties = {
    fontFamily: THEME.fonts.tech,
    color: '#0F172A',
    minHeight: '100vh',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    width: '100%',
    overflowX: 'hidden',
  };

  const contentWrapperStyle: React.CSSProperties = {
    flex: '1 0 auto',
    padding: isFocusMode ? '0' : '0 24px 140px 24px',
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
  };

  return (
    <div className={isFocusMode ? 'focus-mode-active' : ''} style={containerStyle}>
      <div style={contentWrapperStyle}>
        {/* Floating Exit Focus Mode Button */}
        {isFocusMode && (
          <div style={{ position: 'fixed', top: '24px', right: '30px', zIndex: 1000 }}>
            <Button
              variant="secondary"
              onClick={() => setIsFocusMode(false)}
              style={{
                padding: '10px 20px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                color: '#0F172A',
                boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
              }}
            >
              ✕ Exit Focus Mode
            </Button>
          </div>
        )}

        {/* Studio Top Navbar matching clean FretMap inspiration */}
        <header className="flex items-center justify-between py-4 px-2 mb-6 border-b border-stone-200/80">
          {/* Left Navigation Links */}
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-4 text-xs font-semibold text-stone-600">
              <a href="#fretboard" className="hover:text-stone-900 transition-colors">
                Console
              </a>
              <a href="#shapes" className="hover:text-stone-900 transition-colors">
                Shapes
              </a>
              <a href="#grimoire" className="hover:text-stone-900 transition-colors">
                Grimoire
              </a>
              <a href="#about" className="hover:text-stone-900 transition-colors">
                About
              </a>
            </nav>
          </div>

          {/* Right: DEVILSTONE Branding & Academy Link */}
          <div className="flex items-center gap-3">
            <Link
              href="/academy"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200/80 text-xs font-bold text-stone-800 transition-all shadow-xs"
            >
              <Compass className="w-3.5 h-3.5 text-[#D9531E]" />
              <span>Academy</span>
            </Link>

            {/* Prominent DEVILSTONE Logo on Top Right */}
            <div className="flex items-center gap-2 pl-2 border-l border-stone-200/80">
              <div className="w-7 h-7 rounded-lg bg-stone-900 flex items-center justify-center text-white shadow-xs">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 22h20L12 2z" fill="#D9531E" />
                  <circle cx="12" cy="14" r="3" fill="#FAF7EE" />
                </svg>
              </div>
              <span className="font-extrabold tracking-tight text-sm text-stone-900">
                DEVILSTONE
              </span>
            </div>
          </div>
        </header>

        {/* Scale Title Header Area matching Screenshot 2 */}
        <section className="text-center pt-4 pb-4">
          <div className="inline-flex items-center gap-1.5 mb-1 text-center justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#D9531E]">
              {selectedKey} {selectedScale} Scale
            </h1>
            <button 
              onClick={() => document.getElementById('grimoire')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-stone-400 hover:text-stone-700 transition-colors p-1"
              title="View Scale Grimoire Details"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
          <div className="text-xs font-mono font-medium text-stone-500">
            {activePosition ? `Position ${activePosition}` : 'Full Neck'} &nbsp;/&nbsp; ⚲ {selectedKey}
          </div>
        </section>

        {/* Main Fretboard Studio Console */}
        <div id="fretboard" className="mt-2 scroll-mt-24">
          {/* Top Key / Scale / Mode Dropdowns Bar */}
          <ControlPanel />

          {/* Photorealistic Lacquered Maple Fretboard */}
          <Fretboard />

          {/* Sub-Fretboard Position Bar (ALL, 1, 2, 3, 4, 5) matching Screenshot 2 */}
          <SubFretboardPositionBar />
        </div>

        {/* Tier 2: Shape & Pattern Library */}
        <div id="shapes" className="mt-20 scroll-mt-24">
          <ShapeLibrary />
        </div>

        {/* Tier 3: Theory Grimoire */}
        <div id="grimoire" className="mt-20 scroll-mt-24">
          <TheoryGrimoire />
        </div>

        {/* Tier 4: About Section (Minimalist Studio Grid without heavy boxes) */}
        <div id="about" className="mt-24 scroll-mt-24">
          <div className="p-8 sm:p-12 rounded-2xl bg-white/80 border border-stone-200/80 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#D9531E] uppercase block mb-2">
                  THE PHILOSOPHY
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-snug mb-4">
                  Bridging Music Theory and Physical Fingerboard Intuition.
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed mb-4">
                  DEVILSTONE is an advanced guitar visualization console. Designed for serious students and professional guitarists alike, the platform translates abstract chord structures, scale relations, and CAGED patterns into immediate, geometric layouts.
                </p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  By isolating fingerboard patterns and syncing them with an audio-backed rhythm metronome, we build muscular and auditory memory maps simultaneously. Built on top of the comprehensive Gibson guitar curriculum.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-stone-50/80 border border-stone-200/70 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-orange-100/80 border border-orange-200/80 flex items-center justify-center text-[#D9531E] mb-3 shadow-xs">
                    <Guitar className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 mb-1">Maple Fretboard</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    24-fret authentic golden maple fingerboard with black phenolic dot inlays and bone nut.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-stone-50/80 border border-stone-200/70 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200/80 flex items-center justify-center text-stone-800 mb-3 shadow-xs">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 mb-1">Box Pattern Isolator</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Instantly toggle between Positions 1–5 to isolate scale boxes and practice fluid solos.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-stone-50/80 border border-stone-200/70 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100/80 border border-emerald-200/80 flex items-center justify-center text-emerald-700 mb-3 shadow-xs">
                    <Timer className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 mb-1">Studio Metronome</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Precision Web Audio scheduled metronome with custom subdivision and accent presets.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-stone-50/80 border border-stone-200/70 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-sky-100/80 border border-sky-200/80 flex items-center justify-center text-sky-700 mb-3 shadow-xs">
                    <Music className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 mb-1">Diatonic Related Chords</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Explore all 7 diatonic triad chords with real-time polyphonic audio previews.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-over Flyout: Related Chords (Screenshot 2) */}
      <RelatedChordsSidebar />

      {/* Modal Dialog: Metronome Settings (Screenshot 3) */}
      <MetronomeModal />

      {/* Sticky Bottom Studio Console Bar matching Screenshot 2 */}
      <BottomStudioConsoleBar />

      {/* Studio Footer Section (Complete 3-Column Studio Footer with Safe Dock Clearance) */}
      <footer className="border-t-2 border-stone-300/80 bg-[#FAF9F6]/95 backdrop-blur-md pt-14 pb-40 px-6 text-stone-600 mt-20 z-10 relative">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-200/80">
          {/* Column 1: DEVILSTONE Branding (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-stone-900 flex items-center justify-center text-white shadow-xs">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 22h20L12 2z" fill="#D9531E" />
                  <circle cx="12" cy="14" r="3" fill="#FAF7EE" />
                </svg>
              </div>
              <span className="font-extrabold tracking-tight text-lg text-stone-900">
                DEVILSTONE
              </span>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed max-w-sm">
              The ultimate interactive fretboard console and theory learning system for guitarists. Master physical intuition, scale geometry, and CAGED patterns with precision.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-mono font-medium text-emerald-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Systems Operational • Real-time Web Audio Engine</span>
            </div>
          </div>

          {/* Column 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold font-mono tracking-wider text-stone-900 uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#fretboard" className="text-stone-600 hover:text-stone-900 transition-colors font-medium">
                  Fretboard Console
                </a>
              </li>
              <li>
                <a href="#shapes" className="text-stone-600 hover:text-stone-900 transition-colors font-medium">
                  Shape Library
                </a>
              </li>
              <li>
                <a href="#grimoire" className="text-stone-600 hover:text-stone-900 transition-colors font-medium">
                  Theory Grimoire
                </a>
              </li>
              <li>
                <Link href="/academy" className="text-stone-600 hover:text-[#D9531E] transition-colors font-medium flex items-center gap-1.5">
                  <span>Academy</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-orange-100 text-[#D9531E] font-bold">20 Lessons</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsRelatedChordsOpen(true)}
                  className="text-stone-600 hover:text-stone-900 transition-colors font-medium text-left"
                >
                  Diatonic Chords Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsMetronomeModalOpen(true)}
                  className="text-stone-600 hover:text-stone-900 transition-colors font-medium text-left"
                >
                  Studio Metronome
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Developer Card & Socials (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold font-mono tracking-wider text-stone-900 uppercase mb-4">
              Developer
            </h4>
            <div className="p-4 rounded-xl bg-white/80 border border-stone-200/80 shadow-xs space-y-3">
              <div>
                <div className="text-sm font-bold text-stone-900">
                  Aravinda Kambar
                </div>
                <div className="text-xs text-stone-500">
                  Full-stack Audio & Systems Engineer
                </div>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Enjoy and practice more! Feel free to reach out for feedback, feature suggestions, or collaboration.
              </p>
              <div className="flex items-center gap-2 pt-1">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/aravinda-kambar-58b622255/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-[#0077b5] text-stone-700 hover:text-white flex items-center justify-center transition-all shadow-xs"
                  title="Aravinda Kambar on LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
                {/* Email */}
                <a
                  href="mailto:aravindachar2004@gmail.com"
                  className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-[#D9531E] text-stone-700 hover:text-white flex items-center justify-center transition-all shadow-xs"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
                {/* GitHub */}
                <a
                  href="https://github.com/aravindachar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-900 text-stone-700 hover:text-white flex items-center justify-center transition-all shadow-xs"
                  title="GitHub Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="max-w-[1300px] mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © 2026 DEVILSTONE. Designed and copywritten for aspiring guitarists.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-800 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-stone-800 cursor-pointer transition-colors">Terms of Service</span>
            <a href="#fretboard" className="hover:text-stone-800 transition-colors font-medium">Back to Top ↑</a>
          </div>
        </div>
      </footer>

      <MaestroAssistant />
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
