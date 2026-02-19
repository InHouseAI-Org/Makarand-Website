import { motion } from "motion/react";
import { Award, ArrowRight, Users } from "lucide-react";
import { Link } from "react-router";
import { IMAGES } from "./images";

export function AboutPreview() {
  return (
    <section className="py-16 lg:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-saffron mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
            HIS JOURNEY
          </p>
          <h2 className="text-brown mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            From Grassroots to Governance
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-xl"
          >
            <img src={IMAGES.community} alt="Community service" className="w-full aspect-[4/3] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brown/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white/80" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em" }}>LEADERSHIP PHILOSOPHY</p>
              <p className="text-white mt-2" style={{ fontSize: "18px", fontWeight: 600, fontFamily: "var(--font-family-serif)", lineHeight: "1.4" }}>
                "Every citizen deserves a leader who listens first and acts with purpose."
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0 border border-saffron/20">
                  <span className="text-saffron font-bold">13+</span>
                </div>
                <div>
                  <h3 className="text-brown font-bold mb-1" style={{ fontSize: "18px" }}>Years of Service</h3>
                  <p className="text-brown-light" style={{ fontSize: "15px", lineHeight: "1.6" }}>
                    Dedicated to public service since 2008, from grassroots activism to becoming a trusted corporator.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0 border border-saffron/20">
                  <Award className="w-6 h-6 text-saffron" />
                </div>
                <div>
                  <h3 className="text-brown font-bold mb-1" style={{ fontSize: "18px" }}>Multiple Re-elections</h3>
                  <p className="text-brown-light" style={{ fontSize: "15px", lineHeight: "1.6" }}>
                    Earned the trust of Ward 226 residents through transparent governance and completed projects.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0 border border-saffron/20">
                  <Users className="w-6 h-6 text-saffron" />
                </div>
                <div>
                  <h3 className="text-brown font-bold mb-1" style={{ fontSize: "18px" }}>Community First</h3>
                  <p className="text-brown-light" style={{ fontSize: "15px", lineHeight: "1.6" }}>
                    Every decision driven by resident consultation, ensuring development that truly serves the people.
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-saffron hover:text-saffron-dark transition-colors font-semibold"
            >
              Read Full Journey <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
