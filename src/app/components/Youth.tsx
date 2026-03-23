import { motion } from "motion/react";
import { GraduationCap, Trophy, Briefcase, Users, Heart, Lightbulb, Target, Book, Award, Sparkles } from "lucide-react";

const youthInitiatives = [
  {
    icon: GraduationCap,
    title: "Education & Skill Development",
    description: "Empowering youth with quality education and vocational training programs",
    programs: [
      "Free coaching classes for competitive exams",
      "Digital literacy workshops and computer training",
      "Career guidance and counseling sessions",
      "Scholarship programs for underprivileged students"
    ]
  },
  {
    icon: Briefcase,
    title: "Employment & Entrepreneurship",
    description: "Creating opportunities for youth to build careers and start businesses",
    programs: [
      "Job placement assistance and career fairs",
      "Startup mentorship and business incubation support",
      "Skill training in emerging technologies",
      "Connection with local industries and employers"
    ]
  },
  {
    icon: Trophy,
    title: "Sports & Recreation",
    description: "Promoting physical fitness and sports excellence among youth",
    programs: [
      "Free access to sports facilities and equipment",
      "Coaching programs for various sports",
      "Inter-ward sports competitions and tournaments",
      "Fitness camps and health awareness programs"
    ]
  },
  {
    icon: Lightbulb,
    title: "Innovation & Leadership",
    description: "Nurturing future leaders and innovative thinkers",
    programs: [
      "Youth leadership development programs",
      "Innovation challenges and hackathons",
      "Public speaking and debate competitions",
      "Community service and volunteer opportunities"
    ]
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Ensuring physical and mental well-being of youth",
    programs: [
      "Free health check-up camps",
      "Mental health awareness and counseling",
      "Substance abuse prevention programs",
      "Yoga and meditation sessions"
    ]
  },
  {
    icon: Users,
    title: "Community Engagement",
    description: "Building responsible and socially conscious youth",
    programs: [
      "Civic awareness and voter education drives",
      "Environmental conservation projects",
      "Social service initiatives for underprivileged",
      "Cultural programs and festivals"
    ]
  }
];

const achievements = [
  { icon: Users, value: "5,000+", label: "Youth Beneficiaries" },
  { icon: GraduationCap, value: "200+", label: "Training Programs" },
  { icon: Briefcase, value: "500+", label: "Job Placements" },
  { icon: Award, value: "50+", label: "Scholarships Awarded" }
];

const testimonials = [
  {
    name: "Priya Sharma",
    age: 22,
    program: "Digital Skills Training",
    quote: "The computer training program helped me land my first job. I'm now working as a junior developer at a tech company.",
    image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=ff8465&color=fff"
  },
  {
    name: "Rahul Desai",
    age: 20,
    program: "Sports Development",
    quote: "Thanks to the sports facility and coaching support, I represented our ward at the state-level badminton championship.",
    image: "https://ui-avatars.com/api/?name=Rahul+Desai&background=ff8465&color=fff"
  },
  {
    name: "Sneha Patil",
    age: 19,
    program: "Scholarship Recipient",
    quote: "The scholarship program made it possible for me to continue my engineering education. Forever grateful for this opportunity.",
    image: "https://ui-avatars.com/api/?name=Sneha+Patil&background=ff8465&color=fff"
  }
];

export function Youth({ isFullPage = false }: { isFullPage?: boolean }) {
  return (
    <section className={`${isFullPage ? "py-16 lg:py-24" : "py-16 lg:py-20"} bg-gradient-to-b from-white via-cream to-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-coral to-coral-dark text-white px-6 py-3 rounded-full mb-6 shadow-xl">
            <Sparkles className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wide">EMPOWERING THE NEXT GENERATION</span>
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
            Youth <span className="text-coral">Initiatives</span>
          </h1>

          <p className="text-charcoal-light max-w-3xl mx-auto mb-4" style={{ fontSize: "19px", lineHeight: "1.8" }}>
            Investing in our youth is investing in our ward's future. We are committed to providing opportunities,
            resources, and support to help young people achieve their dreams and become responsible citizens.
          </p>
        </motion.div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {achievements.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg border-2 border-coral/20 hover:border-coral hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center mx-auto mb-4 shadow-md">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-charcoal mb-2" style={{ fontSize: "32px", fontWeight: 900 }}>{stat.value}</p>
              <p className="text-charcoal-light" style={{ fontSize: "14px", fontWeight: 600 }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Youth Initiatives Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p className="text-coral mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
              OUR PROGRAMS
            </p>
            <h2
              className="text-charcoal"
              style={{
                fontSize: "clamp(32px, 4vw, 44px)",
                fontWeight: 800,
                fontFamily: "var(--font-family-serif)"
              }}
            >
              Comprehensive Youth Development
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youthInitiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-coral/20 hover:border-coral"
              >
                <div className="bg-gradient-to-br from-coral-light via-cream to-white p-6">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-coral to-coral-dark shadow-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <initiative.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-charcoal font-bold text-xl group-hover:text-coral transition-colors duration-300">
                      {initiative.title}
                    </h3>
                    <p className="text-charcoal-light text-sm">
                      {initiative.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 space-y-3 bg-white">
                  {initiative.programs.map((program, programIndex) => (
                    <motion.div
                      key={programIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: programIndex * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="shrink-0 mt-0.5">
                        <div className="w-5 h-5 rounded-full bg-coral/10 flex items-center justify-center">
                          <Target className="w-3.5 h-3.5 text-coral" />
                        </div>
                      </div>
                      <p className="text-charcoal-light text-sm leading-relaxed">
                        {program}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <p className="text-coral mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
              SUCCESS STORIES
            </p>
            <h2
              className="text-charcoal"
              style={{
                fontSize: "clamp(32px, 4vw, 44px)",
                fontWeight: 800,
                fontFamily: "var(--font-family-serif)"
              }}
            >
              Youth Voices
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-border hover:border-coral transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full"
                  />
                  <div>
                    <p className="text-charcoal font-bold text-base">{testimonial.name}</p>
                    <p className="text-charcoal-light text-sm">Age {testimonial.age} • {testimonial.program}</p>
                  </div>
                </div>
                <p className="text-charcoal-light italic text-sm leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-charcoal via-charcoal to-charcoal-dark text-white rounded-3xl p-10 lg:p-16 text-center overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-coral/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-coral/5 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-coral/20 backdrop-blur-sm px-6 py-2.5 rounded-full border border-coral/30 mb-6">
              <Book className="w-5 h-5 text-coral" />
              <span className="text-coral font-bold text-sm tracking-widest">GET INVOLVED</span>
            </div>

            <h3
              className="mb-6"
              style={{
                fontSize: "clamp(32px, 4.5vw, 48px)",
                fontWeight: 900,
                fontFamily: "var(--font-family-serif)",
                letterSpacing: "-0.01em",
                lineHeight: "1.2"
              }}
            >
              Join Our Youth Programs
            </h3>

            <p className="text-white/90 max-w-3xl mx-auto mb-8" style={{ fontSize: "18px", lineHeight: "1.8" }}>
              Whether you want to learn new skills, pursue your passion, or make a difference in the community,
              we have programs designed for you. Connect with us to explore opportunities.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/connect?mode=youth"
                className="inline-flex items-center justify-center px-8 py-4 bg-coral text-white rounded-full border-2 border-coral transition-all duration-300 hover:bg-transparent hover:text-coral shadow-xl hover:shadow-2xl hover:scale-105"
                style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "0.5px" }}
              >
                ENROLL NOW
              </a>
              <a
                href="/connect?mode=volunteer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-charcoal rounded-full border-2 border-white transition-all duration-300 hover:bg-transparent hover:text-white shadow-xl hover:shadow-2xl hover:scale-105"
                style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "0.5px" }}
              >
                VOLUNTEER
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
