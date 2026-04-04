import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Mark all past events as inactive
export async function POST() {
  try {
    const now = new Date();

    // Update all events where eventDate is in the past and active is true
    const result = await prisma.event.updateMany({
      where: {
        active: true,
        eventDate: {
          lt: now, // Less than current date/time
        },
      },
      data: {
        active: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Deactivated ${result.count} past event(s)`,
      count: result.count,
    });
  } catch (error) {
    console.error('Error deactivating past events:', error);
    return NextResponse.json(
      { error: 'Failed to deactivate past events' },
      { status: 500 }
    );
  }
}
