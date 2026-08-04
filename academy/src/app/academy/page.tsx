'use client';

import React, { useEffect, useState } from 'react';
import Sidebar, { Session, Subtopic } from '@/components/Sidebar';
import LessonView from '@/components/LessonView';
import { Loader2, Compass } from 'lucide-react';
import Link from 'next/link';

export default function AcademyPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [activeSubtopic, setActiveSubtopic] = useState<Subtopic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch initial syllabus data on mount
  useEffect(() => {
    async function loadCurriculum() {
      try {
        const res = await fetch('/api/sessions');
        const data = await res.json();
        
        if (data.sessions) {
          setSessions(data.sessions);
          setUserId(data.userId);
          
          // Select first subtopic of first session by default
          if (data.sessions.length > 0 && data.sessions[0].subtopics.length > 0) {
            setActiveSubtopic(data.sessions[0].subtopics[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load academy syllabus:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCurriculum();
  }, []);

  // Handle toggling subtopic completion
  const handleToggleComplete = async (subtopicId: string, isCompleted: boolean) => {
    if (!userId) return;
    
    setIsUpdating(true);
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          subtopicId,
          isCompleted,
        }),
      });
      const data = await res.json();

      if (data.success) {
        // Optimistically update local state
        setSessions((prevSessions) => {
          return prevSessions.map((session) => {
            const containsSubtopic = session.subtopics.some((s) => s.id === subtopicId);
            if (!containsSubtopic) return session;

            const updatedSubtopics = session.subtopics.map((s) => {
              if (s.id === subtopicId) {
                const updated = { ...s, isCompleted };
                if (activeSubtopic && activeSubtopic.id === subtopicId) {
                  setActiveSubtopic(updated);
                }
                return updated;
              }
              return s;
            });

            const completedCount = updatedSubtopics.filter((s) => s.isCompleted).length;
            const progressPercent = updatedSubtopics.length > 0
              ? Math.round((completedCount / updatedSubtopics.length) * 100)
              : 0;

            return {
              ...session,
              progressPercent,
              subtopics: updatedSubtopics,
            };
          });
        });
      }
    } catch (err) {
      console.error('Failed to update progress:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6] relative overflow-hidden">
        {/* Shifting radial mesh background */}
        <div className="absolute inset-0 z-0 bg-[#FAF9F6] opacity-40 blur-3xl pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-blue-400/20" />
          <div className="absolute top-[10%] right-[20%] w-[25vw] h-[25vw] rounded-full bg-cyan-400/20" />
          <div className="absolute bottom-[20%] left-[40%] w-[35vw] h-[35vw] rounded-full bg-yellow-400/20" />
          <div className="absolute bottom-[10%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-rose-400/20" />
        </div>
        
        <div className="z-10 flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-slate-800 animate-spin" />
          <p className="text-sm font-bold text-slate-700 tracking-wider uppercase">Loading Academy Console...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF9F6] relative overflow-hidden">
      {/* Animated radial mesh background */}
      <div className="absolute inset-0 z-0 opacity-40 blur-3xl pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-blue-400/20 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[10%] right-[20%] w-[25vw] h-[25vw] rounded-full bg-cyan-400/20 animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[20%] left-[40%] w-[35vw] h-[35vw] rounded-full bg-yellow-400/20 animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute bottom-[10%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-rose-400/20 animate-pulse" style={{ animationDuration: '9s' }} />
      </div>

      {/* Floating Header */}
      <header className="z-10 px-8 py-4 bg-white/40 backdrop-blur-md border-b border-slate-200/50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 bg-slate-900 text-white rounded-xl shadow-md cursor-pointer hover:scale-105 transition-transform flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-extrabold text-slate-900 tracking-tight text-lg">DEVILSTONE ACADEMY</h1>
            <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Guitar LMS Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold text-slate-700 hover:text-black transition-colors uppercase tracking-wider">
            Back to Console
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Default Session Active</span>
          </div>
        </div>
      </header>

      {/* Main LMS Dashboard Pane */}
      <div className="flex-1 flex flex-col md:flex-row z-10 overflow-hidden h-[calc(100vh-68px)]">
        {/* Left syllabus panel */}
        <Sidebar
          sessions={sessions}
          activeSubtopicId={activeSubtopic ? activeSubtopic.id : null}
          onSelectSubtopic={(sub) => setActiveSubtopic(sub)}
        />

        {/* Right theory content grimoire */}
        <LessonView
          subtopic={activeSubtopic}
          isUpdating={isUpdating}
          onToggleComplete={handleToggleComplete}
        />
      </div>
    </main>
  );
}
