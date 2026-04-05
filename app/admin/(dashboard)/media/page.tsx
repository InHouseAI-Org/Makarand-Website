import { auth } from "@/auth";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import { DeleteButton } from "@/app/admin/components/DeleteButton";
import { TogglePublishButton } from "@/app/admin/components/TogglePublishButton";
import { MediaFilterTabs } from "./MediaFilterTabs";

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const categoryFilter = params.category;

  // Fetch media items with optional category filter
  const mediaItems = await prisma.media.findMany({
    where: categoryFilter ? { category: categoryFilter } : undefined,
    orderBy: { publishedAt: 'desc' },
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'press':
        return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Press Coverage' };
      case 'award':
        return { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Award' };
      case 'video':
        return { bg: 'bg-red-100', text: 'text-red-700', label: 'Video' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', label: category };
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-charcoal mb-2" style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'var(--font-family-serif)' }}>
            Media Management
          </h1>
          <p className="text-charcoal-light" style={{ fontSize: '16px' }}>
            Manage press coverage, awards, and video content
          </p>
        </div>
        <Link
          href="/admin/media/new"
          className="flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-xl font-bold hover:bg-coral-dark transition-all shadow-lg hover:shadow-xl"
          style={{ fontSize: '14px' }}
        >
          <Plus className="w-5 h-5" />
          Add New Media
        </Link>
      </div>

      {/* Category Filter Tabs */}
      <MediaFilterTabs currentCategory={categoryFilter} />

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {mediaItems.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-charcoal-light mb-4" style={{ fontSize: '16px' }}>
              {categoryFilter
                ? `No ${getCategoryBadge(categoryFilter).label.toLowerCase()} items found.`
                : 'No media items yet. Add your first media item!'}
            </p>
            <Link
              href="/admin/media/new"
              className="inline-flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-xl font-bold hover:bg-coral-dark transition-all"
              style={{ fontSize: '14px' }}
            >
              <Plus className="w-5 h-5" />
              Add New Media
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cream border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Title</th>
                  <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Category</th>
                  <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Source</th>
                  <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Published Date</th>
                  <th className="text-center px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Status</th>
                  <th className="text-right px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mediaItems.map((media) => {
                  const badge = getCategoryBadge(media.category);
                  return (
                    <tr key={media.id} className="border-b border-border hover:bg-cream/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-charcoal font-semibold" style={{ fontSize: '14px' }}>
                          {media.title}
                        </p>
                        {media.description && (
                          <p className="text-charcoal-light text-sm mt-1 line-clamp-1">
                            {media.description}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full ${badge.bg} ${badge.text}`} style={{ fontSize: '12px', fontWeight: 600 }}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-charcoal-light" style={{ fontSize: '13px' }}>
                          {media.source || 'N/A'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-charcoal-light" style={{ fontSize: '13px' }}>
                          {formatDate(media.publishedAt)}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <TogglePublishButton
                          id={media.id}
                          published={media.published}
                          type="media"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/media/${media.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <DeleteButton
                            id={media.id}
                            type="media"
                            title={media.title}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
