import { Hero } from "../components/Hero";
import { AboutPreview } from "../components/AboutPreview";
import { VisionPreview } from "../components/VisionPreview";
import { WorkImpactPreview } from "../components/WorkImpactPreview";
import { TestimonialsPreview } from "../components/TestimonialsPreview";
import { MediaPreview } from "../components/MediaPreview";

export function HomePage() {
  return (
    <div>
      <Hero />
      <AboutPreview />
      <VisionPreview />
      <WorkImpactPreview />
      <MediaPreview />
      <TestimonialsPreview />
    </div>
  );
}
