import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Award, Calendar, ExternalLink, Trophy, Star } from "lucide-react";
import type { Metadata } from "next";
import { generateSEO, KEYWORDS, combineKeywords } from "@/lib/seo";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const award = await prisma.media.findUnique({
    where: { id, category: 'award' },
  });

  if (!award) {
    return {
      title: 'Award Not Found',
    };
  }

  const ogImageUrl = `/api/og?title=${encodeURIComponent(award.title)}&description=${encodeURIComponent('Makarand Narwekar Recognition')}&type=award`;

  return generateSEO({
    title: `${award.title} | Makarand Narwekar Award & Recognition`,
    description: award.description || `Makarand Narwekar receives ${award.title}. Recognition of his outstanding leadership, dedication, and transformative impact in Mumbai's A Ward. Celebrating excellence in public service by award-winning Corporator Makarand Narwekar.`,
    keywords: combineKeywords(
      KEYWORDS.base,
      [
        'Awards',
        'Recognition',
        award.title,
        'Makarand Narwekar Awards',
        'Makarand Narwekar Recognition',
        'Award-Winning Corporator',
        'Mumbai Leader Recognition'
      ]
    ),
    canonical: `/media/award/${id}`,
    ogImage: ogImageUrl,
    ogType: 'article',
    publishedTime: award.publishedAt.toISOString(),
    modifiedTime: award.updatedAt.toISOString(),
  });
}

export default async function AwardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const award = await prisma.media.findUnique({
    where: { id },
  });

  if (!award || award.category !== 'award') {
    notFound();
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const year = new Date(award.publishedAt).getFullYear();

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

        {/* Award Card */}
        <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-lg">
          {/* Award Image */}
          {award.thumbnail && (
            <div className="aspect-video w-full overflow-hidden bg-gray-100">
              <img
                src={award.thumbnail}
                alt={award.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-coral" />
              <span className="px-3 py-1 bg-coral-100 text-coral-700 rounded-full" style={{ fontSize: '12px', fontWeight: 600 }}>
                Award & Recognition
              </span>
            </div>

            {/* Title */}
            <h1 className="text-charcoal mb-4" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-0.01em', fontFamily: 'var(--font-family-serif)' }}>
              {award.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-border">
              {award.source && (
                <div className="flex items-center gap-2">
                  <span className="text-charcoal font-semibold" style={{ fontSize: '14px' }}>
                    Presented by:
                  </span>
                  <span className="text-coral" style={{ fontSize: '14px', fontWeight: 600 }}>
                    {award.source}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 text-charcoal-light">
                <Calendar className="w-4 h-4" />
                <span style={{ fontSize: '14px' }}>
                  {formatDate(award.publishedAt)}
                </span>
              </div>
            </div>

            {/* Description */}
            {award.description && (
              <div className="mb-8">
                <h2 className="text-charcoal mb-4" style={{ fontSize: '20px', fontWeight: 700 }}>
                  About This Award
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-charcoal" style={{ fontSize: '17px', lineHeight: '1.8' }}>
                    {award.description}
                  </p>
                </div>
              </div>
            )}

            {/* Award Highlights Box */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 mb-8 border border-orange-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white mb-3">
                    <Trophy className="w-6 h-6 text-coral" />
                  </div>
                  <p className="text-charcoal-light text-sm font-semibold mb-1">Category</p>
                  <p className="text-charcoal font-bold">Recognition</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white mb-3">
                    <Calendar className="w-6 h-6 text-coral" />
                  </div>
                  <p className="text-charcoal-light text-sm font-semibold mb-1">Year</p>
                  <p className="text-charcoal font-bold">{year}</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white mb-3">
                    <Award className="w-6 h-6 text-coral" />
                  </div>
                  <p className="text-charcoal-light text-sm font-semibold mb-1">Presented By</p>
                  <p className="text-charcoal font-bold">{award.source || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Award URL */}
            {award.url && (
              <div className="bg-cream rounded-xl p-6 mb-8 border border-border">
                <div className="flex items-start gap-3">
                  <ExternalLink className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <p className="text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                      Award Details Link
                    </p>
                    <a
                      href={award.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-coral hover:underline break-all"
                      style={{ fontSize: '14px' }}
                    >
                      {award.url}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* External Link Button */}
            {award.url && (
              <div className="mt-8">
                <a
                  href={award.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-xl font-bold hover:bg-coral-dark transition-all shadow-lg hover:shadow-xl"
                  style={{ fontSize: '14px' }}
                >
                  View Award Certificate
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* More Awards */}
        <div className="mt-12">
          <h2 className="text-charcoal mb-6" style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-family-serif)' }}>
            More Awards & Recognition
          </h2>
          <Link
            href="/media#awards"
            className="inline-flex items-center gap-2 text-coral hover:underline"
            style={{ fontSize: '14px', fontWeight: 600 }}
          >
            View all awards
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
