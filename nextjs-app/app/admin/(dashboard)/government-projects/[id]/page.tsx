import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { GovernmentProjectForm } from "@/app/admin/components/GovernmentProjectForm";
import { notFound } from "next/navigation";



export default async function EditGovernmentProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const governmentProject = await prisma.governmentProject.findUnique({
    where: { id },
  });

  if (!governmentProject) {
    notFound();
  }

  // Format dates for the form
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  // Prepare initial data for the form
  const initialData = {
    id: governmentProject.id,
    title: governmentProject.title,
    description: governmentProject.description,
    department: governmentProject.department,
    status: governmentProject.status,
    budget: governmentProject.budget || '',
    location: governmentProject.location || '',
    startDate: formatDate(governmentProject.startDate),
    completionDate: formatDate(governmentProject.completionDate),
    beneficiaries: governmentProject.beneficiaries || '',
    image: governmentProject.image || '',
    images: governmentProject.images.join(', '),
    documents: governmentProject.documents.join(', '),
    published: governmentProject.published,
  };

  return <GovernmentProjectForm initialData={initialData} isEdit={true} />;
}
