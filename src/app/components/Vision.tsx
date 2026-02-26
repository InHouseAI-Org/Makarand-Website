import { motion } from "motion/react";
import {
  Footprints,
  Car,
  TrafficCone,
  Lightbulb,
  Trash2,
  ShoppingBag,
  Droplets,
  ParkingCircle,
  Shield,
  CheckCircle2,
  Award,
  Target,
  Eye,
  HandshakeIcon
} from "lucide-react";

const commitmentCategories = [
  {
    icon: Footprints,
    title: "Pedestrian Infrastructure",
    items: [
      "Uniform, level, and durable footpaths across the ward, built to scientific civic standards",
      "Wheelchair-friendly slopes and safe entry exit points at all footpath crossings",
      "Physical measures to prevent two-wheelers & illegal parking on pavements",
      "Clear pedestrian movement without obstructions, encroachments, or uneven surfaces"
    ]
  },
  {
    icon: Car,
    title: "Roads & Driving Safety",
    items: [
      "Systematic effort to keep internal roads pothole free and properly finished",
      "Correctly designed speed-calming measures implemented after resident consultation",
      "Alignment & correction of road surfaces, manholes, & drainage covers to improve driving safety",
      "Better road markings and visibility at junctions and turns"
    ]
  },
  {
    icon: TrafficCone,
    title: "Traffic Management & Signage",
    items: [
      "Improved visibility of traffic signals and road signs",
      "Installation of appropriate signage only after consultation with local residents",
      "Clear demarcation of no-parking and regulated parking zones to reduce congestion"
    ]
  },
  {
    icon: Lightbulb,
    title: "Street Lighting & Surveillance",
    items: [
      "Completion of street lighting coverage across all roads and lanes",
      "Enhanced lighting near junctions, pedestrian crossings, and public access points",
      "Support for adequate lighting levels to improve CCTV coverage and public safety",
      "Coordination to ensure 24x7 surveillance where demanded by residents"
    ]
  },
  {
    icon: Trash2,
    title: "Cleanliness & Waste Systems",
    items: [
      "Daily, need-based waste removal systems aligned to local population density",
      "Strengthening of segregation and collection practices across the ward",
      "Preventing garbage accumulation at corners and public areas through better scheduling",
      "Ongoing sanitation and hygiene measures to reduce health risks"
    ]
  },
  {
    icon: ShoppingBag,
    title: "Hawkers & Public Space Balance",
    items: [
      "Clear identification of authorised and unauthorised hawkers",
      "Ensuring footpaths remain accessible to pedestrians",
      "Structured solutions that balance livelihoods with public movement and safety",
      "Creation of managed zones where required, with cleanliness accountability"
    ]
  },
  {
    icon: Droplets,
    title: "Water Security & Future Readiness",
    items: [
      "Support for long-term water planning for the ward as part of city-level strategy",
      "Exploration and follow-through of water security solutions through reservoirs & infrastructure planning",
      "Ensuring reliable, equitable water supply for residents"
    ]
  },
  {
    icon: ParkingCircle,
    title: "Parking & Mobility Management",
    items: [
      "Support for creation of organised additional parking solutions to meet the demand & reduce roadside congestion",
      "Fair allocation of parking resources across residential and mixed-use areas",
      "Reducing spillover parking that disrupts traffic and pedestrian movement"
    ]
  },
  {
    icon: Shield,
    title: "Transparent Use of Public Funds",
    items: [
      "Proportionate allocation of corporator funds across all parts of the ward",
      "Formation of a resident-led joint committee to oversee civic works",
      "Contractor payments to be released only after inspection, approval, and satisfaction of the resident committee",
      "Fair distribution of resources across all sections and strata of the ward"
    ]
  }
];

const principles = [
  {
    icon: Target,
    title: "Excellence",
    description: "Setting new standards for civic work quality"
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Every decision, open to public scrutiny"
  },
  {
    icon: HandshakeIcon,
    title: "Accountability",
    description: "Results-driven governance you can measure"
  }
];

export function Vision({ isFullPage = false }: { isFullPage?: boolean }) {
  return (
    <section className={`${isFullPage ? "py-16 lg:py-24" : "py-16 lg:py-20"} bg-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Years Badge */}
          <div className="inline-flex items-center gap-2 bg-coral text-white px-5 py-2 rounded-full mb-5 shadow-md">
            <Award className="w-4 h-4" />
            <span className="font-bold text-xs tracking-wide">13+ YEARS OF SERVICE</span>
          </div>

          {/* Main Title */}
          <h1
            className="text-charcoal mb-4"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 700,
              fontFamily: "var(--font-family-serif)",
              lineHeight: "1.2"
            }}
          >
            Ward 226 | 2026 Commitment
          </h1>

          {/* Subtitle */}
          <p className="text-charcoal-light max-w-3xl mx-auto mb-10" style={{ fontSize: "17px", lineHeight: "1.7" }}>
            This commitment is not drafted at a desk. It is shaped by engaging conversations, trust,
            and the everyday concerns shared by residents across Ward 226.
          </p>

          {/* Core Principles */}
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {principles.map((principle) => (
              <div key={principle.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-coral-light flex items-center justify-center">
                  <principle.icon className="w-5 h-5 text-coral" />
                </div>
                <div className="text-left">
                  <p className="text-charcoal font-bold text-sm">{principle.title}</p>
                  <p className="text-charcoal-light text-xs">{principle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Commitment Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {commitmentCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.05 }}
              className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-coral/30 transition-all duration-300"
            >
              {/* Category Header */}
              <div className="bg-gradient-to-r from-coral-light to-cream p-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                    <category.icon className="w-7 h-7 text-coral" />
                  </div>
                  <h3 className="text-charcoal font-bold text-xl">{category.title}</h3>
                </div>
              </div>

              {/* Category Items */}
              <div className="p-6 space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-start gap-3 group"
                  >
                    <div className="shrink-0 mt-1">
                      <CheckCircle2 className="w-5 h-5 text-coral" />
                    </div>
                    <p className="text-charcoal-light text-sm leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* The 2026 Commitment Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-charcoal via-charcoal-dark to-charcoal text-white rounded-2xl p-8 lg:p-10 text-center"
        >
          <p className="text-coral font-bold text-sm tracking-widest mb-3">THE 2026 COMMITMENT</p>
          <h3
            className="mb-6"
            style={{
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 700,
              fontFamily: "var(--font-family-serif)"
            }}
          >
            Excellence, Transparency & Accountability
          </h3>
          <p className="text-white/80 max-w-3xl mx-auto" style={{ fontSize: "16px", lineHeight: "1.7" }}>
            This commitment is about excellence, transparency, and accountability in civic work.
            I look forward to staying engaged with you and assure you of my continued availability.
            I seek your valuable support as we take this commitment forward into 2026 and beyond.
          </p>
        </motion.div>

        {/* Closing Statement */}
        <p className="text-charcoal-light text-sm italic text-center mt-8">
          A commitment born from conversations, delivered through action
        </p>
      </div>
    </section>
  );
}
