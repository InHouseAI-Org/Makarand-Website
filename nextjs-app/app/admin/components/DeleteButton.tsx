'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  id: string;
  type: 'project' | 'governmentProject' | 'wardOfficer' | 'media' | 'testimonial' | 'gallery' | 'socialMedia' | 'youthTestimonial' | 'event';
  title?: string;
}

export function DeleteButton({ id, type, title }: DeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmMessage = title
      ? `Are you sure you want to delete "${title}"? This action cannot be undone.`
      : 'Are you sure you want to delete this item? This action cannot be undone.';

    if (!confirm(confirmMessage)) {
      return;
    }

    setIsDeleting(true);

    try {
      const apiPath = type === 'event' ? `/api/events/${id}` : `/api/admin/${type}/${id}`;
      const response = await fetch(apiPath, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert('Failed to delete. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
      title="Delete"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
