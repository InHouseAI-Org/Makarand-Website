import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all active events
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: {
        active: true,
        eventDate: {
          gte: new Date(), // Only future events
        },
      },
      orderBy: [
        { priority: 'desc' },
        { eventDate: 'asc' },
      ],
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

// POST new event
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        eventDate: new Date(body.eventDate),
        location: body.location || null,
        buttonText: body.buttonText || 'Register Now',
        buttonLink: body.buttonLink || null,
        image: body.image || null,
        priority: body.priority || 0,
        active: body.active !== undefined ? body.active : true,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
