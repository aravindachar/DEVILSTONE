import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

type SessionWithSubtopics = {
  id: string;
  title: string;
  subtopics: {
    id: string;
    title: string;
    contentHtml: string;
    progress: {
      isCompleted: boolean;
    }[];
  }[];
};

export async function GET() {
  try {
    // 1. Fetch or create default student user
    let user = await prisma.user.findUnique({
      where: { email: 'student@devilstone.academy' },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { email: 'student@devilstone.academy' },
      });
    }

    // 2. Fetch all sessions, subtopics, and progress for the user
    const sessions = await prisma.session.findMany({
      orderBy: { orderIndex: 'asc' },
      include: {
        subtopics: {
          orderBy: { orderIndex: 'asc' },
          include: {
            progress: {
              where: { userId: user.id },
            },
          },
        },
      },
    });

    // 3. Format sessions with calculated completion metrics
    const formattedSessions = (sessions as SessionWithSubtopics[]).map((session: SessionWithSubtopics) => {
      const subtopics = session.subtopics.map((sub: SessionWithSubtopics['subtopics'][number]) => ({
        id: sub.id,
        title: sub.title,
        contentHtml: sub.contentHtml,
        isCompleted: sub.progress.length > 0 ? sub.progress[0].isCompleted : false,
      }));

      const completedCount = subtopics.filter((s: { isCompleted: boolean }) => s.isCompleted).length;
      const progressPercent = subtopics.length > 0 
        ? Math.round((completedCount / subtopics.length) * 100)
        : 0;

      return {
        id: session.id,
        title: session.title,
        progressPercent,
        subtopics,
      };
    });

    return NextResponse.json({
      userId: user.id,
      sessions: formattedSessions,
    });
  } catch (error: any) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
