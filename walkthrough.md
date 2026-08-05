# DEVILSTONE Fretboard Sizing & Bass Guitar Walkthrough

We added global selection parameters to swap between guitar and bass formats and visualize specific fretboard register segments.

---

## 1. Bass Guitar Support
- **Instrument Switcher:** Added a dropdown selector inside `ControlPanel.tsx` to toggle between standard 6-string Guitar and 4/5-string Bass.
- **Tuning Select Filtering:** Switching the instrument to Bass automatically filters the tuning options to bass-specific presets (Standard Bass E, Drop D Bass, 5-String Bass B, and Half Step Down Bass) and dynamically reduces the rendered fretboard string count.
- **Deep Plucking Tones:** The audio plucker synthesizes notes down to octave 1 (`E1` = 41.2Hz) and octave 0 (`B0` = 30.87Hz) for a deep, authentic bass tone.

---

## 2. Segmented Fret Ranges
- **Register Selector:** Added a dropdown selector in `ControlPanel.tsx` to choose visible fret windows:
  - **Full Fretboard:** Frets 0 to 24.
  - **Lower Register:** Frets 0 to 12.
  - **Higher Register:** Frets 12 to 24.
- **Calculated Neck Proportions:** Updated `Fretboard.tsx` to dynamically calculate the physical width of the neck based on the visible fret count (e.g. contracting it to `585px` for 12 frets). This prevents cells from stretching awkwardly and maintains realistic neck proportions.
