import { Link } from "react-router";
import { ArrowRight, Briefcase, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { IMAGES } from "./images";

export function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, #3D2B1F 1px, transparent 0)",
        backgroundSize: "40px 40px"
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-saffron-light rounded-full mb-6">
              <div className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
              <span className="text-saffron-dark" style={{ fontSize: "13px", fontWeight: 600 }}>Corporator &middot; Mumbai Ward 226</span>
            </div>

            <h1 className="text-brown mb-6" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, lineHeight: "1.15", fontFamily: "var(--font-family-serif)" }}>
              Committed to{" "}
              <span className="text-saffron">Development.</span>
              <br />
              Dedicated to{" "}
              <span className="text-saffron">Service.</span>
            </h1>

            <p className="text-brown-light max-w-lg mb-8" style={{ fontSize: "17px", lineHeight: "1.8" }}>
              Building a cleaner, safer, and more prosperous ward through transparent governance, 
              citizen engagement, and development-focused leadership.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6 mb-10">
              {[
                { num: "15+", label: "Years of Service" },
                { num: "200+", label: "Projects Completed" },
                { num: "50K+", label: "Citizens Served" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-saffron" style={{ fontSize: "28px", fontWeight: 800 }}>{stat.num}</p>
                  <p className="text-brown-light" style={{ fontSize: "12px", fontWeight: 500 }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-saffron text-white rounded-xl hover:bg-saffron-dark transition-all shadow-lg shadow-saffron/20"
                style={{ fontSize: "15px", fontWeight: 600 }}
              >
                <Briefcase className="w-4 h-4" />
                View Our Work
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/connect"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-brown text-white rounded-xl hover:bg-brown-light transition-all"
                style={{ fontSize: "15px", fontWeight: 600 }}
              >
                <MessageCircle className="w-4 h-4" />
                Contact Office
              </Link>
              <Link
                to="/work#ongoing"
                className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-brown/15 text-brown rounded-xl hover:bg-cream transition-all"
                style={{ fontSize: "15px", fontWeight: 600 }}
              >
                Ongoing Projects
              </Link>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-full h-full bg-saffron/10 rounded-2xl" />
              <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-saffron/20 rounded-2xl" />
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="makarand-image.jpeg"
                  alt="Makarand Narwekar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown/40 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white" style={{ fontSize: "20px", fontWeight: 700 }}>Makarand Narwekar</p>
                  <p className="text-white/80" style={{ fontSize: "14px" }}>Corporator, Mumbai</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-saffron/30 to-transparent" />
    </section>
  );
}
