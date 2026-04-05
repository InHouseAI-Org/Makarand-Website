import type { Metadata } from "next";
import { GovernmentProjects } from "../components/GovernmentProjects";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Government Projects | Public Infrastructure & Schemes',
  description: 'Details of government projects, public infrastructure development, welfare schemes, and municipal initiatives undertaken in Mumbai\'s A Ward under Makarand Narwekar\'s leadership.',
  keywords: ['Government Projects', 'Public Infrastructure', 'Welfare Schemes', 'Municipal Projects', 'Development Initiatives'],
  openGraph: {
    title: 'Government Projects | Makarand Narwekar',
    description: 'Public infrastructure development and welfare schemes in A Ward.',
    url: 'https://makarandnarwekar.com/government-projects',
  },
  alternates: {
    canonical: 'https://makarandnarwekar.com/government-projects',
  },
};

export default async function GovernmentProjectsPage() {
  // Fetch government projects from database
  const projects = await prisma.governmentProject.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return <GovernmentProjects projects={projects} />;
}
