import { prisma } from '../lib/prisma';

async function testEventDeactivation() {
  console.log('🧪 Testing Event Deactivation...\n');

  // 1. Create a test event in the past
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 2); // 2 days ago

  console.log('📝 Creating a past event...');
  const pastEvent = await prisma.event.create({
    data: {
      title: 'Test Past Event',
      description: 'This event should be automatically deactivated',
      eventDate: pastDate,
      active: true,
      priority: 1,
    },
  });
  console.log(`✅ Created event: ${pastEvent.title} (ID: ${pastEvent.id})`);
  console.log(`   Date: ${pastEvent.eventDate}`);
  console.log(`   Active: ${pastEvent.active}\n`);

  // 2. Create a test event in the future
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7); // 7 days from now

  console.log('📝 Creating a future event...');
  const futureEvent = await prisma.event.create({
    data: {
      title: 'Test Future Event',
      description: 'This event should remain active',
      eventDate: futureDate,
      active: true,
      priority: 1,
    },
  });
  console.log(`✅ Created event: ${futureEvent.title} (ID: ${futureEvent.id})`);
  console.log(`   Date: ${futureEvent.eventDate}`);
  console.log(`   Active: ${futureEvent.active}\n`);

  // 3. Run the deactivation logic
  console.log('⚡ Running deactivation logic...');
  const now = new Date();
  const result = await prisma.event.updateMany({
    where: {
      active: true,
      eventDate: {
        lt: now,
      },
    },
    data: {
      active: false,
    },
  });
  console.log(`✅ Deactivated ${result.count} event(s)\n`);

  // 4. Check the results
  console.log('🔍 Checking results...');
  const pastEventAfter = await prisma.event.findUnique({
    where: { id: pastEvent.id },
  });
  const futureEventAfter = await prisma.event.findUnique({
    where: { id: futureEvent.id },
  });

  console.log(`Past event (${pastEventAfter?.title}):`);
  console.log(`   Active: ${pastEventAfter?.active} ${pastEventAfter?.active === false ? '✅ (correctly deactivated)' : '❌ (should be inactive)'}`);

  console.log(`\nFuture event (${futureEventAfter?.title}):`);
  console.log(`   Active: ${futureEventAfter?.active} ${futureEventAfter?.active === true ? '✅ (correctly active)' : '❌ (should be active)'}`);

  // 5. Cleanup
  console.log('\n🧹 Cleaning up test events...');
  await prisma.event.delete({ where: { id: pastEvent.id } });
  await prisma.event.delete({ where: { id: futureEvent.id } });
  console.log('✅ Test events deleted\n');

  console.log('✨ Test completed successfully!\n');

  await prisma.$disconnect();
}

testEventDeactivation().catch((error) => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});
