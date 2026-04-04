import type { Metadata } from "next";
import { MediaSection } from "../components/MediaSection";

export const metadata: Metadata = {
  title: 'Media Coverage | News, Videos & Social Media',
  description: 'Latest media coverage, news articles, videos, social media updates, and press releases about Makarand Narwekar\'s work and community initiatives.',
  keywords: ['Media Coverage', 'News', 'Videos', 'Social Media', 'Press Releases', 'Updates'],
  openGraph: {
    title: 'Media Coverage | Makarand Narwekar',
    description: 'Latest news, videos, and updates from the community.',
    url: 'https://makarandnarwekar.com/media',
  },
  alternates: {
    canonical: 'https://makarandnarwekar.com/media',
  },
};

export default function MediaPage() {
  return <MediaSection />;
}
