import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink, Newspaper } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const pressItem = await prisma.media.findUnique({
    where: { id, category: 'press' },
  });

  if (!pressItem) {
    return {
      title: 'Press Item Not Found',
    };
  }

  return {
    title: `${pressItem.title} | Press Coverage`,
    description: pressItem.description || `Press coverage: ${pressItem.title}`,
  };
}

export default async function PressDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const pressItem = await prisma.media.findUnique({
    where: { id },
  });

  if (!pressItem || pressItem.category !== 'press') {
    notFound();
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-cream py-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Back Button */}
        <Link
          href="/media"
          className="inline-flex items-center gap-2 text-charcoal hover:text-coral transition-colors mb-8"
          style={{ fontSize: '14px', fontWeight: 600 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Media
        </Link>

        {/* Article Header */}
        <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-lg">
          {/* Featured Image */}
          {pressItem.thumbnail && (
            <div className="aspect-video w-full overflow-hidden bg-gray-100">
              <img
                src={pressItem.thumbnail}
                alt={pressItem.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-4">
              <Newspaper className="w-5 h-5 text-coral" />
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full" style={{ fontSize: '12px', fontWeight: 600 }}>
                Press Coverage
              </span>
            </div>

            {/* Title */}
            <h1 className="text-charcoal mb-4" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-0.01em', fontFamily: 'var(--font-family-serif)' }}>
              {pressItem.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-border">
              {pressItem.source && (
                <div className="flex items-center gap-2">
                  <span className="text-charcoal font-semibold" style={{ fontSize: '14px' }}>
                    Source:
                  </span>
                  <span className="text-coral" style={{ fontSize: '14px', fontWeight: 600 }}>
                    {pressItem.source}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 text-charcoal-light">
                <Calendar className="w-4 h-4" />
                <span style={{ fontSize: '14px' }}>
                  {formatDate(pressItem.publishedAt)}
                </span>
              </div>
            </div>

            {/* Description/Content */}
            {pressItem.description && (
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-charcoal" style={{ fontSize: '17px', lineHeight: '1.8' }}>
                  {pressItem.description}
                </p>
              </div>
            )}

            {/* Article URL */}
            {pressItem.url && (
              <div className="bg-cream rounded-xl p-6 mb-8 border border-border">
                <div className="flex items-start gap-3">
                  <ExternalLink className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <p className="text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                      Original Article Link
                    </p>
                    <a
                      href={pressItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-coral hover:underline break-all"
                      style={{ fontSize: '14px' }}
                    >
                      {pressItem.url}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* External Link Button */}
            {pressItem.url && (
              <div className="mt-8">
                <a
                  href={pressItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-xl font-bold hover:bg-coral-dark transition-all shadow-lg hover:shadow-xl"
                  style={{ fontSize: '14px' }}
                >
                  Read Full Article
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-charcoal mb-6" style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-family-serif)' }}>
            More Press Coverage
          </h2>
          <Link
            href="/media#press-coverage"
            className="inline-flex items-center gap-2 text-coral hover:underline"
            style={{ fontSize: '14px', fontWeight: 600 }}
          >
            View all press coverage
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
