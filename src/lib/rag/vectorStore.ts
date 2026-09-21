import { CURRICULUM_LESSONS, CurriculumLesson } from './curriculumKnowledge';

export interface SearchResult {
  lesson: CurriculumLesson;
  score: number;
  matchedConcepts: string[];
}

/**
 * Normalizes text for keyword and semantic matching
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9#b\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1);
}

/**
 * Calculates a relevance score between a user question and a curriculum lesson.
 * Combines exact entity boosts (Session numbers, scales, chords) with BM25-style term overlap.
 */
export function scoreLesson(query: string, lesson: CurriculumLesson): { score: number; matchedConcepts: string[] } {
  const queryTokens = tokenize(query);
  const matchedConcepts: string[] = [];
  let score = 0;

  const queryLower = query.toLowerCase();

  // 1. Explicit Session Match Boost (e.g. "session 11", "session 18", "session 1")
  const sessionMatch = queryLower.match(/session\s*(\d+)/i);
  if (sessionMatch && parseInt(sessionMatch[1], 10) === lesson.sessionNumber) {
    score += 50;
    matchedConcepts.push(`Session ${lesson.sessionNumber}`);
  }

  // 2. Specific Scale Recognition Boost
  const scaleKeywords = [
    'pentatonic', 'blues', 'dorian', 'mixolydian', 'phrygian', 'lydian', 'locrian',
    'harmonic minor', 'melodic minor', 'major pentatonic', 'minor pentatonic',
    '3nps', 'caged'
  ];
  for (const scale of scaleKeywords) {
    if (queryLower.includes(scale)) {
      if (
        lesson.subtopicTitle.toLowerCase().includes(scale) ||
        lesson.keyConcepts.some(c => c.toLowerCase().includes(scale)) ||
        (lesson.recommendedScale && lesson.recommendedScale.toLowerCase().includes(scale))
      ) {
        score += 25;
        matchedConcepts.push(scale.toUpperCase());
      }
    }
  }

  // 3. Chord & Harmony Recognition Boost
  const chordKeywords = [
    'minor 7th', 'm7', 'dominant 7th', 'dom7', 'major 7th', 'maj7',
    'sus2', 'sus4', 'suspended', 'barre', 'inversion', 'inversions',
    'power chord', 'triad', 'ii-v-i', '2-5-1', '12-bar', '12 bar',
    'travis picking', 'fingerstyle', 'bending', 'vibrato'
  ];
  for (const chord of chordKeywords) {
    if (queryLower.includes(chord)) {
      if (
        lesson.subtopicTitle.toLowerCase().includes(chord) ||
        lesson.content.toLowerCase().includes(chord) ||
        lesson.keyConcepts.some(c => c.toLowerCase().includes(chord))
      ) {
        score += 20;
        matchedConcepts.push(chord);
      }
    }
  }

  // 4. Key Concepts Overlap
  for (const concept of lesson.keyConcepts) {
    const conceptTokens = tokenize(concept);
    const hasOverlap = conceptTokens.some(ct => queryTokens.includes(ct));
    if (hasOverlap) {
      score += 10;
      if (!matchedConcepts.includes(concept)) {
        matchedConcepts.push(concept);
      }
    }
  }

  // 5. Title & Summary Word Frequency
  const titleTokens = tokenize(lesson.subtopicTitle + ' ' + lesson.sessionTitle);
  const summaryTokens = tokenize(lesson.summary);
  const contentTokens = tokenize(lesson.content);

  for (const token of queryTokens) {
    if (titleTokens.includes(token)) score += 6;
    if (summaryTokens.includes(token)) score += 3;
    if (contentTokens.includes(token)) score += 1;
  }

  return { score, matchedConcepts: Array.from(new Set(matchedConcepts)) };
}

/**
 * Retrieves the top-k most relevant curriculum lessons for a given query.
 */
export function retrieveRelevantLessons(query: string, topK: number = 3): SearchResult[] {
  const scored = CURRICULUM_LESSONS.map(lesson => {
    const { score, matchedConcepts } = scoreLesson(query, lesson);
    return { lesson, score, matchedConcepts };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // If no good match was found, return top 2 general lessons (Session 11 Pentatonics & Session 18 Jazz/Modes)
  if (scored.length === 0 || scored[0].score === 0) {
    return [
      {
        lesson: CURRICULUM_LESSONS.find(l => l.id === 's11-pentatonics') || CURRICULUM_LESSONS[0],
        score: 1,
        matchedConcepts: ['Foundational Theory']
      },
      {
        lesson: CURRICULUM_LESSONS.find(l => l.id === 's18-jazz') || CURRICULUM_LESSONS[1],
        score: 1,
        matchedConcepts: ['Modal Theory']
      }
    ];
  }

  return scored.slice(0, topK);
}
