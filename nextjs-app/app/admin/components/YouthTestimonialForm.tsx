'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { UploadButton } from '@/lib/uploadthing';

interface YouthTestimonialFormData {
  name: string;
  age?: number;
  school?: string;
  content: string;
  photo?: string;
  photoUrl?: string;
  published: boolean;
}

interface YouthTestimonialFormProps {
  initialData?: YouthTestimonialFormData & { id?: string };
  isEdit?: boolean;
}

export function YouthTestimonialForm({ initialData, isEdit = false }: YouthTestimonialFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [uploadedPhoto, setUploadedPhoto] = useState<string | undefined>(initialData?.photo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<YouthTestimonialFormData>({
    defaultValues: initialData || {
      name: '',
      age: undefined,
      school: '',
      content: '',
      photo: '',
      photoUrl: '',
      published: true,
    },
  });

  const onSubmit = async (data: YouthTestimonialFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      const processedData = {
        name: data.name,
        age: data.age ? Number(data.age) : undefined,
        school: data.school || undefined,
        content: data.content,
        photo: uploadedPhoto || undefined,
        photoUrl: data.photoUrl || undefined,
        published: data.published,
      };

      const url = isEdit
        ? `/api/admin/youthTestimonial/${initialData?.id}`
        : `/api/admin/youthTestimonial`;
      const method = isEdit ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        throw new Error('Failed to save youth testimonial');
      }

      router.push('/admin/testimonials');
      router.refresh();
    } catch (err) {
      setError('Failed to save youth testimonial. Please try again.');
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
            {isEdit ? 'Edit Youth Testimonial' : 'Add New Youth Testimonial'}
          </h1>
          <p className="text-charcoal-light" style={{ fontSize: '16px' }}>
            {isEdit ? 'Update youth testimonial information' : 'Add a new testimonial from a young person in the community'}
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
          {/* Name */}
          <div>
            <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
              placeholder="Enter student's name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Age and School */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Age
              </label>
              <input
                type="number"
                {...register('age', {
                  min: { value: 1, message: 'Age must be at least 1' },
                  max: { value: 25, message: 'Age must be 25 or less' }
                })}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                placeholder="e.g., 16"
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
              )}
            </div>

            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                School / College
              </label>
              <input
                type="text"
                {...register('school')}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                placeholder="e.g., St. Xavier's High School"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
              Testimonial Message <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('content', { required: 'Message is required' })}
              rows={6}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent resize-none"
              placeholder="Enter the testimonial message..."
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
            )}
          </div>

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
