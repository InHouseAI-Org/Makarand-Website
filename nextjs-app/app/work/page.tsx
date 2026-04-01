import type { Metadata } from "next";
import { WorkImpact } from "../components/WorkImpact";

export const metadata: Metadata = {
  title: 'Work & Impact | Projects & Achievements',
  description: 'Explore the work done by Makarand Narwekar including infrastructure projects, community initiatives, social welfare programs, and measurable impact in Mumbai\'s A Ward.',
  keywords: ['Projects', 'Achievements', 'Community Work', 'Infrastructure Development', 'Social Welfare'],
  openGraph: {
    title: 'Work & Impact | Makarand Narwekar',
    description: 'Infrastructure projects, community initiatives, and measurable impact.',
    url: 'https://makarandnarwekar.com/work',
  },
  alternates: {
    canonical: 'https://makarandnarwekar.com/work',
  },
};

export default function WorkPage() {
  return <WorkImpact />;
}
