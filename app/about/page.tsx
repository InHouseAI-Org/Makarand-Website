import type { Metadata } from "next";
import { About } from "../components/About";

export const metadata: Metadata = {
  title: 'About Makarand Narwekar | Journey & Commitment',
  description: 'Learn about Makarand Narwekar\'s journey in public service, his commitment to community development, and his vision for transforming Mumbai\'s A Ward through transparent governance.',
  keywords: ['About Makarand Narwekar', 'Political Journey', 'Community Service', 'BJP Mumbai', 'Public Service'],
  openGraph: {
    title: 'About Makarand Narwekar | Journey & Commitment',
    description: 'Learn about Makarand Narwekar\'s journey in public service and commitment to community development.',
    url: 'https://makarandnarwekar.com/about',
  },
  alternates: {
    canonical: 'https://makarandnarwekar.com/about',
  },
};

export default function AboutPage() {
  return <About />;
}
