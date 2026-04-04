import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { WardOfficerForm } from "@/app/admin/components/WardOfficerForm";
import { notFound } from "next/navigation";



export default async function EditWardOfficerPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const { type = 'wardOfficer' } = await searchParams;

  let initialData: any = null;

  // Fetch based on type
  if (type === 'policeStation') {
    const policeStation = await prisma.policeStation.findUnique({
      where: { id },
    });

    if (!policeStation) {
      notFound();
    }

    initialData = {
      id: policeStation.id,
      type: 'policeStation' as const,
      name: policeStation.name,
      designation: policeStation.designation,
      department: 'Police',
      phone: policeStation.phone,
      stationName: policeStation.stationName,
      priority: policeStation.priority,
      active: policeStation.active,
    };
  } else if (type === 'fireStation') {
    const fireStation = await prisma.fireStation.findUnique({
      where: { id },
    });

    if (!fireStation) {
      notFound();
    }

    initialData = {
      id: fireStation.id,
      type: 'fireStation' as const,
      name: fireStation.stationName,
      stationName: fireStation.stationName,
      phone: fireStation.phone,
      priority: fireStation.priority,
      active: fireStation.active,
    };
  } else {
    const wardOfficer = await prisma.wardOfficer.findUnique({
      where: { id },
    });

    if (!wardOfficer) {
      notFound();
    }

    initialData = {
      id: wardOfficer.id,
      type: 'wardOfficer' as const,
      name: wardOfficer.name,
      designation: wardOfficer.designation,
      department: wardOfficer.department,
      phone: wardOfficer.phone || '',
      email: wardOfficer.email || '',
      priority: wardOfficer.priority,
      active: wardOfficer.active,
    };
  }

  return <WardOfficerForm initialData={initialData} isEdit={true} />;
}
