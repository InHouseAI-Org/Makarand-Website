import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "@/app/admin/components/TestimonialForm";
import { notFound } from "next/navigation";



export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const testimonial = await prisma.testimonial.findUnique({
    where: { id },
  });

  if (!testimonial) {
    notFound();
  }

  const initialData = {
    id: testimonial.id,
    type: testimonial.type as 'text' | 'video',
    name: testimonial.name,
    role: testimonial.role || '',
    content: testimonial.content || '',
    videoUrl: testimonial.videoUrl || '',
    photo: testimonial.photo || '',
    rating: testimonial.rating,
    published: testimonial.published,
  };

  return <TestimonialForm initialData={initialData} isEdit={true} />;
}
