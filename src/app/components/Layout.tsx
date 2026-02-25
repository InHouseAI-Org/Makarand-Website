import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Menu, X, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ChevronUp } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Vision", path: "/vision" },
  { label: "Work & Impact", path: "/work" },
  { label: "Ward Info", path: "/ward" },
  { label: "Media", path: "/media" },
  { label: "Connect", path: "/connect" },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="hidden sm:block">
              <p className="text-charcoal" style={{ fontSize: "16px", fontWeight: 700, lineHeight: "1.2" }}>Makarand Narwekar</p>
              <p className="text-charcoal-light" style={{ fontSize: "11px", fontWeight: 400 }}>Corporator &middot; Ward Development</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? "bg-emerald-light text-emerald-dark"
                    : "text-charcoal-light hover:text-charcoal hover:bg-cream"
                }`}
                style={{ fontSize: "14px", fontWeight: 500 }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+919876543210"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald text-white rounded-lg hover:bg-emerald-dark transition-colors"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              <Phone className="w-4 h-4" />
              Contact Office
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-charcoal rounded-lg hover:bg-cream"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? "bg-emerald-light text-emerald-dark"
                    : "text-charcoal-light hover:text-charcoal hover:bg-cream"
                }`}
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+919876543210"
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-emerald text-white rounded-lg"
              style={{ fontSize: "15px", fontWeight: 600 }}
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

function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-charcoal text-white/90">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div>
                <p style={{ fontSize: "16px", fontWeight: 700 }}>Makarand Narwekar</p>
                <p className="text-white/60" style={{ fontSize: "12px" }}>Corporator</p>
              </div>
            </div>
            <p className="text-white/60 mb-6" style={{ fontSize: "14px", lineHeight: "1.7" }}>
              Dedicated to transforming our ward through transparent governance, sustainable development, and citizen-first service.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-dark transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-emerald mb-4" style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.05em" }}>QUICK LINKS</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/60 hover:text-emerald-dark transition-colors" style={{ fontSize: "14px" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Office Info */}
          <div>
            <h4 className="text-emerald mb-4" style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.05em" }}>OFFICE</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-emerald shrink-0" />
                <p className="text-white/60" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                  Ward Office, Colaba Division,<br />
                  Mumbai - 400001,<br />
                  Maharashtra, India
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-emerald shrink-0" />
                <div>
                  <p className="text-white/60" style={{ fontSize: "14px" }}>+91 98765 43210</p>
                  <p className="text-white/60" style={{ fontSize: "14px" }}>Mon–Sat, 10am–6pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Party Affiliation */}
          <div>
            <h4 className="text-emerald mb-4" style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.05em" }}>AFFILIATION</h4>
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
            &copy; 2026 Makarand Narwekar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1" key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}