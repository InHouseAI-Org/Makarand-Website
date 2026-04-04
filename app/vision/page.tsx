import type { Metadata } from "next";
import { Vision } from "../components/Vision";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Vision for Mumbai | Development Goals & Initiatives',
  description: 'Discover Makarand Narwekar\'s vision for Mumbai\'s sustainable development, infrastructure improvement, youth empowerment, and creating a better future for all residents.',
  keywords: ['Vision Mumbai', 'Development Goals', 'Sustainable Development', 'Infrastructure', 'Youth Empowerment'],
  openGraph: {
    title: 'Vision for Mumbai | Makarand Narwekar',
    description: 'Vision for sustainable development and community prosperity.',
    url: 'https://makarandnarwekar.com/vision',
  },
  alternates: {
    canonical: 'https://makarandnarwekar.com/vision',
  },
};

export default function VisionPage() {
  return <Vision />;
}
