import type { Metadata } from "next";
import { Vision } from "../components/Vision";
import { generateSEO, KEYWORDS, combineKeywords } from "@/lib/seo";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = generateSEO({
  title: 'Makarand Narwekar\'s Vision for Mumbai | Transforming A Ward into a Model Community',
  description: 'Discover Makarand Narwekar\'s bold and inspiring vision for Mumbai\'s future. Under his visionary leadership: world-class infrastructure, cutting-edge digital governance, comprehensive youth empowerment, sustainable urban development, and inclusive prosperity for every citizen. Experience how Makarand Narwekar is building tomorrow\'s Mumbai today.',
  keywords: combineKeywords(
    KEYWORDS.base,
    KEYWORDS.development,
    KEYWORDS.youth,
    [
      'Makarand Narwekar Vision',
      'Makarand Narwekar Plans',
      'Vision Mumbai Makarand Narwekar',
      'Smart City Mumbai',
      'Future Mumbai Makarand Narwekar',
      'Progressive Leader Mumbai',
      'Makarand Narwekar Goals',
      'Mumbai Development Vision'
    ]
  ),
  canonical: '/vision',
  ogImage: '/api/og?title=Makarand Narwekar\'s Vision&description=Building Mumbai\'s Progressive Future&type=default&category=Vision',
});

export default function VisionPage() {
  return <Vision />;
}
