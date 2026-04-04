import {
  generateUploadButton,
  generateUploadDropzone,
  generateReactHelpers,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

/**
 * Pre-configured UploadButton component
 * Use this in your forms for a simple upload button
 *
 * Example usage:
 * ```tsx
 * <UploadButton
 *   endpoint="imageUploader"
 *   onClientUploadComplete={(res) => {
 *     console.log("Files: ", res);
 *     alert("Upload Completed");
 *   }}
 *   onUploadError={(error: Error) => {
 *     alert(`ERROR! ${error.message}`);
 *   }}
 * />
 * ```
 */
export const UploadButton = generateUploadButton<OurFileRouter>();

/**
 * Pre-configured UploadDropzone component
 * Use this in your forms for a drag-and-drop upload zone
 *
 * Example usage:
 * ```tsx
 * <UploadDropzone
 *   endpoint="imageUploader"
 *   onClientUploadComplete={(res) => {
 *     console.log("Files: ", res);
 *     alert("Upload Completed");
 *   }}
 *   onUploadError={(error: Error) => {
 *     alert(`ERROR! ${error.message}`);
 *   }}
 * />
 * ```
 */
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

/**
 * React helpers for advanced upload handling
 * Provides useUploadThing hook for custom implementations
 *
 * Example usage:
 * ```tsx
 * const { startUpload, isUploading } = useUploadThing("imageUploader", {
 *   onClientUploadComplete: (res) => {
 *     console.log("uploaded", res);
 *   },
 *   onUploadError: (error) => {
 *     console.error("error", error);
 *   },
 * });
 * ```
 */
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
