'use client';

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
import Link from "next/link";

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
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-charcoal mb-4"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 700,
              fontFamily: "var(--font-family-serif)"
            }}
          >
            Ward 226 | 2026 Commitment
          </h2>
          <p className="text-charcoal-light max-w-2xl mx-auto" style={{ fontSize: "17px", lineHeight: "1.8" }}>
            A commitment shaped by conversations, trust, and the everyday concerns of Ward 226 residents.
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group bg-white border border-border p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ borderRadius: "32px" }}
            >
              <div className="w-14 h-14 rounded-2xl bg-coral/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform border border-coral/20">
                <item.icon className="w-7 h-7 text-coral" />
              </div>
              <h3 className="text-charcoal mb-3" style={{ fontSize: "19px", fontWeight: 700 }}>
                {item.title}
              </h3>
              <p className="text-charcoal-light" style={{ fontSize: "15px", lineHeight: "1.7" }}>
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
          className="bg-charcoal text-white p-10 lg:p-12 text-center"
          style={{ borderRadius: "48px" }}
        >
          <h3
            className="mb-5"
            style={{
              fontSize: "clamp(28px, 3.5vw, 36px)",
              fontWeight: 700,
              fontFamily: "var(--font-family-serif)"
            }}
          >
            Excellence, Transparency & Accountability
          </h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto" style={{ fontSize: "16px", lineHeight: "1.8" }}>
            This commitment is about excellence, transparency, and accountability in civic work.
            I look forward to staying engaged with you and seek your valuable support as we take
            this commitment forward into 2026 and beyond.
          </p>

          <Link
            href="/vision"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-coral to-coral-dark text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            View Full Manifesto
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
