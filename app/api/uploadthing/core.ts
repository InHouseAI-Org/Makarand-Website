import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/auth";

const f = createUploadthing();

/**
 * Middleware to check if the user is authenticated as an admin
 */
async function authMiddleware() {
  const session = await auth();

  if (!session || !session.user) {
    throw new UploadThingError("Unauthorized - You must be logged in to upload files");
  }

  // Return user metadata to be available in onUploadComplete
  return { userId: session.user.id };
}

/**
 * File router for Uploadthing
 * This is the main router configuration for handling different types of uploads
 */
export const ourFileRouter = {
  /**
   * Image uploader - for general images (gallery, press, awards, etc.)
   * Max file size: 4MB
   * Allowed types: image/png, image/jpeg, image/webp
   */
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 10,
    },
  })
    .middleware(async () => {
      return await authMiddleware();
    })
    .onUploadComplete(async ({ metadata, file }) => {

      // Return data that will be sent to the client
      return {
        uploadedBy: metadata.userId,
        url: file.url,
        name: file.name,
        size: file.size,
      };
    }),

  /**
   * Document uploader - for PDFs, documents, and other files
   * Max file size: 8MB
   * Allowed types: pdf, doc, docx
   */
  documentUploader: f({
    pdf: {
      maxFileSize: "8MB",
      maxFileCount: 5,
    },
  })
    .middleware(async () => {
      return await authMiddleware();
    })
    .onUploadComplete(async ({ metadata, file }) => {

      // Return data that will be sent to the client
      return {
        uploadedBy: metadata.userId,
        url: file.url,
        name: file.name,
        size: file.size,
      };
    }),

  /**
   * Thumbnail uploader - for video thumbnails and preview images
   * Max file size: 2MB
   * Allowed types: image/png, image/jpeg, image/webp
   */
  thumbnailUploader: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      return await authMiddleware();
    })
    .onUploadComplete(async ({ metadata, file }) => {

      return {
        uploadedBy: metadata.userId,
        url: file.url,
        name: file.name,
        size: file.size,
      };
    }),

  /**
   * Profile photo uploader - for ward officers and team members
   * Max file size: 2MB
   * Allowed types: image/png, image/jpeg, image/webp
   */
  profilePhotoUploader: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      return await authMiddleware();
    })
    .onUploadComplete(async ({ metadata, file }) => {

      return {
        uploadedBy: metadata.userId,
        url: file.url,
        name: file.name,
        size: file.size,
      };
    }),

  /**
   * Video uploader - for video media content
   * Max file size: 50MB
   * Allowed types: video/mp4, video/webm, video/quicktime
   */
  videoUploader: f({
    video: {
      maxFileSize: "50MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      return await authMiddleware();
    })
    .onUploadComplete(async ({ metadata, file }) => {

      return {
        uploadedBy: metadata.userId,
        url: file.url,
        name: file.name,
        size: file.size,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
