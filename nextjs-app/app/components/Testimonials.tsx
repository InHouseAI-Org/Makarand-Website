import { prisma } from "@/lib/prisma";
import { TestimonialsClient } from "./TestimonialsClient";

export async function Testimonials() {
  // Fetch testimonials from database
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

  // Transform testimonials for client component
  const testimonials = textTestimonials.map(t => ({
    name: t.name,
    role: t.role || '',
    quote: t.content || '',
    image: t.photo || t.photoUrl || 'https://randomuser.me/api/portraits/lego/1.jpg',
    rating: t.rating,
  }));

  const videoTestimonial = videoTestimonials.length > 0 ? {
    name: videoTestimonials[0].name,
    role: videoTestimonials[0].role || '',
    videoUrl: videoTestimonials[0].video || videoTestimonials[0].videoUrl || '',
    image: videoTestimonials[0].photo || videoTestimonials[0].photoUrl || 'https://randomuser.me/api/portraits/lego/1.jpg',
    rating: videoTestimonials[0].rating,
  } : null;
  return (
    <TestimonialsClient
      testimonials={testimonials}
      videoTestimonial={videoTestimonial}
    />
  );
}
