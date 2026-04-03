'use client';

import { motion } from "motion/react";
import { Quote, Star, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState, useEffect } from "react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
}

interface VideoTestimonial {
  name: string;
  role: string;
  videoUrl: string;
  image: string;
  rating: number;
}

interface TestimonialsPreviewClientProps {
  testimonials: Testimonial[];
  videoTestimonials: VideoTestimonial[];
}

export function TestimonialsPreviewClient({ testimonials, videoTestimonials }: TestimonialsPreviewClientProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showVideo, setShowVideo] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const totalVideoPages = videoTestimonials.length;

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  // Auto-scroll text testimonials every 3 seconds
  useEffect(() => {
    if (isPaused || totalPages <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, totalPages]);

  // Auto-scroll video testimonials every 3 seconds
  useEffect(() => {
    if (isVideoPaused || totalVideoPages <= 1) return;

    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % totalVideoPages);
      setShowVideo(null); // Reset video when changing
    }, 3000);

    return () => clearInterval(interval);
  }, [isVideoPaused, totalVideoPages]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const goToNextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % totalVideoPages);
    setShowVideo(null);
    setIsVideoPaused(true);
    setTimeout(() => setIsVideoPaused(false), 5000);
  };

  const goToPrevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + totalVideoPages) % totalVideoPages);
    setShowVideo(null);
    setIsVideoPaused(true);
    setTimeout(() => setIsVideoPaused(false), 5000);
  };

  const currentTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const currentVideoTestimonial = videoTestimonials[currentVideoIndex];

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-coral mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
            TESTIMONIALS
          </p>
          <h2 className="text-charcoal mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            Voices from the Community
          </h2>
        </div>

        {/* Video Testimonials (if available) */}
        {videoTestimonials.length > 0 && currentVideoTestimonial && (
          <div className="mb-12">
            <div className="relative">
              {/* Left Arrow */}
              {totalVideoPages > 1 && (
                <button
                  onClick={goToPrevVideo}
                  className="absolute left-[-80px] top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-coral hover:bg-coral-dark p-3 rounded-full shadow-lg transition-all border border-border"
                  aria-label="Previous video testimonial"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
              )}

              {/* Right Arrow */}
              {totalVideoPages > 1 && (
                <button
                  onClick={goToNextVideo}
                  className="absolute right-[-80px] top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-coral hover:bg-coral-dark p-3 rounded-full shadow-lg transition-all border border-border"
                  aria-label="Next video testimonial"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              )}

              <motion.div
                key={currentVideoIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-coral to-coral-dark rounded-2xl p-8 lg:p-12 text-white"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-white/90 mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
                      VIDEO TESTIMONIAL
                    </p>
                    <h3 className="text-white mb-4" style={{ fontSize: "28px", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
                      {currentVideoTestimonial.name}
                    </h3>
                    <p className="text-white/80 mb-4" style={{ fontSize: "16px" }}>
                      {currentVideoTestimonial.role}
                    </p>
                    <div className="mb-4">
                      {renderStars(currentVideoTestimonial.rating)}
                    </div>
                    <button
                      onClick={() => setShowVideo(currentVideoIndex)}
                      className="flex items-center gap-2 bg-white text-coral px-6 py-3 rounded-xl font-bold hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
                      style={{ fontSize: "14px" }}
                    >
                      <Play className="w-5 h-5" />
                      Watch Video
                    </button>
                  </div>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-charcoal/20 backdrop-blur-sm border-2 border-white/20">
                    {showVideo === currentVideoIndex ? (
                      <iframe
                        src={getYouTubeEmbedUrl(currentVideoTestimonial.videoUrl)}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div
                        className="w-full h-full relative cursor-pointer group"
                        onClick={() => setShowVideo(currentVideoIndex)}
                      >
                        {/* YouTube Thumbnail */}
                        {getYouTubeThumbnail(currentVideoTestimonial.videoUrl) && (
                          <img
                            src={getYouTubeThumbnail(currentVideoTestimonial.videoUrl)!}
                            alt={`${currentVideoTestimonial.name} video`}
                            className="w-full h-full object-cover"
                          />
                        )}

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all">
                          <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                            <Play className="w-10 h-10 text-coral ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Video Pagination Dots */}
            {totalVideoPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalVideoPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentVideoIndex(index);
                      setShowVideo(null);
                      setIsVideoPaused(true);
                      setTimeout(() => setIsVideoPaused(false), 5000);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentVideoIndex
                        ? 'bg-white w-8'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to video ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Testimonial Cards with Navigation */}
        <div className="relative">
          {/* Left Arrow */}
          {totalPages > 1 && (
            <button
              onClick={goToPrev}
              className="absolute left-[-60px] top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-cream p-3 rounded-full shadow-lg transition-all border border-border"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6 text-charcoal" />
            </button>
          )}

          {/* Right Arrow */}
          {totalPages > 1 && (
            <button
              onClick={goToNext}
              className="absolute right-[-60px] top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-cream p-3 rounded-full shadow-lg transition-all border border-border"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6 text-charcoal" />
            </button>
          )}

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentTestimonials.map((item, index) => (
              <motion.div
                key={`${currentIndex}-${index}`}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gradient-to-br from-cream to-white border border-border rounded-2xl p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <Quote className="w-8 h-8 text-coral/30" />
                  {renderStars(item.rating)}
                </div>
                <p className="text-charcoal-light mb-6" style={{ fontSize: "15px", lineHeight: "1.7", fontStyle: "italic" }}>
                  &quot;{item.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-coral/10">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-charcoal font-bold" style={{ fontSize: "15px" }}>{item.name}</p>
                    <p className="text-charcoal-light" style={{ fontSize: "13px" }}>{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 5000);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-coral w-8'
                    : 'bg-coral/30 hover:bg-coral/50'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
