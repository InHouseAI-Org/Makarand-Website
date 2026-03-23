import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Newspaper, Play, ExternalLink } from "lucide-react";
import { IMAGES } from "../components/images";

// Press Coverage Data
const pressData: Record<string, {
  title: string;
  source: string;
  date: string;
  image: string;
  type: "press";
  summary: string;
  content: string[];
  externalLink?: string;
  gallery?: string[];
}> = {
  "ward-tops-road-repair": {
    title: "Ward Tops Mumbai in Road Repair Completion",
    source: "Mumbai Mirror",
    date: "Jan 2026",
    image: IMAGES.roadConstruction,
    type: "press",
    summary: "Our ward has achieved the highest completion rate for road repair projects across Mumbai, setting a benchmark for infrastructure development.",
    content: [
      "In a significant achievement, our ward has topped the charts in Mumbai for road repair completion, finishing all scheduled projects 2 months ahead of the deadline.",
      "The comprehensive road reconstruction initiative covered 12 kilometers of critical thoroughfares, addressing years of accumulated maintenance issues and improving connectivity across the ward.",
      "The project employed modern concrete technology and integrated stormwater drainage systems, ensuring long-term durability and addressing persistent waterlogging issues that had plagued residents for years.",
      "Municipal officials have praised the efficient project management and proactive community engagement that enabled this milestone. The success has been attributed to transparent tendering processes, regular monitoring, and timely resolution of implementation challenges.",
      "Residents have expressed satisfaction with the improved road quality, reduced commute times, and enhanced pedestrian safety features including dedicated pathways and improved street lighting at intersections."
    ],
    gallery: [IMAGES.roadConstruction, IMAGES.beforeRoad, IMAGES.afterRoad],
  },
  "digital-governance-praised": {
    title: "Corporator's Digital Governance Push Praised",
    source: "Times of India",
    date: "Nov 2025",
    image: IMAGES.press,
    type: "press",
    summary: "The implementation of digital platforms for citizen grievances and transparent governance has been recognized as a model for other wards.",
    content: [
      "The ward's innovative approach to digital governance has garnered widespread appreciation from municipal authorities and citizen groups alike.",
      "A comprehensive online portal has been launched, enabling residents to register complaints, track their status in real-time, and access civic services from the comfort of their homes.",
      "The system has resulted in a 65% reduction in complaint resolution time, with most issues being addressed within 48 hours of registration.",
      "Regular SMS and email updates keep citizens informed about their complaint status, fostering transparency and accountability in governance.",
      "The initiative includes digital town halls where residents can participate in decision-making processes, ensuring that development priorities align with community needs."
    ],
    gallery: [IMAGES.press, IMAGES.community],
  },
  "community-park-model": {
    title: "Community Park Revival: A Model for Other Wards",
    source: "Hindustan Times",
    date: "Sep 2025",
    image: IMAGES.park,
    type: "press",
    summary: "The transformation of neglected open spaces into vibrant community parks has been highlighted as a replicable model for urban renewal.",
    content: [
      "Three previously neglected open spaces have been transformed into thriving community parks, becoming social hubs for residents of all ages.",
      "The parks feature dedicated zones for different age groups - senior citizen areas with shaded seating, children's play zones with modern equipment, and open spaces for cultural activities.",
      "Landscaping with over 200 native trees and plants has enhanced the green cover while providing natural cooling and improved air quality in the neighborhoods.",
      "The project was developed through extensive community consultations, ensuring that the parks meet the actual needs and preferences of local residents.",
      "These parks have become venues for regular yoga sessions, cultural programs, and community gatherings, strengthening social bonds and promoting healthy lifestyles."
    ],
    gallery: [IMAGES.park, IMAGES.community],
  },
};

// Video Data
const videoData: Record<string, {
  title: string;
  thumbnail: string;
  duration: string;
  type: "video";
  date: string;
  description: string;
  highlights: string[];
  videoUrl?: string;
  gallery?: string[];
}> = {
  "ward-development-2025": {
    title: "Ward Development Update 2025",
    thumbnail: IMAGES.roadConstruction,
    duration: "12:34",
    type: "video",
    date: "January 2026",
    description: "A comprehensive overview of all major development projects completed in 2025, showcasing the transformation of infrastructure and civic amenities across the ward.",
    highlights: [
      "Complete road reconstruction covering 12km of ward roads",
      "Installation of 450+ LED street lights for improved safety",
      "Renovation of 8 municipal schools with modern facilities",
      "Development of 3 community parks with recreational amenities",
      "Ongoing water pipeline replacement project update",
      "Digital governance initiatives and citizen engagement platforms",
      "Future plans and projects scheduled for 2026"
    ],
    gallery: [IMAGES.roadConstruction, IMAGES.streetLights, IMAGES.school],
  },
  "health-camp-highlights": {
    title: "Community Health Camp Highlights",
    thumbnail: IMAGES.community,
    duration: "8:20",
    type: "video",
    date: "December 2025",
    description: "Coverage of the comprehensive health camp organized in partnership with municipal health services, providing free medical consultations and diagnostics to over 1,000 residents.",
    highlights: [
      "Free health check-ups for 1,000+ residents",
      "Blood pressure and diabetes screening",
      "Distribution of free medicines and supplements",
      "Eye check-ups and free reading glasses",
      "Health awareness sessions on nutrition and preventive care",
      "Vaccination drives for children and senior citizens",
      "Follow-up support through municipal health centers"
    ],
    gallery: [IMAGES.community, IMAGES.award],
  },
  "digital-classroom-launch": {
    title: "School Digital Classroom Launch",
    thumbnail: IMAGES.school,
    duration: "5:45",
    type: "video",
    date: "October 2025",
    description: "Inauguration of digital classrooms in 8 municipal schools, marking a significant step towards modern education and bridging the digital divide for students from economically weaker sections.",
    highlights: [
      "Digital classrooms in 8 municipal schools",
      "Smart boards and projectors for interactive learning",
      "Computer labs with internet connectivity",
      "Digital learning content in local languages",
      "Teacher training programs on digital pedagogy",
      "Free tablets for students from economically weaker sections",
      "Partnership with EdTech companies for content support"
    ],
    gallery: [IMAGES.school, IMAGES.community],
  },
};

export function MediaDetail() {
  const { type, id } = useParams<{ type: string; id: string }>();

  const mediaItem = type === "press" && id
    ? pressData[id]
    : type === "video" && id
    ? videoData[id]
    : null;

  if (!mediaItem) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-charcoal mb-4" style={{ fontSize: "24px", fontWeight: 700 }}>Media Not Found</h2>
          <Link to="/media" className="text-coral hover:text-coral-dark" style={{ fontSize: "15px", fontWeight: 600 }}>
            &larr; Back to Media
          </Link>
        </div>
      </div>
    );
  }

  const isPress = mediaItem.type === "press";
  const isVideo = mediaItem.type === "video";

  return (
    <div className="py-10 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/media"
          className="inline-flex items-center gap-2 text-charcoal-light hover:text-coral-dark transition-colors mb-8"
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Media
        </Link>

        {/* Hero Image/Video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden mb-8"
        >
          <img
            src={isPress ? mediaItem.image : mediaItem.thumbnail}
            alt={mediaItem.title}
            className="w-full h-64 lg:h-96 object-cover"
          />

          {/* Video Play Overlay */}
          {isVideo && (
            <div className="absolute inset-0 bg-charcoal/30 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                <Play className="w-10 h-10 text-coral ml-1" />
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-3">
              {isPress ? (
                <>
                  <Newspaper className="w-5 h-5 text-white" />
                  <span className="text-white/90" style={{ fontSize: "13px", fontWeight: 600 }}>
                    Press Coverage
                  </span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 text-white" />
                  <span className="text-white/90" style={{ fontSize: "13px", fontWeight: 600 }}>
                    Video • {mediaItem.duration}
                  </span>
                </>
              )}
            </div>
            <h1 className="text-white" style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
              {mediaItem.title}
            </h1>
          </div>
        </motion.div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-cream rounded-xl p-4 border border-border">
            <Calendar className="w-5 h-5 text-coral mb-2" />
            <p className="text-charcoal-light" style={{ fontSize: "12px", fontWeight: 600 }}>Date</p>
            <p className="text-charcoal mt-0.5" style={{ fontSize: "14px", fontWeight: 700 }}>{mediaItem.date}</p>
          </div>

          {isPress && (
            <div className="bg-cream rounded-xl p-4 border border-border">
              <Newspaper className="w-5 h-5 text-coral mb-2" />
              <p className="text-charcoal-light" style={{ fontSize: "12px", fontWeight: 600 }}>Source</p>
              <p className="text-charcoal mt-0.5" style={{ fontSize: "14px", fontWeight: 700 }}>{mediaItem.source}</p>
            </div>
          )}

          {isVideo && (
            <div className="bg-cream rounded-xl p-4 border border-border">
              <Play className="w-5 h-5 text-coral mb-2" />
              <p className="text-charcoal-light" style={{ fontSize: "12px", fontWeight: 600 }}>Duration</p>
              <p className="text-charcoal mt-0.5" style={{ fontSize: "14px", fontWeight: 700 }}>{mediaItem.duration}</p>
            </div>
          )}
        </div>

        {/* Summary/Description */}
        <div className="mb-10">
          <h2 className="text-charcoal mb-4" style={{ fontSize: "22px", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            {isPress ? "Summary" : "About This Video"}
          </h2>
          <p className="text-charcoal-light" style={{ fontSize: "16px", lineHeight: "1.8" }}>
            {isPress ? mediaItem.summary : mediaItem.description}
          </p>
        </div>

        {/* Content / Highlights */}
        <div className="mb-10">
          <h2 className="text-charcoal mb-4" style={{ fontSize: "22px", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            {isPress ? "Full Coverage" : "Video Highlights"}
          </h2>
          <div className="bg-cream rounded-xl p-6 border border-border">
            {isPress ? (
              <div className="space-y-4">
                {mediaItem.content.map((paragraph, index) => (
                  <p key={index} className="text-charcoal-light" style={{ fontSize: "15px", lineHeight: "1.8" }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <ul className="space-y-3">
                {mediaItem.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Play className="w-5 h-5 text-coral shrink-0 mt-0.5" />
                    <span className="text-charcoal-light" style={{ fontSize: "15px", lineHeight: "1.6" }}>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Gallery */}
        {mediaItem.gallery && mediaItem.gallery.length > 1 && (
          <div className="mb-10">
            <h2 className="text-charcoal mb-4" style={{ fontSize: "22px", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
              Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mediaItem.gallery.map((img, index) => (
                <div key={index} className="rounded-xl overflow-hidden">
                  <img src={img} alt={`${mediaItem.title} - ${index + 1}`} className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* External Link for Press */}
        {isPress && mediaItem.externalLink && (
          <div className="mb-10">
            <a
              href={mediaItem.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-border rounded-xl hover:bg-cream transition-all"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              Read Original Article
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* CTA */}
        <div className="bg-coral-light rounded-xl p-6 text-center">
          <p className="text-charcoal mb-4" style={{ fontSize: "16px", fontWeight: 600 }}>
            Stay updated with our latest news and initiatives
          </p>
          <Link
            to="/connect"
            className="inline-flex items-center gap-2 px-6 py-3 bg-coral text-white rounded-xl hover:bg-coral-dark transition-all"
            style={{ fontSize: "14px", fontWeight: 600 }}
          >
            Connect With Us
          </Link>
        </div>
      </div>
    </div>
  );
}
