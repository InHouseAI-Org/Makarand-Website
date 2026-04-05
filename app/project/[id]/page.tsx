import type { Metadata } from "next";
import { ProjectDetail } from "../../components/ProjectDetail";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { generateSEO, KEYWORDS, combineKeywords, generateArticleSchema } from "@/lib/seo";

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  // Try to fetch project from database
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    const title = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return {
      title: `Project: ${title} | Makarand Narwekar`,
      description: 'Detailed information about this infrastructure and development project in Mumbai\'s A Ward.',
      alternates: {
        canonical: `https://makarandnarwekar.com/project/${id}`,
      },
    };
  }

  const ogImageUrl = `/api/og?title=${encodeURIComponent(project.title)}&description=${encodeURIComponent(project.description.substring(0, 100))}&type=project`;

  return generateSEO({
    title: `${project.title} by Makarand Narwekar | ${project.status === 'completed' ? 'Completed' : 'Ongoing'} Project`,
    description: `${project.description.substring(0, 120)} - ${project.status === 'completed' ? 'Successfully completed' : 'Ongoing transformative'} project in Mumbai's A Ward. Led by Corporator Makarand Narwekar, this initiative demonstrates his commitment to excellence and community development.`,
    keywords: combineKeywords(
      KEYWORDS.base,
      KEYWORDS.projects,
      KEYWORDS.development,
      [
        project.title,
        `Makarand Narwekar ${project.category}`,
        `${project.title} Makarand Narwekar`,
        project.status,
        'Mumbai Development Makarand Narwekar'
      ]
    ),
    canonical: `/project/${id}`,
    ogImage: ogImageUrl,
    ogType: 'article',
    publishedTime: project.createdAt.toISOString(),
    modifiedTime: project.updatedAt.toISOString(),
    authors: ['Makarand Narwekar'],
  });
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

  // Generate Article schema for the project
  const articleSchema = generateArticleSchema({
    headline: project.title,
    description: project.description,
    image: project.thumbnail || '/og-image.jpg',
    datePublished: project.createdAt.toISOString(),
    dateModified: project.updatedAt.toISOString(),
    url: `/project/${id}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ProjectDetail project={project} />
    </>
  );
}
