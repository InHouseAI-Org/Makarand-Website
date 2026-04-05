import type { Metadata } from "next";
import { About } from "../components/About";
import { generateSEO, KEYWORDS, combineKeywords } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: 'About Makarand Narwekar | Award-Winning Mumbai Corporator & Community Leader',
  description: 'Meet Makarand Narwekar - Mumbai\'s most dynamic and results-driven Corporator. From humble beginnings to transformative leadership, discover how Makarand Narwekar is revolutionizing A Ward through award-winning infrastructure projects, innovative youth empowerment, and unwavering commitment to every citizen. Your trusted BJP leader delivering excellence.',
  keywords: combineKeywords(
    KEYWORDS.base,
    KEYWORDS.governance,
    [
      'About Makarand Narwekar',
      'Makarand Narwekar Biography',
      'Makarand Narwekar Story',
      'Makarand Narwekar Leadership',
      'Best Mumbai Corporator',
      'Makarand Narwekar Achievements',
      'Makarand Narwekar Background',
      'Who is Makarand Narwekar',
      'Makarand Narwekar Profile',
      'Mumbai Leader Makarand Narwekar'
    ]
  ),
  canonical: '/about',
  ogImage: '/api/og?title=Meet Makarand Narwekar&description=Award-Winning Leader Transforming Mumbai&type=default',
  ogType: 'profile',
});

export default function AboutPage() {
  return <About />;
}
