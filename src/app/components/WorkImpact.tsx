import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { CheckCircle2, Clock, ArrowUpRight, TrendingUp, Users, MapPin, Hammer } from "lucide-react";
import { IMAGES } from "./images";

const completedProjects = [
  {
    id: "road-reconstruction",
    title: "Ward Road Reconstruction",
    category: "Infrastructure",
    image: IMAGES.roadConstruction,
    budget: "₹2.5 Cr",
    date: "Completed Dec 2025",
    description: "Complete reconstruction of 12km of ward roads with modern drainage.",
  },
  {
    id: "street-lighting",
    title: "LED Street Lighting",
    category: "Public Safety",
    image: IMAGES.streetLights,
    budget: "₹85 Lakh",
    date: "Completed Oct 2025",
    description: "Installation of 450+ LED street lights across the ward.",
  },
  {
    id: "school-renovation",
    title: "Municipal School Upgrades",
    category: "Education",
    image: IMAGES.school,
    budget: "₹1.2 Cr",
    date: "Completed Aug 2025",
    description: "Renovation of 8 municipal schools with digital classrooms.",
  },
  {
    id: "park-development",
    title: "Community Park Revival",
    category: "Community Welfare",
    image: IMAGES.park,
    budget: "₹65 Lakh",
    date: "Completed Jun 2025",
    description: "Transformed 3 neglected spaces into vibrant community parks.",
  },
];

const ongoingProjects = [
  {
    id: "water-pipeline",
    title: "Water Pipeline Replacement",
    progress: 72,
    expectedCompletion: "Mar 2026",
    budget: "₹3.1 Cr",
    image: IMAGES.waterPipeline,
  },
  {
    id: "sanitation-drive",
    title: "Sanitation Infrastructure Upgrade",
    progress: 45,
    expectedCompletion: "Jun 2026",
    budget: "₹1.8 Cr",
    image: IMAGES.cleanStreet,
  },
  {
    id: "community-center",
    title: "Community Center Construction",
    progress: 30,
    expectedCompletion: "Sep 2026",
    budget: "₹2.2 Cr",
    image: IMAGES.community,
  },
];

const impactStats = [
  { icon: TrendingUp, value: "₹15 Cr+", label: "Development Funds Utilized" },
  { icon: Hammer, value: "200+", label: "Projects Completed" },
  { icon: Users, value: "50,000+", label: "Citizens Impacted" },
  { icon: MapPin, value: "12 km", label: "Roads Reconstructed" },
];

type Tab = "completed" | "ongoing" | "upcoming";

export function WorkImpact({ isFullPage = false }: { isFullPage?: boolean }) {
  const [activeTab, setActiveTab] = useState<Tab>("completed");

  return (
    <section className={`${isFullPage ? "py-16 lg:py-24" : "py-16 lg:py-20"} bg-cream`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-saffron mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
            WORK & IMPACT
          </p>
          <h2 className="text-brown mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            Delivering Results, Not Just Promises
          </h2>
          <p className="text-brown-light" style={{ fontSize: "16px", lineHeight: "1.7" }}>
            Tracking progress on every project — completed, ongoing, and planned — with full transparency.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {impactStats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 text-center border border-border shadow-sm"
            >
              <stat.icon className="w-8 h-8 text-saffron mx-auto mb-3" />
              <p className="text-brown" style={{ fontSize: "28px", fontWeight: 800 }}>{stat.value}</p>
              <p className="text-brown-light" style={{ fontSize: "13px", fontWeight: 500 }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { key: "completed" as Tab, label: "Completed", icon: CheckCircle2 },
            { key: "ongoing" as Tab, label: "Ongoing", icon: Clock },
            { key: "upcoming" as Tab, label: "Upcoming", icon: ArrowUpRight },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
                activeTab === tab.key
                  ? "bg-saffron text-white shadow-lg shadow-saffron/20"
                  : "bg-white text-brown-light border border-border hover:bg-cream-dark"
              }`}
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Completed Projects Grid */}
        {activeTab === "completed" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Link to={`/project/${project.id}`} className="group block bg-white rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-emerald-500 text-white rounded-full" style={{ fontSize: "11px", fontWeight: 700 }}>
                        Completed
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-saffron" style={{ fontSize: "12px", fontWeight: 600 }}>{project.category}</span>
                    <h3 className="text-brown mt-1 mb-2 group-hover:text-saffron transition-colors" style={{ fontSize: "18px", fontWeight: 700 }}>
                      {project.title}
                    </h3>
                    <p className="text-brown-light mb-4" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-brown-light" style={{ fontSize: "13px" }}>{project.date}</span>
                      <span className="text-brown" style={{ fontSize: "14px", fontWeight: 700 }}>{project.budget}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Ongoing Projects */}
        {activeTab === "ongoing" && (
          <div className="space-y-4" id="ongoing">
            {ongoingProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Link to={`/project/${project.id}`} className="group block bg-white rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 h-40 md:h-auto overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-brown group-hover:text-saffron transition-colors" style={{ fontSize: "18px", fontWeight: 700 }}>
                            {project.title}
                          </h3>
                          <p className="text-brown-light mt-1" style={{ fontSize: "13px" }}>
                            Budget: {project.budget} &middot; Expected: {project.expectedCompletion}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-saffron-light text-saffron-dark rounded-full shrink-0" style={{ fontSize: "12px", fontWeight: 700 }}>
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-cream-dark rounded-full h-3 mt-4">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-3 rounded-full bg-gradient-to-r from-saffron to-saffron-dark"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Upcoming */}
        {activeTab === "upcoming" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Smart CCTV Network Expansion", timeline: "Q3 2026", budget: "₹1.5 Cr" },
              { title: "Solar Panel Installation on Public Buildings", timeline: "Q4 2026", budget: "₹90 Lakh" },
              { title: "Senior Citizen Wellness Center", timeline: "Q1 2027", budget: "₹75 Lakh" },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-xl p-6 border border-dashed border-saffron/40 hover:border-saffron hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-saffron-light flex items-center justify-center mb-4">
                  <ArrowUpRight className="w-5 h-5 text-saffron" />
                </div>
                <h3 className="text-brown mb-2" style={{ fontSize: "16px", fontWeight: 700 }}>{project.title}</h3>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="text-brown-light" style={{ fontSize: "13px" }}>Timeline: {project.timeline}</span>
                  <span className="text-saffron" style={{ fontSize: "14px", fontWeight: 700 }}>{project.budget}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Before/After Section */}
        {isFullPage && (
          <div className="mt-16">
            <h3 className="text-center text-brown mb-8" style={{ fontSize: "24px", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
              Before &amp; After
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl overflow-hidden border border-border">
                <div className="relative">
                  <img src={IMAGES.beforeRoad} alt="Before" className="w-full h-56 object-cover" />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white rounded-full" style={{ fontSize: "12px", fontWeight: 700 }}>Before</div>
                </div>
                <div className="p-4">
                  <p className="text-brown" style={{ fontSize: "15px", fontWeight: 600 }}>Ward Road — Before Reconstruction</p>
                  <p className="text-brown-light" style={{ fontSize: "13px" }}>Potholed, waterlogged during monsoons</p>
                </div>
              </div>
              <div className="bg-white rounded-xl overflow-hidden border border-border">
                <div className="relative">
                  <img src={IMAGES.afterRoad} alt="After" className="w-full h-56 object-cover" />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-500 text-white rounded-full" style={{ fontSize: "12px", fontWeight: 700 }}>After</div>
                </div>
                <div className="p-4">
                  <p className="text-brown" style={{ fontSize: "15px", fontWeight: 600 }}>Ward Road — After Reconstruction</p>
                  <p className="text-brown-light" style={{ fontSize: "13px" }}>Smooth surface, proper drainage installed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
