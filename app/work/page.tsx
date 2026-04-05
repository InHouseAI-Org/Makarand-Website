import type { Metadata } from "next";
import { WorkImpact } from "../components/WorkImpact";
import { prisma } from "@/lib/prisma";
import { generateSEO, KEYWORDS, combineKeywords } from "@/lib/seo";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = generateSEO({
  title: 'Makarand Narwekar\'s Work & Impact | Award-Winning Projects & Achievements',
  description: 'Witness the transformative impact of Makarand Narwekar\'s leadership in A Ward. Award-winning infrastructure projects, groundbreaking community initiatives, innovative social welfare programs, and measurable results that are changing lives. Explore how Makarand Narwekar\'s dedication and vision are creating a model ward for all of Mumbai.',
  keywords: combineKeywords(
    KEYWORDS.base,
    KEYWORDS.projects,
    KEYWORDS.development,
    [
      'Makarand Narwekar Projects',
      'Makarand Narwekar Achievements',
      'Makarand Narwekar Work',
      'Makarand Narwekar Impact',
      'Projects by Makarand Narwekar',
      'Community Work Makarand Narwekar',
      'A Ward Development',
      'Mumbai Corporator Work'
    ]
  ),
  canonical: '/work',
  ogImage: '/api/og?title=Makarand Narwekar\'s Impact&description=Transforming Communities Through Dedicated Leadership&type=project',
});

export default async function WorkPage() {
  // Fetch projects from database
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return <WorkImpact projects={projects} />;
}
