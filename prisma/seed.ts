import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const wardOfficers = [
  {
    name: "Mr. Jaydeep More",
    designation: "Assistant Commissioner 'A'",
    department: "General Administration",
    phone: "9769666505",
    priority: 1,
  },
  {
    name: "Mr. Mahesh Patil",
    designation: "Complaint Officer",
    department: "Civic complaints of general nature",
    phone: "9029007188",
    priority: 2,
  },
  {
    name: "Mr. Prafula Yadav",
    designation: "Medical Officer Health",
    department: "Health license, grievances, unlicensed traders",
    phone: "9821890590",
    priority: 3,
  },
  {
    name: "Mr. Arun Vaidya",
    designation: "A.E Solid Waste Management",
    department: "Garbage, Sewage, Drainage, Sanitation, Storm water drain",
    phone: "9820739100",
    priority: 4,
  },
  {
    name: "Mr. Rahul Jadhav",
    designation: "A.E Building & Factory",
    department: "Temporary pandal, Illegal construction, Building repairs",
    phone: "9930025277",
    priority: 5,
  },
  {
    name: "Mr. Ravi Mhaske",
    designation: "A.E Maintenance",
    department: "Road repair, Potholes, Footpath, Hawkers, Zebra crossings",
    phone: "9004688678",
    priority: 6,
  },
  {
    name: "Ms. Neeta Arote",
    designation: "A.E Water Works",
    department: "Water supply, Contamination, Leakages, New connections",
    phone: "8655358122",
    priority: 7,
  },
  {
    name: "Mr. Nilay Pawar",
    designation: "Sr. Inspector (License)",
    department: "Hawker nuisance",
    phone: "9819074701",
    priority: 8,
  },
  {
    name: "Mr. Parikshit Patil",
    designation: "Sr. Inspector (Encroachment)",
    department: "Road blocking, Hawkers, Encroachment",
    phone: "8369512377",
    priority: 9,
  },
  {
    name: "Mr. Tushar Wagh",
    designation: "Pest Control Officer",
    department: "Mosquitoes, Pests, Rats, Fogging schedule",
    phone: "9096375894",
    priority: 10,
  },
  {
    name: "Mr. Sudarshan Aaware",
    designation: "Horticulture Assistant",
    department: "Tree trimming, Unauthorized cutting, Garden maintenance",
    phone: "9763230130",
    priority: 11,
  },
  {
    name: "Mr. Kanojiya",
    designation: "Executive Engineer",
    department: "Engineering matters",
    phone: "9975673419",
    priority: 12,
  },
  {
    name: "Dr. K.A. Pathan",
    designation: "Swan Niyantran Adhikari",
    department: "Stray dogs/animal nuisance",
    phone: "022 25563284",
    priority: 13,
  },
  {
    name: "Ms. Reena Varake",
    designation: "A.O (Schools)",
    department: "Municipal Schools",
    phone: "9823517255",
    priority: 14,
  },
  {
    name: "Mr. Abhijeet Dhotre",
    designation: "A.E Electrical",
    department: "Electricity breakdown, Street lights",
    phone: "9923203333",
    priority: 15,
  },
];

const policeStations = [
  {
    stationName: "MRA Marg Police Station",
    name: "Shri. Yogesh Sable",
    designation: "Sr. Police Inspector",
    phone: "8976947179",
    priority: 1,
  },
  {
    stationName: "Azad Maidan",
    name: "Shri. Shrikant Adate",
    designation: "Sr. Police Inspector",
    phone: "8976947178",
    priority: 2,
  },
  {
    stationName: "Marine Drive",
    name: "Shri. Nilesh Bagul",
    designation: "Sr. Police Inspector",
    phone: "8976947165",
    priority: 3,
  },
  {
    stationName: "Colaba",
    name: "Shri. Sudhakar Deshmukh",
    designation: "Sr. Police Inspector",
    phone: "8976947163",
    priority: 4,
  },
  {
    stationName: "Cuffe Parade",
    name: "Shri. Satish Gaikwad",
    designation: "Sr. Police Inspector",
    phone: "7768933007",
    priority: 5,
  },
];

const fireStations = [
  {
    stationName: "Colaba Fire Station",
    phone: "022 2204 3603",
    priority: 1,
  },
  {
    stationName: "Nariman Point Fire Station",
    phone: "022 2288 2787",
    priority: 2,
  },
  {
    stationName: "Fort Fire Station",
    phone: "022 2261 1942",
    priority: 3,
  },
];

const socialMediaPosts = [
  {
    platform: "youtube",
    postUrl: "https://www.youtube.com/watch?v=3YjdF4cmab0",
    extractedId: "3YjdF4cmab0",
    embedType: "video",
    title: "Latest Update",
    displayOrder: 0,
    isPublished: true,
  },
  {
    platform: "youtube",
    postUrl: "https://www.youtube.com/watch?v=JJ6eIGMQvgk",
    extractedId: "JJ6eIGMQvgk",
    embedType: "video",
    title: "Community Event",
    displayOrder: 1,
    isPublished: true,
  },
  {
    platform: "youtube",
    postUrl: "https://www.youtube.com/watch?v=9aG0Wf8BB28",
    extractedId: "9aG0Wf8BB28",
    embedType: "video",
    title: "Ward Development",
    displayOrder: 2,
    isPublished: true,
  },
  {
    platform: "instagram",
    postUrl: "https://www.instagram.com/reel/DTW39YcDLNO/",
    extractedId: "DTW39YcDLNO",
    embedType: "reel",
    title: "Community Initiative",
    displayOrder: 0,
    isPublished: true,
  },
  {
    platform: "instagram",
    postUrl: "https://www.instagram.com/p/DDQ8CUlIttt/",
    extractedId: "DDQ8CUlIttt",
    embedType: "p",
    title: "Local Development",
    displayOrder: 1,
    isPublished: true,
  },
  {
    platform: "instagram",
    postUrl: "https://www.instagram.com/p/DWl7UpGDPNL/",
    extractedId: "DWl7UpGDPNL",
    embedType: "p",
    title: "Public Service",
    displayOrder: 2,
    isPublished: true,
  },
];

async function main() {
  console.log('Start seeding...');

  // Clear existing data
  await prisma.wardOfficer.deleteMany({});
  await prisma.policeStation.deleteMany({});
  await prisma.fireStation.deleteMany({});
  await prisma.socialMediaEmbed.deleteMany({});
  console.log('Cleared existing data.');

  // Create ward officers
  console.log('\nSeeding ward officers...');
  for (const officer of wardOfficers) {
    const created = await prisma.wardOfficer.create({
      data: officer,
    });
    console.log(`Created ward officer: ${created.name}`);
  }

  // Create police stations
  console.log('\nSeeding police stations...');
  for (const station of policeStations) {
    const created = await prisma.policeStation.create({
      data: station,
    });
    console.log(`Created police station: ${created.stationName}`);
  }

  // Create fire stations
  console.log('\nSeeding fire stations...');
  for (const station of fireStations) {
    const created = await prisma.fireStation.create({
      data: station,
    });
    console.log(`Created fire station: ${created.stationName}`);
  }

  // Create social media posts
  console.log('\nSeeding social media posts...');
  for (const post of socialMediaPosts) {
    const created = await prisma.socialMediaEmbed.create({
      data: post,
    });
    console.log(`Created ${created.platform} post: ${created.title}`);
  }

  console.log('\nSeeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
