import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, IndianRupee, MapPin, CheckCircle2, Clock } from "lucide-react";
import { IMAGES } from "../components/images";

const projectsData: Record<string, {
  title: string;
  category: string;
  status: "completed" | "ongoing";
  progress?: number;
  image: string;
  budget: string;
  date: string;
  location: string;
  description: string;
  details: string[];
  gallery: string[];
}> = {
  "road-reconstruction": {
    title: "Ward Road Reconstruction",
    category: "Infrastructure",
    status: "completed",
    image: IMAGES.roadConstruction,
    budget: "₹2.5 Crore",
    date: "Completed December 2025",
    location: "Colaba Ward, South Mumbai",
    description: "Complete reconstruction of 12km of ward roads with modern concrete technology, integrated stormwater drainage, and pedestrian-friendly pathways. This project addressed years of waterlogging and pothole issues that affected daily commuters and residents.",
    details: [
      "12 km of roads fully reconstructed with concrete technology",
      "Integrated stormwater drainage system installed",
      "Pedestrian pathways and safety barriers added",
      "LED road markings at all major intersections",
      "Speed bumps and zebra crossings near schools and hospitals",
      "Completed 2 months ahead of schedule",
    ],
    gallery: [IMAGES.roadConstruction, IMAGES.beforeRoad, IMAGES.afterRoad],
  },
  "street-lighting": {
    title: "LED Street Lighting",
    category: "Public Safety",
    status: "completed",
    image: IMAGES.streetLights,
    budget: "₹85 Lakh",
    date: "Completed October 2025",
    location: "All sectors, Colaba Ward",
    description: "Installation of 450+ energy-efficient LED street lights across the entire ward, replacing outdated sodium vapor lamps. The project has significantly improved nighttime visibility and reduced energy costs by 60%.",
    details: [
      "450+ LED street lights installed across the ward",
      "60% reduction in energy consumption",
      "Dark spots near residential areas fully eliminated",
      "Solar-powered lights in park areas",
      "Smart timer system for efficient operation",
      "Annual maintenance contract in place",
    ],
    gallery: [IMAGES.streetLights, IMAGES.mumbai],
  },
  "school-renovation": {
    title: "Municipal School Upgrades",
    category: "Education",
    status: "completed",
    image: IMAGES.school,
    budget: "₹1.2 Crore",
    date: "Completed August 2025",
    location: "8 Municipal Schools, Colaba Ward",
    description: "Comprehensive renovation of 8 municipal schools including digital classrooms, modern furniture, improved sanitation, and playground upgrades. Impacting over 3,000 students directly.",
    details: [
      "8 schools fully renovated with modern infrastructure",
      "Digital classrooms with projectors and computers",
      "New furniture and learning materials provided",
      "Separate clean washrooms for boys and girls",
      "Playground equipment and sports facilities upgraded",
      "Library sections with 5,000+ new books",
    ],
    gallery: [IMAGES.school, IMAGES.community],
  },
  "park-development": {
    title: "Community Park Revival",
    category: "Community Welfare",
    status: "completed",
    image: IMAGES.park,
    budget: "₹65 Lakh",
    date: "Completed June 2025",
    location: "3 locations, Colaba Ward",
    description: "Transformation of 3 neglected open spaces into vibrant community parks with walking tracks, senior citizen zones, children's play areas, and landscaped gardens.",
    details: [
      "3 community parks fully developed",
      "Jogging and walking tracks with rubber flooring",
      "Dedicated senior citizen zones with seating",
      "Children's play areas with modern equipment",
      "Landscaping with 200+ native trees and plants",
      "Outdoor gym equipment installed",
    ],
    gallery: [IMAGES.park, IMAGES.community],
  },
  "water-pipeline": {
    title: "Water Pipeline Replacement",
    category: "Infrastructure",
    status: "ongoing",
    progress: 72,
    image: IMAGES.waterPipeline,
    budget: "₹3.1 Crore",
    date: "Expected March 2026",
    location: "Underground network, Colaba Ward",
    description: "Replacement of aging water pipelines across the ward to eliminate leakages, improve water pressure, and ensure 24/7 water supply to all households.",
    details: [
      "Replacing 15km of aging water pipelines",
      "Using HDPE pipes for longer life and leak prevention",
      "New booster pumping stations at 4 locations",
      "Water meters being installed for accurate billing",
      "Minimal disruption to residents during work",
      "72% of work completed as of February 2026",
    ],
    gallery: [IMAGES.waterPipeline, IMAGES.mumbai],
  },
  "sanitation-drive": {
    title: "Sanitation Infrastructure Upgrade",
    category: "Cleanliness & Sanitation",
    status: "ongoing",
    progress: 45,
    image: IMAGES.cleanStreet,
    budget: "₹1.8 Crore",
    date: "Expected June 2026",
    location: "Ward-wide, Colaba",
    description: "Comprehensive upgrade of sanitation infrastructure including public toilets, waste collection systems, and composting facilities.",
    details: [
      "20 public toilets being renovated and modernized",
      "Automated waste collection bins at 100+ locations",
      "Composting facility being built for organic waste",
      "Door-to-door waste segregation awareness campaigns",
      "Bio-gas plant under planning phase",
      "45% of work completed",
    ],
    gallery: [IMAGES.cleanStreet],
  },
  "community-center": {
    title: "Community Center Construction",
    category: "Community Welfare",
    status: "ongoing",
    progress: 30,
    image: IMAGES.community,
    budget: "₹2.2 Crore",
    date: "Expected September 2026",
    location: "Central Colaba",
    description: "Construction of a modern community center with multi-purpose hall, library, computer lab, and spaces for cultural and social events.",
    details: [
      "Multi-purpose hall with 500-person capacity",
      "Modern library and reading room",
      "Computer lab with 30 workstations",
      "Cultural performance stage",
      "Meeting rooms for community organizations",
      "Foundation and structure work 30% complete",
    ],
    gallery: [IMAGES.community, IMAGES.rally],
  },
};

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectsData[id] : null;

  if (!project) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-brown mb-4" style={{ fontSize: "24px", fontWeight: 700 }}>Project Not Found</h2>
          <Link to="/work" className="text-saffron hover:text-saffron-dark" style={{ fontSize: "15px", fontWeight: 600 }}>
            &larr; Back to All Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-brown-light hover:text-saffron transition-colors mb-8"
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Projects
        </Link>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden mb-8"
        >
          <img src={project.image} alt={project.title} className="w-full h-64 lg:h-96 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brown/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span
              className={`inline-block px-3 py-1 rounded-full text-white mb-3 ${
                project.status === "completed" ? "bg-emerald-500" : "bg-saffron"
              }`}
              style={{ fontSize: "12px", fontWeight: 700 }}
            >
              {project.status === "completed" ? "Completed" : "Ongoing"}
            </span>
            <h1 className="text-white" style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
              {project.title}
            </h1>
          </div>
        </motion.div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Calendar, label: "Timeline", value: project.date },
            { icon: IndianRupee, label: "Budget", value: project.budget },
            { icon: MapPin, label: "Location", value: project.location },
            { icon: project.status === "completed" ? CheckCircle2 : Clock, label: "Status", value: project.status === "completed" ? "Completed" : `${project.progress}% Complete` },
          ].map((meta) => (
            <div key={meta.label} className="bg-cream rounded-xl p-4 border border-border">
              <meta.icon className="w-5 h-5 text-saffron mb-2" />
              <p className="text-brown-light" style={{ fontSize: "12px", fontWeight: 600 }}>{meta.label}</p>
              <p className="text-brown mt-0.5" style={{ fontSize: "14px", fontWeight: 700 }}>{meta.value}</p>
            </div>
          ))}
        </div>

        {/* Progress bar for ongoing */}
        {project.status === "ongoing" && project.progress && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-brown" style={{ fontSize: "14px", fontWeight: 600 }}>Progress</span>
              <span className="text-saffron" style={{ fontSize: "14px", fontWeight: 700 }}>{project.progress}%</span>
            </div>
            <div className="w-full bg-cream-dark rounded-full h-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="h-4 rounded-full bg-gradient-to-r from-saffron to-saffron-dark"
              />
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-10">
          <h2 className="text-brown mb-4" style={{ fontSize: "22px", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            About This Project
          </h2>
          <p className="text-brown-light" style={{ fontSize: "16px", lineHeight: "1.8" }}>
            {project.description}
          </p>
        </div>

        {/* Details */}
        <div className="mb-10">
          <h2 className="text-brown mb-4" style={{ fontSize: "22px", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            Key Details
          </h2>
          <div className="bg-cream rounded-xl p-6 border border-border">
            <ul className="space-y-3">
              {project.details.map((detail, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                  <span className="text-brown-light" style={{ fontSize: "15px", lineHeight: "1.6" }}>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gallery */}
        {project.gallery.length > 1 && (
          <div className="mb-10">
            <h2 className="text-brown mb-4" style={{ fontSize: "22px", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
              Project Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.gallery.map((img, index) => (
                <div key={index} className="rounded-xl overflow-hidden">
                  <img src={img} alt={`${project.title} - ${index + 1}`} className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-saffron-light rounded-xl p-6 text-center">
          <p className="text-brown mb-4" style={{ fontSize: "16px", fontWeight: 600 }}>
            Have questions about this project?
          </p>
          <Link
            to="/connect"
            className="inline-flex items-center gap-2 px-6 py-3 bg-saffron text-white rounded-xl hover:bg-saffron-dark transition-all"
            style={{ fontSize: "14px", fontWeight: 600 }}
          >
            Contact Our Office
          </Link>
        </div>
      </div>
    </div>
  );
}
