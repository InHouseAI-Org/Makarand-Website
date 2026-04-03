# Uploadthing Setup Guide

This guide will help you set up Uploadthing for file uploads in the Makarand Narwekar website admin panel.

## What is Uploadthing?

Uploadthing is a file upload service that makes it easy to handle file uploads in Next.js applications. It provides:
- Automatic file hosting on CDN
- Built-in security and authentication
- Simple React components
- Free tier available (suitable for development and small projects)

## Step 1: Get Uploadthing API Keys

1. **Sign up for Uploadthing**
   - Visit [https://uploadthing.com](https://uploadthing.com)
   - Click "Sign Up" or "Get Started"
   - Sign up with your GitHub account or email

2. **Create a New App**
   - Once logged in, go to the dashboard
   - Click "Create App" or "New Application"
   - Give your app a name (e.g., "Makarand Narwekar Website")
   - Select your region (choose the one closest to your users)

3. **Get Your API Keys**
   - After creating the app, you'll be taken to the app dashboard
   - Look for the "API Keys" section
   - You'll see two keys:
     - **App ID** (starts with `app_`)
     - **Secret** (a long string of characters)
   - Keep these keys secure - you'll need them in the next step

## Step 2: Add Keys to Environment Variables

1. **Open your `.env` file**
   - Located at: `/Users/manavbathija/Desktop/InHouse AI/Makarand/Makarand Narwekar Website Design/nextjs-app/.env`

2. **Replace the placeholder values**
   ```env
   # Uploadthing
   UPLOADTHING_SECRET="your_actual_secret_here"
   UPLOADTHING_APP_ID="your_actual_app_id_here"
   ```

3. **Important Notes:**
   - DO NOT commit the `.env` file to git
   - Keep your secret key private
   - The `.env` file is already in `.gitignore`

## Step 3: Restart Your Development Server

After adding the keys, restart your Next.js development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

## Available Upload Endpoints

Your application now has 4 upload endpoints configured:

### 1. Image Uploader
- **Endpoint:** `imageUploader`
- **Max File Size:** 4MB
- **Max Files:** 10
- **Allowed Types:** PNG, JPEG, WebP
- **Use For:** Gallery images, press coverage images, general photos

### 2. Document Uploader
- **Endpoint:** `documentUploader`
- **Max File Size:** 8MB
- **Max Files:** 5
- **Allowed Types:** PDF
- **Use For:** Documents, reports, official papers

### 3. Thumbnail Uploader
- **Endpoint:** `thumbnailUploader`
- **Max File Size:** 2MB
- **Max Files:** 1
- **Allowed Types:** PNG, JPEG, WebP
- **Use For:** Video thumbnails, preview images

### 4. Profile Photo Uploader
- **Endpoint:** `profilePhotoUploader`
- **Max File Size:** 2MB
- **Max Files:** 1
- **Allowed Types:** PNG, JPEG, WebP
- **Use For:** Ward officer photos, team member photos

## How to Use in Admin Forms

### Option 1: Using UploadButton Component

```tsx
import { UploadButton } from "@/lib/uploadthing";

function MyForm() {
  return (
    <div>
      <label>Upload Image</label>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // res is an array of uploaded files
          console.log("Files uploaded:", res);
          const imageUrl = res[0].url;
          // Save imageUrl to your form state
        }}
        onUploadError={(error: Error) => {
          alert(`Upload failed: ${error.message}`);
        }}
      />
    </div>
  );
}
```

### Option 2: Using UploadDropzone Component

```tsx
import { UploadDropzone } from "@/lib/uploadthing";

function MyForm() {
  return (
    <div>
      <label>Upload Documents</label>
      <UploadDropzone
        endpoint="documentUploader"
        onClientUploadComplete={(res) => {
          console.log("Files uploaded:", res);
          // Handle the uploaded files
        }}
        onUploadError={(error: Error) => {
          alert(`Upload failed: ${error.message}`);
        }}
      />
    </div>
  );
}
```

### Option 3: Using useUploadThing Hook (Advanced)

```tsx
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";

function MyForm() {
  const [files, setFiles] = useState<File[]>([]);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      console.log("Upload complete:", res);
      // Handle success
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
    },
  });

  const handleSubmit = async () => {
    if (files.length > 0) {
      await startUpload(files);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFiles(Array.from(e.target.files || []))}
      />
      <button onClick={handleSubmit} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
```

## React Hook Form Integration Example

Here's how to integrate with React Hook Form (used throughout the admin panel):

```tsx
import { useForm } from "react-hook-form";
import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";

type FormData = {
  title: string;
  imageUrl: string;
};

function MyAdminForm() {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [uploadedUrl, setUploadedUrl] = useState<string>("");

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
    // Submit to your API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input {...register("title")} />
      </div>

      <div>
        <label>Image</label>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            const url = res[0].url;
            setUploadedUrl(url);
            setValue("imageUrl", url); // Update form value
          }}
          onUploadError={(error) => {
            alert(`Upload failed: ${error.message}`);
          }}
        />
        {uploadedUrl && (
          <div>
            <p>Uploaded successfully!</p>
            <img src={uploadedUrl} alt="Preview" width={200} />
          </div>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
```

## File Upload Response Structure

When a file is uploaded successfully, you receive:

```typescript
{
  url: string;           // Public URL of the uploaded file
  name: string;          // Original filename
  size: number;          // File size in bytes
  uploadedBy: string;    // User ID who uploaded the file
}
```

## Security Features

1. **Authentication Required**
   - All upload endpoints require admin authentication
   - Users must be logged in via NextAuth
   - Middleware checks session before allowing uploads

2. **File Size Limits**
   - Enforced at the server level
   - Prevents abuse and excessive storage usage

3. **File Type Restrictions**
   - Only allowed file types can be uploaded
   - Configured per endpoint

## Troubleshooting

### Upload fails with "Unauthorized" error
- Ensure you're logged in to the admin panel
- Check that your NextAuth session is valid

### Upload fails with "Invalid API key" error
- Verify your `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID` in `.env`
- Make sure you restarted the dev server after adding keys
- Check that there are no extra spaces in the `.env` file

### File size limit errors
- Check the file size against the endpoint limits
- For larger files, consider using the `documentUploader` endpoint
- Or modify the limits in `/app/api/uploadthing/core.ts`

### Files not uploading
- Check browser console for errors
- Verify network connection
- Check Uploadthing dashboard for status/logs

## Uploadthing Dashboard

Visit your Uploadthing dashboard to:
- Monitor upload activity
- View storage usage
- Check API logs
- Manage your application settings
- Upgrade your plan if needed

Dashboard URL: [https://uploadthing.com/dashboard](https://uploadthing.com/dashboard)

## Free Tier Limits

Uploadthing's free tier includes:
- 2GB storage
- 1GB bandwidth per month
- Perfect for development and testing

For production, consider upgrading if you exceed these limits.

## Next Steps

1. Test the upload functionality in your admin panel
2. Integrate upload components into your admin forms
3. Monitor usage in the Uploadthing dashboard
4. Consider upgrading to a paid plan before launch if needed

## Support

- Uploadthing Documentation: [https://docs.uploadthing.com](https://docs.uploadthing.com)
- Uploadthing Discord: Join their community for support
- Project Issues: Contact the development team

---

**Last Updated:** April 2026
**Version:** 1.0
