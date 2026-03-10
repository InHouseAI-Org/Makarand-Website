import { Link } from "react-router";
import { motion } from "motion/react";
import { useState } from "react";

export function Hero() {
  const [animationStage, setAnimationStage] = useState<"centered" | "split">("centered");

  return (
    <>
      {/* Main Hero Section */}
      <section
        className="relative overflow-hidden h-[95vh]"
        style={{
          backgroundImage: "url('ChatGPT Image Mar 10, 2026 at 06_13_51 PM.png')",
          backgroundSize: "auto",
          backgroundPosition: "center",
        }}
      >
          {/* STAGE 1: Centered text with image inside
          {animationStage === "centered" && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 1, 0] }}
                transition={{
                  opacity: { duration: 1.5, delay: 1.2, times: [0, 0.99, 1] }
                }}
                onAnimationComplete={() => {
                  setAnimationStage("split");
                }}
                //className="text-center relative z-10 w-full h-full flex items-center justify-center"
                className="absolute text-center inset-0 flex items-center justify-center" style={{ height: "100%", width: "100%", backgroundColor: "#ff8465" }}
              >
                <motion.h1
                  initial={{ opacity: 1, scale: 1, y: 0, x:0 }}
                  animate={{ opacity: 1, scale: 110, y: -5000, x: -3800 }}
                  transition={{ duration: 1.5, delay: 1.2, ease: "linear" }}
                  style={{
                    fontSize: "clamp(200px, 15vw, 180px)",
                    fontWeight: 900,
                    lineHeight: "0.9",
                    letterSpacing: "-0.04em",
                    textTransform: "uppercase",
                    width: "100%",
                    color: "white"
                  }}
                >
                  MAKARAND
                  <br />
                  NARWEKAR
                </motion.h1>
              </motion.div>
          )} */}

        <div className="max-w-7xl mx-auto w-full">

          {/* STAGE 2: Text Content */}
          {/* {animationStage === "split" && ( */}
              <div className="relative z-10 max-w-2xl px-8 lg:px-16">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-8"
                  style={{
                    fontSize: "clamp(50px, 6vw, 80px)",
                    fontWeight: 700,
                    lineHeight: "1.2",
                    letterSpacing: "-0.02em",
                    color: "#1A1A1A",
                    fontFamily: "var(--font-family-serif)"
                  }}
                >
                  Committed to{" "}
                  <span className="text-coral" style={{ fontWeight: 900 }}>Development.</span>
                  <br />
                  Dedicated to{" "}
                  <span className="text-coral" style={{ fontWeight: 900 }}>Service.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-black/95 max-w-lg mb-12"
                  style={{
                    fontSize: "20px",
                    lineHeight: "1.7",
                    fontWeight: 400
                  }}
                >
                  Building a cleaner, safer, and more prosperous ward through
                  transparent governance and citizen engagement.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    to="/work"
                    className="inline-flex items-center justify-center px-12 py-4 bg-coral text-white rounded-full hover:bg-coral/90 hover:scale-105 transition-all shadow-lg"
                    style={{ fontSize: "16px", fontWeight: 600 }}
                  >
                    VIEW OUR WORK
                  </Link>
                  <Link
                    to="/connect"
                    className="inline-flex items-center justify-center px-12 py-4 text-coral rounded-full hover:bg-white hover:scale-105 transition-all border-2 border-coral shadow-lg"
                    style={{ fontSize: "16px", fontWeight: 600, backgroundColor: "transparent" }}
                  >
                    TELL YOUR STORY
                  </Link>
                </motion.div>
              </div>
          {/* )} */}

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
              { num: "15", label: "Years of Service" },
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
