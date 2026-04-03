'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';

export function AddImageButton({ isDisabled }: { isDisabled: boolean }) {
  return (
    <Link
      href="/admin/gallery/new"
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
        isDisabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-coral text-white hover:bg-coral-dark hover:shadow-xl'
      }`}
      style={{ fontSize: '14px' }}
      aria-disabled={isDisabled}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault();
        }
      }}
    >
      <Plus className="w-5 h-5" />
      Add New Image
    </Link>
  );
}
