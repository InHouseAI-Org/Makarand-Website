'use client';

import { motion } from "motion/react";
import { Quote, Play, Star } from "lucide-react";
import { useState } from "react";

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

interface TestimonialsClientProps {
  testimonials: Testimonial[];
  videoTestimonial: VideoTestimonial | null;
}

export function TestimonialsClient({ testimonials, videoTestimonial }: TestimonialsClientProps) {
  const [showVideo, setShowVideo] = useState(false);

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

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 lg:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-coral mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
            TESTIMONIALS
          </p>
          <h2 className="text-charcoal mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            Voices from the Community
          </h2>
          <p className="text-charcoal-light" style={{ fontSize: "16px", lineHeight: "1.7" }}>
            Hear from the citizens and community leaders about the impact of development work in our ward.
          </p>
        </div>

        {/* Video Testimonial (if available) */}
        {videoTestimonial && (
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-coral to-coral-dark rounded-2xl p-8 lg:p-12 text-white"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-white/90 mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
                    VIDEO TESTIMONIAL
                  </p>
                  <h3 className="text-white mb-4" style={{ fontSize: "28px", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
                    {videoTestimonial.name}
                  </h3>
                  <p className="text-white/80 mb-4" style={{ fontSize: "16px" }}>
                    {videoTestimonial.role}
                  </p>
                  <div className="mb-4">
                    {renderStars(videoTestimonial.rating)}
                  </div>
                  <button
                    onClick={() => setShowVideo(true)}
                    className="flex items-center gap-2 bg-white text-coral px-6 py-3 rounded-xl font-bold hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
                    style={{ fontSize: "14px" }}
                  >
                    <Play className="w-5 h-5" />
                    Watch Video
                  </button>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-charcoal/20 backdrop-blur-sm border-2 border-white/20">
                  {showVideo ? (
                    <iframe
                      src={getYouTubeEmbedUrl(videoTestimonial.videoUrl)}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div
                      className="w-full h-full relative cursor-pointer group"
                      onClick={() => setShowVideo(true)}
                    >
                      {/* YouTube Thumbnail */}
                      {getYouTubeThumbnail(videoTestimonial.videoUrl) && (
                        <img
                          src={getYouTubeThumbnail(videoTestimonial.videoUrl)!}
                          alt={`${videoTestimonial.name} video`}
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
        )}

        {/* Text Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name + index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <Quote className="w-8 h-8 text-coral/30" />
                {renderStars(item.rating)}
              </div>
              <p className="text-charcoal-light mb-6" style={{ fontSize: "15px", lineHeight: "1.7", fontStyle: "italic" }}>
                &quot;{item.quote}&quot;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img src={item.image} alt={item.name} className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <p className="text-charcoal" style={{ fontSize: "14px", fontWeight: 700 }}>{item.name}</p>
                  <p className="text-charcoal-light" style={{ fontSize: "12px" }}>{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
