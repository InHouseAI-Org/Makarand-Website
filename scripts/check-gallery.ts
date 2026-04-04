import { prisma } from '../lib/prisma';

async function checkGallery() {
  try {
    console.log('Checking gallery images in database...\n');

    const images = await prisma.galleryImage.findMany({
      orderBy: { displayOrder: 'asc' }
    });

    console.log(`Total gallery images: ${images.length}\n`);

    if (images.length > 0) {
      console.log('Gallery Images:');
      images.forEach((img, index) => {
        console.log(`\n${index + 1}. ${img.altText}`);
        console.log(`   ID: ${img.id}`);
        console.log(`   Image URL: ${img.imageUrl}`);
        console.log(`   Published: ${img.isPublished}`);
        console.log(`   Display Order: ${img.displayOrder}`);
        console.log(`   Category: ${img.category}`);
        if (img.caption) {
          console.log(`   Caption: ${img.caption}`);
        }
      });
    } else {
      console.log('No gallery images found in database.');
    }

    console.log('\n\nPublished images only:');
    const publishedImages = images.filter(img => img.isPublished);
    console.log(`Published count: ${publishedImages.length}`);

  } catch (error) {
    console.error('Error checking gallery:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkGallery();
