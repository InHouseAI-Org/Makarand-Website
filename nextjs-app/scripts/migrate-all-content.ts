import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🚀 Starting full content migration from frontend to database...\n');

  // First, clear existing sample data
  console.log('🧹 Clearing existing data...');
  await prisma.project.deleteMany();
  await prisma.governmentProject.deleteMany();
  await prisma.wardOfficer.deleteMany();
  console.log('✅ Existing data cleared\n');

  // ==========================================
  // PROJECTS (from ProjectDetail.tsx)
  // ==========================================
  console.log('📁 Migrating Projects...');

  const projects = [
    {
      title: "Ward Road Reconstruction",
      description: "Complete reconstruction of 12km of ward roads with modern concrete technology, integrated stormwater drainage, and pedestrian-friendly pathways. This project addressed years of waterlogging and pothole issues that affected daily commuters and residents.",
      category: "Infrastructure",
      status: "completed",
      budget: "₹2.5 Crore",
      location: "Colaba Ward, South Mumbai",
      startDate: new Date("2024-12-01"),
      endDate: new Date("2025-12-31"),
      highlights: [
        "12 km of roads fully reconstructed with concrete technology",
        "Integrated stormwater drainage system installed",
        "Pedestrian pathways and safety barriers added",
        "LED road markings at all major intersections",
        "Speed bumps and zebra crossings near schools and hospitals",
        "Completed 2 months ahead of schedule"
      ],
      impact: "Benefits over 50,000 residents daily",
      published: true,
    },
    {
      title: "LED Street Lighting",
      description: "Installation of 450+ energy-efficient LED street lights across the entire ward, replacing outdated sodium vapor lamps. The project has significantly improved nighttime visibility and reduced energy costs by 60%.",
      category: "Public Safety",
      status: "completed",
      budget: "₹85 Lakh",
      location: "All sectors, Colaba Ward",
      startDate: new Date("2024-10-01"),
      endDate: new Date("2025-10-31"),
      highlights: [
        "450+ LED street lights installed across the ward",
        "60% reduction in energy consumption",
        "Dark spots near residential areas fully eliminated",
        "Solar-powered lights in park areas",
        "Smart timer system for efficient operation",
        "Annual maintenance contract in place"
      ],
      published: true,
    },
    {
      title: "Municipal School Upgrades",
      description: "Comprehensive renovation of 8 municipal schools including digital classrooms, modern furniture, improved sanitation, and playground upgrades. Impacting over 3,000 students directly.",
      category: "Education",
      status: "completed",
      budget: "₹1.2 Crore",
      location: "8 Municipal Schools, Colaba Ward",
      startDate: new Date("2024-08-01"),
      endDate: new Date("2025-08-31"),
      highlights: [
        "8 schools fully renovated with modern infrastructure",
        "Digital classrooms with projectors and computers",
        "New furniture and learning materials provided",
        "Separate clean washrooms for boys and girls",
        "Playground equipment and sports facilities upgraded",
        "Library sections with 5,000+ new books"
      ],
      published: true,
    },
    {
      title: "Community Park Revival",
      description: "Transformation of 3 neglected open spaces into vibrant community parks with walking tracks, senior citizen zones, children's play areas, and landscaped gardens.",
      category: "Community Welfare",
      status: "completed",
      budget: "₹65 Lakh",
      location: "3 locations, Colaba Ward",
      startDate: new Date("2024-06-01"),
      endDate: new Date("2025-06-30"),
      highlights: [
        "3 community parks fully developed",
        "Jogging and walking tracks with rubber flooring",
        "Dedicated senior citizen zones with seating",
        "Children's play areas with modern equipment",
        "Landscaping with 200+ native trees and plants",
        "Outdoor gym equipment installed"
      ],
      published: true,
    },
    {
      title: "Water Pipeline Replacement",
      description: "Replacement of aging water pipelines across the ward to eliminate leakages, improve water pressure, and ensure 24/7 water supply to all households.",
      category: "Infrastructure",
      status: "ongoing",
      budget: "₹3.1 Crore",
      location: "Underground network, Colaba Ward",
      startDate: new Date("2025-03-01"),
      highlights: [
        "Replacing 15km of aging water pipelines",
        "Using HDPE pipes for longer life and leak prevention",
        "New booster pumping stations at 4 locations",
        "Water meters being installed for accurate billing",
        "Minimal disruption to residents during work",
        "72% of work completed as of February 2026"
      ],
      impact: "Expected completion: March 2026",
      published: true,
    },
    {
      title: "Sanitation Infrastructure Upgrade",
      description: "Comprehensive upgrade of sanitation infrastructure including public toilets, waste collection systems, and composting facilities.",
      category: "Cleanliness & Sanitation",
      status: "ongoing",
      budget: "₹1.8 Crore",
      location: "Ward-wide, Colaba",
      startDate: new Date("2025-06-01"),
      highlights: [
        "20 public toilets being renovated and modernized",
        "Automated waste collection bins at 100+ locations",
        "Composting facility being built for organic waste",
        "Door-to-door waste segregation awareness campaigns",
        "Bio-gas plant under planning phase",
        "45% of work completed"
      ],
      impact: "Expected completion: June 2026",
      published: true,
    },
    {
      title: "Community Center Construction",
      description: "Construction of a modern community center with multi-purpose hall, library, computer lab, and spaces for cultural and social events.",
      category: "Community Welfare",
      status: "ongoing",
      budget: "₹2.2 Crore",
      location: "Central Colaba",
      startDate: new Date("2025-09-01"),
      highlights: [
        "Multi-purpose hall with 500-person capacity",
        "Modern library and reading room",
        "Computer lab with 30 workstations",
        "Cultural performance stage",
        "Meeting rooms for community organizations",
        "Foundation and structure work 30% complete"
      ],
      impact: "Expected completion: September 2026",
      published: true,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log(`✅ Created ${projects.length} projects\n`);

  // ==========================================
  // GOVERNMENT PROJECTS (from GovernmentProjects.tsx)
  // ==========================================
  console.log('🏛️  Migrating Government Projects...');

  const governmentProjects = [
    {
      title: "Ward Road Infrastructure Upgrade - Phase 2",
      description: "Comprehensive road reconstruction project covering major arterial roads with modern drainage systems, footpath upgrades, and street lighting improvements.",
      department: "Infrastructure",
      status: "ongoing",
      budget: "₹4.2 Crores",
      location: "Multiple locations across Ward 226",
      startDate: new Date("2025-01-01"),
      beneficiaries: "25,000+ residents",
      documents: [
        "Project Proposal.pdf",
        "Budget Allocation.pdf",
        "Engineering Drawings.pdf",
        "Progress Report Q1.pdf"
      ],
      published: true,
    },
    {
      title: "24x7 Water Supply Enhancement Project",
      description: "Installation of new water pipelines, overhead tanks, and pumping stations to ensure round-the-clock water supply to all households in the ward.",
      department: "Water & Sanitation",
      status: "ongoing",
      budget: "₹3.8 Crores",
      location: "Entire Ward 226",
      startDate: new Date("2025-03-01"),
      beneficiaries: "40,000+ residents",
      documents: [
        "Technical Proposal.pdf",
        "Site Survey Report.pdf",
        "Environmental Clearance.pdf"
      ],
      published: true,
    },
    {
      title: "Municipal Schools Modernization Program",
      description: "Comprehensive upgrade of 8 municipal schools with smart classrooms, digital libraries, science labs, and improved infrastructure.",
      department: "Education",
      status: "completed",
      budget: "₹2.6 Crores",
      location: "8 schools across Ward 226",
      startDate: new Date("2024-06-01"),
      completionDate: new Date("2026-01-31"),
      beneficiaries: "3,500+ students",
      documents: [
        "Project Report.pdf",
        "Completion Certificate.pdf",
        "Photo Documentation.pdf",
        "Impact Assessment.pdf"
      ],
      published: true,
    },
    {
      title: "Integrated Solid Waste Management System",
      description: "Modern waste collection, segregation, and processing system with door-to-door collection, recycling units, and composting facilities.",
      department: "Sanitation & Environment",
      status: "ongoing",
      budget: "₹1.9 Crores",
      location: "Ward 226",
      startDate: new Date("2025-04-01"),
      beneficiaries: "Entire ward population",
      documents: [
        "Implementation Plan.pdf",
        "Equipment Specifications.pdf",
        "Monthly Progress Report.pdf"
      ],
      published: true,
    },
    {
      title: "Community Health Center Establishment",
      description: "Construction of a modern primary health center with OPD, diagnostic facilities, pharmacy, and 24x7 emergency services.",
      department: "Healthcare",
      status: "ongoing",
      budget: "₹5.2 Crores",
      location: "Central Ward 226",
      startDate: new Date("2026-06-01"),
      beneficiaries: "50,000+ residents",
      documents: [
        "Detailed Project Report.pdf",
        "Architectural Plans.pdf",
        "Budget Breakdown.pdf",
        "Approval Letter.pdf"
      ],
      published: true,
    },
    {
      title: "Smart Street Infrastructure Project",
      description: "Installation of smart street furniture including intelligent lighting, CCTV cameras, WiFi hotspots, and digital information kiosks.",
      department: "Smart City",
      status: "ongoing",
      budget: "₹3.5 Crores",
      location: "Major roads in Ward 226",
      startDate: new Date("2026-09-01"),
      beneficiaries: "All ward residents",
      documents: [
        "Concept Proposal.pdf",
        "Technology Specifications.pdf",
        "Cost Estimates.pdf"
      ],
      published: true,
    },
  ];

  for (const govProject of governmentProjects) {
    await prisma.governmentProject.create({ data: govProject });
  }
  console.log(`✅ Created ${governmentProjects.length} government projects\n`);

  // ==========================================
  // WARD OFFICERS (Sample data)
  // ==========================================
  console.log('👥 Migrating Ward Officers...');

  const wardOfficers = [
    {
      name: "Mr. Rajesh Kumar",
      designation: "Ward Officer",
      department: "BMC Ward N",
      phone: "+91 22 2501 XXXX",
      email: "wardN@mcgm.gov.in",
      office: "Ward Office, Ghatkopar",
      timing: "Mon-Fri: 10:00 AM - 6:00 PM",
      priority: 1,
      active: true,
    },
    {
      name: "Mrs. Priya Sharma",
      designation: "Assistant Engineer",
      department: "Roads & Traffic",
      phone: "+91 22 2502 XXXX",
      email: "roads.n@mcgm.gov.in",
      office: "BMC Building, Ghatkopar",
      timing: "Mon-Sat: 9:00 AM - 5:00 PM",
      priority: 2,
      active: true,
    },
    {
      name: "Dr. Amit Patel",
      designation: "Health Officer",
      department: "Public Health",
      phone: "+91 22 2503 XXXX",
      email: "health.n@mcgm.gov.in",
      office: "Health Center, Ghatkopar",
      timing: "Mon-Sat: 8:00 AM - 4:00 PM",
      priority: 3,
      active: true,
    },
  ];

  for (const officer of wardOfficers) {
    await prisma.wardOfficer.create({ data: officer });
  }
  console.log(`✅ Created ${wardOfficers.length} ward officers\n`);

  console.log('✨ Full content migration completed successfully!\n');
  console.log('📊 Summary:');
  console.log(`   - Projects: ${projects.length}`);
  console.log(`   - Government Projects: ${governmentProjects.length}`);
  console.log(`   - Ward Officers: ${wardOfficers.length}`);
  console.log('\n🎉 All frontend content is now in the database!\n');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error('❌ Error during migration:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
