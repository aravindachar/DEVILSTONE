import { NextResponse } from 'next/server';
import { retrieveRelevantLessons } from '@/lib/rag/vectorStore';
import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

interface ChatRequestBody {
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
  context?: {
    activeKey?: string;
    activeScale?: string;
    activeSessionId?: string;
  };
}

export async function POST(req: Request) {
  try {
    const body: ChatRequestBody = await req.json();
    const { messages, context } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const latestUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    const userQuery = latestUserMessage ? latestUserMessage.content : '';

    // 1. Retrieve the top relevant curriculum lessons from DEVILSTONE's 20-session syllabus
    const searchResults = retrieveRelevantLessons(userQuery, 3);
    const primaryResult = searchResults[0];

    // Determine if there is a recommended scale/key to load onto the fretboard
    const suggestedKey = primaryResult.lesson.recommendedKey || (context?.activeKey as string) || 'A';
    const suggestedScale = primaryResult.lesson.recommendedScale || (context?.activeScale as string) || 'Minor Pentatonic';

    // 2. Prepare structured curriculum context for grounding
    const curriculumContext = searchResults
      .map(
        (res, idx) => `
[DOCUMENT ${idx + 1}]
Session: ${res.lesson.sessionTitle}
Topic: ${res.lesson.subtopicTitle}
Key Concepts: ${res.lesson.keyConcepts.join(', ')}
${res.lesson.formula ? `Interval Formula: ${res.lesson.formula}` : ''}
${res.lesson.summary ? `Summary: ${res.lesson.summary}` : ''}
Lesson Text:
${res.lesson.content}
`
      )
      .join('\n---\n');

    // 3. Build System Prompt
    const systemPrompt = `You are Maestro, DEVILSTONE Academy's premier music theory mentor.
Your role is to answer the student's question clearly, inspiringly, and accurately, grounded STRICTLY in the DEVILSTONE Academy 20-Session Guitar Curriculum.

Grounding rules:
1. Always base your explanations on the provided Curriculum Documents below.
2. Clearly explain interval relationships (e.g. Root, 3rd, 5th, b7th) and WHY harmonic combinations work (e.g. tension/resolution, guide tones, consonant intervals, micro-tonal blues bends).
3. Explicitly cite the session number and topic name (e.g., "In **Session 11: Pentatonic Scales**...").
4. Keep explanations concise, practical, and directly applicable to playing the guitar.
5. If relevant, mention that they can click the button below to preview this scale directly on the 24-fret visualizer.

CURRICULUM DOCUMENTS:
${curriculumContext}
`;

    // 4. Determine LLM generation or intelligent offline synthesis
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    let answerText = '';
    let isOffline = false;

    if (geminiKey) {
      try {
        const result = await generateText({
          model: google('gemini-2.0-flash'),
          system: systemPrompt,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        });
        answerText = result.text;
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local synthesis:', err);
        answerText = generateOfflineAnswer(userQuery, searchResults);
        isOffline = true;
      }
    } else if (openaiKey) {
      try {
        const result = await generateText({
          model: openai('gpt-4o-mini'),
          system: systemPrompt,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        });
        answerText = result.text;
      } catch (err) {
        console.warn('OpenAI API call failed, falling back to local synthesis:', err);
        answerText = generateOfflineAnswer(userQuery, searchResults);
        isOffline = true;
      }
    } else {
      answerText = generateOfflineAnswer(userQuery, searchResults);
      isOffline = true;
    }

    return NextResponse.json({
      role: 'assistant',
      content: answerText,
      action: {
        type: 'load_fretboard',
        key: suggestedKey,
        scale: suggestedScale,
        sessionNumber: primaryResult.lesson.sessionNumber,
        subtopicTitle: primaryResult.lesson.subtopicTitle,
      },
      sources: searchResults.map((r) => ({
        sessionNumber: r.lesson.sessionNumber,
        sessionTitle: r.lesson.sessionTitle,
        subtopicTitle: r.lesson.subtopicTitle,
        summary: r.lesson.summary,
        formula: r.lesson.formula,
        matchedConcepts: r.matchedConcepts,
      })),
      isOfflineMode: isOffline,
    });
  } catch (error: unknown) {
    console.error('Chat API Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to process chat request', details: message },
      { status: 500 }
    );
  }
}

/**
 * High-quality offline synthesizer for zero-config out-of-the-box operation.
 */
function generateOfflineAnswer(
  query: string,
  searchResults: ReturnType<typeof retrieveRelevantLessons>
): string {
  const top = searchResults[0].lesson;
  const secondary = searchResults[1]?.lesson;

  let explanation = `### ✦ DEVILSTONE Theory Analysis\n\n`;
  explanation += `In **${top.sessionTitle}** (*${top.subtopicTitle}*), this concept is central to guitar harmony.\n\n`;

  if (top.formula) {
    explanation += `> **Interval Formula:** \`${top.formula}\`\n\n`;
  }

  explanation += `${top.content}\n\n`;

  if (secondary && secondary.id !== top.id) {
    explanation += `### ✦ Related Context: ${secondary.sessionTitle}\n`;
    explanation += `Also review **${secondary.subtopicTitle}**: ${secondary.summary}\n\n`;
  }

  explanation += `🎸 *Click the action button below to load this scale and key directly onto your DEVILSTONE 24-fret console!*`;

  return explanation;
}
