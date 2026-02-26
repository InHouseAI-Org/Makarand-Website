import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { IMAGES } from "./images";

const testimonials = [
  {
    name: "Sunita Sharma",
    role: "Resident, Colaba",
    quote: "The road outside our society was in terrible condition for years. Within months of approaching Narwekar ji's office, the entire stretch was reconstructed. He truly delivers on his promises.",
    image: IMAGES.womanCitizen,
  },
  {
    name: "Rajesh Patil",
    role: "Community Leader",
    quote: "I've seen many corporators come and go, but Makarand ji stands out for his hands-on approach. He visits project sites personally and ensures quality work. That's rare in today's politics.",
    image: IMAGES.elderMan,
  },
  {
    name: "Dr. Priya Kulkarni",
    role: "School Principal",
    quote: "The digital classroom initiative has transformed our school. Students now have access to modern learning tools. His commitment to education is truly commendable.",
    image: IMAGES.womanCitizen,
  },
  {
    name: "Mohan Deshmukh",
    role: "Senior Citizen",
    quote: "The new park near our area has become a lifeline for senior citizens. Morning walks, yoga sessions — it's a wonderful space. Thank you for thinking about us.",
    image: IMAGES.elderMan,
  },
];

const communityLeaders = [
  {
    name: "Adv. Suresh Mane",
    role: "Social Worker, Colaba",
    quote: "A corporator who puts development above politics. His ward office is always accessible, and grievances are resolved swiftly.",
  },
  {
    name: "Mrs. Anjali Bhosale",
    role: "Women's SHG President",
    quote: "He has championed women's empowerment programs that have genuinely impacted livelihoods in our community.",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 lg:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-coral mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
            TESTIMONIALS
          </p>
          <h2 className="text-charcoal mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            Voices from the Community
          </h2>
          <p className="text-charcoal-light" style={{ fontSize: "16px", lineHeight: "1.7" }}>
            Hear from the citizens and community leaders about the impact of development work in our ward.
          </p>
        </div>

        {/* Citizen Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name + index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-all"
            >
              <Quote className="w-8 h-8 text-coral/30 mb-4" />
              <p className="text-charcoal-light mb-6" style={{ fontSize: "15px", lineHeight: "1.7", fontStyle: "italic" }}>
                "{item.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img src={item.image} alt={item.name} className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <p className="text-charcoal" style={{ fontSize: "14px", fontWeight: 700 }}>{item.name}</p>
                  <p className="text-charcoal-light" style={{ fontSize: "12px" }}>{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Community Leader Quotes */}
        <div className="bg-charcoal rounded-2xl p-8 lg:p-12">
          <h3 className="text-white text-center mb-8" style={{ fontSize: "20px", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
            Community Leader Endorsements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityLeaders.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <Quote className="w-6 h-6 text-coral mb-3" />
                <p className="text-white/80 mb-4" style={{ fontSize: "15px", lineHeight: "1.7", fontStyle: "italic" }}>
                  "{leader.quote}"
                </p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-white" style={{ fontSize: "14px", fontWeight: 700 }}>{leader.name}</p>
                  <p className="text-white/50" style={{ fontSize: "12px" }}>{leader.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
