'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, Circle, GraduationCap } from 'lucide-react';

export interface Subtopic {
  id: string;
  title: string;
  contentHtml: string;
  isCompleted: boolean;
}

export interface Session {
  id: string;
  title: string;
  progressPercent: number;
  subtopics: Subtopic[];
}

interface SidebarProps {
  sessions: Session[];
  activeSubtopicId: string | null;
  onSelectSubtopic: (subtopic: Subtopic) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  activeSubtopicId,
  onSelectSubtopic,
}) => {
  // Store expanded session IDs (expand first session by default)
  const [expandedSessions, setExpandedSessions] = useState<Record<string, boolean>>(() => {
    if (sessions.length > 0) {
      return { [sessions[0].id]: true };
    }
    return {};
  });

  const toggleSession = (sessionId: string) => {
    setExpandedSessions((prev) => ({
      ...prev,
      [sessionId]: !prev[sessionId],
    }));
  };

  return (
    <aside className="w-full md:w-80 flex-shrink-0 flex flex-col bg-white/60 backdrop-blur-md border-r border-slate-200/80 h-full overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-slate-200/60 flex items-center gap-3">
        <div className="p-2 bg-slate-900 text-white rounded-xl">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-slate-800 text-sm tracking-wide uppercase">Academy</h2>
          <p className="text-xs text-slate-500 font-medium">Gibson Curriculum</p>
        </div>
      </div>

      {/* Syllabus Menu */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {sessions.map((session) => {
          const isExpanded = !!expandedSessions[session.id];
          return (
            <div key={session.id} className="border border-slate-200/50 bg-white/50 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
              {/* Session Accordion Toggle */}
              <button
                onClick={() => toggleSession(session.id)}
                className="w-full p-4 text-left flex items-start justify-between gap-3 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-slate-800 leading-snug truncate">
                    {session.title}
                  </h3>
                  {/* Progress bar */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-slate-900 h-full rounded-full transition-all duration-500"
                        style={{ width: `${session.progressPercent}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 min-w-[24px] text-right">
                      {session.progressPercent}%
                    </span>
                  </div>
                </div>
                <div className="text-slate-400 mt-0.5">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Subtopic Submenu */}
              {isExpanded && (
                <div className="bg-slate-50/40 border-t border-slate-100 p-2 space-y-1">
                  {session.subtopics.map((subtopic) => {
                    const isActive = subtopic.id === activeSubtopicId;
                    return (
                      <button
                        key={subtopic.id}
                        onClick={() => onSelectSubtopic(subtopic)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'text-slate-600 hover:bg-slate-200/40 hover:text-slate-800'
                        }`}
                      >
                        {subtopic.isCompleted ? (
                          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
                        ) : (
                          <Circle className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white/60' : 'text-slate-300'}`} />
                        )}
                        <span className="truncate">{subtopic.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
export default Sidebar;
