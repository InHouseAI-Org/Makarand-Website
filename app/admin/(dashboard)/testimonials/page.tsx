import { auth } from "@/auth";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TestimonialsClient } from "./TestimonialsClient";

export default async function TestimonialsPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const youthTestimonials = await prisma.youthTestimonial.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return <TestimonialsClient testimonials={testimonials} youthTestimonials={youthTestimonials} />;
}
