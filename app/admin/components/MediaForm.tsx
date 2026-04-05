'use client';

import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Save, Upload, Link2, X, Play } from 'lucide-react';
import Link from 'next/link';
import { UploadButton } from '@/lib/uploadthing';
import { CustomDropdown } from './CustomDropdown';

interface MediaFormData {
  category: 'press' | 'award' | 'video';
  title: string;
  source?: string;
  url?: string;
  thumbnail?: string;
  description?: string;
  publishedAt: string;
  published: boolean;
}

interface MediaFormProps {
  initialData?: MediaFormData & { id?: string };
  isEdit?: boolean;
}

export function MediaForm({ initialData, isEdit = false }: MediaFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload');
  const [videoMethod, setVideoMethod] = useState<'upload' | 'url'>('url');
  const [uploadedThumbnail, setUploadedThumbnail] = useState(initialData?.thumbnail || '');
  const [uploadedVideo, setUploadedVideo] = useState(initialData?.url || '');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<MediaFormData>({
    defaultValues: initialData || {
      category: 'press',
      title: '',
      source: '',
      url: '',
      thumbnail: '',
      description: '',
      publishedAt: new Date().toISOString().split('T')[0],
      published: true,
    },
  });

  const selectedCategory = watch('category');

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

  const handleRemoveUploadedThumbnail = async () => {
    if (uploadedThumbnail) {
      await deleteFromUploadthing(uploadedThumbnail);
      setUploadedThumbnail('');
      setValue('thumbnail', '');
    }
  };

  const handleRemoveUploadedVideo = async () => {
    if (uploadedVideo) {
      await deleteFromUploadthing(uploadedVideo);
      setUploadedVideo('');
      setValue('url', '');
    }
  };

  const onSubmit = async (data: MediaFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      // Use uploaded files if available, otherwise use the form URLs
      const finalThumbnail = uploadedThumbnail || data.thumbnail;
      const finalUrl = uploadedVideo || data.url;

      const processedData = {
        category: data.category,
        title: data.title,
        source: data.source || undefined,
        url: finalUrl || undefined,
        thumbnail: finalThumbnail || undefined,
        description: data.description || undefined,
        publishedAt: new Date(data.publishedAt).toISOString(),
        published: data.published,
      };

      const url = isEdit
        ? `/api/admin/media/${initialData?.id}`
        : `/api/admin/media`;
      const method = isEdit ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        throw new Error('Failed to save media');
      }

      router.push('/admin/media');
      router.refresh();
    } catch (err) {
      setError('Failed to save media. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'press':
        return 'Press Coverage';
      case 'award':
        return 'Awards & Recognition';
      case 'video':
        return 'Video Posts';
      default:
        return category;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/media"
          className="p-2 hover:bg-cream rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-charcoal" />
        </Link>
        <div>
          <h1 className="text-charcoal mb-2" style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'var(--font-family-serif)' }}>
            {isEdit ? 'Edit Media' : 'Add New Media'}
          </h1>
          <p className="text-charcoal-light" style={{ fontSize: '16px' }}>
            {isEdit ? 'Update media information' : 'Add a new media item to the website'}
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
          {/* Category Selector */}
          <div>
            <Controller
              name="category"
              control={control}
              rules={{ required: 'Category is required' }}
              render={({ field }) => (
                <CustomDropdown
                  label="Category"
                  required
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { value: 'press', label: 'Press Coverage' },
                    { value: 'award', label: 'Awards & Recognition' },
                    { value: 'video', label: 'Video Posts' },
                  ]}
                />
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
              placeholder={
                selectedCategory === 'press'
                  ? 'e.g., Local Leader Honored for Community Service'
                  : selectedCategory === 'award'
                  ? 'e.g., Best Public Service Award 2024'
                  : 'e.g., Community Outreach Program Success'
              }
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Source and Published Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Source
              </label>
              <input
                type="text"
                {...register('source')}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                placeholder={
                  selectedCategory === 'press'
                    ? 'e.g., Times of India, Indian Express'
                    : selectedCategory === 'award'
                    ? 'e.g., Government of Maharashtra'
                    : 'e.g., YouTube, Facebook'
                }
              />
            </div>

            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Published Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register('publishedAt', { required: 'Published date is required' })}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
              />
              {errors.publishedAt && (
                <p className="text-red-500 text-sm mt-1">{errors.publishedAt.message}</p>
              )}
            </div>
          </div>

          {/* URL / Video Upload */}
          <div>
            <label className="block text-charcoal font-semibold mb-3" style={{ fontSize: '14px' }}>
              {selectedCategory === 'video' ? 'Video' : 'URL'}
            </label>

            {/* Show toggle only for video category */}
            {selectedCategory === 'video' && (
              <div className="flex gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setVideoMethod('upload')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                    videoMethod === 'upload'
                      ? 'bg-coral text-white shadow-md'
                      : 'bg-gray-100 text-charcoal-light hover:bg-gray-200'
                  }`}
                  style={{ fontSize: '14px' }}
                >
                  <Upload className="w-4 h-4" />
                  Upload Video
                </button>
                <button
                  type="button"
                  onClick={() => setVideoMethod('url')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                    videoMethod === 'url'
                      ? 'bg-coral text-white shadow-md'
                      : 'bg-gray-100 text-charcoal-light hover:bg-gray-200'
                  }`}
                  style={{ fontSize: '14px' }}
                >
                  <Link2 className="w-4 h-4" />
                  Video URL
                </button>
              </div>
            )}

            {/* For video category with upload method */}
            {selectedCategory === 'video' && videoMethod === 'upload' ? (
              <div>
                {uploadedVideo ? (
                  <div className="border-2 border-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-charcoal font-semibold" style={{ fontSize: '14px' }}>
                        Video Uploaded
                      </p>
                      <button
                        type="button"
                        onClick={handleRemoveUploadedVideo}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Remove video"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Play className="w-5 h-5 text-coral" />
                      <p className="text-charcoal-light text-sm truncate flex-1">{uploadedVideo}</p>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                    <UploadButton
                      endpoint="videoUploader"
                      onClientUploadComplete={(res) => {
                        if (res && res[0]) {
                          setUploadedVideo(res[0].url);
                          setValue('url', res[0].url);
                        }
                      }}
                      onUploadError={(error: Error) => {
                        setError(`Upload failed: ${error.message}`);
                      }}
                    />
                    <p className="text-charcoal-light text-sm mt-2">
                      Click to upload video (Max 50MB)
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* For non-video categories or video with URL method */
              <div>
                <input
                  type="url"
                  {...register('url')}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                  placeholder={
                    selectedCategory === 'press'
                      ? 'https://example.com/article'
                      : selectedCategory === 'award'
                      ? 'https://example.com/award-details'
                      : 'https://youtube.com/watch?v=... or upload a video above'
                  }
                />
                <p className="text-charcoal-light text-sm mt-1">
                  {selectedCategory === 'press'
                    ? 'Link to the article or news coverage'
                    : selectedCategory === 'award'
                    ? 'Link to award details or certificate'
                    : 'Link to video (YouTube, Facebook, etc.) or upload a video file above'}
                </p>
              </div>
            )}
          </div>

          {/* Thumbnail - Upload or URL */}
          <div>
            <label className="block text-charcoal font-semibold mb-3" style={{ fontSize: '14px' }}>
              Thumbnail Image
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
                {uploadedThumbnail ? (
                  <div className="border-2 border-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-charcoal font-semibold" style={{ fontSize: '14px' }}>
                        Image Uploaded
                      </p>
                      <button
                        type="button"
                        onClick={handleRemoveUploadedThumbnail}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-2">
                      <img src={uploadedThumbnail} alt="Thumbnail preview" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-charcoal-light text-sm truncate">{uploadedThumbnail}</p>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        if (res && res[0]) {
                          setUploadedThumbnail(res[0].url);
                          setValue('thumbnail', res[0].url);
                        }
                      }}
                      onUploadError={(error: Error) => {
                        setError(`Upload failed: ${error.message}`);
                      }}
                    />
                    <p className="text-charcoal-light text-sm mt-2">
                      Click to upload thumbnail image (Max 4MB)
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
                  {...register('thumbnail')}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-charcoal-light text-sm mt-1">
                  Image URL for the media thumbnail
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
              Description
            </label>
            <textarea
              {...register('description')}
              rows={5}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent resize-none"
              placeholder={
                selectedCategory === 'press'
                  ? 'Brief summary of the press coverage...'
                  : selectedCategory === 'award'
                  ? 'Details about the award and achievement...'
                  : 'Video description and key highlights...'
              }
            />
            <p className="text-charcoal-light text-sm mt-1">
              Optional description or summary
            </p>
          </div>

          {/* Published */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register('published')}
              id="published"
              className="w-5 h-5 text-coral border-border rounded focus:ring-2 focus:ring-coral"
            />
            <label htmlFor="published" className="text-charcoal font-semibold" style={{ fontSize: '14px' }}>
              Published (show on website)
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-border">
          <Link
            href="/admin/media"
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
            {isSubmitting ? 'Saving...' : (isEdit ? 'Update Media' : 'Create Media')}
          </button>
        </div>
      </form>
    </div>
  );
}
