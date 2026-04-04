import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting testimonials seeding...');

  // Clear existing testimonials
  await prisma.testimonial.deleteMany({});
  console.log('Cleared existing testimonials');

  // Hardcoded testimonials from the frontend
  const testimonials = [
    {
      type: 'text',
      name: "Sunita Sharma",
      role: "Resident, Colaba",
      content: "The road outside our society was in terrible condition for years. Within months of approaching Narwekar ji's office, the entire stretch was reconstructed. He truly delivers on his promises.",
      photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      published: true,
    },
    {
      type: 'text',
      name: "Rajesh Patil",
      role: "Community Leader",
      content: "I've seen many corporators come and go, but Makarand ji stands out for his hands-on approach. He visits project sites personally and ensures quality work. That's rare in today's politics.",
      photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      published: true,
    },
    {
      type: 'text',
      name: "Dr. Priya Kulkarni",
      role: "School Principal",
      content: "The digital classroom initiative has transformed our school. Students now have access to modern learning tools. His commitment to education is truly commendable.",
      photoUrl: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5,
      published: true,
    },
    {
      type: 'text',
      name: "Mohan Deshmukh",
      role: "Senior Citizen",
      content: "The new park near our area has become a lifeline for senior citizens. Morning walks, yoga sessions — it's a wonderful space. Thank you for thinking about us.",
      photoUrl: "https://randomuser.me/api/portraits/men/71.jpg",
      rating: 5,
      published: true,
    },
    {
      type: 'text',
      name: "Adv. Suresh Mane",
      role: "Social Worker, Colaba",
      content: "A corporator who puts development above politics. His ward office is always accessible, and grievances are resolved swiftly.",
      photoUrl: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 5,
      published: true,
    },
    {
      type: 'text',
      name: "Mrs. Anjali Bhosale",
      role: "Women's SHG President",
      content: "He has championed women's empowerment programs that have genuinely impacted livelihoods in our community.",
      photoUrl: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      published: true,
    },
    {
      type: 'video',
      name: "Vikas Desai",
      role: "Youth Leader, Colaba",
      content: undefined,
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      photoUrl: "https://randomuser.me/api/portraits/men/15.jpg",
      rating: 5,
      published: true,
    },
    {
      type: 'video',
      name: "Meera Joshi",
      role: "Local Business Owner",
      content: undefined,
      videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      photoUrl: "https://randomuser.me/api/portraits/women/30.jpg",
      rating: 5,
      published: true,
    },
    {
      type: 'video',
      name: "Rahul Kapoor",
      role: "Education Activist",
      content: undefined,
      videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      photoUrl: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5,
      published: true,
    },
    {
      type: 'video',
      name: "Asha Reddy",
      role: "Healthcare Worker",
      content: undefined,
      videoUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
      photoUrl: "https://randomuser.me/api/portraits/women/50.jpg",
      rating: 5,
      published: true,
    },
  ];

  // Create all testimonials
  for (const testimonial of testimonials) {
    const created = await prisma.testimonial.create({
      data: testimonial,
    });
    console.log(`Created ${testimonial.type} testimonial: ${created.name}`);
  }

  console.log(`\nSuccessfully seeded ${testimonials.length} testimonials!`);
}

main()
  .catch((e) => {
    console.error('Error seeding testimonials:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
