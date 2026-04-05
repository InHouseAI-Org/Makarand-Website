import type { Metadata } from "next";
import { WardInfo } from "../components/WardInfo";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'A Ward Information | Mumbai Demographics & Services',
  description: 'Complete information about Mumbai\'s A Ward including demographics, boundaries, civic services, facilities, and important contact information for residents.',
  keywords: ['A Ward Mumbai', 'Ward Information', 'Demographics', 'Civic Services', 'Fort Mumbai', 'Colaba'],
  openGraph: {
    title: 'A Ward Information | Makarand Narwekar',
    description: 'Demographics, civic services, and facilities information for A Ward residents.',
    url: 'https://makarandnarwekar.com/ward',
  },
  alternates: {
    canonical: 'https://makarandnarwekar.com/ward',
  },
};

export default async function WardPage() {
  // Fetch data from database
  const [wardOfficers, policeStations, fireStations] = await Promise.all([
    prisma.wardOfficer.findMany({
      where: { active: true },
      orderBy: { priority: 'asc' },
    }),
    prisma.policeStation.findMany({
      where: { active: true },
      orderBy: { priority: 'asc' },
    }),
    prisma.fireStation.findMany({
      where: { active: true },
      orderBy: { priority: 'asc' },
    }),
  ]);

  return <WardInfo wardOfficers={wardOfficers} policeStations={policeStations} fireStations={fireStations} />;
}
