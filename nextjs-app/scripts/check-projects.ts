import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function checkProjects() {
  try {
    // Get all projects
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        image: true,
        images: true,
      }
    });

    console.log(`\nTotal projects: ${projects.length}\n`);

    let projectsWithoutImages = 0;
    let projectsWithSingleImage = 0;
    let projectsWithMultipleImages = 0;

    projects.forEach((project) => {
      const hasImage = project.image && project.image.trim() !== '';
      const hasImages = project.images && project.images.length > 0;

      if (!hasImage && !hasImages) {
        projectsWithoutImages++;
        console.log(`❌ No images: ${project.title}`);
      } else if (hasImage && !hasImages) {
        projectsWithSingleImage++;
        console.log(`📷 Single image only: ${project.title}`);
        console.log(`   Image: ${project.image}`);
      } else if (hasImages) {
        projectsWithMultipleImages++;
        console.log(`✅ Has images array: ${project.title}`);
        console.log(`   Image: ${project.image || 'none'}`);
        console.log(`   Images: ${project.images.join(', ')}`);
      }
    });

    console.log(`\n=== Summary ===`);
    console.log(`Projects without any images: ${projectsWithoutImages}`);
    console.log(`Projects with single image only: ${projectsWithSingleImage}`);
    console.log(`Projects with images array: ${projectsWithMultipleImages}`);

  } catch (error) {
    console.error('Error checking projects:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkProjects();
