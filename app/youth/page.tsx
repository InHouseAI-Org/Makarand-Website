import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { YouthClient } from "../components/YouthClient";

export const metadata: Metadata = {
  title: 'Youth Programs | Empowering Tomorrow\'s Leaders',
  description: 'Youth development programs, educational initiatives, skill training, sports activities, and opportunities for young people in Mumbai. Empowering the next generation of leaders.',
  keywords: ['Youth Programs', 'Youth Development', 'Education', 'Skill Training', 'Sports', 'Youth Empowerment'],
  openGraph: {
    title: 'Youth Programs | Makarand Narwekar',
    description: 'Empowering tomorrow\'s leaders through education, skill training, and sports.',
    url: 'https://makarandnarwekar.com/youth',
  },
  alternates: {
    canonical: 'https://makarandnarwekar.com/youth',
  },
};

export default async function YouthPage() {
  // Fetch youth testimonials from database
  const dbTestimonials = await prisma.youthTestimonial.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  const testimonials = dbTestimonials.map(t => ({
    name: t.name,
    age: t.age || undefined,
    school: t.school || undefined,
    content: t.content,
    photo: t.photo || undefined,
    photoUrl: t.photoUrl || undefined,
  }));

  return <YouthClient testimonials={testimonials} />;
}
