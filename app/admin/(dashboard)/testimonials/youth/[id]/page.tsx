import { auth } from "@/auth";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { YouthTestimonialForm } from "@/app/admin/components/YouthTestimonialForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditYouthTestimonialPage({ params }: PageProps) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const youthTestimonial = await prisma.youthTestimonial.findUnique({
    where: { id },
  });

  if (!youthTestimonial) {
    notFound();
  }

  return (
    <YouthTestimonialForm
      initialData={{
        id: youthTestimonial.id,
        name: youthTestimonial.name,
        age: youthTestimonial.age || undefined,
        school: youthTestimonial.school || undefined,
        content: youthTestimonial.content,
        photo: youthTestimonial.photo || undefined,
        photoUrl: youthTestimonial.photoUrl || undefined,
        published: youthTestimonial.published,
      }}
      isEdit
    />
  );
}
