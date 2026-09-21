'use client';

import React, { useState, useRef, useEffect, useContext } from 'react';
import AppContext from '@/context/AppContext';
import type { NoteName, ScaleType } from '@/types/music';
import {
  Sparkles,
  Send,
  X,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Music,
  Check,
  Loader2,
  Bot,
  Compass,
  ArrowRight
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  action?: {
    type: string;
    key?: string;
    scale?: string;
    sessionNumber?: number;
    subtopicTitle?: string;
  };
  sources?: Array<{
    sessionNumber: number;
    sessionTitle: string;
    subtopicTitle: string;
    summary: string;
    formula?: string;
  }>;
}

const STARTER_PROMPTS = [
  'Why does the Dorian scale work over an Am7 chord?',
  'Why can I play the minor blues scale over a 12-bar blues?',
  'How do CAGED shapes relate to barre chords on the 5th and 6th strings?',
  'What are chord inversions and how do I practice them (Session 20)?',
  'Explain the difference between Major and Minor Pentatonic.',
];

export const MaestroAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am **Maestro**, your DEVILSTONE music theory assistant.\n\nI am scoped directly to your **20-Session Academy Curriculum**. Ask me anything about scale choices, chord theory, CAGED shapes, or why certain scales work over specific chords!\n\nYou can also click the quick prompt pills below to get started.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});
  const [actionAppliedId, setActionAppliedId] = useState<string | null>(null);

  const appContext = useContext(AppContext);
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const idCounterRef = useRef(1);

  const getNextId = (prefix: string) => `${prefix}-${idCounterRef.current++}`;

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (userQuestion?: string) => {
    const questionToSend = (userQuestion || input).trim();
    if (!questionToSend || isLoading) return;

    const userMessage: Message = {
      id: getNextId('user'),
      role: 'user',
      content: questionToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!userQuestion) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          context: {
            activeKey: appContext?.selectedKey || 'A',
            activeScale: appContext?.selectedScale || 'Minor Pentatonic',
          },
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: getNextId('assistant'),
        role: 'assistant',
        content: data.content || 'I processed your question using the curriculum documents.',
        action: data.action,
        sources: data.sources,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Failed to query Maestro:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: getNextId('error'),
          role: 'assistant',
          content: 'Sorry, I ran into an issue connecting to the theory engine. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyAction = (action?: Message['action'], msgId?: string) => {
    if (!action) return;

    if (appContext) {
      if (action.key) {
        appContext.setSelectedKey(action.key as NoteName);
      }
      if (action.scale) {
        appContext.setSelectedScale(action.scale as ScaleType);
      }
      document.getElementById('fretboard')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If outside AppProvider (e.g. Academy page), navigate to console with parameters
      router.push(`/?key=${encodeURIComponent(action.key || 'A')}&scale=${encodeURIComponent(action.scale || 'Minor Pentatonic')}#fretboard`);
      return;
    }

    if (msgId) {
      setActionAppliedId(msgId);
      setTimeout(() => setActionAppliedId(null), 3000);
    }
  };

  const toggleSourceExpand = (id: string) => {
    setExpandedSources((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-6 z-50 flex items-center gap-2 px-3.5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white border border-stone-700/80 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer backdrop-blur-xl group"
          title="Open Maestro Theory Assistant"
        >
          <div className="relative flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#D9531E] group-hover:rotate-12 transition-transform" />
          </div>
          <span className="text-xs font-bold tracking-wider uppercase pr-1 text-stone-100">
            Ask Maestro (RAG)
          </span>
        </button>
      )}

      {/* Slide-over Assistant Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-[92vw] sm:w-[460px] h-[600px] max-h-[80vh] bg-[#0E131F]/95 backdrop-blur-2xl border border-slate-700/60 rounded-3xl shadow-[0_12px_45px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="px-5 py-4 bg-[#141B2D]/80 border-b border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#00D7FF]/10 text-[#00D7FF] rounded-xl border border-[#00D7FF]/20 shadow-inner">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white tracking-wide">MAESTRO</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-[#00D7FF]/20 text-[#00D7FF] border border-[#00D7FF]/30 tracking-wider">
                    CURRICULUM RAG
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  20-Session Guitar Knowledge Base
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/academy"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                title="Open Full Academy LMS"
              >
                <Compass className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-[#00D7FF] text-slate-950 font-medium rounded-tr-sm shadow-md'
                      : 'bg-[#161F33] text-slate-200 border border-slate-700/50 rounded-tl-sm shadow-sm'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <div className="prose prose-invert prose-xs max-w-none space-y-2 prose-headings:font-bold prose-headings:text-[#00D7FF] prose-strong:text-white prose-p:leading-relaxed prose-code:bg-slate-900/80 prose-code:text-[#00D7FF] prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  )}

                  {/* Interactive Action Hook (Fretboard Bridge) */}
                  {msg.action && (
                    <div className="mt-3 pt-3 border-t border-slate-700/60 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleApplyAction(msg.action, msg.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all cursor-pointer shadow-sm ${
                          actionAppliedId === msg.id
                            ? 'bg-emerald-500 text-white'
                            : 'bg-[#00D7FF]/20 hover:bg-[#00D7FF]/30 text-[#00D7FF] border border-[#00D7FF]/40'
                        }`}
                      >
                        {actionAppliedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Loaded on Fretboard!</span>
                          </>
                        ) : (
                          <>
                            <Music className="w-3.5 h-3.5" />
                            <span>
                              Preview {msg.action.key} {msg.action.scale}
                            </span>
                          </>
                        )}
                      </button>

                      {msg.action.sessionNumber && (
                        <Link
                          href="/academy"
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-bold text-[10px] text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors"
                        >
                          <BookOpen className="w-3 h-3 text-[#00D7FF]" />
                          <span>Session {msg.action.sessionNumber}</span>
                          <ArrowRight className="w-2.5 h-2.5 opacity-60" />
                        </Link>
                      )}
                    </div>
                  )}

                  {/* Retrieved Curriculum Sources Drawer */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800">
                      <button
                        onClick={() => toggleSourceExpand(msg.id)}
                        className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-[#00D7FF] transition-colors cursor-pointer uppercase tracking-wider"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>
                          {expandedSources[msg.id] ? 'Hide Syllabus Sources' : `Sources (${msg.sources.length} lessons)`}
                        </span>
                        {expandedSources[msg.id] ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>

                      {expandedSources[msg.id] && (
                        <div className="mt-2 space-y-2">
                          {msg.sources.map((src, idx) => (
                            <div
                              key={idx}
                              className="p-2 rounded-lg bg-slate-900/70 border border-slate-800 text-[10px] text-slate-300"
                            >
                              <div className="font-bold text-[#00D7FF]">
                                {src.sessionTitle}
                              </div>
                              <div className="text-slate-400 font-semibold">{src.subtopicTitle}</div>
                              {src.formula && (
                                <div className="mt-1 font-mono text-[9px] text-emerald-400">
                                  Formula: {src.formula}
                                </div>
                              )}
                              <p className="mt-1 text-slate-400 leading-normal">{src.summary}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs p-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#00D7FF]" />
                <span className="font-medium">Consulting Academy Curriculum...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Starter Suggestions (Shown if few messages) */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-slate-800/60 bg-[#121827]/40 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              <span className="w-full text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                Suggested Questions:
              </span>
              {STARTER_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-medium text-slate-300 bg-slate-800/70 hover:bg-[#00D7FF]/20 hover:text-[#00D7FF] border border-slate-700/50 hover:border-[#00D7FF]/40 transition-all text-left cursor-pointer truncate max-w-full"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#121827] border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about scales, chords, CAGED, or sessions..."
              disabled={isLoading}
              className="flex-1 bg-[#1A2337] text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-[#00D7FF] placeholder-slate-500 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 bg-[#00D7FF] hover:bg-[#00bee0] disabled:opacity-40 text-slate-950 font-bold rounded-xl transition-all cursor-pointer shadow-sm"
              title="Send question"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default MaestroAssistant;
