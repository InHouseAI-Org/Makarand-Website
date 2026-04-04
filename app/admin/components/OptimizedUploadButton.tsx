'use client';

import { UploadButton } from '@/lib/uploadthing';
import { convertImagesToWebP } from '@/lib/imageConverter';
import type { OurFileRouter } from '@/app/api/uploadthing/core';
import type { UploadFileResponse } from 'uploadthing/client';

interface OptimizedUploadButtonProps {
  endpoint: keyof OurFileRouter;
  onClientUploadComplete?: (res: UploadFileResponse[]) => void;
  onUploadError?: (error: Error) => void;
  onBeforeUploadBegin?: (files: File[]) => File[] | Promise<File[]>;
  disabled?: boolean;
}

/**
 * Optimized Upload Button that automatically converts images to WebP before upload
 * Videos are uploaded as-is (MP4 is preferred over WebM for compatibility)
 */
export function OptimizedUploadButton({
  endpoint,
  onClientUploadComplete,
  onUploadError,
  onBeforeUploadBegin,
  disabled,
}: OptimizedUploadButtonProps) {
  const handleBeforeUploadBegin = async (files: File[]): Promise<File[]> => {
    try {
      // Convert images to WebP (quality 85%)
      const optimizedFiles = await convertImagesToWebP(files, 0.85);

      // If user provided custom onBeforeUploadBegin, call it after our optimization
      if (onBeforeUploadBegin) {
        return await Promise.resolve(onBeforeUploadBegin(optimizedFiles));
      }

      return optimizedFiles;
    } catch (error) {
      console.error('Error converting files:', error);
      // If conversion fails, upload original files
      return files;
    }
  };

  return (
    <UploadButton
      endpoint={endpoint}
      onClientUploadComplete={onClientUploadComplete}
      onUploadError={onUploadError}
      onBeforeUploadBegin={handleBeforeUploadBegin}
      config={{
        mode: 'auto',
      }}
      disabled={disabled}
      appearance={{
        button:
          'ut-ready:bg-coral ut-uploading:cursor-not-allowed rounded-xl bg-coral bg-none after:bg-coral-dark hover:bg-coral-dark transition-colors',
        container: 'w-full flex-row rounded-xl',
        allowedContent:
          'flex h-8 flex-col items-center justify-center px-2 text-charcoal-light',
      }}
    />
  );
}
