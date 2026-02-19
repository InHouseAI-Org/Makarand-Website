import { motion } from "motion/react";
import { Award, Newspaper, Camera, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { IMAGES } from "./images";

const featuredAwards = [
  {
    title: "Best Corporator Award",
    org: "Mumbai Municipal Corporation",
    year: "2025",
  },
  {
    title: "Clean Ward Excellence",
    org: "Swachh Bharat Mission",
    year: "2024",
  },
];

const featuredPress = [
  {
    title: "Ward Tops Mumbai in Road Repair Completion",
    source: "Mumbai Mirror",
    date: "Jan 2026",
    image: IMAGES.roadConstruction,
  },
  {
    title: "Corporator's Digital Governance Push Praised",
    source: "Times of India",
    date: "Nov 2025",
    image: IMAGES.press,
  },
];

export function MediaPreview() {
  return (
    <section className="py-16 lg:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-saffron mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
            MEDIA & RECOGNITION
          </p>
          <h2 className="text-brown mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            In the Spotlight
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Awards Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-saffron" />
              <h3 className="text-brown" style={{ fontSize: "20px", fontWeight: 700 }}>Awards & Recognition</h3>
            </div>
            <div className="space-y-4">
              {featuredAwards.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-l-4 border-saffron pl-4 py-2"
                >
                  <span className="text-saffron" style={{ fontSize: "12px", fontWeight: 700 }}>{item.year}</span>
                  <h4 className="text-brown mt-1" style={{ fontSize: "16px", fontWeight: 700 }}>{item.title}</h4>
                  <p className="text-brown-muted" style={{ fontSize: "13px" }}>{item.org}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Press Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <Newspaper className="w-6 h-6 text-saffron" />
              <h3 className="text-brown" style={{ fontSize: "20px", fontWeight: 700 }}>Recent Press</h3>
            </div>
            <div className="space-y-4">
              {featuredPress.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-saffron" style={{ fontSize: "11px", fontWeight: 600 }}>{item.source}</span>
                        <span className="text-brown-muted" style={{ fontSize: "11px" }}>• {item.date}</span>
                      </div>
                      <h4 className="text-brown group-hover:text-saffron transition-colors" style={{ fontSize: "14px", fontWeight: 700, lineHeight: "1.4" }}>
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Gallery Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 border border-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Camera className="w-6 h-6 text-saffron" />
            <h3 className="text-brown" style={{ fontSize: "20px", fontWeight: 700 }}>Recent Moments</h3>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[IMAGES.rally, IMAGES.community, IMAGES.award, IMAGES.school, IMAGES.cleanStreet, IMAGES.park].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="aspect-square rounded-lg overflow-hidden group cursor-pointer"
              >
                <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/media"
            className="inline-flex items-center gap-2 text-saffron hover:text-saffron-dark transition-colors font-semibold"
          >
            View All Media & Gallery <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
