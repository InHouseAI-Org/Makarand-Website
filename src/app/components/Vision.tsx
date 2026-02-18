import { motion } from "motion/react";
import { Building2, Trash2, BookOpen, Shield, Users, Droplets, CheckCircle2 } from "lucide-react";

const pillars = [
  {
    icon: Building2,
    title: "Infrastructure",
    description: "Road reconstruction, flyover maintenance, stormwater drainage, and smart urban planning for a future-ready ward.",
    stats: "42 Projects",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: Trash2,
    title: "Cleanliness & Sanitation",
    description: "Waste management systems, public toilet renovation, and regular sanitation drives for a cleaner, healthier community.",
    stats: "85% Coverage",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: BookOpen,
    title: "Education",
    description: "School infrastructure upgrades, digital classrooms, scholarship programs, and library modernization initiatives.",
    stats: "18 Schools",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Shield,
    title: "Public Safety",
    description: "CCTV installations, improved street lighting, pedestrian safety measures, and community watch programs.",
    stats: "150+ CCTVs",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: Users,
    title: "Community Welfare",
    description: "Senior citizen programs, women empowerment initiatives, health camps, and youth sports development.",
    stats: "10K+ Beneficiaries",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Droplets,
    title: "Water & Environment",
    description: "Water pipeline upgrades, rainwater harvesting, tree plantation drives, and sustainable waste management.",
    stats: "24/7 Water",
    color: "bg-cyan-50 text-cyan-600",
  },
];

const commitments = [
  { target: "100%", label: "Roads repaired by 2027" },
  { target: "Zero", label: "Unresolved grievances over 30 days" },
  { target: "50+", label: "New CCTV installations this year" },
  { target: "100%", label: "Digital literacy in ward schools" },
];

export function Vision({ isFullPage = false }: { isFullPage?: boolean }) {
  return (
    <section className={`${isFullPage ? "py-16 lg:py-24" : "py-16 lg:py-20"} bg-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-saffron mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
            VISION & MANIFESTO
          </p>
          <h2 className="text-brown mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            Building a Better Ward, Together
          </h2>
          <p className="text-brown-light" style={{ fontSize: "16px", lineHeight: "1.7" }}>
            Our development agenda is built on six key pillars — each backed by measurable targets and transparent execution.
          </p>
        </div>

        {/* Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group bg-white border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl ${pillar.color} flex items-center justify-center mb-4`}>
                <pillar.icon className="w-6 h-6" />
              </div>
              <h3 className="text-brown mb-2" style={{ fontSize: "18px", fontWeight: 700 }}>
                {pillar.title}
              </h3>
              <p className="text-brown-light mb-4" style={{ fontSize: "14px", lineHeight: "1.7" }}>
                {pillar.description}
              </p>
              <div className="pt-4 border-t border-border">
                <span className="text-saffron" style={{ fontSize: "14px", fontWeight: 700 }}>{pillar.stats}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pledge Section */}
        <div className="bg-brown rounded-2xl p-8 lg:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-saffron mb-3" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
                OUR PLEDGE
              </p>
              <h3 className="mb-4" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, fontFamily: "var(--font-family-serif)", lineHeight: "1.3" }}>
                Measurable Commitments,<br />
                Accountable Governance
              </h3>
              <p className="text-white/70 mb-6" style={{ fontSize: "15px", lineHeight: "1.7" }}>
                Every promise comes with a deadline and a metric. We believe in holding ourselves 
                accountable to the people we serve — transparently and consistently.
              </p>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-saffron mt-0.5 shrink-0" />
                <p className="text-white/80" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                  Quarterly progress reports published online for all ongoing projects.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {commitments.map((item) => (
                <div key={item.label} className="bg-white/10 rounded-xl p-5 backdrop-blur-sm">
                  <p className="text-saffron mb-1" style={{ fontSize: "28px", fontWeight: 800 }}>{item.target}</p>
                  <p className="text-white/70" style={{ fontSize: "13px", lineHeight: "1.5" }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
