import { Link } from "react-router";
import { motion } from "motion/react";
import { useState } from "react";

export function Hero() {
  const [animationStage, setAnimationStage] = useState<"centered" | "split">("centered");

  return (
    <>
      {/* Main Hero Section */}
      <section
        className="relative overflow-hidden h-[95vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('ChatGPT Image Mar 10, 2026 at 06_13_51 PM.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/8 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl">

            {/* Hashtag Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6"
            >
              <div className="inline-flex items-center px-6 py-3 bg-coral text-white rounded-full shadow-xl">
                <span style={{
                  fontSize: "clamp(16px, 1.8vw, 20px)",
                  fontWeight: 800,
                  letterSpacing: "0.05em"
                }}>
                  #PowerToPeople
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontSize: "clamp(50px, 6vw, 80px)",
                fontWeight: 700,
                lineHeight: "1.2",
                letterSpacing: "-0.02em",
                color: "#1A1A1A",
                fontFamily: "var(--font-family-serif)",
                marginBottom: "28px"
              }}
            >
              Committed to{" "}
              <span className="text-coral" style={{ fontWeight: 900 }}>Development.</span>
              <br />
              Dedicated to{" "}
              <span className="text-coral" style={{ fontWeight: 900 }}>Service.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              style={{
                fontSize: "clamp(17px, 1.9vw, 20px)",
                lineHeight: "1.7",
                fontWeight: 400,
                color: "rgba(26, 26, 26, 0.8)",
                marginBottom: "36px",
                maxWidth: "620px"
              }}
            >
              Building a cleaner, safer, and more prosperous ward through
              transparent governance and citizen engagement.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/work"
                className="inline-flex items-center justify-center px-9 py-4 bg-coral text-white rounded-full border-2 border-coral transition-all duration-300 hover:bg-transparent hover:text-coral shadow-xl hover:shadow-2xl hover:scale-105"
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "0.5px"
                }}
              >
                VIEW OUR WORK
              </Link>
              <Link
                to="/connect"
                className="inline-flex items-center justify-center px-9 py-4 text-coral rounded-full hover:bg-coral hover:text-white border-2 border-coral hover:scale-105 transition-all shadow-xl"
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "0.5px"
                }}
              >
                SHARE YOUR CONCERN
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Impact Stats Section - White Background */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-16" style={{fontFamily: "var(--font-family-serif)"}}>
            <h2
              className="text-charcoal mb-4"
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 900,
                letterSpacing: "-0.01em",
                fontFamily: "var(--font-family-serif)"
              }}
            >
              OUR <span className="text-coral">IMPACT</span> IN ACTION
            </h2>
            <p
              className="text-charcoal-light max-w-2xl mx-auto"
              style={{ fontSize: "18px", lineHeight: "1.6" }}
            >
              Makarand Narwekar supports ward development, infrastructure,
              and community welfare initiatives.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { num: "200", label: "Projects Completed" },
              { num: "14", label: "Years of Service" },
              { num: "50K", label: "Citizens Served" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
                style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "12px"}}
              >
                <p className="text-charcoal mb-2" style={{ fontSize: "64px", fontWeight: 900, lineHeight: "1" }}>
                  {stat.num}<span className="text-coral">+</span>
                </p>
                <p className="text-charcoal-light" style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.02em", fontFamily: "var(--font-family-serif)" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
