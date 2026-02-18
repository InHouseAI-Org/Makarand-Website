import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Vision } from "../components/Vision";
import { WorkImpact } from "../components/WorkImpact";
import { Testimonials } from "../components/Testimonials";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

function SectionCTA({ to, label }: { to: string; label: string }) {
  return (
    <div className="text-center py-6 bg-white">
      <Link
        to={to}
        className="inline-flex items-center gap-2 text-saffron hover:text-saffron-dark transition-colors"
        style={{ fontSize: "15px", fontWeight: 600 }}
      >
        {label} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export function HomePage() {
  return (
    <div>
      <Hero />
      <About />
      <SectionCTA to="/about" label="Read Full Journey" />
      <Vision />
      <SectionCTA to="/vision" label="View Complete Manifesto" />
      <WorkImpact />
      <SectionCTA to="/work" label="See All Projects & Impact" />
      <Testimonials />
    </div>
  );
}
