import { prisma } from "@/lib/prisma";
import { PopupManagerClient } from "./PopupManagerClient";

export async function PopupManagerWrapper() {
  // Fetch active events from database
  const now = new Date();

  // First, automatically deactivate any past events
  await prisma.event.updateMany({
    where: {
      active: true,
      eventDate: {
        lt: now,
      },
    },
    data: {
      active: false,
    },
  });

  // Then fetch only active events (past events are now inactive)
  const events = await prisma.event.findMany({
    where: {
      active: true,
    },
    orderBy: [
      { priority: 'desc' },
      { eventDate: 'asc' },
    ],
  });

  return <PopupManagerClient events={events} />;
}
