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
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-saffron mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
            WORK & IMPACT
          </p>
          <h2 className="text-brown mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            Delivering Real Results
          </h2>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {impactStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-cream to-white border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-saffron" />
              </div>
              <p className="text-brown font-bold mb-1" style={{ fontSize: "24px" }}>{stat.value}</p>
              <p className="text-brown-light" style={{ fontSize: "13px" }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold">
                  {project.status}
                </div>
              </div>
              <div className="p-5">
                <span className="text-saffron text-xs font-bold">{project.category}</span>
                <h3 className="text-brown mt-1 font-bold" style={{ fontSize: "16px" }}>{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-saffron to-saffron-dark text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            View All Projects & Impact <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
