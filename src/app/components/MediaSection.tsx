import { motion } from "motion/react";
import { Award, Newspaper, Camera, Play, ExternalLink } from "lucide-react";
import { IMAGES } from "./images";

const awards = [
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

const pressItems = [
  {
    title: "Ward Tops Mumbai in Road Repair Completion",
    source: "Mumbai Mirror",
    date: "Jan 2026",
    image: IMAGES.roadConstruction,
  },
  {
    title: "Corporator's Digital Governance Push Praised",
    source: "Times of India",
    date: "Nov 2025",
    image: IMAGES.press,
  },
  {
    title: "Community Park Revival: A Model for Other Wards",
    source: "Hindustan Times",
    date: "Sep 2025",
    image: IMAGES.park,
  },
];

const galleryImages = [
  { src: IMAGES.rally, alt: "Public rally" },
  { src: IMAGES.community, alt: "Community gathering" },
  { src: IMAGES.award, alt: "Award ceremony" },
  { src: IMAGES.school, alt: "School visit" },
  { src: IMAGES.cleanStreet, alt: "Clean-up drive" },
  { src: IMAGES.park, alt: "Park inauguration" },
];

const videos = [
  { title: "Ward Development Update 2025", thumbnail: IMAGES.roadConstruction, duration: "12:34" },
  { title: "Community Health Camp Highlights", thumbnail: IMAGES.community, duration: "8:20" },
  { title: "School Digital Classroom Launch", thumbnail: IMAGES.school, duration: "5:45" },
];

export function MediaSection() {
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
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-6 h-6 text-coral" />
            <h3 className="text-charcoal" style={{ fontSize: "22px", fontWeight: 700 }}>Awards & Recognition</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {awards.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white p-8 border border-border hover:shadow-lg transition-all"
                style={{ borderRadius: "28px" }}
              >
                <div className="w-12 h-12 rounded-full bg-coral-light flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-coral" />
                </div>
                <span className="text-coral" style={{ fontSize: "12px", fontWeight: 700 }}>{item.year}</span>
                <h4 className="text-charcoal mt-1 mb-2" style={{ fontSize: "17px", fontWeight: 700 }}>{item.title}</h4>
                <p className="text-charcoal-light mb-2" style={{ fontSize: "13px", fontWeight: 600 }}>{item.org}</p>
                <p className="text-charcoal-light" style={{ fontSize: "14px", lineHeight: "1.6" }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Press Coverage */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Newspaper className="w-6 h-6 text-coral" />
            <h3 className="text-charcoal" style={{ fontSize: "22px", fontWeight: 700 }}>Press Coverage</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pressItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group bg-white overflow-hidden border border-border hover:shadow-lg transition-all cursor-pointer"
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
              </motion.div>
            ))}
          </div>
        </div>

        {/* Photo Gallery - Unique Pill-Shaped Layout */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Camera className="w-6 h-6 text-coral" />
            <h3 className="text-charcoal" style={{ fontSize: "20px", fontWeight: 700 }}>Photo Gallery</h3>
          </div>

          {/* Pill-shaped gallery with varied sizes */}
          <div className="relative">
            {/* Row 1 - Large pills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group relative overflow-hidden cursor-pointer bg-white"
                style={{
                  borderRadius: "60px",
                  height: "280px"
                }}
              >
                <img src={galleryImages[0].src} alt={galleryImages[0].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <p className="text-white" style={{ fontSize: "16px", fontWeight: 600 }}>
                    {galleryImages[0].alt}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group relative overflow-hidden cursor-pointer bg-white"
                style={{
                  borderRadius: "60px",
                  height: "280px"
                }}
              >
                <img src={galleryImages[1].src} alt={galleryImages[1].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <p className="text-white" style={{ fontSize: "16px", fontWeight: 600 }}>
                    {galleryImages[1].alt}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Row 2 - Mixed sizes */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative overflow-hidden cursor-pointer bg-white"
                style={{
                  borderRadius: "50px",
                  height: "200px"
                }}
              >
                <img src={galleryImages[2].src} alt={galleryImages[2].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>
                    {galleryImages[2].alt}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="col-span-2 group relative overflow-hidden cursor-pointer bg-white"
                style={{
                  borderRadius: "50px",
                  height: "200px"
                }}
              >
                <img src={galleryImages[3].src} alt={galleryImages[3].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>
                    {galleryImages[3].alt}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Row 3 - Small pills */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="group relative overflow-hidden cursor-pointer bg-white"
                style={{
                  borderRadius: "50px",
                  height: "180px"
                }}
              >
                <img src={galleryImages[4].src} alt={galleryImages[4].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>
                    {galleryImages[4].alt}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="group relative overflow-hidden cursor-pointer bg-white"
                style={{
                  borderRadius: "50px",
                  height: "180px"
                }}
              >
                <img src={galleryImages[5].src} alt={galleryImages[5].alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>
                    {galleryImages[5].alt}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Video Thumbnails */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Play className="w-6 h-6 text-coral" />
            <h3 className="text-charcoal" style={{ fontSize: "22px", fontWeight: 700 }}>Videos</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group bg-white overflow-hidden border border-border hover:shadow-lg transition-all cursor-pointer"
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
