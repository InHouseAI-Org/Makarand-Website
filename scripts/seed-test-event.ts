import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Adding test event for popup...');

  // Create a test event with a future date
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7); // 7 days from now

  const event = await prisma.event.create({
    data: {
      title: "Community Health Camp",
      description: "Free health checkup and consultation for all residents. Register now!",
      eventDate: futureDate,
      location: "Ward Community Center",
      buttonText: "Register Now",
      buttonLink: "/connect?mode=event",
      image: null,
      priority: 1,
      active: true,
    },
  });

  console.log('✅ Test event created:', event);
  console.log(`\nThe popup should now appear when you visit the homepage!`);
  console.log(`Event date: ${event.eventDate.toLocaleDateString()}`);
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
