const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkImages() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        image: true,
        images: true,
        category: true,
        status: true
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    console.log('=== DATABASE CHECK: Projects Table ===');
    console.log('Total published projects found:', projects.length);
    console.log('');

    projects.forEach((project, index) => {
      console.log(`Project ${index + 1}:`);
      console.log('  ID:', project.id);
      console.log('  Title:', project.title);
      console.log('  Category:', project.category);
      console.log('  Status:', project.status);
      console.log('  Main Image (image field):', project.image || 'NULL/EMPTY');
      console.log('  Has Main Image?:', !!project.image ? 'YES' : 'NO');
      console.log('  Additional Images (images array):', project.images?.length || 0, 'images');
      if (project.images && project.images.length > 0) {
        project.images.forEach((img, i) => {
          console.log(`    Image ${i + 1}:`, img.substring(0, 60) + '...');
        });
      }
      console.log('');
    });

    const projectsWithImages = projects.filter(p => p.image);
    console.log(`Summary: ${projectsWithImages.length} out of ${projects.length} projects have main images`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkImages();
