'use client';

import { motion } from "motion/react";
import { FileText, Download, ExternalLink, Calendar, IndianRupee, MapPin, CheckCircle2, Clock, AlertCircle } from "lucide-react";

type ProjectStatus = "completed" | "ongoing" | "approved" | "proposed";

type ProjectFromDB = {
  id: string;
  title: string;
  description: string;
  department: string;
  status: string;
  budget: string | null;
  location: string | null;
  startDate: Date | null;
  completionDate: Date | null;
  beneficiaries: string | null;
  image: string | null;
  images: string[];
  documents: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// Helper to format date
const formatDate = (date: Date | null) => {
  if (!date) return "";
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(date));
};

const statusConfig = {
  completed: { label: "Completed", color: "bg-green-500", icon: CheckCircle2 },
  ongoing: { label: "Ongoing", color: "bg-coral", icon: Clock },
  approved: { label: "Approved", color: "bg-blue-500", icon: CheckCircle2 },
  proposed: { label: "Proposed", color: "bg-purple-500", icon: AlertCircle }
};

export function GovernmentProjects({ isFullPage = false, projects = [] }: { isFullPage?: boolean; projects?: ProjectFromDB[] }) {
  return (
    <section className={`${isFullPage ? "py-16 lg:py-24" : "py-16 lg:py-20"} bg-gradient-to-b from-cream via-white to-cream`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-coral to-coral-dark text-white px-6 py-3 rounded-full mb-6 shadow-xl">
            <FileText className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wide">TRANSPARENCY IN ACTION</span>
          </div>

          <h1
            className="text-charcoal mb-6"
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              fontWeight: 900,
              fontFamily: "var(--font-family-serif)",
              lineHeight: "1.1",
              letterSpacing: "-0.02em"
            }}
          >
            Government <span className="text-coral">Projects</span>
          </h1>

          <p className="text-charcoal-light max-w-3xl mx-auto" style={{ fontSize: "19px", lineHeight: "1.8" }}>
            Complete transparency on all government-funded projects in Ward 226. View detailed information,
            progress updates, budget allocations, and official documents for every initiative.
          </p>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-8">
          {projects.map((project, index) => {
            const statusInfo = statusConfig[project.status];
            const StatusIcon = statusInfo.icon;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-coral/20 hover:border-coral transition-all duration-300"
              >
                {/* Project Header */}
                <div className="bg-gradient-to-br from-coral-light via-cream to-white p-8 border-b-2 border-coral/10">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`inline-flex items-center gap-2 px-4 py-2 ${statusInfo.color} text-white rounded-full text-sm font-bold`}>
                          <StatusIcon className="w-4 h-4" />
                          {statusInfo.label}
                        </span>
                        <span className="px-4 py-2 bg-white text-coral rounded-full text-sm font-bold border-2 border-coral/30">
                          {project.department}
                        </span>
                      </div>
                      <h2 className="text-charcoal text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-family-serif)" }}>
                        {project.title}
                      </h2>
                      <p className="text-charcoal-light text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Project Meta Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                        <IndianRupee className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <p className="text-charcoal-light text-xs">Budget</p>
                        <p className="text-charcoal font-bold text-sm">{project.budget || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <p className="text-charcoal-light text-xs">Location</p>
                        <p className="text-charcoal font-bold text-sm">{project.location ? project.location.split(',')[0] : 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <p className="text-charcoal-light text-xs">Started</p>
                        <p className="text-charcoal font-bold text-sm">{formatDate(project.startDate) || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <p className="text-charcoal-light text-xs">Beneficiaries</p>
                        <p className="text-charcoal font-bold text-sm">{project.beneficiaries ? project.beneficiaries.split(' ')[0] : 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Project Body */}
                <div className="p-8">
                  {/* Project Images */}
                  {project.images.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-charcoal text-xl font-bold mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-coral" />
                        Project Gallery
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {project.images.map((image, i) => (
                          <div key={i} className="rounded-xl overflow-hidden">
                            <img
                              src={image}
                              alt={`${project.title} - ${i + 1}`}
                              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Attachments */}
                  {project.documents.length > 0 && (
                    <div>
                      <h3 className="text-charcoal text-xl font-bold mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-coral" />
                        Project Documents
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {project.documents.map((doc, i) => (
                          <motion.a
                            key={i}
                            href={doc}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            className="flex items-center justify-between p-4 bg-cream rounded-xl border border-border hover:border-coral hover:shadow-md transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                                <FileText className="w-5 h-5 text-coral" />
                              </div>
                              <div>
                                <p className="text-charcoal font-semibold text-sm group-hover:text-coral transition-colors">
                                  Document {i + 1}
                                </p>
                                <p className="text-charcoal-light text-xs">PDF</p>
                              </div>
                            </div>
                            <Download className="w-5 h-5 text-charcoal-light group-hover:text-coral transition-colors" />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timeline Info */}
                  {(project.startDate || project.completionDate) && (
                    <div className="mt-8 pt-6 border-t border-border">
                      <div className="flex flex-wrap items-center gap-6 text-sm">
                        {project.startDate && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-coral" />
                            <span className="text-charcoal-light">
                              Started: <span className="text-charcoal font-semibold">{formatDate(project.startDate)}</span>
                            </span>
                          </div>
                        )}
                        {project.completionDate && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-charcoal-light">
                              Completed: <span className="text-charcoal font-semibold">{formatDate(project.completionDate)}</span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl p-8 border-2 border-coral/20 text-center"
        >
          <ExternalLink className="w-8 h-8 text-coral mx-auto mb-4" />
          <h3 className="text-charcoal text-2xl font-bold mb-3">Have Questions About These Projects?</h3>
          <p className="text-charcoal-light mb-6">
            We believe in complete transparency. Contact us for more information or site visits.
          </p>
          <a
            href="/connect"
            className="inline-flex items-center justify-center px-8 py-4 bg-coral text-white rounded-full border-2 border-coral transition-all duration-300 hover:bg-transparent hover:text-coral shadow-xl hover:shadow-2xl hover:scale-105"
            style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "0.5px" }}
          >
            GET IN TOUCH
          </a>
        </motion.div>
      </div>
    </section>
  );
}
