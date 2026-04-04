import { auth } from "@/auth";
import { redirect } from "next/navigation";
import EventForm from "../EventForm";

export default async function NewEventPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-charcoal mb-2" style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'var(--font-family-serif)' }}>
          Create New Event
        </h1>
        <p className="text-charcoal-light" style={{ fontSize: '15px' }}>
          Add a new event to engage with your community
        </p>
      </div>

      <EventForm />
    </div>
  );
}
