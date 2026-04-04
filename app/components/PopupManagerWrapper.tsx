import { prisma } from "@/lib/prisma";
import { PopupManagerClient } from "./PopupManagerClient";

export async function PopupManagerWrapper() {
  // Fetch active events from database
  const now = new Date();

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

  return <PopupManagerClient events={events} />;
}
