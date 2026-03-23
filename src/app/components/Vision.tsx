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
    <section className={`${isFullPage ? "py-16 lg:py-24" : "py-16 lg:py-20"} bg-gradient-to-b from-cream via-white to-cream`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {/* Years Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-coral to-coral-dark text-white px-6 py-3 rounded-full mb-6 shadow-xl"
          >
            <Award className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wide">14+ YEARS OF SERVICE</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-charcoal mb-6"
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              fontWeight: 900,
              fontFamily: "var(--font-family-serif)",
              lineHeight: "1.1",
              letterSpacing: "-0.02em"
            }}
          >
            Ward 226 <span className="text-coral">|</span> 2026 Commitment
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-charcoal-light max-w-3xl mx-auto mb-12"
            style={{ fontSize: "19px", lineHeight: "1.8", fontWeight: 400 }}
          >
            This commitment is not drafted at a desk. It is shaped by engaging conversations, trust,
            and the everyday concerns shared by residents across Ward 226.
          </motion.p>

          {/* Core Principles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-coral"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center mx-auto mb-4 shadow-md">
                  <principle.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-charcoal font-bold text-lg mb-2">{principle.title}</p>
                <p className="text-charcoal-light text-sm">{principle.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Section Title for Commitments */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-coral mb-2"
            style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}
          >
            OUR COMMITMENT TO YOU
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-charcoal"
            style={{
              fontSize: "clamp(32px, 4vw, 44px)",
              fontWeight: 800,
              fontFamily: "var(--font-family-serif)"
            }}
          >
            9 Key Focus Areas
          </motion.h2>
        </div>

        {/* Commitment Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {commitmentCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.05 }}
              className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-coral/20 hover:border-coral"
            >
              {/* Category Header */}
              <div className="bg-gradient-to-br from-coral-light via-cream to-white p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-coral to-coral-dark shadow-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-charcoal font-bold text-xl group-hover:text-coral transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>
              </div>

              {/* Category Items */}
              <div className="p-6 space-y-3 bg-white">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                    className="flex items-start gap-3 group/item"
                  >
                    <div className="shrink-0 mt-0.5">
                      <div className="w-5 h-5 rounded-full bg-coral/10 flex items-center justify-center group-hover/item:bg-coral transition-colors duration-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-coral group-hover/item:text-white transition-colors duration-300" />
                      </div>
                    </div>
                    <p className="text-charcoal-light text-sm leading-relaxed group-hover/item:text-charcoal transition-colors duration-300">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* The 2026 Commitment Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-charcoal via-charcoal to-charcoal-dark text-white rounded-3xl p-10 lg:p-16 text-center overflow-hidden shadow-2xl"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-coral/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-coral/5 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-coral/20 backdrop-blur-sm px-6 py-2.5 rounded-full border border-coral/30">
                <Target className="w-5 h-5 text-coral" />
                <span className="text-coral font-bold text-sm tracking-widest">THE 2026 COMMITMENT</span>
              </div>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mb-8"
              style={{
                fontSize: "clamp(32px, 4.5vw, 52px)",
                fontWeight: 900,
                fontFamily: "var(--font-family-serif)",
                letterSpacing: "-0.01em",
                lineHeight: "1.2"
              }}
            >
              Excellence, Transparency <br />& Accountability
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-white/90 max-w-3xl mx-auto mb-8"
              style={{ fontSize: "18px", lineHeight: "1.8" }}
            >
              This commitment is about excellence, transparency, and accountability in civic work.
              I look forward to staying engaged with you and assure you of my continued availability.
              I seek your valuable support as we take this commitment forward into 2026 and beyond.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 text-coral text-sm font-semibold"
            >
              <HandshakeIcon className="w-5 h-5" />
              <span>Together, for a better Ward 226</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-charcoal-light text-base italic text-center mt-10 font-medium"
        >
          A commitment born from conversations, delivered through action
        </motion.p>
      </div>
    </section>
  );
}
