import type { Metadata } from "next";
import { Youth } from "../components/Youth";

export const metadata: Metadata = {
  title: 'Youth Programs | Empowering Tomorrow\'s Leaders',
  description: 'Youth development programs, educational initiatives, skill training, sports activities, and opportunities for young people in Mumbai. Empowering the next generation of leaders.',
  keywords: ['Youth Programs', 'Youth Development', 'Education', 'Skill Training', 'Sports', 'Youth Empowerment'],
  openGraph: {
    title: 'Youth Programs | Makarand Narwekar',
    description: 'Empowering tomorrow\'s leaders through education, skill training, and sports.',
    url: 'https://makarandnarwekar.com/youth',
  },
  alternates: {
    canonical: 'https://makarandnarwekar.com/youth',
  },
};

export default function YouthPage() {
  return <Youth />;
}
