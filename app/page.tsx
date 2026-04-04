import type { Metadata } from "next";
import { Hero } from "./components/Hero";
import { AboutPreview } from "./components/AboutPreview";
import { VisionPreview } from "./components/VisionPreview";
import { WorkImpactPreview } from "./components/WorkImpactPreview";
import { TestimonialsPreview } from "./components/TestimonialsPreview";
import { MediaPreview } from "./components/MediaPreview";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Makarand Narwekar | Mumbai Corporator | Transforming Communities',
  description: 'Makarand Narwekar - Mumbai Corporator dedicated to transforming our ward through transparent governance, sustainable development, and citizen-first service. Member of BJP serving Colaba & Fort area.',
  openGraph: {
    title: 'Makarand Narwekar | Mumbai Corporator',
    description: 'Dedicated to transforming our ward through transparent governance and sustainable development.',
    url: 'https://makarandnarwekar.com',
    type: 'website',
  },
  alternates: {
    canonical: 'https://makarandnarwekar.com',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Makarand Narwekar',
    jobTitle: 'Corporator',
    affiliation: {
      '@type': 'Organization',
      name: 'Bharatiya Janata Party',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ground Floor, Ajanta Apartment, Shaheed Bhagat Singh Road',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400005',
      addressCountry: 'IN',
    },
    url: 'https://makarandnarwekar.com',
    sameAs: [
      'https://www.facebook.com/MakarandNarwekarOfficial/',
      'https://x.com/MNarwekar',
      'https://www.instagram.com/makarandnarwekarofficial/',
      'https://youtube.com/@narwekarmakarand',
      'https://www.linkedin.com/in/makarand-narwekar-772468294/',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <AboutPreview />
      <VisionPreview />
      <WorkImpactPreview />
      <MediaPreview />
      <TestimonialsPreview />
    </>
  );
}
