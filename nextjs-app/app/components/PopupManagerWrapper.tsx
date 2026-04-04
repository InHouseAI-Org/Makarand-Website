import { prisma } from "@/lib/prisma";
import { PopupManagerClient } from "./PopupManagerClient";

export async function PopupManagerWrapper() {
  // Fetch active events from database
  const now = new Date();
  console.log('=== POPUP WRAPPER SERVER DEBUG ===');
  console.log('Current date:', now);

  const allEvents = await prisma.event.findMany();
  console.log('Total events in DB:', allEvents.length);
  console.log('All events:', JSON.stringify(allEvents, null, 2));

  const events = await prisma.event.findMany({
    where: {
      active: true,
      eventDate: {
        gte: now, // Only future events
      },
    },
    orderBy: [
      { priority: 'desc' },
      { eventDate: 'asc' },
    ],
  });

  console.log('Active future events:', events.length);
  console.log('Events to show:', JSON.stringify(events, null, 2));
  console.log('===================================');

  return <PopupManagerClient events={events} />;
}
