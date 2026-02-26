import { motion } from "motion/react";
import { TrendingUp, Hammer, Users, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { IMAGES } from "./images";

const impactStats = [
  { icon: TrendingUp, value: "₹15 Cr+", label: "Development Funds" },
  { icon: Hammer, value: "200+", label: "Projects Completed" },
  { icon: Users, value: "50,000+", label: "Citizens Impacted" },
  { icon: MapPin, value: "12 km", label: "Roads Reconstructed" },
];

const featuredProjects = [
  {
    title: "Ward Road Reconstruction",
    category: "Infrastructure",
    image: IMAGES.roadConstruction,
    status: "Completed",
  },
  {
    title: "LED Street Lighting",
    category: "Public Safety",
    image: IMAGES.streetLights,
    status: "Completed",
  },
  {
    title: "Municipal School Upgrades",
    category: "Education",
    image: IMAGES.school,
    status: "Completed",
  },
];

export function WorkImpactPreview() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-coral mb-3" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
            WORK & IMPACT
          </p>
          <h2 className="text-charcoal mb-4" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            Delivering Real Results
          </h2>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {impactStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-border p-8 text-center hover:shadow-lg transition-all"
              style={{ borderRadius: "32px" }}
            >
              <div className="w-14 h-14 rounded-2xl bg-coral/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-coral" />
              </div>
              <p className="text-charcoal font-bold mb-2" style={{ fontSize: "28px" }}>{stat.value}</p>
              <p className="text-charcoal-light" style={{ fontSize: "14px" }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white overflow-hidden border border-border hover:shadow-xl transition-all cursor-pointer"
              style={{ borderRadius: "32px" }}
            >
              <div className="h-52 overflow-hidden relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 px-4 py-2 bg-green-500 text-white rounded-full text-xs font-bold">
                  {project.status}
                </div>
              </div>
              <div className="p-6">
                <span className="text-coral text-sm font-bold">{project.category}</span>
                <h3 className="text-charcoal mt-2 font-bold" style={{ fontSize: "18px" }}>{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-coral to-coral-dark text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            View All Projects & Impact <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
