import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FolderKanban, Building2, Users, Newspaper, MessageSquare, Plus } from "lucide-react";



export default async function AdminDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Get counts for dashboard stats
  const [projectsCount, govProjectsCount, wardOfficersCount, mediaCount, testimonialsCount] = await Promise.all([
    prisma.project.count(),
    prisma.governmentProject.count(),
    prisma.wardOfficer.count(),
    prisma.media.count(),
    prisma.testimonial.count(),
  ]);

  const stats = [
    { label: 'Projects', count: projectsCount, href: '/admin/projects', icon: FolderKanban, color: 'bg-blue-500' },
    { label: 'Gov Projects', count: govProjectsCount, href: '/admin/government-projects', icon: Building2, color: 'bg-green-500' },
    { label: 'Ward Officers', count: wardOfficersCount, href: '/admin/ward-officers', icon: Users, color: 'bg-purple-500' },
    { label: 'Media', count: mediaCount, href: '/admin/media', icon: Newspaper, color: 'bg-orange-500' },
    { label: 'Testimonials', count: testimonialsCount, href: '/admin/testimonials', icon: MessageSquare, color: 'bg-pink-500' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-charcoal mb-2" style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'var(--font-family-serif)' }}>
          Dashboard
        </h1>
        <p className="text-charcoal-light" style={{ fontSize: '16px' }}>
          Welcome back, {session.user?.name}! Manage your website content below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white p-6 rounded-2xl border border-border hover:shadow-xl transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-charcoal" style={{ fontSize: '32px', fontWeight: 800 }}>
                    {stat.count}
                  </p>
                </div>
              </div>
              <h3 className="text-charcoal font-semibold" style={{ fontSize: '16px' }}>
                {stat.label}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
