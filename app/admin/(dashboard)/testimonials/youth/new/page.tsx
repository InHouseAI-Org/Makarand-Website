import { auth } from "@/auth";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { YouthTestimonialForm } from "@/app/admin/components/YouthTestimonialForm";

export default async function NewYouthTestimonialPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return <YouthTestimonialForm />;
}
