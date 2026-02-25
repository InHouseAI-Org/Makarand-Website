import { motion } from "motion/react";
import {
  Footprints,
  Car,
  TrafficCone,
  Lightbulb,
  Trash2,
  ShoppingBag,
  Droplets,
  ParkingCircle,
  Shield,
  Award,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router";

const highlights = [
  {
    icon: Footprints,
    title: "Pedestrian Infrastructure",
    description: "Uniform, level, and durable footpaths with wheelchair-friendly slopes",
  },
  {
    icon: Car,
    title: "Roads & Driving Safety",
    description: "Pothole-free roads with proper speed-calming measures",
  },
  {
    icon: TrafficCone,
    title: "Traffic Management",
    description: "Smart signage and clear parking zones to reduce congestion",
  },
  {
    icon: Lightbulb,
    title: "Street Lighting & Surveillance",
    description: "Complete coverage with 24x7 CCTV surveillance",
  },
  {
    icon: Trash2,
    title: "Cleanliness & Waste",
    description: "Daily waste removal with zero tolerance for accumulation",
  },
  {
    icon: Shield,
    title: "Transparent Governance",
    description: "Resident-led oversight committee for all civic works",
  },
];

export function VisionPreview() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald to-emerald-dark text-white px-5 py-2 rounded-full mb-4 shadow-lg shadow-emerald/20">
            <Award className="w-4 h-4" />
            <span className="font-bold text-xs tracking-wide">13+ YEARS OF SERVICE</span>
          </div>

          <h2
            className="text-charcoal mb-3"
            style={{
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 700,
              fontFamily: "var(--font-family-serif)"
            }}
          >
            Ward 226 | 2026 Commitment
          </h2>
          <p className="text-charcoal-light max-w-2xl mx-auto" style={{ fontSize: "16px", lineHeight: "1.7" }}>
            A commitment shaped by conversations, trust, and the everyday concerns of Ward 226 residents.
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group bg-gradient-to-br from-white to-cream border border-border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald/10 to-charcoal/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-emerald/20">
                <item.icon className="w-6 h-6 text-emerald" />
              </div>
              <h3 className="text-charcoal mb-2" style={{ fontSize: "17px", fontWeight: 700 }}>
                {item.title}
              </h3>
              <p className="text-charcoal-light" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Core Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-charcoal via-charcoal-dark to-charcoal text-white rounded-2xl p-8 lg:p-10 text-center"
        >
          <h3
            className="mb-4"
            style={{
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              fontFamily: "var(--font-family-serif)"
            }}
          >
            Excellence, Transparency & Accountability
          </h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto" style={{ fontSize: "15px", lineHeight: "1.7" }}>
            This commitment is about excellence, transparency, and accountability in civic work.
            I look forward to staying engaged with you and seek your valuable support as we take
            this commitment forward into 2026 and beyond.
          </p>

          <Link
            to="/vision"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald to-emerald-dark text-white px-6 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            View Full Manifesto
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
