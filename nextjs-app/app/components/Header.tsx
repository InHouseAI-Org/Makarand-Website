'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";

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

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true); // Default to true to prevent flash
  const pathname = usePathname();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-charcoal/10">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <p className="text-charcoal" style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "-0.01em", fontFamily: "var(--font-family-serif)" }}>
              MAKARAND NARWEKAR
            </p>
          </Link>

          {/* Desktop Nav */}
          {isDesktop && (
            <nav className="flex items-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`transition-colors whitespace-nowrap ${
                    pathname === link.path
                      ? "text-coral"
                      : "text-charcoal hover:text-coral"
                  }`}
                  style={{ fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em", fontFamily: "var(--font-family-serif)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {isDesktop && (
              <Link
                href="/connect"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-coral text-white rounded-full hover:bg-coral-dark transition-all"
                style={{ fontSize: "13px", fontWeight: 600, fontFamily: "var(--font-family-serif)" }}
              >
                CONTACT
              </Link>
            )}
            {!isDesktop && (
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-charcoal"
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && !isDesktop && (
        <div className="border-t border-charcoal/10 bg-white">
          <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-full transition-colors text-center ${
                  pathname === link.path
                    ? "bg-coral text-white"
                    : "text-charcoal-light hover:text-charcoal hover:bg-cream"
                }`}
                style={{ fontSize: "15px", fontWeight: 500, fontFamily: "var(--font-family-serif)" }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+918850866638"
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-coral text-white rounded-lg"
              style={{ fontSize: "15px", fontWeight: 600, fontFamily: "var(--font-family-serif)" }}
            >
              <Phone className="w-4 h-4" />
              Contact Office
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
