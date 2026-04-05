import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Play } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const video = await prisma.media.findUnique({
    where: { id, category: 'video' },
  });

  if (!video) {
    return {
      title: 'Video Not Found',
    };
  }

  return {
    title: `${video.title} | Videos`,
    description: video.description || `Watch: ${video.title}`,
  };
}

export default async function VideoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const video = await prisma.media.findUnique({
    where: { id },
  });

  if (!video || video.category !== 'video') {
    notFound();
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Extract YouTube video ID from URL if it's a YouTube link
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = video.url ? getYouTubeId(video.url) : null;
  const isUploadedVideo = video.url && video.url.includes('utfs.io');

  return (
    <div className="min-h-screen bg-cream py-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Back Button */}
        <Link
          href="/media"
          className="inline-flex items-center gap-2 text-charcoal hover:text-coral transition-colors mb-8"
          style={{ fontSize: '14px', fontWeight: 600 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Media
        </Link>

        {/* Video Player */}
        <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-lg">
          {/* Video Embed */}
          <div className="aspect-video w-full bg-black">
            {youtubeId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : isUploadedVideo ? (
              <video
                controls
                className="w-full h-full"
                poster={video.thumbnail || undefined}
              >
                <source src={video.url} type="video/mp4" />
                <source src={video.url} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : video.thumbnail ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/50 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-10 h-10 text-coral ml-1" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p style={{ fontSize: '14px' }}>Video not available</p>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-4">
              <Play className="w-5 h-5 text-coral" />
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full" style={{ fontSize: '12px', fontWeight: 600 }}>
                Video
              </span>
            </div>

            {/* Title */}
            <h1 className="text-charcoal mb-4" style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 900, letterSpacing: '-0.01em', fontFamily: 'var(--font-family-serif)' }}>
              {video.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-border">
              {video.source && (
                <div className="flex items-center gap-2">
                  <span className="text-charcoal font-semibold" style={{ fontSize: '14px' }}>
                    Source:
                  </span>
                  <span className="text-coral" style={{ fontSize: '14px', fontWeight: 600 }}>
                    {video.source}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 text-charcoal-light">
                <Calendar className="w-4 h-4" />
                <span style={{ fontSize: '14px' }}>
                  {formatDate(video.publishedAt)}
                </span>
              </div>
            </div>

            {/* Description */}
            {video.description && (
              <div className="prose prose-lg max-w-none">
                <p className="text-charcoal" style={{ fontSize: '17px', lineHeight: '1.8' }}>
                  {video.description}
                </p>
              </div>
            )}

            {/* External Link */}
            {video.url && !youtubeId && (
              <div className="mt-8">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-xl font-bold hover:bg-coral-dark transition-all shadow-lg hover:shadow-xl"
                  style={{ fontSize: '14px' }}
                >
                  <Play className="w-4 h-4" />
                  Watch Video
                </a>
              </div>
            )}
          </div>
        </div>

        {/* More Videos */}
        <div className="mt-12">
          <h2 className="text-charcoal mb-6" style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-family-serif)' }}>
            More Videos
          </h2>
          <Link
            href="/media#videos"
            className="inline-flex items-center gap-2 text-coral hover:underline"
            style={{ fontSize: '14px', fontWeight: 600 }}
          >
            View all videos
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
