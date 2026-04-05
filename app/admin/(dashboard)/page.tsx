import { auth } from "@/auth";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FolderKanban, Building2, Users, Newspaper, MessageSquare, BarChart3, TrendingUp, Eye, MousePointerClick, ExternalLink } from "lucide-react";



export default async function AdminDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const gaPropertyId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const hasGA = !!gaPropertyId;

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

      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

      {/* Analytics Section */}
      <div className="mb-8">
        <h2 className="text-charcoal mb-4" style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-family-serif)' }}>
          Website Analytics
        </h2>

        {!hasGA ? (
          /* Setup Instructions */
          <div className="bg-gradient-to-br from-coral-light to-cream rounded-2xl border-2 border-coral p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-coral rounded-xl flex items-center justify-center shrink-0">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-charcoal mb-2" style={{ fontSize: '18px', fontWeight: 700 }}>
                  Google Analytics Not Configured
                </h3>
                <p className="text-charcoal-light mb-4" style={{ fontSize: '14px' }}>
                  Set up Google Analytics 4 to track website performance, visitor insights, and engagement metrics.
                </p>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-charcoal font-semibold mb-2" style={{ fontSize: '13px' }}>
                    Quick Setup:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-charcoal-light" style={{ fontSize: '13px' }}>
                    <li>Get Measurement ID from <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">analytics.google.com</a></li>
                    <li>Add <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">NEXT_PUBLIC_GA_MEASUREMENT_ID</code> to environment</li>
                    <li>Restart application</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Analytics Dashboard */
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl border-2 border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-charcoal-light font-semibold" style={{ fontSize: '13px' }}>
                    Visitors
                  </h3>
                </div>
                <p className="text-charcoal-light" style={{ fontSize: '12px' }}>
                  View in GA4
                </p>
              </div>

              <div className="bg-white rounded-xl border-2 border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-charcoal-light font-semibold" style={{ fontSize: '13px' }}>
                    Page Views
                  </h3>
                </div>
                <p className="text-charcoal-light" style={{ fontSize: '12px' }}>
                  View in GA4
                </p>
              </div>

              <div className="bg-white rounded-xl border-2 border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MousePointerClick className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-charcoal-light font-semibold" style={{ fontSize: '13px' }}>
                    Engagement
                  </h3>
                </div>
                <p className="text-charcoal-light" style={{ fontSize: '12px' }}>
                  View in GA4
                </p>
              </div>

              <div className="bg-white rounded-xl border-2 border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-coral-light rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-coral" />
                  </div>
                  <h3 className="text-charcoal-light font-semibold" style={{ fontSize: '13px' }}>
                    Trends
                  </h3>
                </div>
                <p className="text-charcoal-light" style={{ fontSize: '12px' }}>
                  View in GA4
                </p>
              </div>
            </div>

            {/* GA Links */}
            <div className="bg-white rounded-xl border-2 border-border p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-charcoal font-semibold mb-1" style={{ fontSize: '16px' }}>
                    Google Analytics Dashboard
                  </h3>
                  <p className="text-charcoal-light" style={{ fontSize: '13px' }}>
                    ID: <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">{gaPropertyId}</code>
                  </p>
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://analytics.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-coral text-white rounded-lg hover:bg-coral-dark transition-all"
                    style={{ fontSize: '13px', fontWeight: 600 }}
                  >
                    Open Analytics
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://analytics.google.com/analytics/web/#/realtime"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-coral rounded-lg border-2 border-coral hover:bg-coral-light transition-all"
                    style={{ fontSize: '13px', fontWeight: 600 }}
                  >
                    Realtime
                    <Eye className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
