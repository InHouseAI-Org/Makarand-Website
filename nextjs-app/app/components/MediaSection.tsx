import { Award, Newspaper, Camera, Play, ExternalLink } from "lucide-react";
import Link from "next/link";
import { IMAGES } from "./images";
import { prisma } from "@/lib/prisma";
import { MediaSectionClient } from "./MediaSectionClient";
import { AwardCard } from "./AwardCard";

export async function MediaSection() {
  // Fetch all media items from database
  const allMediaItems = await prisma.media.findMany({
    where: {
      published: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
  });

  // Filter by category
  const awardsFromDB = allMediaItems.filter(item => item.category === 'award').slice(0, 6);
  const pressItemsFromDB = allMediaItems.filter(item => item.category === 'press').slice(0, 6);
  const videosFromDB = allMediaItems.filter(item => item.category === 'video').slice(0, 6);

  // Convert awards to format expected by UI
  const awards = awardsFromDB.map(award => {
    console.log('Award from DB:', {
      id: award.id,
      title: award.title,
      thumbnail: award.thumbnail,
      category: award.category
    });
    return {
      id: award.id,
      title: award.title,
      org: award.source || 'N/A',
      year: new Date(award.publishedAt).getFullYear().toString(),
      description: award.description || '',
      image: award.thumbnail || undefined,
    };
  });

  // Fallback awards if none in database
  const defaultAwards = [
    {
      title: "Best Corporator Award",
      org: "Mumbai Municipal Corporation",
      year: "2025",
      description: "Recognized for outstanding contribution to ward development and citizen services.",
    },
    {
      title: "Clean Ward Excellence",
      org: "Swachh Bharat Mission",
      year: "2024",
      description: "Top ranking in cleanliness and sanitation standards among city wards.",
    },
    {
      title: "Infrastructure Development Award",
      org: "Urban Development Authority",
      year: "2023",
      description: "For completing all planned road and drainage projects ahead of schedule.",
    },
  ];

  const displayAwards = awards.length > 0 ? awards : defaultAwards;

  console.log('=== AWARDS DEBUG ===');
  console.log('Awards from DB count:', awards.length);
  console.log('Using default awards:', awards.length === 0);
  console.log('Display awards:', displayAwards.map(a => ({ title: a.title, image: a.image })));

  // Convert press items to format expected by UI
  const pressItems = pressItemsFromDB.map(item => ({
    id: item.id,
    title: item.title,
    source: item.source || 'N/A',
    date: new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    image: item.thumbnail || IMAGES.press,
  }));

  // Fallback press items if none in database
  const defaultPressItems = [
    {
      id: "ward-tops-road-repair",
      title: "Ward Tops Mumbai in Road Repair Completion",
      source: "Mumbai Mirror",
      date: "Jan 2026",
      image: IMAGES.roadConstruction,
    },
    {
      id: "digital-governance-praised",
      title: "Corporator's Digital Governance Push Praised",
      source: "Times of India",
      date: "Nov 2025",
      image: IMAGES.press,
    },
    {
      id: "community-park-model",
      title: "Community Park Revival: A Model for Other Wards",
      source: "Hindustan Times",
      date: "Sep 2025",
      image: IMAGES.park,
    },
  ];

  const displayPressItems = pressItems.length > 0 ? pressItems : defaultPressItems;

  // Convert videos to format expected by UI
  const videos = videosFromDB.map(video => ({
    id: video.id,
    title: video.title,
    thumbnail: video.thumbnail || IMAGES.community,
    duration: "0:00", // Duration not in Media model
  }));

  // Fallback videos if none in database
  const defaultVideos = [
    { id: "ward-development-2025", title: "Ward Development Update 2025", thumbnail: IMAGES.roadConstruction, duration: "12:34" },
    { id: "health-camp-highlights", title: "Community Health Camp Highlights", thumbnail: IMAGES.community, duration: "8:20" },
    { id: "digital-classroom-launch", title: "School Digital Classroom Launch", thumbnail: IMAGES.school, duration: "5:45" },
  ];

  const displayVideos = videos.length > 0 ? videos : defaultVideos;
  // Fetch gallery images from database
  let galleryImagesFromDB = [];
  try {
    galleryImagesFromDB = await prisma.galleryImage.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        displayOrder: 'asc',
      },
      take: 6,
    });
  } catch (error) {
    console.error('[MediaSection] Error fetching gallery images:', error);
  }

  // Convert to the format expected by the gallery
  const galleryImages = galleryImagesFromDB.map(img => ({
    src: img.imageUrl,
    alt: img.altText,
    caption: img.caption || undefined,
  }));

  // Fallback to default images if no gallery images in DB
  const defaultGalleryImages = [
    { src: IMAGES.rally, alt: "Public rally" },
    { src: IMAGES.community, alt: "Community gathering" },
    { src: IMAGES.award, alt: "Award ceremony" },
    { src: IMAGES.school, alt: "School visit" },
    { src: IMAGES.cleanStreet, alt: "Clean-up drive" },
    { src: IMAGES.park, alt: "Park inauguration" },
  ];

  const displayGalleryImages = galleryImages.length > 0 ? galleryImages : defaultGalleryImages;

  // Fetch social media posts from database
  const socialMediaPosts = await prisma.socialMediaEmbed.findMany({
    where: {
      isPublished: true,
    },
    orderBy: [
      { platform: 'asc' },
      { displayOrder: 'asc' },
      { createdAt: 'desc' }
    ],
    take: 6, // Max 3 per platform
  });

  const instagramEmbeds = socialMediaPosts
    .filter(post => post.platform === 'instagram')
    .slice(0, 3)
    .map(post => ({
      id: post.extractedId,
      type: post.embedType,
      title: post.title || undefined,
    }));

  const youtubeEmbeds = socialMediaPosts
    .filter(post => post.platform === 'youtube')
    .slice(0, 3)
    .map(post => ({
      id: post.extractedId,
      title: post.title || 'Video',
    }));

  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-coral mb-3" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
            MEDIA & RECOGNITION
          </p>
          <h2 className="text-charcoal mb-4" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, letterSpacing: "-0.01em", fontFamily: "var(--font-family-serif)" }}>
            In the Spotlight
          </h2>
          <p className="text-charcoal-light" style={{ fontSize: "17px", lineHeight: "1.8" }}>
            Awards, press coverage, and moments from our journey of service and development.
          </p>
        </div>

        {/* Awards */}
        {displayAwards.length > 0 && (
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-6 h-6 text-coral" />
            <h3 className="text-charcoal" style={{ fontSize: "22px", fontWeight: 700 }}>Awards & Recognition</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayAwards.map((item, index) => (
              <AwardCard
                key={item.title}
                id={item.id}
                title={item.title}
                org={item.org}
                year={item.year}
                description={item.description}
                image={item.image}
              />
            ))}
          </div>
        </div>
        )}

        {/* Press Coverage */}
        {displayPressItems.length > 0 && (
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Newspaper className="w-6 h-6 text-coral" />
            <h3 className="text-charcoal" style={{ fontSize: "22px", fontWeight: 700 }}>Press Coverage</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayPressItems.map((item, index) => (
              <div
                key={item.title}
              >
                <Link
                  href={`/media/press/${item.id}`}
                  className="block group bg-white overflow-hidden border border-border hover:shadow-lg transition-all"
                  style={{ borderRadius: "28px" }}
                >
                  <div className="h-40 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-coral" style={{ fontSize: "12px", fontWeight: 600 }}>{item.source}</span>
                      <span className="text-charcoal-light" style={{ fontSize: "12px" }}>{item.date}</span>
                    </div>
                    <h4 className="text-charcoal group-hover:text-coral-dark transition-colors" style={{ fontSize: "15px", fontWeight: 700, lineHeight: "1.4" }}>
                      {item.title}
                    </h4>
                    <div className="mt-3 flex items-center gap-1 text-coral" style={{ fontSize: "13px", fontWeight: 600 }}>
                      Read More <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Photo Gallery - Unique Pill-Shaped Layout */}
        {displayGalleryImages.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Camera className="w-6 h-6 text-coral" />
            <h3 className="text-charcoal" style={{ fontSize: "20px", fontWeight: 700 }}>Photo Gallery</h3>
          </div>

          {/* Pill-shaped gallery - 3x2 grid for 6 images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayGalleryImages.slice(0, 6).map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden cursor-pointer bg-white"
                style={{
                  borderRadius: "50px",
                  height: "250px"
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 md:p-8">
                  <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>
                    {image.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Video Thumbnails */}
        {displayVideos.length > 0 && (
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Play className="w-6 h-6 text-coral" />
            <h3 className="text-charcoal" style={{ fontSize: "22px", fontWeight: 700 }}>Videos</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayVideos.map((video, index) => (
              <div
                key={video.title}
              >
                <Link
                  href={`/media/video/${video.id}`}
                  className="block group bg-white overflow-hidden border border-border hover:shadow-lg transition-all"
                  style={{ borderRadius: "28px" }}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-charcoal/30 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-coral ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white rounded" style={{ fontSize: "12px" }}>
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-charcoal group-hover:text-coral-dark transition-colors" style={{ fontSize: "15px", fontWeight: 700 }}>
                      {video.title}
                    </h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Social Media Embeds */}
        <div className="mb-20">
          <h3 className="text-charcoal text-center mb-8" style={{ fontSize: "22px", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            Social Media Updates
          </h3>

          {/* Instagram Embeds */}
          {instagramEmbeds.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
                  <defs>
                    <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#FED373', stopOpacity: 1 }} />
                      <stop offset="15%" style={{ stopColor: '#F15245', stopOpacity: 1 }} />
                      <stop offset="40%" style={{ stopColor: '#D92E7F', stopOpacity: 1 }} />
                      <stop offset="75%" style={{ stopColor: '#9B36B7', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#515ECF', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <h4 className="text-charcoal" style={{ fontSize: "18px", fontWeight: 700 }}>Instagram</h4>
              </div>

              <MediaSectionClient instagramEmbeds={instagramEmbeds} youtubeEmbeds={[]} type="instagram" />
            </div>
          )}

          {/* YouTube Embeds */}
          {youtubeEmbeds.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#FF0000">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <h4 className="text-charcoal" style={{ fontSize: "18px", fontWeight: 700 }}>YouTube</h4>
              </div>

              <MediaSectionClient instagramEmbeds={[]} youtubeEmbeds={youtubeEmbeds} type="youtube" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
