'use client';

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { GraduationCap, Trophy, Briefcase, Users, Heart, Lightbulb, Target, Book, Award, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

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

interface YouthTestimonial {
  name: string;
  age?: number;
  school?: string;
  content: string;
  photo?: string;
  photoUrl?: string;
}

interface YouthClientProps {
  testimonials: YouthTestimonial[];
  isFullPage?: boolean;
}

export function YouthClient({ testimonials, isFullPage = false }: YouthClientProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsToShow = 3;
  const totalItems = testimonials.length;
  const maxIndex = Math.max(0, totalItems - itemsToShow);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const itemWidth = container.scrollWidth / totalItems;
    const scrollAmount = itemWidth * itemsToShow;

    if (direction === 'left') {
      setCurrentIndex(prev => Math.max(0, prev - 1));
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!isAutoPlaying || totalItems <= itemsToShow) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const next = prev >= maxIndex ? 0 : prev + 1;

        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const itemWidth = container.scrollWidth / totalItems;

          if (next === 0) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            const scrollAmount = itemWidth * itemsToShow;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
          }
        }

        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex, totalItems, itemsToShow]);

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
        {testimonials.length > 0 && (
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

            <div className="relative">
              {/* Navigation Buttons */}
              {totalItems > itemsToShow && (
                <>
                  <button
                    onClick={() => {
                      scroll('left');
                      setIsAutoPlaying(false);
                    }}
                    disabled={currentIndex === 0}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-xl rounded-full p-3 hover:bg-coral hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-charcoal border-2 border-border hover:border-coral"
                    aria-label="Previous testimonials"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => {
                      scroll('right');
                      setIsAutoPlaying(false);
                    }}
                    disabled={currentIndex >= maxIndex}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-xl rounded-full p-3 hover:bg-coral hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-charcoal border-2 border-border hover:border-coral"
                    aria-label="Next testimonials"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Scrollable Container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-hidden scroll-smooth"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name + index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border-2 border-border hover:border-coral transition-all flex-shrink-0"
                    style={{ width: 'calc(33.333% - 16px)', minWidth: '300px' }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.photo || testimonial.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=ff8465&color=fff`}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-charcoal font-bold text-base">{testimonial.name}</p>
                        <p className="text-charcoal-light text-sm">
                          {testimonial.age && `Age ${testimonial.age}`}
                          {testimonial.age && testimonial.school && ' • '}
                          {testimonial.school}
                        </p>
                      </div>
                    </div>
                    <p className="text-charcoal-light italic text-sm leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Pagination Dots */}
              {totalItems > itemsToShow && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentIndex(index);
                        setIsAutoPlaying(false);
                        if (scrollContainerRef.current) {
                          const container = scrollContainerRef.current;
                          const itemWidth = container.scrollWidth / totalItems;
                          const scrollPosition = itemWidth * itemsToShow * index;
                          container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
                        }
                      }}
                      className={`h-2 rounded-full transition-all ${
                        currentIndex === index
                          ? 'bg-coral w-8'
                          : 'bg-border w-2 hover:bg-coral/50'
                      }`}
                      aria-label={`Go to testimonial set ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

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
