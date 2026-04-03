import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ProjectForm } from "@/app/admin/components/ProjectForm";

export default async function NewProjectPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return <ProjectForm />;
}
