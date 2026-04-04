import { prisma } from "@/lib/prisma";
import { TestimonialsPreviewClient } from "./TestimonialsPreviewClient";

export async function TestimonialsPreview() {
  // Fetch all published testimonials from database
  const dbTestimonials = await prisma.testimonial.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Separate text and video testimonials
  const textTestimonials = dbTestimonials.filter(t => t.type === 'text');
  const videoTestimonials = dbTestimonials.filter(t => t.type === 'video');

  // Transform text testimonials for client component
  const testimonials = textTestimonials.map(t => ({
    name: t.name,
    role: t.role || '',
    quote: t.content || '',
    image: t.photo || t.photoUrl || 'https://randomuser.me/api/portraits/lego/1.jpg',
    rating: t.rating,
  }));

  // Get all video testimonials
  const videoTestimonialsData = videoTestimonials.map(t => ({
    name: t.name,
    role: t.role || '',
    videoUrl: t.video || t.videoUrl || '',
    image: t.photo || t.photoUrl || 'https://randomuser.me/api/portraits/lego/1.jpg',
    rating: t.rating,
  }));

  return <TestimonialsPreviewClient testimonials={testimonials} videoTestimonials={videoTestimonialsData} />;
}
