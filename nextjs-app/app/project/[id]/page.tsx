import type { Metadata } from "next";
import { ProjectDetail } from "../../components/ProjectDetail";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  // Try to fetch project from database
  const project = await prisma.project.findUnique({
    where: { id },
  });

  const title = project ? project.title : id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: `Project: ${title} | Makarand Narwekar`,
    description: project?.description || 'Detailed information about this infrastructure and development project in Mumbai\'s A Ward.',
    alternates: {
      canonical: `https://makarandnarwekar.com/project/${id}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;

  // Fetch project from database
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
