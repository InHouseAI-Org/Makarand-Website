'use client';

import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Save, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { CustomDropdown } from './CustomDropdown';

interface SocialMediaFormData {
  platform: 'youtube' | 'instagram';
  postUrl: string;
  title?: string;
  displayOrder: number;
  isPublished: boolean;
}

interface SocialMediaFormProps {
  initialData?: SocialMediaFormData & { id?: string };
  isEdit?: boolean;
  initialPlatform?: string;
}

export function SocialMediaForm({ initialData, isEdit = false, initialPlatform }: SocialMediaFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SocialMediaFormData>({
    defaultValues: initialData || {
      platform: (initialPlatform === 'instagram' || initialPlatform === 'youtube') ? initialPlatform : 'youtube',
      postUrl: '',
      title: '',
      displayOrder: 0,
      isPublished: true,
    },
  });

  const selectedPlatform = watch('platform');

  const getPlaceholderUrl = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return 'https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID';
      case 'instagram':
        return 'https://www.instagram.com/p/POST_ID/ or https://www.instagram.com/reel/REEL_ID/';
      default:
        return 'Enter the full URL to the post';
    }
  };

  const onSubmit = async (data: SocialMediaFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      const url = isEdit
        ? `/api/admin/social-media/${initialData?.id}`
        : '/api/admin/social-media';
      const method = isEdit ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform: data.platform,
          postUrl: data.postUrl,
          title: data.title || undefined,
          displayOrder: Number(data.displayOrder),
          isPublished: data.isPublished,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save social media post');
      }

      router.push('/admin/social-media');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to save social media post. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/social-media"
          className="p-2 hover:bg-cream rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-charcoal" />
        </Link>
        <div>
          <h1 className="text-charcoal mb-2" style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'var(--font-family-serif)' }}>
            {isEdit ? 'Edit Social Media Post' : 'Add New Social Media Post'}
          </h1>
          <p className="text-charcoal-light" style={{ fontSize: '16px' }}>
            {isEdit ? 'Update social media post information' : 'Add a new post from your social media channels'}
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
          {/* Platform Selector */}
          <div>
            <Controller
              name="platform"
              control={control}
              rules={{ required: 'Platform is required' }}
              render={({ field }) => (
                <CustomDropdown
                  label="Platform"
                  required
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isEdit}
                  options={[
                    { value: 'youtube', label: 'YouTube' },
                    { value: 'instagram', label: 'Instagram' },
                  ]}
                />
              )}
            />
            {errors.platform && (
              <p className="text-red-500 text-sm mt-1">{errors.platform.message}</p>
            )}
            {isEdit && (
              <p className="text-charcoal-light text-sm mt-1">
                Platform cannot be changed after creation
              </p>
            )}
          </div>

          {/* Post URL */}
          <div>
            <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
              Post URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              {...register('postUrl', {
                required: 'Post URL is required',
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: 'Please enter a valid URL starting with http:// or https://'
                }
              })}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
              placeholder={getPlaceholderUrl(selectedPlatform)}
            />
            {errors.postUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.postUrl.message}</p>
            )}
            <p className="text-charcoal-light text-sm mt-1">
              <ExternalLink className="w-3 h-3 inline mr-1" />
              Enter the direct link to the post on {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
            </p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
              Title
            </label>
            <input
              type="text"
              {...register('title')}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
              placeholder="Optional: Add a title for this post"
            />
            <p className="text-charcoal-light text-sm mt-1">
              Optional title to help you identify this post in the admin panel
            </p>
          </div>

          {/* Display Order */}
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
            <p className="text-charcoal-light text-sm mt-1">
              Lower numbers appear first (0 = highest priority)
            </p>
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
            href="/admin/social-media"
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
            {isSubmitting ? 'Saving...' : (isEdit ? 'Update Post' : 'Create Post')}
          </button>
        </div>
      </form>
    </div>
  );
}
