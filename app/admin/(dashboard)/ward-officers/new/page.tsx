import { auth } from "@/auth";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { WardOfficerForm } from "@/app/admin/components/WardOfficerForm";

export default async function NewWardOfficerPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return <WardOfficerForm />;
}
