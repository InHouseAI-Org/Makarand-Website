'use client';

import { motion } from "motion/react";
import { Award, ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { IMAGES } from "./images";

export function AboutPreview() {
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-coral mb-3" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
            HIS JOURNEY
          </p>
          <h2 className="text-charcoal mb-4" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            From Grassroots to Governance
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden shadow-2xl"
            style={{ borderRadius: "48px" }}
          >
            <img src="/community-leadership-two-moments.png" alt="Community service" className="w-full aspect-[4/3] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-white/80" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em" }}>LEADERSHIP PHILOSOPHY</p>
              <p className="text-white mt-3" style={{ fontSize: "20px", fontWeight: 600, fontFamily: "var(--font-family-serif)", lineHeight: "1.5" }}>
                "Every citizen deserves a leader who listens first and acts with purpose."
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group p-6 rounded-3xl bg-white hover:bg-white/80 border border-gray-100 hover:border-coral/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex gap-5 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-coral/15 to-coral/5 flex items-center justify-center shrink-0 border-2 border-coral/20 group-hover:border-coral/40 group-hover:scale-110 transition-all duration-300">
                    <span className="text-coral font-bold text-xl">14+</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-charcoal font-bold mb-2 group-hover:text-coral transition-colors duration-300" style={{ fontSize: "22px" }}>Years of Service</h3>
                    <p className="text-charcoal-light" style={{ fontSize: "16px", lineHeight: "1.7" }}>
                      Dedicated to public service since 2012, from grassroots activism to becoming a trusted corporator.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group p-6 rounded-3xl bg-white hover:bg-white/80 border border-gray-100 hover:border-coral/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex gap-5 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-coral/15 to-coral/5 flex items-center justify-center shrink-0 border-2 border-coral/20 group-hover:border-coral/40 group-hover:scale-110 transition-all duration-300">
                    <Award className="w-8 h-8 text-coral" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-charcoal font-bold mb-2 group-hover:text-coral transition-colors duration-300" style={{ fontSize: "22px" }}>Multiple Re-elections</h3>
                    <p className="text-charcoal-light" style={{ fontSize: "16px", lineHeight: "1.7" }}>
                      Earned the trust of Ward 226 residents through transparent governance and completed projects.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group p-6 rounded-3xl bg-white hover:bg-white/80 border border-gray-100 hover:border-coral/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex gap-5 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-coral/15 to-coral/5 flex items-center justify-center shrink-0 border-2 border-coral/20 group-hover:border-coral/40 group-hover:scale-110 transition-all duration-300">
                    <Users className="w-8 h-8 text-coral" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-charcoal font-bold mb-2 group-hover:text-coral transition-colors duration-300" style={{ fontSize: "22px" }}>Community First</h3>
                    <p className="text-charcoal-light" style={{ fontSize: "16px", lineHeight: "1.7" }}>
                      Every decision driven by resident consultation, ensuring development that truly serves the people.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-coral hover:text-coral-dark transition-colors font-semibold text-lg"
            >
              Read Full Journey <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
