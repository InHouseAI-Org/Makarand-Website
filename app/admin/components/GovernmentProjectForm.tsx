'use client';

import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Save, Upload, Link2, X, Plus, FileText, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { UploadButton } from '@/lib/uploadthing';
import { CustomDropdown } from './CustomDropdown';

interface GovernmentProjectFormData {
  title: string;
  description: string;
  department: string;
  status: string;
  budget?: string;
  location?: string;
  startDate?: string;
  completionDate?: string;
  beneficiaries?: string;
  image?: string;
  images?: string;
  documents?: string;
  published: boolean;
}

interface GovernmentProjectFormProps {
  initialData?: GovernmentProjectFormData & { id?: string };
  isEdit?: boolean;
}

export function GovernmentProjectForm({ initialData, isEdit = false }: GovernmentProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Upload method toggles
  const [mainImageMethod, setMainImageMethod] = useState<'upload' | 'url'>('upload');
  const [additionalImagesMethod, setAdditionalImagesMethod] = useState<'upload' | 'url'>('upload');
  const [documentsMethod, setDocumentsMethod] = useState<'upload' | 'url'>('upload');

  // Uploaded files state
  const [uploadedMainImage, setUploadedMainImage] = useState(initialData?.image || '');
  const [uploadedAdditionalImages, setUploadedAdditionalImages] = useState<string[]>(
    initialData?.images ? initialData.images.split(',').map(s => s.trim()).filter(Boolean) : []
  );
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>(
    initialData?.documents ? initialData.documents.split(',').map(s => s.trim()).filter(Boolean) : []
  );

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<GovernmentProjectFormData>({
    defaultValues: initialData || {
      title: '',
      description: '',
      department: '',
      status: 'ongoing',
      budget: '',
      location: '',
      startDate: '',
      completionDate: '',
      beneficiaries: '',
      image: '',
      images: '',
      documents: '',
      published: true,
    },
  });

  // Delete file from Uploadthing
  const deleteFromUploadthing = async (url: string) => {
    if (url.includes('utfs.io')) {
      try {
        await fetch('/api/uploadthing/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });
      } catch (error) {
        console.error('Failed to delete file from Uploadthing:', error);
      }
    }
  };

  // Main image handlers
  const handleRemoveMainImage = async () => {
    if (uploadedMainImage) {
      await deleteFromUploadthing(uploadedMainImage);
      setUploadedMainImage('');
      setValue('image', '');
    }
  };

  // Additional images handlers
  const handleRemoveAdditionalImage = async (index: number) => {
    const imageUrl = uploadedAdditionalImages[index];
    await deleteFromUploadthing(imageUrl);
    const newImages = uploadedAdditionalImages.filter((_, i) => i !== index);
    setUploadedAdditionalImages(newImages);
    setValue('images', newImages.join(', '));
  };

  // Document handlers
  const handleRemoveDocument = async (index: number) => {
    const docUrl = uploadedDocuments[index];
    await deleteFromUploadthing(docUrl);
    const newDocs = uploadedDocuments.filter((_, i) => i !== index);
    setUploadedDocuments(newDocs);
    setValue('documents', newDocs.join(', '));
  };

  const onSubmit = async (data: GovernmentProjectFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      // Use uploaded files if available, otherwise use form URLs
      const finalMainImage = uploadedMainImage || data.image;
      const finalAdditionalImages = uploadedAdditionalImages.length > 0
        ? uploadedAdditionalImages
        : (data.images ? data.images.split(',').map(s => s.trim()).filter(Boolean) : []);
      const finalDocuments = uploadedDocuments.length > 0
        ? uploadedDocuments
        : (data.documents ? data.documents.split(',').map(s => s.trim()).filter(Boolean) : []);

      // Process array fields (comma-separated strings to arrays)
      const processedData = {
        ...data,
        image: finalMainImage || undefined,
        images: finalAdditionalImages,
        documents: finalDocuments,
        // Remove empty optional fields
        budget: data.budget || undefined,
        location: data.location || undefined,
        startDate: data.startDate || undefined,
        completionDate: data.completionDate || undefined,
        beneficiaries: data.beneficiaries || undefined,
      };

      const url = isEdit ? `/api/admin/governmentProject/${initialData?.id}` : '/api/admin/governmentProject';
      const method = isEdit ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        throw new Error('Failed to save government project');
      }

      router.push('/admin/government-projects');
      router.refresh();
    } catch (err) {
      setError('Failed to save government project. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/government-projects"
          className="p-2 hover:bg-cream rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-charcoal" />
        </Link>
        <div>
          <h1 className="text-charcoal mb-2" style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'var(--font-family-serif)' }}>
            {isEdit ? 'Edit Government Project' : 'Add New Government Project'}
          </h1>
          <p className="text-charcoal-light" style={{ fontSize: '16px' }}>
            {isEdit ? 'Update government project information' : 'Create a new government project'}
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
          {/* Title */}
          <div>
            <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
              placeholder="Enter government project title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={6}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent resize-none"
              placeholder="Enter government project description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Department and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('department', { required: 'Department is required' })}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                placeholder="e.g., Public Works, Health, Education"
              />
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
              )}
            </div>

            <div>
              <Controller
                name="status"
                control={control}
                rules={{ required: 'Status is required' }}
                render={({ field }) => (
                  <CustomDropdown
                    label="Status"
                    required
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      { value: 'ongoing', label: 'Ongoing' },
                      { value: 'completed', label: 'Completed' },
                    ]}
                  />
                )}
              />
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
              )}
            </div>
          </div>

          {/* Budget and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Budget
              </label>
              <input
                type="text"
                {...register('budget')}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                placeholder="e.g., Rs. 2 Crores"
              />
            </div>

            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Location
              </label>
              <input
                type="text"
                {...register('location')}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                placeholder="e.g., Pune, Maharashtra"
              />
            </div>
          </div>

          {/* Start Date and Completion Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Start Date
              </label>
              <input
                type="date"
                {...register('startDate')}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Completion Date
              </label>
              <input
                type="date"
                {...register('completionDate')}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
              />
            </div>
          </div>

          {/* Beneficiaries */}
          <div>
            <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
              Beneficiaries
            </label>
            <input
              type="text"
              {...register('beneficiaries')}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
              placeholder="e.g., 50,000+ citizens, Students of Ward 118"
            />
            <p className="text-charcoal-light text-sm mt-1">Describe who benefits from this project</p>
          </div>

          {/* Main Image */}
          <div>
            <label className="block text-charcoal font-semibold mb-3" style={{ fontSize: '14px' }}>
              Main Image
            </label>
            <div className="flex gap-3 mb-4">
              <button
                type="button"
                onClick={() => setMainImageMethod('upload')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  mainImageMethod === 'upload'
                    ? 'bg-coral text-white shadow-md'
                    : 'bg-gray-100 text-charcoal-light hover:bg-gray-200'
                }`}
                style={{ fontSize: '14px' }}
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </button>
              <button
                type="button"
                onClick={() => setMainImageMethod('url')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  mainImageMethod === 'url'
                    ? 'bg-coral text-white shadow-md'
                    : 'bg-gray-100 text-charcoal-light hover:bg-gray-200'
                }`}
                style={{ fontSize: '14px' }}
              >
                <Link2 className="w-4 h-4" />
                Image URL
              </button>
            </div>

            {/* Upload Method */}
            {mainImageMethod === 'upload' && (
              <div>
                {uploadedMainImage ? (
                  <div className="border-2 border-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-charcoal font-semibold" style={{ fontSize: '14px' }}>
                        Image Uploaded
                      </p>
                      <button
                        type="button"
                        onClick={handleRemoveMainImage}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-2">
                      <img src={uploadedMainImage} alt="Main image preview" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-charcoal-light text-sm truncate">{uploadedMainImage}</p>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        if (res && res[0]) {
                          setUploadedMainImage(res[0].url);
                          setValue('image', res[0].url);
                        }
                      }}
                      onUploadError={(error: Error) => {
                        setError(`Upload failed: ${error.message}`);
                      }}
                    />
                    <p className="text-charcoal-light text-sm mt-2">
                      Click to upload main image (Max 4MB)
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* URL Method */}
            {mainImageMethod === 'url' && (
              <div>
                <input
                  type="text"
                  {...register('image')}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-charcoal-light text-sm mt-1">Enter the URL of the main project image</p>
              </div>
            )}
          </div>

          {/* Additional Images */}
          <div>
            <label className="block text-charcoal font-semibold mb-3" style={{ fontSize: '14px' }}>
              Additional Images
            </label>
            <div className="flex gap-3 mb-4">
              <button
                type="button"
                onClick={() => setAdditionalImagesMethod('upload')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  additionalImagesMethod === 'upload'
                    ? 'bg-coral text-white shadow-md'
                    : 'bg-gray-100 text-charcoal-light hover:bg-gray-200'
                }`}
                style={{ fontSize: '14px' }}
              >
                <Upload className="w-4 h-4" />
                Upload Images
              </button>
              <button
                type="button"
                onClick={() => setAdditionalImagesMethod('url')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  additionalImagesMethod === 'url'
                    ? 'bg-coral text-white shadow-md'
                    : 'bg-gray-100 text-charcoal-light hover:bg-gray-200'
                }`}
                style={{ fontSize: '14px' }}
              >
                <Link2 className="w-4 h-4" />
                Image URLs
              </button>
            </div>

            {/* Upload Method */}
            {additionalImagesMethod === 'upload' && (
              <div>
                {uploadedAdditionalImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {uploadedAdditionalImages.map((imageUrl, index) => (
                      <div key={index} className="border-2 border-border rounded-xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-charcoal font-semibold text-sm">Image {index + 1}</p>
                          <button
                            type="button"
                            onClick={() => handleRemoveAdditionalImage(index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          <img src={imageUrl} alt={`Additional ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res && res[0]) {
                        const newImages = [...uploadedAdditionalImages, res[0].url];
                        setUploadedAdditionalImages(newImages);
                        setValue('images', newImages.join(', '));
                      }
                    }}
                    onUploadError={(error: Error) => {
                      setError(`Upload failed: ${error.message}`);
                    }}
                  />
                  <p className="text-charcoal-light text-sm mt-2">
                    Click to upload additional images (Max 4MB each)
                  </p>
                </div>
              </div>
            )}

            {/* URL Method */}
            {additionalImagesMethod === 'url' && (
              <div>
                <input
                  type="text"
                  {...register('images')}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                  placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                />
                <p className="text-charcoal-light text-sm mt-1">Enter multiple image URLs separated by commas</p>
              </div>
            )}
          </div>

          {/* Documents */}
          <div>
            <label className="block text-charcoal font-semibold mb-3" style={{ fontSize: '14px' }}>
              Documents (PDFs, Reports)
            </label>
            <div className="flex gap-3 mb-4">
              <button
                type="button"
                onClick={() => setDocumentsMethod('upload')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  documentsMethod === 'upload'
                    ? 'bg-coral text-white shadow-md'
                    : 'bg-gray-100 text-charcoal-light hover:bg-gray-200'
                }`}
                style={{ fontSize: '14px' }}
              >
                <Upload className="w-4 h-4" />
                Upload Files
              </button>
              <button
                type="button"
                onClick={() => setDocumentsMethod('url')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  documentsMethod === 'url'
                    ? 'bg-coral text-white shadow-md'
                    : 'bg-gray-100 text-charcoal-light hover:bg-gray-200'
                }`}
                style={{ fontSize: '14px' }}
              >
                <Link2 className="w-4 h-4" />
                File URLs
              </button>
            </div>

            {/* Upload Method */}
            {documentsMethod === 'upload' && (
              <div>
                {uploadedDocuments.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {uploadedDocuments.map((docUrl, index) => (
                      <div key={index} className="flex items-center justify-between border-2 border-border rounded-xl p-3">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-coral" />
                          <div className="flex-1 min-w-0">
                            <p className="text-charcoal font-semibold text-sm">Document {index + 1}</p>
                            <p className="text-charcoal-light text-xs truncate">{docUrl}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveDocument(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all flex-shrink-0"
                          title="Remove"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res && res[0]) {
                        const newDocs = [...uploadedDocuments, res[0].url];
                        setUploadedDocuments(newDocs);
                        setValue('documents', newDocs.join(', '));
                      }
                    }}
                    onUploadError={(error: Error) => {
                      setError(`Upload failed: ${error.message}`);
                    }}
                  />
                  <p className="text-charcoal-light text-sm mt-2">
                    Click to upload documents (PDFs, reports, etc.)
                  </p>
                </div>
              </div>
            )}

            {/* URL Method */}
            {documentsMethod === 'url' && (
              <div>
                <input
                  type="text"
                  {...register('documents')}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                  placeholder="https://example.com/doc1.pdf, https://example.com/doc2.pdf"
                />
                <p className="text-charcoal-light text-sm mt-1">Enter document URLs separated by commas (PDFs, reports, etc.)</p>
              </div>
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
              Publish immediately
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-border">
          <Link
            href="/admin/government-projects"
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
            {isSubmitting ? 'Saving...' : (isEdit ? 'Update Government Project' : 'Create Government Project')}
          </button>
        </div>
      </form>
    </div>
  );
}
