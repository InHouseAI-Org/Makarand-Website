import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { GovernmentProjectForm } from "@/app/admin/components/GovernmentProjectForm";

export default async function NewGovernmentProjectPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return <GovernmentProjectForm />;
}
