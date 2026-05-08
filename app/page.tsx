import type { Metadata } from "next";
import { Hero } from "./components/Hero";
import { AboutPreview } from "./components/AboutPreview";
import { Products } from "./components/Products";
import { VisionPreview } from "./components/VisionPreview";
import { WorkImpactPreview } from "./components/WorkImpactPreview";
import { TestimonialsPreview } from "./components/TestimonialsPreview";
import { MediaPreview } from "./components/MediaPreview";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Makarand Narwekar | Mumbai Corporator | Transforming Communities with Vision & Leadership',
  description: 'Makarand Narwekar - Mumbai\'s dynamic Corporator and BJP leader delivering transformative results in A Ward. Award-winning infrastructure projects, innovative youth programs, and transparent governance. Your trusted representative for Colaba & Fort. Experience leadership that makes a difference.',
  keywords: [
    'Makarand Narwekar',
    'Makarand Narwekar Mumbai',
    'Mumbai Corporator Makarand Narwekar',
    'BJP Makarand Narwekar',
    'Colaba Corporator Makarand Narwekar',
    'A Ward Leader',
    'Makarand Narwekar Projects',
    'Best Mumbai Corporator',
    'Makarand Narwekar Contact',
    'Fort Mumbai Representative'
  ],
  openGraph: {
    title: 'Makarand Narwekar | Mumbai Corporator Transforming A Ward',
    description: 'Meet Makarand Narwekar - Mumbai\'s dynamic BJP Corporator delivering real results. Infrastructure excellence, youth empowerment, community transformation. Your trusted A Ward representative.',
    url: 'https://makarandnarwekar.com',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Makarand Narwekar - Mumbai Corporator & BJP Leader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Makarand Narwekar | Mumbai Corporator',
    description: 'Makarand Narwekar - Transforming A Ward with visionary leadership. Infrastructure. Youth. Community.',
    creator: '@MNarwekar',
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
    alternateName: ['Makarand', 'Narwekar', 'Corporator Makarand Narwekar'],
    description: 'Dynamic Mumbai Corporator and BJP leader transforming A Ward through visionary infrastructure projects, innovative youth programs, and transparent citizen-first governance. Award-winning public servant dedicated to community excellence.',
    jobTitle: 'Municipal Corporator - A Ward',
    worksFor: {
      '@type': 'GovernmentOrganization',
      name: 'Municipal Corporation of Greater Mumbai',
      alternateName: 'MCGM',
    },
    memberOf: {
      '@type': 'Organization',
      name: 'Bharatiya Janata Party',
      alternateName: 'BJP',
    },
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
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'A Ward - Colaba and Fort, Mumbai',
    },
    knowsAbout: [
      'Infrastructure Development',
      'Urban Planning',
      'Youth Empowerment',
      'Community Development',
      'Municipal Governance',
      'Public Administration',
      'Civic Leadership',
      'Social Welfare'
    ],
    url: 'https://makarandnarwekar.com',
    image: 'https://makarandnarwekar.com/makarand-portrait.jpg',
    sameAs: [
      'https://www.facebook.com/MakarandNarwekarOfficial/',
      'https://x.com/MNarwekar',
      'https://www.instagram.com/makarandnarwekarofficial/',
      'https://youtube.com/@narwekarmakarand',
      'https://www.linkedin.com/in/makarand-narwekar-772468294/',
    ],
  };

  const helpLineSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Adv Makarand S Narwekar',
    description: 'Dedicated citizen support and assistance service for all ward-related queries, grievances, and concerns. Available to connect residents with our office for prompt resolution.',
    provider: {
      '@type': 'Person',
      name: 'Makarand Narwekar',
      jobTitle: 'Municipal Corporator - A Ward',
    },
    serviceType: 'Citizen Support and Assistance',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'A Ward - Colaba and Fort, Mumbai',
    },
    availableLanguage: ['English', 'Hindi', 'Marathi'],
    url: 'https://makarandnarwekar.com/connect',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(helpLineSchema) }}
      />
      <Hero />
      <AboutPreview />
      <Products />
      <VisionPreview />
      <WorkImpactPreview />
      <MediaPreview />
      <TestimonialsPreview />
    </>
  );
}
