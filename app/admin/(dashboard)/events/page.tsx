import { auth } from "@/auth";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";
import { DeleteButton } from "@/app/admin/components/DeleteButton";
import { TogglePublishButton } from "@/app/admin/components/TogglePublishButton";

export default async function EventsPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const now = new Date();

  // Automatically deactivate past events
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

  const events = await prisma.event.findMany({
    orderBy: [
      { eventDate: 'asc' },
      { priority: 'desc' },
    ],
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-charcoal mb-2" style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'var(--font-family-serif)' }}>
              Events Management
            </h1>
            <p className="text-charcoal-light" style={{ fontSize: '15px' }}>
              Create and manage popup events and announcements
            </p>
          </div>
          <Link
            href="/admin/events/new"
            className="bg-coral hover:bg-coral-dark text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl w-fit"
            style={{ fontSize: '14px' }}
          >
            <Plus className="w-5 h-5" />
            Create Event
          </Link>
        </div>
      </div>

      {/* Events Grid */}
      {events.length === 0 ? (
        <div className="bg-gradient-to-br from-cream to-white rounded-2xl border-2 border-border p-16 text-center">
          <div className="w-20 h-20 bg-coral-light rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-10 h-10 text-coral" />
          </div>
          <h3 className="text-charcoal mb-2" style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-family-serif)' }}>
            No Events Yet
          </h3>
          <p className="text-charcoal-light mb-6" style={{ fontSize: '15px' }}>
            Create your first event to start engaging with your community
          </p>
          <Link
            href="/admin/events/new"
            className="bg-coral hover:bg-coral-dark text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition-all"
            style={{ fontSize: '14px' }}
          >
            <Plus className="w-5 h-5" />
            Create Your First Event
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl border-2 border-border p-6 hover:shadow-lg transition-all group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4" style={{ flexDirection: 'row' }}>
                {/* Event Info */}
                <div className="flex-1 min-w-0" style={{ flexDirection: 'row' }}>
                  <div className="flex items-start gap-3 mb-2" style={{ flexDirection: 'row' }}>
                    <div className="w-12 h-12 bg-coral-light rounded-xl flex items-center justify-center shrink-0" style={{ flexDirection: 'row' }}>
                      <Calendar className="w-6 h-6 text-coral" />
                    </div>
                    <div className="flex-1 min-w-0" style={{ flexDirection: 'row' }}>
                      <h3 className="text-charcoal font-bold mb-1 truncate" style={{ fontSize: '18px', fontFamily: 'var(--font-family-serif)' }}>
                        {event.title}
                      </h3>
                      <p className="text-charcoal-light line-clamp-2" style={{ fontSize: '14px' }}>
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex flex-wrap gap-3 ml-15 mt-3" style={{ flexDirection: 'row' }}>
                    <div className="flex items-center gap-2 text-charcoal-light" style={{ fontSize: '13px' }}>
                      <Calendar className="w-4 h-4" />
                      {new Date(event.eventDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2 text-charcoal-light" style={{ fontSize: '13px' }}>
                        <span>📍</span>
                        {event.location}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-coral-light text-coral font-semibold" style={{ fontSize: '12px' }}>
                        Priority: {event.priority}
                      </span>
                    </div>
                    {new Date(event.eventDate) < now && (
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-600 font-semibold" style={{ fontSize: '12px' }}>
                          Past Event
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col items-center gap-3 lg:border-l lg:border-border lg:pl-6" style={{ flexDirection: 'row' }}>
                  <TogglePublishButton
                    id={event.id}
                    published={event.active}
                    type="event"
                  />
                  <Link
                    href={`/admin/events/${event.id}`}
                    className="p-2 text-charcoal hover:bg-cream rounded-lg transition-all"
                    title="Edit"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <DeleteButton id={event.id} type="event" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
