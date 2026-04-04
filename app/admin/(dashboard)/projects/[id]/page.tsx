import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/app/admin/components/ProjectForm";
import { notFound } from "next/navigation";



export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  // Format dates for the form
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  // Prepare initial data for the form
  const initialData = {
    id: project.id,
    title: project.title,
    description: project.description,
    category: project.category,
    status: project.status,
    progress: project.progress || undefined,
    budget: project.budget || '',
    location: project.location || '',
    startDate: formatDate(project.startDate),
    endDate: formatDate(project.endDate),
    image: project.image || '',
    images: project.images,
    highlights: project.highlights,
    impact: project.impact || '',
    published: project.published,
  };

  return <ProjectForm initialData={initialData} isEdit={true} />;
}
