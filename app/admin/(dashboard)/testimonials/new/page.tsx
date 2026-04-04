import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { TestimonialForm } from "@/app/admin/components/TestimonialForm";

export default async function NewTestimonialPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return <TestimonialForm />;
}
