'use client';

import { motion } from "motion/react";

export function Products() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-coral mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em" }}>
            OUR PRODUCTS
          </p>
        </div>

        {/* Products Grid */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-sm"
          >
            <div className="bg-cream rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src="/Portrait of a smiling professional man.webp"
                  alt="Advocate Makarand Narwekar"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <div className="p-6 text-center">
                <h3 className="text-charcoal" style={{ fontSize: "20px", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>
                  Makarand Narwekar
                </h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
