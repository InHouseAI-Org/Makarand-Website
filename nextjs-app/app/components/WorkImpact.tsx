'use client';

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { CheckCircle2, Clock, ArrowUpRight, TrendingUp, Users, MapPin, Hammer } from "lucide-react";
import { IMAGES } from "./images";

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  progress: number | null;
  budget: string | null;
  location: string | null;
  startDate: Date | null;
  endDate: Date | null;
  image: string | null;
  images: string[];
  highlights: string[];
  impact: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const impactStats = [
  { icon: TrendingUp, value: "₹15 Cr+", label: "Development Funds Utilized" },
  { icon: Hammer, value: "200+", label: "Projects Completed" },
  { icon: Users, value: "50,000+", label: "Citizens Impacted" },
  { icon: MapPin, value: "12 km", label: "Roads Reconstructed" },
];

type Tab = "completed" | "ongoing" | "upcoming";

// Fallback images mapping based on category
const getCategoryImage = (category: string) => {
  const categoryMap: Record<string, string> = {
    "Infrastructure": IMAGES.roadConstruction,
    "Public Safety": IMAGES.streetLights,
    "Education": IMAGES.school,
    "Community Welfare": IMAGES.community,
    "Cleanliness & Sanitation": IMAGES.cleanStreet,
  };
  return categoryMap[category] || IMAGES.mumbai;
};

// Helper to format date
const formatDate = (date: Date | null) => {
  if (!date) return "";
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date(date));
};

export function WorkImpact({ isFullPage = false, projects = [] }: { isFullPage?: boolean; projects?: Project[] }) {
  const [activeTab, setActiveTab] = useState<Tab>("completed");

  // Separate projects by status
  const completedProjects = projects.filter(p => p.status === "completed");
  const ongoingProjects = projects.filter(p => p.status === "ongoing");
  const upcomingProjects = projects.filter(p => p.status === "upcoming");

  return (
    <section className={`${isFullPage ? "py-16 lg:py-24" : "py-16 lg:py-20"} bg-cream`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-coral mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
            WORK & IMPACT
          </p>
          <h2 className="text-charcoal mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            Delivering Results, Not Just Promises
          </h2>
          <p className="text-charcoal-light" style={{ fontSize: "16px", lineHeight: "1.7" }}>
            Tracking progress on every project - completed, ongoing, and planned - with full transparency.
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
              <stat.icon className="w-8 h-8 text-coral mx-auto mb-3" />
              <p className="text-charcoal" style={{ fontSize: "28px", fontWeight: 800 }}>{stat.value}</p>
              <p className="text-charcoal-light" style={{ fontSize: "13px", fontWeight: 500 }}>{stat.label}</p>
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
                  ? "bg-coral text-white shadow-lg shadow-coral/20"
                  : "bg-white text-charcoal-light border border-border hover:bg-cream-dark"
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
                <Link href={`/project/${project.id}`} className="group block bg-white rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image || getCategoryImage(project.category)}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-coral-500 text-white rounded-full" style={{ fontSize: "11px", fontWeight: 700 }}>
                        Completed
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-coral" style={{ fontSize: "12px", fontWeight: 600 }}>{project.category}</span>
                    <h3 className="text-charcoal mt-1 mb-2 group-hover:text-coral-dark transition-colors" style={{ fontSize: "18px", fontWeight: 700 }}>
                      {project.title}
                    </h3>
                    <p className="text-charcoal-light mb-4" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                      {project.description.length > 100 ? project.description.substring(0, 100) + '...' : project.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-charcoal-light" style={{ fontSize: "13px" }}>
                        {project.endDate ? `Completed ${formatDate(project.endDate)}` : 'Completed'}
                      </span>
                      <span className="text-charcoal" style={{ fontSize: "14px", fontWeight: 700 }}>{project.budget || 'N/A'}</span>
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
            {ongoingProjects.map((project, index) => {
              // Use progress from database, fallback to 50% if not set
              const progress = project.progress || 50;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link href={`/project/${project.id}`} className="group block bg-white rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-48 h-40 md:h-auto overflow-hidden">
                        <img
                          src={project.image || getCategoryImage(project.category)}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-charcoal group-hover:text-coral-dark transition-colors" style={{ fontSize: "18px", fontWeight: 700 }}>
                              {project.title}
                            </h3>
                            <p className="text-charcoal-light mt-1" style={{ fontSize: "13px" }}>
                              Budget: {project.budget || 'N/A'} {project.impact && `· ${project.impact}`}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-coral-light text-coral-dark rounded-full shrink-0" style={{ fontSize: "12px", fontWeight: 700 }}>
                            {progress}%
                          </span>
                        </div>
                        <div className="w-full bg-cream-dark rounded-full h-3 mt-4">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-3 rounded-full bg-gradient-to-r from-coral to-coral-dark"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Upcoming */}
        {activeTab === "upcoming" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-xl p-6 border border-dashed border-coral/40 hover:border-coral hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-coral-light flex items-center justify-center mb-4">
                  <ArrowUpRight className="w-5 h-5 text-coral" />
                </div>
                <h3 className="text-charcoal mb-2" style={{ fontSize: "16px", fontWeight: 700 }}>{project.title}</h3>
                <p className="text-charcoal-light mb-4" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                  {project.description.length > 80 ? project.description.substring(0, 80) + '...' : project.description}
                </p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="text-charcoal-light" style={{ fontSize: "13px" }}>
                    {project.startDate ? `Expected: ${formatDate(project.startDate)}` : 'Timeline: TBD'}
                  </span>
                  <span className="text-coral" style={{ fontSize: "14px", fontWeight: 700 }}>{project.budget || 'N/A'}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
