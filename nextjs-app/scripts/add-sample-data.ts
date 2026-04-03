import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Adding sample data...\n');

  // Add sample projects
  console.log('Adding Projects...');
  const project1 = await prisma.project.create({
    data: {
      title: 'Road Infrastructure Development',
      description: 'Comprehensive road development project covering major arterial roads in the constituency. This includes road widening, new footpaths, and street lighting.',
      category: 'Infrastructure',
      status: 'ongoing',
      budget: '₹5 Crore',
      location: 'Ward 183, Ghatkopar East',
      startDate: new Date('2024-01-15'),
      highlights: [
        'Road widening from 20ft to 40ft',
        'Installation of LED street lights',
        'New pedestrian footpaths',
        'Underground drainage system'
      ],
      impact: 'Benefits over 50,000 residents daily',
      published: true,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      title: 'Community Health Center',
      description: 'New primary health center with modern facilities including diagnostic lab, pharmacy, and emergency services.',
      category: 'Healthcare',
      status: 'completed',
      budget: '₹3 Crore',
      location: 'Ghatkopar West',
      startDate: new Date('2023-06-01'),
      endDate: new Date('2024-12-31'),
      highlights: [
        'State-of-the-art diagnostic equipment',
        '24/7 emergency services',
        'Free medicines for senior citizens',
        'Regular health camps'
      ],
      impact: 'Serving 30,000+ patients annually',
      published: true,
    },
  });

  console.log(`✅ Created ${2} projects\n`);

  // Add sample government projects
  console.log('Adding Government Projects...');
  const govProject1 = await prisma.governmentProject.create({
    data: {
      title: 'Smart City Initiative',
      description: 'Implementation of smart city features including intelligent traffic management, waste management systems, and public WiFi infrastructure.',
      department: 'Municipal Corporation',
      status: 'ongoing',
      budget: '₹15 Crore',
      location: 'Ghatkopar Division',
      startDate: new Date('2024-04-01'),
      beneficiaries: '200,000+ residents',
      published: true,
    },
  });

  const govProject2 = await prisma.governmentProject.create({
    data: {
      title: 'Water Supply Enhancement',
      description: 'Major water pipeline replacement and new water storage facilities to ensure 24/7 water supply to all households.',
      department: 'BMC Water Department',
      status: 'completed',
      budget: '₹8 Crore',
      location: 'Multiple wards',
      startDate: new Date('2023-01-01'),
      completionDate: new Date('2024-03-31'),
      beneficiaries: '150,000 households',
      published: true,
    },
  });

  console.log(`✅ Created ${2} government projects\n`);

  // Add sample ward officers
  console.log('Adding Ward Officers...');
  const officer1 = await prisma.wardOfficer.create({
    data: {
      name: 'Mr. Rajesh Kumar',
      designation: 'Ward Officer',
      department: 'BMC Ward N',
      phone: '+91 22 2501 XXXX',
      email: 'wardN@mcgm.gov.in',
      office: 'Ward Office, Ghatkopar',
      timing: 'Mon-Fri: 10:00 AM - 6:00 PM',
      priority: 1,
      active: true,
    },
  });

  const officer2 = await prisma.wardOfficer.create({
    data: {
      name: 'Mrs. Priya Sharma',
      designation: 'Assistant Engineer',
      department: 'Roads & Traffic',
      phone: '+91 22 2502 XXXX',
      email: 'roads.n@mcgm.gov.in',
      office: 'BMC Building, Ghatkopar',
      timing: 'Mon-Sat: 9:00 AM - 5:00 PM',
      priority: 2,
      active: true,
    },
  });

  const officer3 = await prisma.wardOfficer.create({
    data: {
      name: 'Dr. Amit Patel',
      designation: 'Health Officer',
      department: 'Public Health',
      phone: '+91 22 2503 XXXX',
      email: 'health.n@mcgm.gov.in',
      office: 'Health Center, Ghatkopar',
      timing: 'Mon-Sat: 8:00 AM - 4:00 PM',
      priority: 3,
      active: true,
    },
  });

  console.log(`✅ Created ${3} ward officers\n`);

  console.log('✨ Sample data added successfully!\n');
  console.log('📊 Summary:');
  console.log(`   - Projects: ${2}`);
  console.log(`   - Government Projects: ${2}`);
  console.log(`   - Ward Officers: ${3}`);
  console.log('\n🎉 You can now view this data in the admin panel!\n');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error('❌ Error adding sample data:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
