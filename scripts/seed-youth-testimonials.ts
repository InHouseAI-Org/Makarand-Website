import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting youth testimonials seeding...');

  // Clear existing youth testimonials
  await prisma.youthTestimonial.deleteMany({});
  console.log('Cleared existing youth testimonials');

  // Youth testimonials data
  const youthTestimonials = [
    {
      name: "Aarav Sharma",
      age: 16,
      school: "St. Xavier's High School",
      content: "The coding workshop organized by Narwekar sir changed my perspective on technology. I learned Python and built my first app! Now I want to pursue computer science in college.",
      photoUrl: "https://randomuser.me/api/portraits/men/22.jpg",
      published: true,
    },
    {
      name: "Priya Mehta",
      age: 15,
      school: "Cathedral School",
      content: "I participated in the girls' leadership program and it boosted my confidence so much. I even spoke at our school assembly for the first time! Thank you for believing in us.",
      photoUrl: "https://randomuser.me/api/portraits/women/25.jpg",
      published: true,
    },
    {
      name: "Rahul Kapoor",
      age: 17,
      school: "Mumbai Public School",
      content: "The sports equipment donation to our school was amazing! We now have proper cricket gear and a football. Our team won the inter-school tournament last month!",
      photoUrl: "https://randomuser.me/api/portraits/men/35.jpg",
      published: true,
    },
    {
      name: "Ananya Desai",
      age: 14,
      school: "Colaba High School",
      content: "The art and music classes have been incredible. I discovered my talent for painting and even won a competition. These programs are making such a difference!",
      photoUrl: "https://randomuser.me/api/portraits/women/33.jpg",
      published: true,
    },
    {
      name: "Rohan Patel",
      age: 16,
      school: "Don Bosco School",
      content: "Thanks to the career guidance session, I now know what I want to do. The mentors helped me understand different career paths. This kind of support is exactly what we need.",
      photoUrl: "https://randomuser.me/api/portraits/men/40.jpg",
      published: true,
    },
    {
      name: "Sneha Rao",
      age: 15,
      school: "JB Petit School",
      content: "The girls' self-defense workshop was empowering! I feel so much more confident and safe. Every girl should get this training. Thank you for thinking about our safety.",
      photoUrl: "https://randomuser.me/api/portraits/women/42.jpg",
      published: true,
    },
  ];

  // Create all youth testimonials
  for (const testimonial of youthTestimonials) {
    const created = await prisma.youthTestimonial.create({
      data: testimonial,
    });
    console.log(`Created youth testimonial: ${created.name}`);
  }

  console.log(`\nSuccessfully seeded ${youthTestimonials.length} youth testimonials!`);
}

main()
  .catch((e) => {
    console.error('Error seeding youth testimonials:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
