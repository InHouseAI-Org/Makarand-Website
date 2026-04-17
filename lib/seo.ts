/**
 * SEO Utilities for Makarand Narwekar Website
 * Provides helper functions for metadata, structured data, and SEO optimization
 */

import { Metadata } from 'next';

const SITE_URL = 'https://makarandnarwekar.com';
const SITE_NAME = 'Makarand Narwekar';
const TWITTER_HANDLE = '@MNarwekar';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noindex?: boolean;
}

/**
 * Generate comprehensive metadata for pages
 */
export function generateSEO(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage = '/og-image.jpg',
    ogType = 'website',
    publishedTime,
    modifiedTime,
    authors = ['Makarand Narwekar'],
    noindex = false,
  } = config;

  const fullTitle = title.includes('|') ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: authors.map((name) => ({ name })),
    openGraph: {
      type: ogType,
      locale: 'en_IN',
      url: canonicalUrl || SITE_URL,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: TWITTER_HANDLE,
      images: [ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`],
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,
  };
}

/**
 * Generate structured data for Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      'Office of Mumbai Corporator Makarand Narwekar - Dedicated to transparent governance, sustainable development, and citizen-first service.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ground Floor, Ajanta Apartment, Shaheed Bhagat Singh Road',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400005',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Public Office',
        areaServed: 'Mumbai',
        availableLanguage: ['English', 'Hindi', 'Marathi'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        name: 'Makarand\'s Narwekar Corp',
        description: 'Dedicated citizen support and assistance for all ward-related queries and concerns',
        areaServed: 'Mumbai',
        availableLanguage: ['English', 'Hindi', 'Marathi'],
      }
    ],
    sameAs: [
      'https://www.facebook.com/MakarandNarwekarOfficial/',
      'https://x.com/MNarwekar',
      'https://www.instagram.com/makarandnarwekarofficial/',
      'https://youtube.com/@narwekarmakarand',
      'https://www.linkedin.com/in/makarand-narwekar-772468294/',
    ],
  };
}

/**
 * Generate structured data for Person
 */
export function generatePersonSchema() {
  return {
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
    url: SITE_URL,
    image: `${SITE_URL}/makarand-portrait.jpg`,
    sameAs: [
      'https://www.facebook.com/MakarandNarwekarOfficial/',
      'https://x.com/MNarwekar',
      'https://www.instagram.com/makarandnarwekarofficial/',
      'https://youtube.com/@narwekarmakarand',
      'https://www.linkedin.com/in/makarand-narwekar-772468294/',
    ],
  };
}

/**
 * Generate structured data for WebSite with search
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Official website of Makarand Narwekar, Mumbai Corporator dedicated to transforming communities through transparent governance and sustainable development.',
    publisher: {
      '@type': 'Person',
      name: 'Makarand Narwekar',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate structured data for BreadcrumbList
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate structured data for Article (press coverage, blog posts)
 */
export interface ArticleSchemaConfig {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}

export function generateArticleSchema(config: ArticleSchemaConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: config.headline,
    description: config.description,
    image: config.image.startsWith('http') ? config.image : `${SITE_URL}${config.image}`,
    datePublished: config.datePublished,
    dateModified: config.dateModified || config.datePublished,
    author: {
      '@type': 'Person',
      name: config.author || 'Makarand Narwekar',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': config.url.startsWith('http') ? config.url : `${SITE_URL}${config.url}`,
    },
  };
}

/**
 * Generate structured data for GovernmentOrganization (Local Government)
 */
export function generateLocalGovernmentSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: 'Office of Corporator Makarand Narwekar',
    description: 'Municipal Corporation of Greater Mumbai - A Ward',
    url: SITE_URL,
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
      name: 'A Ward - Colaba, Fort, Mumbai',
    },
    member: {
      '@type': 'Person',
      name: 'Makarand Narwekar',
      jobTitle: 'Elected Corporator',
    },
  };
}

/**
 * Generate structured data for Event
 */
export interface EventSchemaConfig {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address?: string;
  };
  image?: string;
  url?: string;
}

export function generateEventSchema(config: EventSchemaConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: config.name,
    description: config.description,
    startDate: config.startDate,
    endDate: config.endDate || config.startDate,
    location: {
      '@type': 'Place',
      name: config.location.name,
      address: config.location.address
        ? {
            '@type': 'PostalAddress',
            streetAddress: config.location.address,
            addressLocality: 'Mumbai',
            addressRegion: 'Maharashtra',
            addressCountry: 'IN',
          }
        : undefined,
    },
    image: config.image ? (config.image.startsWith('http') ? config.image : `${SITE_URL}${config.image}`) : undefined,
    organizer: {
      '@type': 'Person',
      name: 'Makarand Narwekar',
      url: SITE_URL,
    },
    ...(config.url && {
      url: config.url.startsWith('http') ? config.url : `${SITE_URL}${config.url}`,
    }),
  };
}

/**
 * Common keywords for different sections
 */
export const KEYWORDS = {
  base: [
    'Makarand Narwekar',
    'Mumbai Corporator',
    'BJP Mumbai',
    'Colaba',
    'A Ward Mumbai',
    'Fort Mumbai',
    'Mumbai Politics',
    'Bharatiya Janata Party',
    'Municipal Corporation Mumbai',
  ],
  development: [
    'Ward Development',
    'Infrastructure Development',
    'Sustainable Development',
    'Community Development',
    'Urban Planning Mumbai',
  ],
  governance: [
    'Transparent Governance',
    'Citizen Services',
    'Public Service',
    'Municipal Governance',
    'Local Government',
  ],
  youth: ['Youth Development', 'Youth Programs', 'Youth Empowerment', 'Student Initiatives', 'Youth Leadership'],
  projects: [
    'Road Development',
    'Street Lighting',
    'Sanitation Projects',
    'Water Supply',
    'Park Development',
    'School Renovation',
  ],
};

/**
 * Helper to combine keywords
 */
export function combineKeywords(...keywordSets: string[][]): string[] {
  return Array.from(new Set(keywordSets.flat()));
}
