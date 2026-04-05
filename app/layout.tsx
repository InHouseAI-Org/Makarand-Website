import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Layout } from "./components/Layout";
import { PopupManagerWrapper } from "./components/PopupManagerWrapper";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { ErrorBoundaryHandler } from "./components/ErrorBoundaryHandler";

// Metadata for SEO optimization
export const metadata: Metadata = {
  metadataBase: new URL('https://makarandnarwekar.com'),
  title: {
    default: 'Makarand Narwekar | Mumbai Corporator | Transforming Communities',
    template: '%s | Makarand Narwekar'
  },
  description: 'Makarand Narwekar - Mumbai Corporator dedicated to transforming our ward through transparent governance, sustainable development, and citizen-first service. Member of Bharatiya Janata Party (BJP).',
  keywords: [
    'Makarand Narwekar',
    'Mumbai Corporator',
    'BJP Mumbai',
    'Colaba',
    'A Ward Mumbai',
    'Ward Development',
    'Mumbai Politics',
    'Community Service',
    'Transparent Governance',
    'Sustainable Development',
    'Bharatiya Janata Party',
    'Municipal Corporation Mumbai',
    'Fort Mumbai',
    'Youth Development',
    'Infrastructure Development'
  ],
  authors: [{ name: 'Makarand Narwekar' }],
  creator: 'Makarand Narwekar',
  publisher: 'Makarand Narwekar',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://makarandnarwekar.com',
    siteName: 'Makarand Narwekar',
    title: 'Makarand Narwekar | Mumbai Corporator | Transforming Communities',
    description: 'Dedicated to transforming our ward through transparent governance, sustainable development, and citizen-first service.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Makarand Narwekar - Mumbai Corporator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Makarand Narwekar | Mumbai Corporator',
    description: 'Dedicated to transforming our ward through transparent governance and citizen-first service.',
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
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        {/* Additional meta tags */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
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
