'use client';

import { motion } from "motion/react";
import { FileText, Download, ExternalLink, Calendar, IndianRupee, MapPin, CheckCircle2, Clock, AlertCircle } from "lucide-react";

type ProjectStatus = "completed" | "ongoing" | "approved" | "proposed";

interface ProjectAttachment {
  name: string;
  type: string;
  url: string;
  size: string;
}

interface GovernmentProject {
  id: string;
  title: string;
  description: string;
  category: string;
  status: ProjectStatus;
  budget: string;
  location: string;
  startDate: string;
  completionDate?: string;
  expectedCompletion?: string;
  progress?: number;
  beneficiaries: string;
  keyFeatures: string[];
  attachments: ProjectAttachment[];
}

const projects: GovernmentProject[] = [
  {
    id: "road-infra-2024",
    title: "Ward Road Infrastructure Upgrade - Phase 2",
    description: "Comprehensive road reconstruction project covering major arterial roads with modern drainage systems, footpath upgrades, and street lighting improvements.",
    category: "Infrastructure",
    status: "ongoing",
    budget: "₹4.2 Crores",
    location: "Multiple locations across Ward 226",
    startDate: "January 2025",
    expectedCompletion: "September 2026",
    progress: 45,
    beneficiaries: "25,000+ residents",
    keyFeatures: [
      "8.5 km road resurfacing with premium bitumen",
      "Underground drainage system installation",
      "LED street lighting with smart controls",
      "Wheelchair-accessible footpaths",
      "Tree plantation along roads"
    ],
    attachments: [
      { name: "Project Proposal.pdf", type: "PDF", url: "#", size: "2.4 MB" },
      { name: "Budget Allocation.pdf", type: "PDF", url: "#", size: "1.2 MB" },
      { name: "Engineering Drawings.pdf", type: "PDF", url: "#", size: "8.5 MB" },
      { name: "Progress Report Q1.pdf", type: "PDF", url: "#", size: "3.1 MB" }
    ]
  },
  {
    id: "water-supply-2025",
    title: "24x7 Water Supply Enhancement Project",
    description: "Installation of new water pipelines, overhead tanks, and pumping stations to ensure round-the-clock water supply to all households in the ward.",
    category: "Water & Sanitation",
    status: "ongoing",
    budget: "₹3.8 Crores",
    location: "Entire Ward 226",
    startDate: "March 2025",
    expectedCompletion: "December 2026",
    progress: 30,
    beneficiaries: "40,000+ residents",
    keyFeatures: [
      "15 km new pipeline network",
      "3 overhead water tanks (capacity: 5 lakh liters each)",
      "Smart water metering system",
      "Leak detection and prevention systems",
      "Water quality monitoring stations"
    ],
    attachments: [
      { name: "Technical Proposal.pdf", type: "PDF", url: "#", size: "4.2 MB" },
      { name: "Site Survey Report.pdf", type: "PDF", url: "#", size: "2.8 MB" },
      { name: "Environmental Clearance.pdf", type: "PDF", url: "#", size: "1.5 MB" }
    ]
  },
  {
    id: "school-modern-2024",
    title: "Municipal Schools Modernization Program",
    description: "Comprehensive upgrade of 8 municipal schools with smart classrooms, digital libraries, science labs, and improved infrastructure.",
    category: "Education",
    status: "completed",
    budget: "₹2.6 Crores",
    location: "8 schools across Ward 226",
    startDate: "June 2024",
    completionDate: "January 2026",
    beneficiaries: "3,500+ students",
    keyFeatures: [
      "Smart classrooms with digital boards",
      "Computer labs with 200+ computers",
      "Science laboratories with modern equipment",
      "Digital libraries with e-learning resources",
      "Renovated classrooms and furniture",
      "Sports facilities and playgrounds"
    ],
    attachments: [
      { name: "Project Report.pdf", type: "PDF", url: "#", size: "3.6 MB" },
      { name: "Completion Certificate.pdf", type: "PDF", url: "#", size: "0.8 MB" },
      { name: "Photo Documentation.pdf", type: "PDF", url: "#", size: "12.4 MB" },
      { name: "Impact Assessment.pdf", type: "PDF", url: "#", size: "2.1 MB" }
    ]
  },
  {
    id: "solid-waste-2025",
    title: "Integrated Solid Waste Management System",
    description: "Modern waste collection, segregation, and processing system with door-to-door collection, recycling units, and composting facilities.",
    category: "Sanitation & Environment",
    status: "ongoing",
    budget: "₹1.9 Crores",
    location: "Ward 226",
    startDate: "April 2025",
    expectedCompletion: "August 2026",
    progress: 55,
    beneficiaries: "Entire ward population",
    keyFeatures: [
      "GPS-tracked waste collection vehicles",
      "Ward-level waste segregation center",
      "Organic waste composting unit",
      "Plastic recycling facility",
      "E-waste collection points",
      "Public awareness campaigns"
    ],
    attachments: [
      { name: "Implementation Plan.pdf", type: "PDF", url: "#", size: "2.9 MB" },
      { name: "Equipment Specifications.pdf", type: "PDF", url: "#", size: "1.7 MB" },
      { name: "Monthly Progress Report.pdf", type: "PDF", url: "#", size: "1.3 MB" }
    ]
  },
  {
    id: "community-health-2026",
    title: "Community Health Center Establishment",
    description: "Construction of a modern primary health center with OPD, diagnostic facilities, pharmacy, and 24x7 emergency services.",
    category: "Healthcare",
    status: "approved",
    budget: "₹5.2 Crores",
    location: "Central Ward 226",
    startDate: "June 2026",
    expectedCompletion: "December 2027",
    beneficiaries: "50,000+ residents",
    keyFeatures: [
      "30-bed primary health center",
      "OPD with 6 consultation rooms",
      "Diagnostic lab with modern equipment",
      "Pharmacy with essential medicines",
      "24x7 emergency and ambulance services",
      "Maternal and child health wing"
    ],
    attachments: [
      { name: "Detailed Project Report.pdf", type: "PDF", url: "#", size: "6.8 MB" },
      { name: "Architectural Plans.pdf", type: "PDF", url: "#", size: "9.2 MB" },
      { name: "Budget Breakdown.pdf", type: "PDF", url: "#", size: "1.4 MB" },
      { name: "Approval Letter.pdf", type: "PDF", url: "#", size: "0.5 MB" }
    ]
  },
  {
    id: "smart-street-2026",
    title: "Smart Street Infrastructure Project",
    description: "Installation of smart street furniture including intelligent lighting, CCTV cameras, WiFi hotspots, and digital information kiosks.",
    category: "Smart City",
    status: "proposed",
    budget: "₹3.5 Crores",
    location: "Major roads in Ward 226",
    startDate: "September 2026",
    expectedCompletion: "March 2027",
    beneficiaries: "All ward residents",
    keyFeatures: [
      "500+ smart LED street lights",
      "100+ CCTV cameras with AI monitoring",
      "Public WiFi hotspots at 20 locations",
      "Digital information and wayfinding kiosks",
      "Smart parking sensors",
      "Integrated command and control center"
    ],
    attachments: [
      { name: "Concept Proposal.pdf", type: "PDF", url: "#", size: "4.1 MB" },
      { name: "Technology Specifications.pdf", type: "PDF", url: "#", size: "3.3 MB" },
      { name: "Cost Estimates.pdf", type: "PDF", url: "#", size: "1.8 MB" }
    ]
  }
];

const statusConfig = {
  completed: { label: "Completed", color: "bg-green-500", icon: CheckCircle2 },
  ongoing: { label: "Ongoing", color: "bg-coral", icon: Clock },
  approved: { label: "Approved", color: "bg-blue-500", icon: CheckCircle2 },
  proposed: { label: "Proposed", color: "bg-purple-500", icon: AlertCircle }
};

export function GovernmentProjects({ isFullPage = false }: { isFullPage?: boolean }) {
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
                          {project.category}
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
                        <p className="text-charcoal font-bold text-sm">{project.budget}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <p className="text-charcoal-light text-xs">Location</p>
                        <p className="text-charcoal font-bold text-sm">{project.location.split(',')[0]}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <p className="text-charcoal-light text-xs">Started</p>
                        <p className="text-charcoal font-bold text-sm">{project.startDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <p className="text-charcoal-light text-xs">Beneficiaries</p>
                        <p className="text-charcoal font-bold text-sm">{project.beneficiaries.split(' ')[0]}</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar for Ongoing Projects */}
                  {project.status === "ongoing" && project.progress !== undefined && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-charcoal-light text-sm font-semibold">Project Progress</span>
                        <span className="text-coral text-sm font-bold">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-3 border border-coral/20">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-3 rounded-full bg-gradient-to-r from-coral to-coral-dark"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Body */}
                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Key Features */}
                    <div>
                      <h3 className="text-charcoal text-xl font-bold mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-coral" />
                        Key Features
                      </h3>
                      <ul className="space-y-3">
                        {project.keyFeatures.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-coral mt-2 shrink-0"></div>
                            <span className="text-charcoal-light text-sm leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Attachments */}
                    <div>
                      <h3 className="text-charcoal text-xl font-bold mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-coral" />
                        Project Documents
                      </h3>
                      <div className="space-y-3">
                        {project.attachments.map((attachment, i) => (
                          <motion.a
                            key={i}
                            href={attachment.url}
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
                                  {attachment.name}
                                </p>
                                <p className="text-charcoal-light text-xs">
                                  {attachment.type} • {attachment.size}
                                </p>
                              </div>
                            </div>
                            <Download className="w-5 h-5 text-charcoal-light group-hover:text-coral transition-colors" />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Info */}
                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="flex flex-wrap items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-coral" />
                        <span className="text-charcoal-light">
                          Started: <span className="text-charcoal font-semibold">{project.startDate}</span>
                        </span>
                      </div>
                      {project.completionDate && (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-charcoal-light">
                            Completed: <span className="text-charcoal font-semibold">{project.completionDate}</span>
                          </span>
                        </div>
                      )}
                      {project.expectedCompletion && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-coral" />
                          <span className="text-charcoal-light">
                            Expected: <span className="text-charcoal font-semibold">{project.expectedCompletion}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
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
