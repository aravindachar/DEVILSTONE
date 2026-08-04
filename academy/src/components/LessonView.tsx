'use client';

import React from 'react';
import { CheckCircle2, Circle, Loader2, Sparkles } from 'lucide-react';
import type { Subtopic } from './Sidebar';

interface LessonViewProps {
  subtopic: Subtopic | null;
  isUpdating: boolean;
  onToggleComplete: (subtopicId: string, isCompleted: boolean) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  subtopic,
  isUpdating,
  onToggleComplete,
}) => {
  if (!subtopic) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white/40 backdrop-blur-md">
        <div className="p-4 bg-white/80 rounded-full shadow-md mb-4 border border-slate-100/50">
          <Sparkles className="w-8 h-8 text-slate-400 animate-pulse" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800">Welcome to CyberFret Academy</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-md">
          Select a session and lesson topic from the left sidebar syllabus to begin your guitar learning journey!
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white/45 backdrop-blur-md overflow-hidden h-full">
      {/* Lesson Navigation/Actions Header */}
      <div className="px-8 py-5 border-b border-slate-200/60 bg-white/50 flex items-center justify-between gap-4">
        <h2 className="text-sm font-bold text-slate-700 truncate tracking-wide uppercase">
          Lesson Viewer
        </h2>

        {/* Mark as Complete Toggle */}
        <button
          onClick={() => onToggleComplete(subtopic.id, !subtopic.isCompleted)}
          disabled={isUpdating}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all duration-300 ${
            subtopic.isCompleted
              ? 'bg-emerald-500 text-white hover:bg-emerald-600'
              : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md'
          } disabled:opacity-50`}
        >
          {isUpdating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : subtopic.isCompleted ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <Circle className="w-4 h-4" />
          )}
          <span>{subtopic.isCompleted ? 'Completed' : 'Mark as Complete'}</span>
        </button>
      </div>

      {/* Lesson Content Area */}
      <div className="flex-1 overflow-y-auto p-8 md:p-12">
        <div className="max-w-3xl mx-auto bg-white/85 shadow-md border border-slate-200/40 rounded-3xl p-6 md:p-10 min-h-[400px] shadow-slate-100/50">
          {subtopic.contentHtml ? (
            <div 
              className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900"
              dangerouslySetInnerHTML={{ __html: subtopic.contentHtml }}
            />
          ) : (
            <div className="prose prose-slate max-w-none">
              <h3 className="text-2xl font-bold mb-4 text-slate-800">{subtopic.title}</h3>
              <p className="mb-4 text-slate-600">
                Welcome to this lesson topic in the Gibson Learn & Master syllabus.
              </p>
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 rounded-r-xl mb-6 text-sm">
                <strong>Lesson Under Construction:</strong> Detailed text summaries for this session are currently being compiled from the Learn & Master curriculum book.
              </div>
              <p className="text-slate-600">
                Please review the syllabus exercises and mark this topic as complete to track your overall course progress.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default LessonView;
