'use client';

import { motion } from "motion/react";

interface InstagramEmbed {
  id: string;
  type: string;
  title?: string;
}

interface YouTubeEmbed {
  id: string;
  title: string;
}

interface MediaSectionClientProps {
  instagramEmbeds: InstagramEmbed[];
  youtubeEmbeds: YouTubeEmbed[];
  type: 'instagram' | 'youtube';
}

export function MediaSectionClient({ instagramEmbeds, youtubeEmbeds, type }: MediaSectionClientProps) {
  if (type === 'instagram') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instagramEmbeds.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-center"
          >
            <iframe
              src={`https://www.instagram.com/${post.type}/${post.id}/embed`}
              className="w-full max-w-[540px] border-0 overflow-hidden rounded-2xl shadow-lg"
              style={{ minHeight: "500px" }}
              allow="encrypted-media"
              title={post.title || `Instagram ${post.type} ${index + 1}`}
            />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {youtubeEmbeds.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="rounded-2xl overflow-hidden shadow-lg bg-white"
        >
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="p-4">
            <p className="text-charcoal line-clamp-2" style={{ fontSize: "14px", fontWeight: 600 }}>
              {video.title}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
