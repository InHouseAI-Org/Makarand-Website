import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminNav } from "@/app/admin/components/AdminNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Only pass serializable data to the Client Component
  const sessionData = {
    user: {
      name: session.user?.name,
      email: session.user?.email,
      image: session.user?.image,
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <AdminNav session={sessionData} />
      <main className="pt-20 px-4 md:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      <footer className="fixed bottom-0 right-0 p-3">
        <a
          href="https://wa.me/919607048300"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-charcoal/20 hover:text-charcoal/40 transition-colors"
        >
          Griffin Marketing
        </a>
      </footer>
    </div>
  );
}
