import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { YouthClient } from "../components/YouthClient";
import { generateSEO, KEYWORDS, combineKeywords } from "@/lib/seo";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = generateSEO({
  title: 'Makarand Narwekar\'s Youth Programs | Empowering the Next Generation',
  description: 'Experience Makarand Narwekar\'s revolutionary youth empowerment initiatives transforming young lives across Mumbai. From educational scholarships to skill training, sports excellence to career mentorship - discover how Makarand Narwekar is investing in tomorrow\'s leaders today. Join thousands of youth who have benefited from his vision and commitment.',
  keywords: combineKeywords(
    KEYWORDS.base,
    KEYWORDS.youth,
    [
      'Makarand Narwekar Youth Programs',
      'Youth Empowerment Makarand Narwekar',
      'Makarand Narwekar Education',
      'Career Guidance Mumbai',
      'Makarand Narwekar Mentorship',
      'Youth Leadership Programs',
      'Student Development Mumbai',
      'Makarand Narwekar Youth Initiative'
    ]
  ),
  canonical: '/youth',
  ogImage: '/api/og?title=Makarand Narwekar Youth Programs&description=Empowering Tomorrow\'s Leaders Today&type=youth',
});

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
