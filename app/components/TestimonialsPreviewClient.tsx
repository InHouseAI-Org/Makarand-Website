'use client';

import { motion } from "motion/react";
import { Quote, Star, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showVideo, setShowVideo] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVideoPaused, setIsVideoPaused] = useState(false);

  const itemsToShow = 3;
  const totalItems = testimonials.length;
  const totalSlides = Math.ceil(totalItems / itemsToShow);
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

  const scrollToSlide = (slideIndex: number) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const slideWidth = container.offsetWidth;
    const scrollPosition = slideIndex * slideWidth;

    container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  };

  const scroll = (direction: 'left' | 'right') => {
    const newSlide = direction === 'left'
      ? Math.max(0, currentSlide - 1)
      : Math.min(totalSlides - 1, currentSlide + 1);

    setCurrentSlide(newSlide);
    scrollToSlide(newSlide);
  };

  // Auto-scroll text testimonials every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => {
        const next = prev >= totalSlides - 1 ? 0 : prev + 1;
        scrollToSlide(next);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  // Auto-scroll video testimonials every 3 seconds
  useEffect(() => {
    if (isVideoPaused || totalVideoPages <= 1) return;

    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % totalVideoPages);
      setShowVideo(null); // Reset video when changing
    }, 3000);

    return () => clearInterval(interval);
  }, [isVideoPaused, totalVideoPages]);


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
                  className="hidden lg:flex absolute left-[-80px] top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-coral hover:bg-coral-dark p-3 rounded-full shadow-lg transition-all border border-border items-center justify-center"
                  aria-label="Previous video testimonial"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
              )}

              {/* Right Arrow */}
              {totalVideoPages > 1 && (
                <button
                  onClick={goToNextVideo}
                  className="hidden lg:flex absolute right-[-80px] top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-coral hover:bg-coral-dark p-3 rounded-full shadow-lg transition-all border border-border items-center justify-center"
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

        {/* Testimonial Cards with Horizontal Scroll */}
        <div className="relative">
          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={() => {
                  scroll('left');
                  setIsAutoPlaying(false);
                }}
                disabled={currentSlide === 0}
                className="hidden lg:flex absolute left-[-60px] top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-xl rounded-full p-3 hover:bg-coral hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-charcoal border-2 border-border hover:border-coral items-center justify-center"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => {
                  scroll('right');
                  setIsAutoPlaying(false);
                }}
                disabled={currentSlide >= totalSlides - 1}
                className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-xl rounded-full p-3 hover:bg-coral hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-charcoal border-2 border-border hover:border-coral items-center justify-center"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-scroll overflow-y-hidden scroll-smooth scrollbar-hide snap-x snap-mandatory"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-cream to-white border border-border rounded-2xl p-6 hover:shadow-xl transition-all flex-shrink-0 snap-start"
                style={{ width: 'calc(33.333% - 16px)', minWidth: '300px' }}
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

          {/* Pagination Dots */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsAutoPlaying(false);
                    scrollToSlide(index);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === index
                      ? 'bg-coral w-8'
                      : 'bg-border w-2 hover:bg-coral/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
