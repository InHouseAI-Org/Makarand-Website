'use client';

import Link from "next/link";
import { Phone, MapPin, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Vision", path: "/vision" },
  { label: "Work & Impact", path: "/work" },
  { label: "Youth", path: "/youth" },
  { label: "Government Projects", path: "/government-projects" },
  { label: "Ward Info", path: "/ward" },
  { label: "Media", path: "/media" },
];

// Custom X (Twitter) icon component
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/MakarandNarwekarOfficial/", label: "Facebook" },
  { icon: XIcon, href: "https://x.com/MNarwekar", label: "X (Twitter)" },
  { icon: Instagram, href: "https://www.instagram.com/makarandnarwekarofficial/reels/", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@narwekarmakarand?si=NL9_dd0DGW1-cNGa", label: "YouTube" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/makarand-narwekar-772468294/", label: "LinkedIn" }
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/90">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div>
                <p style={{ fontSize: "16px", fontWeight: 700, fontFamily: "var(--font-family-serif)" }}>Makarand Narwekar</p>
                <p className="text-white/60" style={{ fontSize: "12px", fontFamily: "var(--font-family-serif)" }}>Corporator</p>
              </div>
            </div>
            <p className="text-white/60 mb-4" style={{ fontSize: "14px", lineHeight: "1.7" }}>
              Dedicated to transforming our ward through transparent governance, sustainable development, and citizen-first service.
            </p>
            {/* Adv Makarand S Narwekar in Footer */}
            <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-white/90 mb-2" style={{ fontSize: "14px", fontWeight: 600 }}>
                Adv Makarand S Narwekar
              </p>
            </div>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-coral-dark transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-coral mb-4" style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.05em", fontFamily: "var(--font-family-serif)" }}>QUICK LINKS</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-white/60 hover:text-coral-dark transition-colors" style={{ fontSize: "14px", fontFamily: "var(--font-family-serif)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Office Info */}
          <div>
            <h4 className="text-coral mb-4" style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.05em", fontFamily: "var(--font-family-serif)" }}>OFFICE</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-coral shrink-0" />
                <div>
                  <p className="text-white/80 mb-2" style={{ fontSize: "13px", fontWeight: 600 }}>Personal Office</p>
                  <address className="text-white/60 not-italic" style={{ fontSize: "13px", lineHeight: "1.6" }}>
                    Ground Floor, Ajanta Apartment,<br />
                    Shaheed Bhagat Singh Road, Colaba Causeway,<br />
                    Mumbai - 400005
                  </address>
                  <p className="text-white/60 mt-1" style={{ fontSize: "12px" }}>Mon–Sat: 7:00 PM – 10:30 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-coral shrink-0" />
                <div>
                  <p className="text-white/80 mb-2" style={{ fontSize: "13px", fontWeight: 600 }}>&apos;A&apos; Ward Office</p>
                  <address className="text-white/60 not-italic" style={{ fontSize: "13px", lineHeight: "1.6" }}>
                    134 &apos;E&apos; Shahid Bhagat Singh Marg,<br />
                    Near R.B.I., Fort, Mumbai - 400001
                  </address>
                  <p className="text-white/60 mt-1" style={{ fontSize: "12px" }}>Mon–Sat: 11:30 AM – 1:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-coral shrink-0" />
                <div>
                  <a href="tel:+918850866638" className="text-white/60 hover:text-coral transition-colors" style={{ fontSize: "14px" }}>
                    +91 88508 66638
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Party Affiliation */}
          <div>
            <h4 className="text-coral mb-4" style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.05em", fontFamily: "var(--font-family-serif)" }}>AFFILIATION</h4>
            <p className="text-white/60 mb-2" style={{ fontSize: "14px" }}>
              Member, Bharatiya Janata Party (BJP)
            </p>
            <p className="text-white/40" style={{ fontSize: "12px", lineHeight: "1.6" }}>
              Committed to development-oriented governance and serving every citizen of the ward with transparency and accountability.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40" style={{ fontSize: "13px" }}>
            &copy; {new Date().getFullYear()} Makarand Narwekar. All rights reserved.
          </p>
          <a
            href="https://wa.me/919607048300"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white/50 transition-colors"
            style={{ fontSize: "12px" }}
          >
            Powered by Griffin Marketing
          </a>
        </div>
      </div>
    </footer>
  );
}
