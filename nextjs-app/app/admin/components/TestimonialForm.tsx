'use client';

import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Save, Star, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { UploadButton, UploadDropzone } from '@/lib/uploadthing';
import { CustomDropdown } from './CustomDropdown';

interface TestimonialFormData {
  type: 'text' | 'video';
  name: string;
  role?: string;
  content: string;
  videoUrl?: string;
  photo?: string;
  photoUrl?: string;
  video?: string;
  rating: number;
  published: boolean;
}

interface TestimonialFormProps {
  initialData?: TestimonialFormData & { id?: string };
  isEdit?: boolean;
}

export function TestimonialForm({ initialData, isEdit = false }: TestimonialFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [uploadedPhoto, setUploadedPhoto] = useState<string | undefined>(initialData?.photo);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | undefined>(initialData?.photoUrl);
  const [uploadedVideo, setUploadedVideo] = useState<string | undefined>(initialData?.video);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<TestimonialFormData>({
    defaultValues: initialData || {
      type: 'text',
      name: '',
      role: '',
      content: '',
      videoUrl: '',
      photo: '',
      photoUrl: '',
      video: '',
      rating: 5,
      published: true,
    },
  });

  const selectedType = watch('type');
  const selectedRating = watch('rating');

  const onSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      const processedData: any = {
        type: data.type,
        name: data.name,
        role: data.role || undefined,
        content: data.type === 'text' ? data.content : undefined,
        videoUrl: data.type === 'video' && !uploadedVideo ? data.videoUrl : undefined,
        photo: uploadedPhoto || undefined,
        photoUrl: uploadedPhotoUrl || data.photoUrl || undefined,
        video: uploadedVideo || undefined,
        rating: Number(data.rating),
        published: data.published,
      };

      const url = isEdit
        ? `/api/admin/testimonial/${initialData?.id}`
        : `/api/admin/testimonial`;
      const method = isEdit ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        throw new Error('Failed to save testimonial');
      }

      router.push('/admin/testimonials');
      router.refresh();
    } catch (err) {
      setError('Failed to save testimonial. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/testimonials"
          className="p-2 hover:bg-cream rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-charcoal" />
        </Link>
        <div>
          <h1 className="text-charcoal mb-2" style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'var(--font-family-serif)' }}>
            {isEdit ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h1>
          <p className="text-charcoal-light" style={{ fontSize: '16px' }}>
            {isEdit ? 'Update testimonial information' : 'Add a new testimonial from a citizen or community member'}
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
          {/* Type Selector */}
          <div>
            <Controller
              name="type"
              control={control}
              rules={{ required: 'Type is required' }}
              render={({ field }) => (
                <CustomDropdown
                  label="Testimonial Type"
                  required
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { value: 'text', label: 'Text Testimonial' },
                    { value: 'video', label: 'Video Testimonial' },
                  ]}
                />
              )}
            />
            <p className="text-charcoal-light text-sm mt-1">
              {selectedType === 'text' ? 'A written testimonial with optional photo' : 'A video testimonial from YouTube or Vimeo'}
            </p>
          </div>

          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                placeholder="Enter person's name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Role / Designation
              </label>
              <input
                type="text"
                {...register('role')}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                placeholder="e.g., Local Resident, Business Owner"
              />
            </div>
          </div>

          {/* Content (for text testimonials) */}
          {selectedType === 'text' && (
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Testimonial Message <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('content', {
                  required: selectedType === 'text' ? 'Message is required for text testimonials' : false
                })}
                rows={6}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent resize-none"
                placeholder="Enter the testimonial message..."
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
              )}
            </div>
          )}

          {/* Video URL/Upload (for video testimonials) */}
          {selectedType === 'video' && (
            <div className="space-y-4">
              <div>
                <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                  Video Upload or URL <span className="text-red-500">*</span>
                </label>
                <p className="text-charcoal-light text-sm mb-3">
                  Upload a video file or provide a YouTube/Vimeo link
                </p>

                {uploadedVideo ? (
                  <div className="border-2 border-green-500 rounded-xl p-4 bg-green-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Upload className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-charcoal font-semibold text-sm">Video uploaded</p>
                          <p className="text-charcoal-light text-xs">{uploadedVideo.split('/').pop()}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedVideo(undefined)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <UploadDropzone
                      endpoint="videoUploader"
                      onClientUploadComplete={(res) => {
                        if (res && res[0]) {
                          setUploadedVideo(res[0].url);
                        }
                      }}
                      onUploadError={(error: Error) => {
                        setError(`Video upload failed: ${error.message}`);
                      }}
                      className="ut-button:bg-coral ut-button:ut-readying:bg-coral/50 ut-label:text-charcoal ut-allowed-content:text-charcoal-light"
                    />

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-charcoal-light">OR</span>
                      </div>
                    </div>

                    <input
                      type="url"
                      {...register('videoUrl', {
                        required: selectedType === 'video' && !uploadedVideo ? 'Video upload or URL is required' : false,
                        pattern: {
                          value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+$/,
                          message: 'Please enter a valid YouTube or Vimeo URL'
                        }
                      })}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                      placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                    />
                    {errors.videoUrl && (
                      <p className="text-red-500 text-sm mt-1">{errors.videoUrl.message}</p>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Photo Upload/URL */}
          <div>
            <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
              Profile Photo
            </label>
            <p className="text-charcoal-light text-sm mb-3">
              Upload a photo or provide a URL
            </p>

            {uploadedPhoto ? (
              <div className="border-2 border-green-500 rounded-xl p-4 bg-green-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={uploadedPhoto} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <p className="text-charcoal font-semibold text-sm">Photo uploaded</p>
                      <p className="text-charcoal-light text-xs">{uploadedPhoto.split('/').pop()}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedPhoto(undefined)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      setUploadedPhoto(res[0].url);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    setError(`Photo upload failed: ${error.message}`);
                  }}
                  className="ut-button:bg-coral ut-button:ut-readying:bg-coral/50 ut-label:text-charcoal ut-allowed-content:text-charcoal-light"
                />

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-charcoal-light">OR</span>
                  </div>
                </div>

                <input
                  type="url"
                  {...register('photoUrl')}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                  placeholder="https://example.com/photo.jpg"
                />
                <p className="text-charcoal-light text-sm mt-1">
                  Optional profile photo for the person giving the testimonial
                </p>
              </>
            )}
          </div>

          {/* Rating */}
          <div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Controller
                  name="rating"
                  control={control}
                  rules={{ required: 'Rating is required' }}
                  render={({ field }) => (
                    <CustomDropdown
                      label="Rating"
                      required
                      value={String(field.value)}
                      onChange={(value) => field.onChange(Number(value))}
                      options={[
                        { value: '1', label: '1 Star' },
                        { value: '2', label: '2 Stars' },
                        { value: '3', label: '3 Stars' },
                        { value: '4', label: '4 Stars' },
                        { value: '5', label: '5 Stars' },
                      ]}
                      className="min-w-[200px]"
                    />
                  )}
                />
              </div>
              <div className="flex items-center gap-1 mt-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < selectedRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
            )}
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
            href="/admin/testimonials"
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
            {isSubmitting ? 'Saving...' : (isEdit ? 'Update Testimonial' : 'Create Testimonial')}
          </button>
        </div>
      </form>
    </div>
  );
}
