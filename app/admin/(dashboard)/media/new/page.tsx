import { auth } from "@/auth";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { MediaForm } from "@/app/admin/components/MediaForm";

export default async function NewMediaPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return <MediaForm />;
}
