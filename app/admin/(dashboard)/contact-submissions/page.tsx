import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { ContactSubmissionsClient } from './ContactSubmissionsClient';

export default async function ContactSubmissionsPage() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const submissions = await prisma.contactSubmission.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return <ContactSubmissionsClient submissions={submissions} />;
}
