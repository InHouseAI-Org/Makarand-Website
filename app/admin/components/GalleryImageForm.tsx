'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Save, Image as ImageIcon, Upload, Link2, X } from 'lucide-react';
import Link from 'next/link';
import { UploadButton } from '@/lib/uploadthing';

interface GalleryImageFormData {
  imageUrl: string;
  altText: string;
  caption?: string;
  category: string;
  displayOrder: number;
  isPublished: boolean;
}

interface GalleryImageFormProps {
  initialData?: GalleryImageFormData & { id?: string };
  isEdit?: boolean;
}

export function GalleryImageForm({ initialData, isEdit = false }: GalleryImageFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload');
  const [uploadedImageUrl, setUploadedImageUrl] = useState(initialData?.imageUrl || '');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GalleryImageFormData>({
    defaultValues: initialData || {
      imageUrl: '',
      altText: '',
      caption: '',
      category: 'general',
      displayOrder: 0,
      isPublished: true,
    },
  });

  const imageUrl = watch('imageUrl') || uploadedImageUrl;

  // Delete image from Uploadthing
  const deleteFromUploadthing = async (url: string) => {
    if (url.includes('utfs.io')) {
      try {
        await fetch('/api/uploadthing/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });
      } catch (error) {
        console.error('Failed to delete file from Uploadthing:', error);
      }
    }
  };

  const handleRemoveUploadedImage = async () => {
    if (uploadedImageUrl) {
      await deleteFromUploadthing(uploadedImageUrl);
      setUploadedImageUrl('');
      setValue('imageUrl', '');
    }
  };

  const onSubmit = async (data: GalleryImageFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      // Use uploaded image URL if available, otherwise use the form URL
      const finalImageUrl = uploadedImageUrl || data.imageUrl;

      if (!finalImageUrl) {
        throw new Error('Please provide an image URL or upload an image');
      }

      const url = isEdit
        ? `/api/admin/gallery/${initialData?.id}`
        : `/api/admin/gallery`;
      const method = isEdit ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          imageUrl: finalImageUrl,
          displayOrder: Number(data.displayOrder),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save gallery image');
      }

      router.push('/admin/gallery');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save gallery image. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/gallery"
          className="p-2 hover:bg-cream rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-charcoal" />
        </Link>
        <div>
          <h1 className="text-charcoal mb-2" style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'var(--font-family-serif)' }}>
            {isEdit ? 'Edit Gallery Image' : 'Add New Gallery Image'}
          </h1>
          <p className="text-charcoal-light" style={{ fontSize: '16px' }}>
            {isEdit ? 'Update gallery image information' : 'Add a new image to the photo gallery'}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-border p-8">
        <div className="space-y-6">
          {/* Upload Method Toggle */}
          <div>
            <label className="block text-charcoal font-semibold mb-3" style={{ fontSize: '14px' }}>
              Image Source <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3 mb-4">
              <button
                type="button"
                onClick={() => setUploadMethod('upload')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  uploadMethod === 'upload'
                    ? 'bg-coral text-white shadow-md'
                    : 'bg-gray-100 text-charcoal-light hover:bg-gray-200'
                }`}
                style={{ fontSize: '14px' }}
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </button>
              <button
                type="button"
                onClick={() => setUploadMethod('url')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  uploadMethod === 'url'
                    ? 'bg-coral text-white shadow-md'
                    : 'bg-gray-100 text-charcoal-light hover:bg-gray-200'
                }`}
                style={{ fontSize: '14px' }}
              >
                <Link2 className="w-4 h-4" />
                Image URL
              </button>
            </div>

            {/* Upload Method */}
            {uploadMethod === 'upload' && (
              <div>
                {uploadedImageUrl ? (
                  <div className="border-2 border-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-charcoal font-semibold" style={{ fontSize: '14px' }}>
                        Image Uploaded
                      </p>
                      <button
                        type="button"
                        onClick={handleRemoveUploadedImage}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-charcoal-light text-sm truncate">{uploadedImageUrl}</p>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        if (res && res[0]) {
                          setUploadedImageUrl(res[0].url);
                          setValue('imageUrl', res[0].url);
                        }
                      }}
                      onUploadError={(error: Error) => {
                        setError(`Upload failed: ${error.message}`);
                      }}
                    />
                    <p className="text-charcoal-light text-sm mt-2">
                      Click to upload an image (Max 4MB)
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* URL Method */}
            {uploadMethod === 'url' && (
              <div>
                <input
                  type="url"
                  {...register('imageUrl', {
                    required: uploadMethod === 'url' && !uploadedImageUrl ? 'Image URL is required' : false
                  })}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                {errors.imageUrl && (
                  <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
                )}
                <p className="text-charcoal-light text-sm mt-1">Enter the full URL of the image</p>
              </div>
            )}
          </div>

          {/* Image Preview */}
          {imageUrl && (
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Image Preview
              </label>
              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden border-2 border-border">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-full h-full flex flex-col items-center justify-center"><svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><p class="text-gray-400 text-sm mt-2">Invalid image URL</p></div>';
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* Alt Text */}
          <div>
            <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
              Alt Text <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('altText', { required: 'Alt text is required for accessibility' })}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
              placeholder="Describe the image for accessibility"
            />
            {errors.altText && (
              <p className="text-red-500 text-sm mt-1">{errors.altText.message}</p>
            )}
            <p className="text-charcoal-light text-sm mt-1">Describe the image for screen readers and SEO</p>
          </div>

          {/* Caption */}
          <div>
            <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
              Caption
            </label>
            <textarea
              {...register('caption')}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent min-h-[100px]"
              placeholder="Optional caption to display with the image"
            />
            <p className="text-charcoal-light text-sm mt-1">Optional description or caption for the image</p>
          </div>

          {/* Category and Display Order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Category
              </label>
              <input
                type="text"
                {...register('category')}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                placeholder="e.g., general, events, community"
              />
              <p className="text-charcoal-light text-sm mt-1">Categorize the image (default: general)</p>
            </div>

            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Display Order
              </label>
              <input
                type="number"
                {...register('displayOrder', { valueAsNumber: true })}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                placeholder="0"
                min="0"
              />
              <p className="text-charcoal-light text-sm mt-1">Lower numbers appear first</p>
            </div>
          </div>

          {/* Published */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register('isPublished')}
              id="isPublished"
              className="w-5 h-5 text-coral border-border rounded focus:ring-2 focus:ring-coral"
            />
            <label htmlFor="isPublished" className="text-charcoal font-semibold" style={{ fontSize: '14px' }}>
              Published (show on website)
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-border">
          <Link
            href="/admin/gallery"
            className="px-6 py-3 border-2 border-border text-charcoal font-semibold rounded-xl hover:bg-cream transition-all"
            style={{ fontSize: '14px' }}
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-xl font-bold hover:bg-coral-dark transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontSize: '14px' }}
          >
            <Save className="w-5 h-5" />
            {isSubmitting ? 'Saving...' : (isEdit ? 'Update Image' : 'Add Image')}
          </button>
        </div>
      </form>
    </div>
  );
}
