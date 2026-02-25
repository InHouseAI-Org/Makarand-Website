import { motion } from "motion/react";
import { MapPin, Building, Info, FileText, Phone, Hospital, GraduationCap, Bus } from "lucide-react";
import { IMAGES } from "./images";

const landmarks = [
  { icon: Building, name: "Municipal Ward Office", desc: "Administrative headquarters" },
  { icon: Hospital, name: "Government Hospital", desc: "24/7 healthcare facility" },
  { icon: GraduationCap, name: "Municipal Schools (8)", desc: "Primary & secondary education" },
  { icon: Bus, name: "Bus Depot", desc: "BEST bus connectivity" },
  { icon: MapPin, name: "Community Parks (5)", desc: "Open spaces & recreation" },
  { icon: Building, name: "Fire Station", desc: "Emergency response unit" },
];

const citizenServices = [
  { title: "Birth & Death Certificate", desc: "Apply online or at ward office" },
  { title: "Property Tax Payment", desc: "Pay via portal or in person" },
  { title: "Water Connection", desc: "New connections & complaints" },
  { title: "Building Permission", desc: "NOC and plan approvals" },
  { title: "Grievance Redressal", desc: "Submit complaints & track status" },
  { title: "Health Services", desc: "Vaccination, health camps, PHC" },
];

export function WardInfo() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-saffron mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
            WARD INFORMATION
          </p>
          <h2 className="text-brown mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            Know Your Ward
          </h2>
          <p className="text-brown-light" style={{ fontSize: "16px", lineHeight: "1.7" }}>
            Everything citizens need to know about their ward — services, landmarks, development plans, and contact information.
          </p>
        </div>

        {/* Map + Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden bg-cream border border-border"
          >
            <img src={IMAGES.mumbai} alt="Ward aerial view" className="w-full h-80 lg:h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-brown/30 flex items-center justify-center">
              <div className="text-center text-white p-6">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-saffron" />
                <p style={{ fontSize: "20px", fontWeight: 700 }}>Ward Map</p>
                <p className="text-white/70 mt-2" style={{ fontSize: "14px" }}>
                  Interactive ward map coming soon
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <Info className="w-4 h-4" />
                  <span style={{ fontSize: "13px" }}>Colaba Division, South Mumbai</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-brown mb-6" style={{ fontSize: "22px", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
              Key Landmarks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {landmarks.map((item) => (
                <div key={item.name} className="flex items-start gap-3 bg-cream rounded-xl p-4 border border-border">
                  <div className="w-10 h-10 rounded-lg bg-saffron-light flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-saffron" />
                  </div>
                  <div>
                    <p className="text-brown" style={{ fontSize: "14px", fontWeight: 700 }}>{item.name}</p>
                    <p className="text-brown-light" style={{ fontSize: "12px" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Development Blueprint */}
        <div className="bg-brown rounded-2xl p-8 lg:p-12 mb-16 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <FileText className="w-10 h-10 text-saffron mx-auto mb-4" />
            <h3 className="mb-4" style={{ fontSize: "24px", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
              Development Blueprint 2025–2028
            </h3>
            <p className="text-white/70 mb-8" style={{ fontSize: "15px", lineHeight: "1.7" }}>
              Our comprehensive ward development plan outlines every project, timeline, and budget allocation 
              for the current term. Full transparency, no surprises.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { val: "₹25 Cr", desc: "Total Budget" },
                { val: "48", desc: "Planned Projects" },
                { val: "3 Years", desc: "Timeline" },
                { val: "100%", desc: "Accountability" },
              ].map((item) => (
                <div key={item.desc} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-saffron" style={{ fontSize: "22px", fontWeight: 800 }}>{item.val}</p>
                  <p className="text-white/60 mt-1" style={{ fontSize: "12px" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Citizen Services */}
        <h3 className="text-brown text-center mb-8" style={{ fontSize: "22px", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
          Citizen Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {citizenServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 bg-cream rounded-xl p-5 border border-border hover:shadow-md transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-saffron/10 flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4 text-saffron" />
              </div>
              <div>
                <p className="text-brown" style={{ fontSize: "15px", fontWeight: 700 }}>{service.title}</p>
                <p className="text-brown-light" style={{ fontSize: "13px" }}>{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
