import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EventForm from "../EventForm";

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const event = await prisma.event.findUnique({
    where: { id: params.id },
  });

  if (!event) {
    redirect("/admin/events");
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-charcoal mb-2" style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'var(--font-family-serif)' }}>
          Edit Event
        </h1>
        <p className="text-charcoal-light" style={{ fontSize: '15px' }}>
          Update event details and settings
        </p>
      </div>

      <EventForm event={event} />
    </div>
  );
}
