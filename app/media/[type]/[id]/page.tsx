import type { Metadata } from "next";
import { MediaDetail } from "../../../components/MediaDetail";

// Force dynamic rendering to fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = {
  params: Promise<{ type: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, id } = await params;

  return {
    title: `${type === 'press' ? 'Press Coverage' : 'Video'}: ${id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} | Makarand Narwekar`,
    description: `Media coverage and updates from Makarand Narwekar's office about community initiatives and development projects.`,
    alternates: {
      canonical: `https://makarandnarwekar.com/media/${type}/${id}`,
    },
  };
}

export default async function MediaDetailPage({ params }: Props) {
  return <MediaDetail params={params} />;
}
