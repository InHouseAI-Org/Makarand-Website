'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

interface TogglePublishButtonProps {
  id: string;
  published: boolean;
  type: 'project' | 'governmentProject' | 'wardOfficer' | 'media' | 'testimonial' | 'gallery' | 'socialMedia' | 'youthTestimonial' | 'event';
}

export function TogglePublishButton({ id, published, type }: TogglePublishButtonProps) {
  const router = useRouter();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);

    try {
      // Gallery and socialMedia use 'isPublished' field, events use 'active', others use 'published'
      let fieldName = 'published';
      if (type === 'gallery' || type === 'socialMedia') {
        fieldName = 'isPublished';
      } else if (type === 'event') {
        fieldName = 'active';
      }

      const apiPath = type === 'event'
        ? `/api/events/${id}`
        : `/api/admin/${type}/${id}/publish`;

      const response = await fetch(apiPath, {
        method: type === 'event' ? 'PUT' : 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(type === 'event'
          ? { [fieldName]: !published }
          : { [fieldName]: !published }
        ),
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert('Failed to update. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isToggling}
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full transition-all disabled:opacity-50 ${
        published
          ? 'bg-green-100 text-green-700 hover:bg-green-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
      style={{ fontSize: '12px', fontWeight: 600 }}
    >
      {published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
      {published ? 'Published' : 'Draft'}
    </button>
  );
}
