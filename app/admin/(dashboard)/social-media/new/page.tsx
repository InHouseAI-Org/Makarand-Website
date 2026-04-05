import { auth } from "@/auth";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { SocialMediaForm } from "@/app/admin/components/SocialMediaForm";

export default async function NewSocialMediaPostPage({
  searchParams,
}: {
  searchParams: Promise<{ platform?: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const params = await searchParams;

  return <SocialMediaForm initialPlatform={params.platform} />;
}
