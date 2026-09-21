import type { NoteName, ScaleType } from '../../types/music';

export interface CurriculumLesson {
  id: string;
  sessionNumber: number;
  sessionTitle: string;
  subtopicTitle: string;
  category: 'Anatomy & Basics' | 'Technique' | 'Chords' | 'Scales' | 'Blues' | 'Jazz' | 'Theory' | 'Improvisation';
  keyConcepts: string[];
  recommendedScale?: ScaleType;
  recommendedKey?: NoteName;
  recommendedChord?: string;
  formula?: string;
  summary: string;
  content: string;
}

export const CURRICULUM_LESSONS: CurriculumLesson[] = [
  // SESSION 1
  {
    id: 's1-parts',
    sessionNumber: 1,
    sessionTitle: 'Session 1: Starting Off Right',
    subtopicTitle: 'The Parts of the Guitar & String Tuning',
    category: 'Anatomy & Basics',
    keyConcepts: ['Headstock', 'Nut', 'Fretboard', 'Frets', 'Standard Tuning', 'EADGBE'],
    recommendedKey: 'E',
    summary: 'Anatomy of acoustic, electric, and classical guitars, plus standard tuning intervals.',
    content: `Understanding guitar anatomy:
- Headstock houses the tuning pegs (machine heads).
- The Nut is the bone or synthetic divider setting string spacing and zero-fret height.
- The Fretboard has nickel frets dividing the neck into chromatic semitones (half-steps).
- Standard Tuning from lowest (6th) to highest (1st) string is: E2 - A2 - D3 - G3 - B3 - E4.
Notice the interval between strings is mostly Perfect 4ths (5 semitones: E->A, A->D, D->G, B->E), with one Major 3rd interval between G and B (4 semitones). This Major 3rd asymmetry is why chord shapes change across the 3rd and 2nd strings.`
  },
  {
    id: 's1-technique',
    sessionNumber: 1,
    sessionTitle: 'Session 1: Starting Off Right',
    subtopicTitle: 'Proper Left & Right Hand Technique',
    category: 'Technique',
    keyConcepts: ['Pinky Bracing', 'Pick Angle', 'Thumb Behind Neck', 'Fingertip Arch', 'Wrist Space'],
    summary: 'Foundational ergonomic principles to prevent fatigue and achieve clear tone.',
    content: `Ergonomics and biomechanics for guitar:
1. Picking Hand: Hold the pick at a 90-degree angle between the thumb pad and side of index finger with 1/4 to 1/2 inch exposed. Use pinky bracing for spatial anchoring. Picking motion comes from wrist rotation, not elbow/forearm.
2. Fretting Hand: Keep thumb flat against the back-center of the neck. Do not choke the neck with palm contact; leave an air pocket beneath the fretboard. Press strings with the very tips of your curved fingers directly behind the fret wire for buzz-free resonance.`
  },
  {
    id: 's1-c-g7',
    sessionNumber: 1,
    sessionTitle: 'Session 1: Starting Off Right',
    subtopicTitle: 'The C and G7 Chords',
    category: 'Chords',
    keyConcepts: ['C Major Chord', 'G7 Dominant Seventh', 'Tension and Resolution', 'Tonic and Dominant'],
    recommendedKey: 'C',
    recommendedScale: 'Major',
    recommendedChord: 'Dominant 7th',
    formula: 'C: 1 - 3 - 5 (C-E-G) | G7: 1 - 3 - 5 - b7 (G-B-D-F)',
    summary: 'The relationship between the C Major tonic chord and the G7 dominant seventh chord.',
    content: `The primary harmonic motion in Western music: Tonic to Dominant (I - V7).
- C Major: Notes C - E - G (Root, Major 3rd, Perfect 5th). Stable tonic harmony.
- G7 Dominant 7th: Notes G - B - D - F (Root, Major 3rd, Perfect 5th, Minor 7th).
The tritone interval between B (leading tone) and F (subdominant 4th) in G7 creates harmonic tension that seeks urgent resolution inward: B resolves upward to C, and F resolves downward to E, pulling the harmony back to C Major.`
  },

  // SESSION 2 & 3
  {
    id: 's2-reading',
    sessionNumber: 2,
    sessionTitle: 'Session 2: Reading Music & 1st/2nd Strings',
    subtopicTitle: 'Rhythm, Note Duration & First Position Notes',
    category: 'Theory',
    keyConcepts: ['Treble Clef', 'Whole Note', 'Half Note', 'Quarter Note', 'Time Signatures 4/4', 'High E & B String Notes'],
    summary: 'Reading notation on the treble staff and mastering notes on strings 1 and 2.',
    content: `Standard music notation basics:
- Treble Clef (G Clef): Lines are E-G-B-D-F ("Every Good Boy Does Fine"), Spaces are F-A-C-E.
- 1st String (High E): Open E (E4), 1st Fret F (F4), 3rd Fret G (G4). Notice E to F is a half-step (adjacent frets), F to G is a whole-step (skip one fret).
- 2nd String (B): Open B (B3), 1st Fret C (C4), 3rd Fret D (D4). Notice B to C is a natural half-step.
- Rhythmic values: Whole note (4 beats), Half note (2 beats), Quarter note (1 beat). In 4/4 time, each measure contains 4 quarter-note beats.`
  },
  {
    id: 's3-strings34',
    sessionNumber: 3,
    sessionTitle: 'Session 3: Notes on 3rd & 4th Strings',
    subtopicTitle: 'Eighth Notes & Mid-Register Reading',
    category: 'Theory',
    keyConcepts: ['G String Notes', 'D String Notes', 'Eighth Notes', 'Ties and Dotted Notes', 'Alternate Picking'],
    summary: '3rd and 4th string notes, eighth-note subdivisions, and alternate picking.',
    content: `Expanding into middle register:
- 3rd String (G): Open G (G3), 2nd Fret A (A3).
- 4th String (D): Open D (D3), 2nd Fret E (E3), 3rd Fret F (F3).
- Eighth Notes: Counted "1-and-2-and-3-and-4-and". Downstroke on numbers (downbeats), upstroke on "and" (upbeats).
- Alternate picking (Down-Up-Down-Up) maintains rhythmic momentum and timing precision.`
  },

  // SESSION 4 & 5
  {
    id: 's4-accidentals',
    sessionNumber: 4,
    sessionTitle: 'Session 4: Notes on 5th & 6th Strings',
    subtopicTitle: 'Sharps, Flats, Natural Signs & Low Register',
    category: 'Theory',
    keyConcepts: ['Sharps #', 'Flats b', 'Naturals', 'Enharmonic Equivalents', '5th & 6th Strings', 'Am and E Chords'],
    recommendedKey: 'A',
    recommendedScale: 'Natural Minor',
    summary: 'Low string register, accidentals, enharmonics, and introduction of Am and E chords.',
    content: `Accidentals and the low register:
- Sharp (#): Raises a note by one half-step (+1 fret).
- Flat (b): Lowers a note by one half-step (-1 fret).
- Natural: Cancels a previous sharp or flat.
- Enharmonics: Notes that sound identical but are spelled differently (e.g., F# = Gb, C# = Db, G# = Ab, A# = Bb).
- 5th String (A): Open A, 2nd Fret B, 3rd Fret C.
- 6th String (Low E): Open E, 1st Fret F, 3rd Fret G.
- Am Chord: A - C - E (1 - b3 - 5). Notice the minor third (C) creates a somber, dark quality compared to A Major (C#).`
  },
  {
    id: 's5-open-chords',
    sessionNumber: 5,
    sessionTitle: 'Session 5: Basic Open Chords',
    subtopicTitle: 'The Essential Open Chords & Smooth Transitions',
    category: 'Chords',
    keyConcepts: ['C Major', 'G Major', 'D Major', 'Em', 'Am', 'E Major', 'A Major', 'Dm', 'Anchor Fingers'],
    recommendedKey: 'G',
    recommendedScale: 'Major',
    summary: 'The standard 8 open chords, pivot/anchor finger transitions, and diatonic harmony in G and C.',
    content: `Mastering the fundamental open cowboy chords:
- Major Triad Formula: 1 - 3 - 5 (Root, Major 3rd, Perfect 5th). Chords: C, G, D, A, E.
- Minor Triad Formula: 1 - b3 - 5 (Root, Minor 3rd, Perfect 5th). Chords: Am, Em, Dm.
- Pivot / Anchor Fingers: When transitioning between G Major and C Major (or G and D), keep common fingers anchored to the fretboard to minimize hand movement and maximize switching speed.
- Common Progressions: In the key of G, G (I) -> Em (vi) -> C (IV) -> D (V) forms the classic '50s pop progression.`
  },

  // SESSION 6
  {
    id: 's6-min7-sus',
    sessionNumber: 6,
    sessionTitle: 'Session 6: Minor Seventh & Suspended Chords',
    subtopicTitle: 'Minor Seventh (m7) and Suspended (sus2 / sus4) Chords',
    category: 'Chords',
    keyConcepts: ['Minor 7th Formula', 'Sus2', 'Sus4', 'Omitting the 3rd', 'Resolving Suspensions'],
    recommendedKey: 'A',
    recommendedScale: 'Dorian',
    recommendedChord: 'Minor 7th',
    formula: 'Minor 7th: 1 - b3 - 5 - b7 | Sus2: 1 - 2 - 5 | Sus4: 1 - 4 - 5',
    summary: 'Harmonic color of m7 chords and the suspenseful character of suspended chords.',
    content: `Minor 7th and Suspended chord theory:
1. Minor 7th (m7): 1 - b3 - 5 - b7 (e.g. Am7 = A - C - E - G, Em7 = E - G - B - D).
   - Character: Mellow, smooth, soulful, jazzy. Dropping the octave root in an open Am or Em creates the m7.
   - Scale Compatibility: Both Natural Minor (Aeolian) and Dorian modes work over m7 chords! Dorian is preferred in funk/fusion because its natural 6th avoids the sad 'b6' clash.
2. Suspended Chords (Sus2 and Sus4):
   - Replace the harmonic 3rd with either the 2nd (Sus2) or the 4th (Sus4).
   - Because they lack a 3rd, they are neither Major nor Minor! They create unresolved open tension that typically resolves down or up to the Major 3rd (e.g., Dsus4 -> D Major).`
  },

  // SESSION 7 & 8: BARRE CHORDS & SCALES
  {
    id: 's7-barre6',
    sessionNumber: 7,
    sessionTitle: 'Session 7: Barre Chords on the 6th String',
    subtopicTitle: 'Root 6 Barre Chords & The Major Scale Formula',
    category: 'Chords',
    keyConcepts: ['Root 6 Barre', 'E-Shape Barre', 'E-Minor Barre Shape', 'Major Scale Formula W-W-H-W-W-W-H', 'Movable Chords'],
    recommendedKey: 'F',
    recommendedScale: 'Major',
    formula: 'Major Scale Step Pattern: W - W - H - W - W - W - H (Whole = 2 frets, Half = 1 fret)',
    summary: 'How movable E-shape barre chords work on the 6th string and the universal major scale formula.',
    content: `Root-6 Barre Chords and Major Scale derivation:
1. The Movable Concept: Take the open E Major chord. By laying your index finger flat across all 6 strings like a movable nut (the barre) and forming the open E shape with fingers 2, 3, and 4, you can slide this chord anywhere along the neck.
   - Fret 1 = F Major. Fret 3 = G Major. Fret 5 = A Major. Fret 7 = B Major. Fret 8 = C Major.
   - Lifting finger 2 removes the Major 3rd, leaving the Minor 3rd, turning the shape into a Root-6 Minor Barre chord (Em shape)!
2. Major Scale Construction:
   - Built with the step formula: Whole, Whole, Half, Whole, Whole, Whole, Half (W-W-H-W-W-W-H).
   - On guitar: A whole-step is 2 frets; a half-step is 1 fret.
   - Example C Major: C -(W)-> D -(W)-> E -(H)-> F -(W)-> G -(W)-> A -(W)-> B -(H)-> C.`
  },
  {
    id: 's8-barre5',
    sessionNumber: 8,
    sessionTitle: 'Session 8: Barre Chords on the 5th String',
    subtopicTitle: 'Root 5 Barre Chords, Key Signatures & Relative Minor',
    category: 'Chords',
    keyConcepts: ['Root 5 Barre', 'A-Shape Barre', 'Am-Shape Barre', 'Circle of Fifths', 'Relative Major & Minor'],
    recommendedKey: 'C',
    recommendedScale: 'Natural Minor',
    formula: 'Relative Minor is always the 6th degree of the Major Scale (3 semitones / 3 frets down)',
    summary: 'Root 5 A-shapes, circle of fifths, and finding relative minor keys.',
    content: `Root-5 Barre Chords & Key Relationships:
1. Root-5 Barre: Uses the open A Major and A Minor shapes barred across the 5th string (mute the low 6th string).
   - Fret 3 on 5th string = C Major (A shape).
   - Fret 3 on 5th string = C Minor (Am shape).
   - Fret 5 on 5th string = D Major.
2. Relative Major and Minor:
   - Every Major scale shares the exact same 7 notes with a "relative minor" scale starting on its 6th degree (vi).
   - Formula: Major root minus 3 half-steps (3 frets) = Relative Minor root.
   - Example: C Major (C D E F G A B) -> 6th note is A -> Relative Minor is A Natural Minor (A B C D E F G).
   - G Major -> Relative is E Minor.
   - D Major -> Relative is B Minor.`
  },

  // SESSION 9 & 10
  {
    id: 's9-strum-intervals',
    sessionNumber: 9,
    sessionTitle: 'Session 9: The Secret to Great Strumming',
    subtopicTitle: 'Intervals Breakdown & Dynamic Strumming',
    category: 'Theory',
    keyConcepts: ['Intervals', 'Semitone Distances', 'Unison', 'Minor 2nd', 'Major 2nd', 'Minor 3rd', 'Major 3rd', 'Perfect 4th', 'Tritone', 'Perfect 5th', 'Minor 6th', 'Major 6th', 'Minor 7th', 'Major 7th', 'Octave'],
    summary: 'Deep dive into intervals—the fundamental atomic building blocks of all chords and scales.',
    content: `The 12 Musical Intervals (measured from Root in semitones/frets):
- 0 frets: Root / Unison (1)
- 1 fret: Minor 2nd (b2) - Dissonant, tense
- 2 frets: Major 2nd (2) - Melodic step
- 3 frets: Minor 3rd (b3) - Defines MINOR harmony (dark, sad)
- 4 frets: Major 3rd (3) - Defines MAJOR harmony (bright, happy)
- 5 frets: Perfect 4th (4) - Suspended, open
- 6 frets: Tritone / Diminished 5th / Augmented 4th (b5 / #4) - Maximum tension, "Devil's interval"
- 7 frets: Perfect 5th (5) - Strong, resonant power chord interval
- 8 frets: Minor 6th (b6) - Melancholic
- 9 frets: Major 6th (6) - Sweet, Dorian flavor
- 10 frets: Minor 7th (b7) - Dominant / Blues tension
- 11 frets: Major 7th (7) - Dreamy, jazz flavor
- 12 frets: Octave (8) - Pure harmonic identity`
  },
  {
    id: 's10-fingerstyle',
    sessionNumber: 10,
    sessionTitle: 'Session 10: Fingerstyle Guitar',
    subtopicTitle: 'Fingerstyle Mechanics & Travis Picking',
    category: 'Technique',
    keyConcepts: ['P-I-M-A', 'Alternating Bassline', 'Travis Picking', 'Arpeggio Patterns'],
    summary: 'Classical right-hand finger designation and independent bassline Travis picking.',
    content: `Fingerstyle principles:
- Hand Designation (Spanish terminology): P = Pulgar (Thumb), I = Indice (Index), M = Medio (Middle), A = Anular (Ring).
- Standard assignment: Thumb (P) commands the bass strings (6, 5, 4). Index (I) plays string 3. Middle (M) plays string 2. Ring (A) plays string 1.
- Travis Picking: The thumb plays a steady alternating quarter-note bass pulse (e.g. string 5 to 4 or string 6 to 4) while the fingers syncopate melody on treble strings.`
  },

  // SESSION 11: PENTATONICS
  {
    id: 's11-pentatonics',
    sessionNumber: 11,
    sessionTitle: 'Session 11: Pentatonic Scales',
    subtopicTitle: 'Pentatonic Scales, Forms & 5 Box Shapes',
    category: 'Scales',
    keyConcepts: ['Minor Pentatonic', 'Major Pentatonic', '5 CAGED Box Shapes', 'Safe Notes', 'Omitting Half-Steps'],
    recommendedKey: 'A',
    recommendedScale: 'Minor Pentatonic',
    formula: 'Minor Pentatonic: 1 - b3 - 4 - 5 - b7 | Major Pentatonic: 1 - 2 - 3 - 5 - 6',
    summary: 'The 5 interlocking pentatonic box shapes across the neck and why they are the bedrock of lead guitar.',
    content: `Pentatonic scale theory and geometry:
1. Why Pentatonics Work:
   - The Natural Minor scale has 7 notes: 1 - 2 - b3 - 4 - 5 - b6 - b7.
   - The two notes that cause the most dissonance and clash against chords are the 2nd and the b6th (which form half-steps against the b3 and 5).
   - By removing the 2nd and b6th degrees, you get the 5-note Minor Pentatonic: 1 - b3 - 4 - 5 - b7.
   - With no harsh half-steps or tritones, almost ANY note in the scale sounds consonant and melodic over minor and blues progressions!
2. Major Pentatonic:
   - Derived from Major scale (1 - 2 - 3 - 4 - 5 - 6 - 7) by removing the 4th and 7th degrees.
   - Formula: 1 - 2 - 3 - 5 - 6. Sweet, vocal, uplifting.
3. The 5 Box Shapes:
   - The fretboard is divided into 5 interlocking two-notes-per-string patterns corresponding to CAGED positions.
   - Box 1 (Root on 6th string, fret 5 for A minor) is the universally famous rock box.`
  },

  // SESSION 12: ADVANCED CHORDS
  {
    id: 's12-adv-chords',
    sessionNumber: 12,
    sessionTitle: 'Session 12: Advanced Chords',
    subtopicTitle: 'Major 7th, Minor 11th & Chord Substitution',
    category: 'Chords',
    keyConcepts: ['Major 7th Chords', 'Minor 11th Chords', 'Tensions 9, 11, 13', 'Chord Substitution', 'Tritone Substitution'],
    recommendedKey: 'C',
    recommendedScale: 'Major 7th',
    recommendedChord: 'Major 7th',
    formula: 'Maj7: 1 - 3 - 5 - 7 | m11: 1 - b3 - 5 - b7 - 9 - 11',
    summary: 'Extended chord voicings, chord extensions beyond the octave, and substitution principles.',
    content: `Advanced Harmony & Extensions:
1. Major 7th (Maj7): 1 - 3 - 5 - 7. The natural 7th gives it a lush, nostalgic, bittersweet jazz/bossa nova timbre (e.g. Cmaj7 = C - E - G - B).
2. Minor 11th (m11): 1 - b3 - 5 - b7 - 9 - 11. Incorporates both the 9th (2nd an octave up) and the 11th (4th an octave up). Highly atmospheric and modern Neo-Soul sound.
3. Chord Substitution Rules:
   - Diatonic Third Substitution: Chords that share 3 out of 4 notes can substitute for each other.
   - In Key of C Major: Cmaj7 (C-E-G-B) shares E-G-B with Em7 (E-G-B-D) and Am7 (A-C-E-G). Em7 or Am7 can frequently substitute for Cmaj7.
   - Secondary Dominants: Preceding any chord with its own V7 chord creates forward motion.`
  },

  // SESSION 13: THE BLUES
  {
    id: 's13-blues',
    sessionNumber: 13,
    sessionTitle: 'Session 13: Playing the Blues',
    subtopicTitle: 'The Blues Scale, Blue Note & 12-Bar Blues',
    category: 'Blues',
    keyConcepts: ['Blues Scale', 'Blue Note b5', '12-Bar Blues', 'I-IV-V Progressions', 'Dominant 7th Over Blues', 'Minor Over Major Ambiguity'],
    recommendedKey: 'E',
    recommendedScale: 'Blues',
    recommendedChord: 'Dominant 7th',
    formula: 'Blues Scale: 1 - b3 - 4 - b5 - 5 - b7 (Adds the diminished 5th / tritone to Minor Pentatonic)',
    summary: 'The theoretical secret of why the minor blues scale works over dominant chords in a 12-bar blues.',
    content: `The Mystery and Mastery of Blues Theory:
1. Why Minor Blues Works Over Dominant 7th Chords:
   - In standard classical theory, playing a Minor 3rd (b3) over a Major chord (which contains a natural 3) is a forbidden clash.
   - But in the Blues, all three chords in the 12-bar progression (I7, IV7, V7) are Dominant 7th chords containing a flat 7th.
   - When you play the b3 of the blues scale, guitarists micro-bend it upward (~quarter tone) toward the natural 3. This pitch friction between the minor 3rd and major 3rd is the fundamental expressive vocal cry of blues!
2. The Blue Note (b5 / #4):
   - Adding the diminished 5th (b5) between the 4th and 5th degrees creates the 6-note Blues scale: 1 - b3 - 4 - b5 - 5 - b7.
   - In A Blues: A - C - D - Eb - E - G. The Eb is the blue note. It is a passing dissonance that begs to slide or bend into the stable 5th (E) or resolve to the 4th (D).
3. The 12-Bar Blues Form (in Key of A):
   - Measures 1-4: A7 (I) - A7 - A7 - A7 (or Quick IV to D7 in bar 2)
   - Measures 5-6: D7 (IV) - D7
   - Measures 7-8: A7 (I) - A7
   - Measures 9-10: E7 (V) - D7 (IV)
   - Measures 11-12: A7 (I) - E7 (V Turnaround)`
  },

  // SESSION 14: STYLE & ARTICULATION
  {
    id: 's14-articulations',
    sessionNumber: 14,
    sessionTitle: 'Session 14: Giving Your Playing Some Style',
    subtopicTitle: 'Slides, Bends, Hammer-ons, Pull-offs, Vibrato & Harmonics',
    category: 'Technique',
    keyConcepts: ['Whole-Step Bends', 'Half-Step Bends', 'Legato', 'Hammer-on', 'Pull-off', 'Vibrato', 'Natural & Pinch Harmonics'],
    summary: 'The expressive mechanics that make guitar solos sound vocal and emotional.',
    content: `Expressive Soloing Mechanics:
1. String Bending:
   - Half-step bend: Pitch rises by 1 fret.
   - Whole-step bend: Pitch rises by 2 frets.
   - Form: Never bend with a single finger. Reinforce your bending finger (ring finger) with your index and middle fingers behind it. Rotate from the forearm/wrist, not finger joints!
2. Vibrato: The fingerprint of a guitarist. Generated by rhythmic wrist oscillation altering string tension.
3. Hammer-ons & Pull-offs (Legato): Pluck only the first note, producing subsequent notes via left-hand finger impact (hammer) or downward snap (pull-off).
4. Harmonics:
   - Natural harmonics sound at node divisions along the string (Frets 12 = octave, Fret 7 = 5th + octave, Fret 5 = double octave).
   - Pinch harmonics: Catch the edge of your picking thumb immediately after pick contact on an electric guitar with overdrive.`
  },

  // SESSION 15: ROCK & POWER CHORDS
  {
    id: 's15-rock-harmonized',
    sessionNumber: 15,
    sessionTitle: 'Session 15: Electric Guitars-The Heart of Rock & Roll',
    subtopicTitle: 'Power Chords & The Harmonized Major Scale',
    category: 'Chords',
    keyConcepts: ['Power Chords (5 Chords)', 'Root 6 & 5 Power Chords', 'Harmonized Major Scale', 'I - ii - iii - IV - V - vi - vii°', 'Diatonic Triads'],
    recommendedKey: 'E',
    recommendedScale: 'Major',
    formula: 'Power Chord: 1 - 5 (No 3rd, neutral tonality) | Harmonized Major Triads: I (Maj), ii (min), iii (min), IV (Maj), V (Maj), vi (min), vii° (dim)',
    summary: 'Why power chords sound massive under distortion and how to harmonize the major scale.',
    content: `Electric guitar rock harmony:
1. Power Chords (e.g. E5, A5, G5):
   - Formula: Root + Perfect 5th (1 - 5), often doubling the octave root (1 - 5 - 1).
   - Why they sound so clear with distortion: Overdrive generates heavy intermodulation distortion. Major and Minor 3rds create muddy clash frequencies when distorted, but the pure acoustic ratio of the Perfect 5th (3:2) remains tight, punchy, and aggressive.
2. Harmonizing the Major Scale in Triads:
   - Every note of the Major scale builds a 3-note chord using stacked thirds from the parent scale:
   - I: Major (Tonic)
   - ii: Minor (Supertonic)
   - iii: Minor (Mediant)
   - IV: Major (Subdominant)
   - V: Major (Dominant)
   - vi: Minor (Submediant / Relative Minor)
   - vii°: Diminished (Leading tone)
   In the Key of C: C - Dm - Em - F - G - Am - Bdim. Knowing this formula tells you instantly which chords belong together in any key!`
  },

  // SESSION 16: ADVANCED STRUMMING
  {
    id: 's16-strumming16',
    sessionNumber: 16,
    sessionTitle: 'Session 16: Advanced Strumming',
    subtopicTitle: '16th Notes Subdivision, Funk Rhythms & Ghost Strums',
    category: 'Technique',
    keyConcepts: ['16th Notes', '1-e-&-a Subdivision', 'Ghost / Scratch Strum', 'Syncopation', 'Continuous Strumming Arm'],
    summary: '16th note timing, funk percussive muting, and perpetual motion strumming.',
    content: `Rhythmic subdivision mastery:
1. 16th Note Counting: Divide each beat into 4 pulses: "1 - e - and - a, 2 - e - and - a, 3 - e - and - a, 4 - e - and - a".
   - Downstrokes on numbers and "and" (1, &, 2, &, 3, &, 4, &).
   - Upstrokes on "e" and "a".
2. The Perpetual Motion Engine: Your right arm must keep moving up and down continuously like a pendulum at 16th-note speed. When you don't want a chord to sound, your hand still swings but misses the strings or lightly mutes them (ghost strum).
3. Funk Rhythms: Lightly releasing fretting pressure turns chords into tight percussive scratch beats ('chank'). Syncopating accents onto the 'e' or 'a' creates irresistible groove.`
  },

  // SESSION 17: BEYOND FIRST POSITION
  {
    id: 's17-beyond-first',
    sessionNumber: 17,
    sessionTitle: 'Session 17: Going Beyond the First Position',
    subtopicTitle: '3 Notes Per String (3NPS) Scales & Speed Picking',
    category: 'Scales',
    keyConcepts: ['3 Notes Per String (3NPS)', 'Symmetrical Picking', 'Economy Picking', 'Fretboard Navigation', 'Modes Across the Neck'],
    recommendedKey: 'G',
    recommendedScale: 'Major',
    formula: '3NPS: Exactly 3 notes on every string, spanning the full 7 modes consecutively across the neck',
    summary: 'The 3 Notes Per String system for high-speed linear runs and total neck coverage.',
    content: `The 3 Notes Per String (3NPS) System:
1. Why 3NPS is Favored by Modern Virtuosos:
   - Traditional CAGED patterns have an irregular number of notes per string (some 2, some 3).
   - 3NPS forces exactly 3 notes onto EVERY string for all 7 modes of the major scale.
   - Because every string has 3 notes, picking patterns become completely uniform: Down-Up-Down, Up-Down-Up (or Down-Up-Down on every string using Economy / Sweep picking).
2. The 7 Patterns:
   - Starting pattern 1 on the 1st degree gives Ionian.
   - Pattern 2 on the 2nd degree gives Dorian.
   - Pattern 3 gives Phrygian, Pattern 4 Lydian, Pattern 5 Mixolydian, Pattern 6 Aeolian, Pattern 7 Locrian.
   - Mastering 3NPS allows fluid horizontal connection from fret 1 to fret 24.`
  },

  // SESSION 18: JAZZ & MODES
  {
    id: 's18-jazz',
    sessionNumber: 18,
    sessionTitle: 'Session 18: Jazz',
    subtopicTitle: 'Jazz Chords, Voice Leading & The ii - V - I Progression',
    category: 'Jazz',
    keyConcepts: ['ii-V-I Progression', 'Voice Leading', 'Guide Tones (3rds & 7ths)', 'Dorian Mode', 'Mixolydian Mode', 'Ionian Mode', 'Jazz Minor'],
    recommendedKey: 'C',
    recommendedScale: 'Dorian',
    recommendedChord: 'Minor 7th',
    formula: 'Major ii - V - I: ii (Minor 7th) -> V (Dominant 7th) -> I (Major 7th)',
    summary: 'The backbone of jazz harmony: why modal choices like Dorian and Mixolydian fit the ii-V-I progression.',
    content: `Jazz Harmony & Modal Application:
1. The ii - V - I Progression:
   - In Key of C Major: Dm7 (ii) -> G7 (V) -> Cmaj7 (I).
   - This is the single most celebrated chord sequence in jazz history.
2. Why Modal Scales Work Over Each Chord:
   - Over Dm7 (ii chord): Use **D Dorian** (1-2-b3-4-5-6-b7). Dorian's natural 6th (B) is bright and avoids the clash of the flat-6 found in natural minor.
   - Over G7 (V chord): Use **G Mixolydian** (1-2-3-4-5-6-b7). Its flat-7th (F) and major 3rd (B) precisely outline the dominant tritone tension of G7.
   - Over Cmaj7 (I chord): Use **C Ionian (Major)** (1-2-3-4-5-6-7) or **C Lydian** (with #4 for extra color).
   - Notice: D Dorian, G Mixolydian, and C Major share the EXACT same 7 notes (C D E F G A B)! The tonal center shifts as the bass notes move from D -> G -> C.
3. Guide Tones (3rds and 7ths):
   - The 3rd and 7th degrees define chord quality. In a ii-V-I, the 7th of Dm7 (C) moves down a half-step to become the 3rd of G7 (B). The 7th of G7 (F) moves down a half-step to become the 3rd of Cmaj7 (E). This smooth voice leading creates effortless jazz solos.`
  },

  // SESSION 19: SOLOING & EAR TRAINING
  {
    id: 's19-soloing',
    sessionNumber: 19,
    sessionTitle: 'Session 19: Soloing',
    subtopicTitle: 'Soloing Principles, Phrasing, Target Tones & Ear Training',
    category: 'Improvisation',
    keyConcepts: ['Target Tones', 'Call and Response', 'Rhythmic Space', 'Ear Training', 'Singing What You Play'],
    summary: 'How to craft memorable melodic guitar solos rather than just running up and down scales.',
    content: `The Art of Melodic Soloing:
1. Target Tones:
   - Amateurs play scales; masters target chord tones.
   - When the backing chord changes (e.g., from A7 to D7), land your focal note on a chord tone of the new chord (the Root, 3rd, 5th, or 7th of D). Hitting the 3rd of the new chord on beat 1 provides instant harmonic sophistication.
2. Phrasing & Breathing:
   - Treat your guitar like a vocalist or saxophonist. Play a phrase, then STOP and leave space (silence). Space gives the listener time to absorb your melody.
   - Use Call and Response: State a musical question in low register, then answer it higher up on the neck.
3. Ear Training:
   - Practice singing or humming a 3-note melody first, then immediately locate and play those exact notes on the fretboard. This connects your musical brain directly to your fingers.`
  },

  // SESSION 20: CHORD INVERSIONS & FORMULAS
  {
    id: 's20-inversions',
    sessionNumber: 20,
    sessionTitle: 'Session 20: All the Chords You Need To Know',
    subtopicTitle: 'Advanced Chord Formulas, Inversions & Drop 2 Voicings',
    category: 'Chords',
    keyConcepts: ['Chord Inversions', 'Root Position', '1st Inversion (3rd in bass)', '2nd Inversion (5th in bass)', '3rd Inversion (7th in bass)', 'Drop 2 Chords', 'Slash Chords'],
    recommendedKey: 'C',
    recommendedScale: 'Major',
    recommendedChord: 'Major 7th',
    formula: 'Root Position (1 in bass) | 1st Inversion (3 in bass: e.g. C/E) | 2nd Inversion (5 in bass: e.g. C/G)',
    summary: 'Mastery of chord inversions, slash chords, and smooth voice leading across the neck.',
    content: `Mastering Chord Inversions & Advanced Voicings:
1. What is an Inversion?
   - A standard chord in "Root Position" has the root note as its lowest pitched bass note (e.g. C - E - G with C in the bass).
   - **1st Inversion**: The 3rd is placed in the bass (E in the bass: E - G - C). Written as a slash chord: **C/E**.
   - **2nd Inversion**: The 5th is placed in the bass (G in the bass: G - C - E). Written as **C/G**.
   - **3rd Inversion** (for 7th chords): The 7th is placed in the bass (e.g. B in the bass for Cmaj7/B).
2. Why Inversions Matter:
   - They allow the bass line to move smoothly in stepwise motion (e.g., C -> G/B -> Am -> C/G -> F) instead of clunky jumping leaps.
3. Drop 2 Voicings:
   - In jazz and professional arranging, Drop 2 chords take the second highest voice of a close-position 4-note chord and drop it an octave into the bass. They fit neatly across 4 adjacent strings (e.g., strings 4-3-2-1 or 5-4-3-2) and are fully movable anywhere on the neck!`
  }
];

export function getAllCurriculumLessons(): CurriculumLesson[] {
  return CURRICULUM_LESSONS;
}

export function getLessonById(id: string): CurriculumLesson | undefined {
  return CURRICULUM_LESSONS.find(l => l.id === id);
}
