import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single event
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}

// PUT update event
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // If only updating 'active' field (from toggle button)
    if (Object.keys(body).length === 1 && 'active' in body) {
      const event = await prisma.event.update({
        where: { id: params.id },
        data: {
          active: body.active,
        },
      });
      return NextResponse.json(event);
    }

    // Full update
    const event = await prisma.event.update({
      where: { id: params.id },
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

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

// DELETE event
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.event.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
