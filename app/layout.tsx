import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Layout } from "./components/Layout";
import { PopupManagerWrapper } from "./components/PopupManagerWrapper";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { ErrorBoundaryHandler } from "./components/ErrorBoundaryHandler";
import {
  generateOrganizationSchema,
  generatePersonSchema,
  generateWebSiteSchema,
  generateLocalGovernmentSchema,
} from "@/lib/seo";

// Metadata for SEO optimization
export const metadata: Metadata = {
  metadataBase: new URL('https://makarandnarwekar.com'),
  title: {
    default: 'Makarand Narwekar | Mumbai Corporator | Transforming Communities',
    template: '%s | Makarand Narwekar'
  },
  description: 'Makarand Narwekar - Dynamic Mumbai Corporator and BJP leader transforming A Ward through visionary governance, infrastructure excellence, and unwavering commitment to citizen welfare. Your trusted representative for Colaba and Fort areas.',
  keywords: [
    'Makarand Narwekar',
    'Makarand Narwekar Mumbai',
    'Makarand Narwekar Corporator',
    'Makarand Narwekar BJP',
    'Mumbai Corporator Makarand Narwekar',
    'BJP Makarand Narwekar',
    'Corporator A Ward Mumbai',
    'Colaba Corporator',
    'Fort Mumbai Corporator',
    'Makarand Narwekar Projects',
    'Makarand Narwekar Achievements',
    'Mumbai Ward Development Makarand Narwekar',
    'Bharatiya Janata Party Mumbai Makarand Narwekar',
    'Makarand Narwekar Infrastructure',
    'Makarand Narwekar Youth Programs',
    'Makarand Narwekar Community Service',
    'Best Corporator Mumbai',
    'Mumbai Leader Makarand Narwekar',
    'Makarand Narwekar Vision',
    'Makarand Narwekar Contact'
  ],
  authors: [{ name: 'Makarand Narwekar' }],
  creator: 'Makarand Narwekar',
  publisher: 'Makarand Narwekar',
  other: {
    'developer': 'Griffin Marketing',
    'developer-contact': 'https://wa.me/919607048300',
    'organization': 'Makarand\'s Narwekar Corp',
    'service-type': 'Citizen Support and Assistance',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://makarandnarwekar.com',
    siteName: 'Makarand Narwekar - Official Website',
    title: 'Makarand Narwekar | Mumbai Corporator | Transforming A Ward with Vision & Action',
    description: 'Makarand Narwekar - Your dynamic Mumbai Corporator delivering results. From infrastructure projects to youth empowerment, experience leadership that transforms communities. BJP leader committed to excellence.',
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
    title: 'Makarand Narwekar | Mumbai Corporator & Community Leader',
    description: 'Makarand Narwekar - Transforming A Ward through visionary leadership. Infrastructure, youth programs, community service. Your trusted representative.',
    creator: '@MNarwekar',
    images: ['/twitter-image.jpg'],
  },
  robots: {
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
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
  alternates: {
    canonical: 'https://makarandnarwekar.com',
  },
  category: 'politics',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FF6B6B',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate structured data schemas
  const organizationSchema = generateOrganizationSchema();
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebSiteSchema();
  const localGovSchema = generateLocalGovernmentSchema();

  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        {/* Additional meta tags */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* Structured Data - Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* Structured Data - Local Government */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localGovSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased overflow-x-hidden">
        <ErrorBoundaryHandler />
        <Suspense fallback={null}>
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
        </Suspense>
        <Layout>{children}</Layout>
        <PopupManagerWrapper />
      </body>
    </html>
  );
}
