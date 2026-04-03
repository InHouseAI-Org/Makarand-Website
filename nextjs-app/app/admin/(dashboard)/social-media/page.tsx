import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Instagram, Youtube } from "lucide-react";
import { DeleteButton } from "@/app/admin/components/DeleteButton";
import { TogglePublishButton } from "@/app/admin/components/TogglePublishButton";

export default async function SocialMediaPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const posts = await prisma.socialMediaEmbed.findMany({
    orderBy: [
      { platform: 'asc' },
      { displayOrder: 'asc' },
      { createdAt: 'desc' }
    ],
  });

  const instagramPosts = posts.filter(p => p.platform === 'instagram');
  const youtubePosts = posts.filter(p => p.platform === 'youtube');

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-charcoal mb-2" style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'var(--font-family-serif)' }}>
            Social Media Posts
          </h1>
          <p className="text-charcoal-light" style={{ fontSize: '16px' }}>
            Manage Instagram and YouTube posts displayed on the website (Max 3 per platform)
          </p>
        </div>
        <Link
          href="/admin/social-media/new"
          className="flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-xl font-bold hover:bg-coral-dark transition-all shadow-lg hover:shadow-xl"
          style={{ fontSize: '14px' }}
        >
          <Plus className="w-5 h-5" />
          Add Social Post
        </Link>
      </div>

      {/* Instagram Posts */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-charcoal" style={{ fontSize: '22px', fontWeight: 700 }}>
                Instagram Posts
              </h2>
              <p className="text-charcoal-light text-sm">
                {instagramPosts.length} of 3 posts
              </p>
            </div>
          </div>
          {instagramPosts.length < 3 && (
            <Link
              href="/admin/social-media/new?platform=instagram"
              className="text-sm text-coral hover:text-coral-dark font-semibold"
            >
              + Add Instagram Post
            </Link>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          {instagramPosts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-charcoal-light mb-4">No Instagram posts yet.</p>
              <Link
                href="/admin/social-media/new?platform=instagram"
                className="inline-flex items-center gap-2 bg-coral text-white px-4 py-2 rounded-xl font-bold hover:bg-coral-dark transition-all text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Instagram Post
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cream border-b border-border">
                  <tr>
                    <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Preview</th>
                    <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Title</th>
                    <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Type</th>
                    <th className="text-center px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Status</th>
                    <th className="text-right px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {instagramPosts.map((post) => (
                    <tr key={post.id} className="border-b border-border hover:bg-cream/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                          <Instagram className="w-8 h-8 text-purple-600" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-charcoal font-semibold" style={{ fontSize: '14px' }}>
                          {post.title || 'Untitled'}
                        </p>
                        <p className="text-charcoal-light text-xs mt-1">
                          ID: {post.extractedId}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700" style={{ fontSize: '12px', fontWeight: 600 }}>
                          {post.embedType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <TogglePublishButton
                          id={post.id}
                          published={post.isPublished}
                          type="socialMedia"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/social-media/${post.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <DeleteButton
                            id={post.id}
                            type="socialMedia"
                            title={post.title || 'Social media post'}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* YouTube Posts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600 rounded-xl">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-charcoal" style={{ fontSize: '22px', fontWeight: 700 }}>
                YouTube Videos
              </h2>
              <p className="text-charcoal-light text-sm">
                {youtubePosts.length} of 3 videos
              </p>
            </div>
          </div>
          {youtubePosts.length < 3 && (
            <Link
              href="/admin/social-media/new?platform=youtube"
              className="text-sm text-coral hover:text-coral-dark font-semibold"
            >
              + Add YouTube Video
            </Link>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          {youtubePosts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-charcoal-light mb-4">No YouTube videos yet.</p>
              <Link
                href="/admin/social-media/new?platform=youtube"
                className="inline-flex items-center gap-2 bg-coral text-white px-4 py-2 rounded-xl font-bold hover:bg-coral-dark transition-all text-sm"
              >
                <Plus className="w-4 h-4" />
                Add YouTube Video
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cream border-b border-border">
                  <tr>
                    <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Preview</th>
                    <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Title</th>
                    <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Type</th>
                    <th className="text-center px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Status</th>
                    <th className="text-right px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {youtubePosts.map((post) => (
                    <tr key={post.id} className="border-b border-border hover:bg-cream/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-24 h-16 bg-red-100 rounded-xl flex items-center justify-center overflow-hidden">
                          <img
                            src={`https://img.youtube.com/vi/${post.extractedId}/mqdefault.jpg`}
                            alt={post.title || 'YouTube thumbnail'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-charcoal font-semibold" style={{ fontSize: '14px' }}>
                          {post.title || 'Untitled'}
                        </p>
                        <p className="text-charcoal-light text-xs mt-1">
                          ID: {post.extractedId}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700" style={{ fontSize: '12px', fontWeight: 600 }}>
                          {post.embedType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <TogglePublishButton
                          id={post.id}
                          published={post.isPublished}
                          type="socialMedia"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/social-media/${post.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <DeleteButton
                            id={post.id}
                            type="socialMedia"
                            title={post.title || 'Social media post'}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
