'use client';

import { motion } from "motion/react";
import { GraduationCap, Users, Award, Target, Heart, Landmark } from "lucide-react";
import { IMAGES } from "./images";

const timelineData = [
  {
    year: "1985",
    title: "Early Life & Roots",
    description: "Born and raised in Mumbai, Makarand grew up witnessing the challenges faced by ordinary citizens, which shaped his deep commitment to public service.",
    icon: Heart,
  },
  {
    year: "2003",
    title: "Education & Foundation",
    description: "Graduated with a degree in Political Science and Public Administration, building the intellectual foundation for a career dedicated to civic governance.",
    icon: GraduationCap,
  },
  {
    year: "2008",
    title: "Entry into Public Service",
    description: "Began grassroots work with local communities, organizing clean-up drives, health camps, and educational initiatives across the ward.",
    icon: Users,
  },
  {
    year: "2012",
    title: "First Electoral Victory as Independent",
    description: "Elected as an independent corporator with a clear mandate for development and transparent governance, proving that dedication to service transcends party lines. Introduced ward-level accountability measures from day one.",
    icon: Landmark,
  },
  {
    year: "2017",
    title: "Re-election & Major Milestones",
    description: "Won a decisive re-election on the back of completed infrastructure projects, improved sanitation, and strong community engagement programs.",
    icon: Award,
  },
  {
    year: "2026 - Present",
    title: "Re-elected for Third Term",
    description: "Triumphantly re-elected with overwhelming public support, reflecting the community's trust in his proven track record. Continuing the mission with renewed focus on smart infrastructure, digital governance, and sustainable development to make the ward a model for civic excellence across Mumbai.",
    icon: Target,
  },
];

export function About({ isFullPage = false }: { isFullPage?: boolean }) {
  const displayData = isFullPage ? timelineData : timelineData.slice(0, 4);

  return (
    <section className={`${isFullPage ? "py-16 lg:py-24" : "py-16 lg:py-20"} bg-cream`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-coral mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
            HIS JOURNEY
          </p>
          <h2 className="text-charcoal mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            From Grassroots to Governance
          </h2>
          <p className="text-charcoal-light" style={{ fontSize: "16px", lineHeight: "1.7" }}>
            A story of dedication, service, and unwavering commitment to the people - 
            from community volunteer to ward corporator.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Image Column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden shadow-xl"
              >
                <img src="/From activism to governance journey.png" alt="Community service" className="w-full aspect-[4/5] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/80" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em" }}>LEADERSHIP PHILOSOPHY</p>
                  <p className="text-white mt-2" style={{ fontSize: "18px", fontWeight: 600, fontFamily: "var(--font-family-serif)", lineHeight: "1.4" }}>
                    "Every citizen deserves a leader who listens first and acts with purpose."
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-coral/20" />

              <div className="space-y-8">
                {displayData.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-16"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-white border-2 border-coral/30 flex items-center justify-center shadow-sm">
                      <item.icon className="w-5 h-5 text-coral" />
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                      <span className="inline-block px-3 py-1 bg-coral-light text-coral-dark rounded-full mb-3" style={{ fontSize: "12px", fontWeight: 700 }}>
                        {item.year}
                      </span>
                      <h3 className="text-charcoal mb-2" style={{ fontSize: "18px", fontWeight: 700 }}>
                        {item.title}
                      </h3>
                      <p className="text-charcoal-light" style={{ fontSize: "14px", lineHeight: "1.7" }}>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
