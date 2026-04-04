/**
 * Converts an image file to WebP format
 * @param file - The original image file (PNG, JPG, JPEG)
 * @param quality - WebP quality (0-1), default 0.85
 * @returns Promise<File> - The converted WebP file
 */
export async function convertImageToWebP(
  file: File,
  quality: number = 0.85
): Promise<File> {
  return new Promise((resolve, reject) => {
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      reject(new Error('File is not an image'));
      return;
    }

    // If already WebP, return as-is
    if (file.type === 'image/webp') {
      resolve(file);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Draw image on canvas
        ctx.drawImage(img, 0, 0);

        // Convert to WebP
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to convert image'));
              return;
            }

            // Create new File from blob
            const webpFileName = file.name.replace(/\.(png|jpg|jpeg)$/i, '.webp');
            const webpFile = new File([blob], webpFileName, {
              type: 'image/webp',
              lastModified: Date.now(),
            });

            resolve(webpFile);
          },
          'image/webp',
          quality
        );
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Converts multiple image files to WebP format
 * @param files - Array of image files
 * @param quality - WebP quality (0-1), default 0.85
 * @returns Promise<File[]> - Array of converted WebP files
 */
export async function convertImagesToWebP(
  files: File[],
  quality: number = 0.85
): Promise<File[]> {
  const conversions = files.map((file) => {
    // Only convert image files
    if (file.type.startsWith('image/')) {
      return convertImageToWebP(file, quality);
    }
    // Return non-image files as-is (e.g., PDFs, videos)
    return Promise.resolve(file);
  });

  return Promise.all(conversions);
}

/**
 * Checks if a file is a video
 * @param file - The file to check
 * @returns boolean
 */
export function isVideo(file: File): boolean {
  return file.type.startsWith('video/');
}

/**
 * Checks if a file is an image
 * @param file - The file to check
 * @returns boolean
 */
export function isImage(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * Gets a human-readable file size
 * @param bytes - File size in bytes
 * @returns string - Formatted file size (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
