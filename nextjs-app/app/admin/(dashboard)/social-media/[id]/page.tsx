import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SocialMediaForm } from "@/app/admin/components/SocialMediaForm";
import { notFound } from "next/navigation";

export default async function EditSocialMediaPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const socialMediaPost = await prisma.socialMediaEmbed.findUnique({
    where: { id: params.id },
  });

  if (!socialMediaPost) {
    notFound();
  }

  return (
    <SocialMediaForm
      initialData={{
        id: socialMediaPost.id,
        platform: socialMediaPost.platform as 'youtube' | 'instagram' | 'facebook' | 'twitter' | 'linkedin',
        postUrl: socialMediaPost.postUrl,
        embedType: socialMediaPost.embedType as 'post' | 'reel' | 'video' | 'story',
        title: socialMediaPost.title || undefined,
        description: socialMediaPost.description || undefined,
        displayOrder: socialMediaPost.displayOrder,
        isPublished: socialMediaPost.isPublished,
      }}
      isEdit
    />
  );
}
