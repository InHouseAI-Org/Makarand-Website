import { auth } from "@/auth";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Image as ImageIcon, AlertTriangle } from "lucide-react";
import { DeleteButton } from "@/app/admin/components/DeleteButton";
import { TogglePublishButton } from "@/app/admin/components/TogglePublishButton";
import { AddImageButton } from "@/app/admin/components/AddImageButton";

const MAX_GALLERY_IMAGES = 6;

export default async function GalleryPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const galleryImages = await prisma.galleryImage.findMany({
    orderBy: { displayOrder: 'asc' },
  });

  const imageCount = galleryImages.length;
  const isLimitReached = imageCount >= MAX_GALLERY_IMAGES;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-charcoal mb-2" style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'var(--font-family-serif)' }}>
            Photo Gallery
          </h1>
          <p className="text-charcoal-light" style={{ fontSize: '16px' }}>
            Manage photo gallery images (Maximum {MAX_GALLERY_IMAGES} images)
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-charcoal font-semibold" style={{ fontSize: '14px' }}>
              {imageCount} / {MAX_GALLERY_IMAGES} images
            </span>
            {isLimitReached && (
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full" style={{ fontSize: '12px', fontWeight: 600 }}>
                Limit Reached
              </span>
            )}
          </div>
        </div>
        <AddImageButton isDisabled={isLimitReached} />
      </div>

      {isLimitReached && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-6 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-yellow-900 font-bold mb-1" style={{ fontSize: '16px' }}>
              Maximum Image Limit Reached
            </h3>
            <p className="text-yellow-800" style={{ fontSize: '14px' }}>
              You have reached the maximum limit of {MAX_GALLERY_IMAGES} images. Please delete an existing image before adding a new one.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {galleryImages.length === 0 ? (
          <div className="p-12 text-center">
            <ImageIcon className="w-16 h-16 text-charcoal-light mx-auto mb-4" />
            <p className="text-charcoal-light mb-4" style={{ fontSize: '16px' }}>
              No gallery images yet. Add your first image!
            </p>
            <Link
              href="/admin/gallery/new"
              className="inline-flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-xl font-bold hover:bg-coral-dark transition-all"
              style={{ fontSize: '14px' }}
            >
              <Plus className="w-5 h-5" />
              Add New Image
            </Link>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="bg-white border-2 border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
                >
                  {/* Image Preview */}
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    {image.imageUrl ? (
                      <img
                        src={image.imageUrl}
                        alt={image.altText}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-gray-300" />
                      </div>
                    )}
                  </div>

                  {/* Image Info */}
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="text-charcoal font-semibold mb-1 line-clamp-1" style={{ fontSize: '14px' }}>
                        {image.altText}
                      </h3>
                      {image.caption && (
                        <p className="text-charcoal-light text-sm line-clamp-2">
                          {image.caption}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full" style={{ fontSize: '12px', fontWeight: 600 }}>
                        {image.category}
                      </span>
                      <span className="text-charcoal-light" style={{ fontSize: '12px' }}>
                        Order: {image.displayOrder}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <TogglePublishButton
                        id={image.id}
                        published={image.isPublished}
                        type="gallery"
                      />
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/gallery/${image.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteButton
                          id={image.id}
                          type="gallery"
                          title={image.altText}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
