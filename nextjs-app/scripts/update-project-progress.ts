import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🔄 Updating project progress values...\n');

  // Update ongoing projects with their progress
  const updates = [
    { title: "Water Pipeline Replacement", progress: 72 },
    { title: "Sanitation Infrastructure Upgrade", progress: 45 },
    { title: "Community Center Construction", progress: 30 },
  ];

  for (const update of updates) {
    const result = await prisma.project.updateMany({
      where: {
        title: update.title,
        status: "ongoing"
      },
      data: { progress: update.progress },
    });

    if (result.count > 0) {
      console.log(`✅ Updated "${update.title}" - Progress: ${update.progress}%`);
    } else {
      console.log(`⚠️  Project "${update.title}" not found`);
    }
  }

  console.log('\n✨ Progress values updated successfully!\n');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error('❌ Error updating progress:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
