import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { userId, subtopicId, isCompleted } = await request.json();

    if (!userId || !subtopicId) {
      return NextResponse.json(
        { error: 'Missing required parameters: userId and subtopicId are required.' },
        { status: 400 }
      );
    }

    // Upsert completion record for the unique userId + subtopicId key
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_subtopicId: {
          userId,
          subtopicId,
        },
      },
      update: {
        isCompleted,
        completedAt: new Date(),
      },
      create: {
        userId,
        subtopicId,
        isCompleted,
      },
    });

    return NextResponse.json({
      success: true,
      progress,
    });
  } catch (error: unknown) {
    console.error('Error toggling progress:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { error: 'Internal Server Error', details: message },
      { status: 500 }
    );
  }
}
