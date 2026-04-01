import type { Metadata } from "next";
import { ProjectDetail } from "../../components/ProjectDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Project: ${id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} | Makarand Narwekar`,
    description: 'Detailed information about this infrastructure and development project in Mumbai\'s A Ward.',
    alternates: {
      canonical: `https://makarandnarwekar.com/project/${id}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  return <ProjectDetail params={params} />;
}
