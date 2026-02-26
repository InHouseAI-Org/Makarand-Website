import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { IMAGES } from "./images";

const testimonials = [
  {
    name: "Sunita Sharma",
    role: "Resident, Colaba",
    quote: "The road outside our society was in terrible condition for years. Within months of approaching Narwekar ji's office, the entire stretch was reconstructed.",
    image: IMAGES.womanCitizen,
  },
  {
    name: "Rajesh Patil",
    role: "Community Leader",
    quote: "Makarand ji stands out for his hands-on approach. He visits project sites personally and ensures quality work. That's rare in today's politics.",
    image: IMAGES.elderMan,
  },
  {
    name: "Dr. Priya Kulkarni",
    role: "School Principal",
    quote: "The digital classroom initiative has transformed our school. Students now have access to modern learning tools. His commitment to education is commendable.",
    image: IMAGES.womanCitizen,
  },
];

export function TestimonialsPreview() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-coral mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
            TESTIMONIALS
          </p>
          <h2 className="text-charcoal mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            Voices from the Community
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-cream to-white border border-border rounded-2xl p-6 hover:shadow-xl transition-all"
            >
              <Quote className="w-8 h-8 text-coral/30 mb-4" />
              <p className="text-charcoal-light mb-6" style={{ fontSize: "15px", lineHeight: "1.7", fontStyle: "italic" }}>
                "{item.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-coral/10">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-charcoal font-bold" style={{ fontSize: "15px" }}>{item.name}</p>
                  <p className="text-charcoal-light" style={{ fontSize: "13px" }}>{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
