'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Save, Plus, X, Upload, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { UploadButton } from '@/lib/uploadthing';
import { CustomDropdown } from './CustomDropdown';

interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  status: string;
  progress?: number;
  budget?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  images: string[];
  highlights: string[];
  impact?: string;
  published: boolean;
}

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData> & { id?: string };
  isEdit?: boolean;
}

export function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [status, setStatus] = useState(initialData?.status || 'ongoing');
  const [progress, setProgress] = useState<number | undefined>(initialData?.progress);
  const [budget, setBudget] = useState(initialData?.budget || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [startDate, setStartDate] = useState(initialData?.startDate || '');
  const [endDate, setEndDate] = useState(initialData?.endDate || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [images, setImages] = useState<string[]>(Array.isArray(initialData?.images) ? initialData.images : []);
  const [highlights, setHighlights] = useState<string[]>(Array.isArray(initialData?.highlights) ? initialData.highlights : []);
  const [impact, setImpact] = useState(initialData?.impact || '');
  const [published, setPublished] = useState(initialData?.published ?? true);

  // Add new highlight
  const addHighlight = () => {
    setHighlights([...highlights, '']);
  };

  // Update highlight at index
  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...highlights];
    newHighlights[index] = value;
    setHighlights(newHighlights);
  };

  // Remove highlight at index
  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  // Add new image URL
  const addImage = () => {
    setImages([...images, '']);
  };

  // Update image at index
  const updateImage = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  // Delete image from Uploadthing
  const deleteFromUploadthing = async (url: string) => {
    // Only delete if it's an Uploadthing URL
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

  // Remove image at index
  const removeImage = async (index: number) => {
    const imageUrl = images[index];
    await deleteFromUploadthing(imageUrl);
    setImages(images.filter((_, i) => i !== index));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const data = {
        title,
        description,
        category,
        status,
        progress: progress || undefined,
        budget: budget || undefined,
        location: location || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        image: image || undefined,
        images: images.filter(Boolean), // Remove empty strings
        highlights: highlights.filter(Boolean), // Remove empty strings
        impact: impact || undefined,
        published,
      };

      const url = isEdit ? `/api/admin/project/${initialData?.id}` : '/api/admin/project';
      const method = isEdit ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save project');
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (err) {
      setError('Failed to save project. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/projects"
          className="p-2 hover:bg-cream rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-charcoal" />
        </Link>
        <div>
          <h1 className="text-charcoal mb-2" style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'var(--font-family-serif)' }}>
            {isEdit ? 'Edit Project' : 'Add New Project'}
          </h1>
          <p className="text-charcoal-light" style={{ fontSize: '16px' }}>
            {isEdit ? 'Update project information' : 'Create a new community project'}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-6">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-border p-8">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
              placeholder="e.g., Ward Road Reconstruction"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
              Project Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={6}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent resize-none"
              placeholder="Describe the project in detail..."
            />
          </div>

          {/* Category and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomDropdown
              label="Category"
              required
              value={category}
              onChange={setCategory}
              placeholder="Select Category"
              options={[
                { value: 'Infrastructure', label: 'Infrastructure' },
                { value: 'Education', label: 'Education' },
                { value: 'Healthcare', label: 'Healthcare' },
                { value: 'Public Safety', label: 'Public Safety' },
                { value: 'Community Welfare', label: 'Community Welfare' },
                { value: 'Cleanliness & Sanitation', label: 'Cleanliness & Sanitation' },
              ]}
            />

            <CustomDropdown
              label="Project Status"
              required
              value={status}
              onChange={setStatus}
              options={[
                { value: 'upcoming', label: 'Upcoming' },
                { value: 'ongoing', label: 'Ongoing' },
                { value: 'completed', label: 'Completed' },
              ]}
            />
          </div>

          {/* Progress (only for ongoing projects) */}
          {status === 'ongoing' && (
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Progress Percentage
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress || 0}
                  onChange={(e) => setProgress(parseInt(e.target.value))}
                  className="flex-1"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={progress || ''}
                  onChange={(e) => setProgress(e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-24 px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent text-center"
                  placeholder="0"
                />
                <span className="text-charcoal-light font-semibold">%</span>
              </div>
            </div>
          )}

          {/* Budget and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Budget
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                placeholder="e.g., ₹2.5 Crore"
              />
            </div>

            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                placeholder="e.g., Colaba Ward, South Mumbai"
              />
            </div>
          </div>

          {/* Start Date and End/Expected Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                {status === 'completed' ? 'Completion Date' : 'Expected Completion'}
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
              />
            </div>
          </div>

          {/* Main Image */}
          <div>
            <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
              Main Project Image
            </label>

            {/* Image Preview */}
            {image && (
              <div className="mb-4 relative">
                <img
                  src={image}
                  alt="Main project preview"
                  className="w-full h-64 object-cover rounded-xl border-2 border-border"
                />
                <button
                  type="button"
                  onClick={async () => {
                    await deleteFromUploadthing(image);
                    setImage('');
                  }}
                  className="absolute top-3 right-3 p-2.5 bg-black text-white rounded-full hover:bg-black/90 transition-all shadow-xl border-2 border-white hover:scale-110"
                  title="Remove image"
                >
                  <X className="w-5 h-5 stroke-[3]" />
                </button>
              </div>
            )}

            {/* Upload Button */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      setImage(res[0].url);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`Upload failed: ${error.message}`);
                  }}
                  appearance={{
                    button: "bg-coral text-white px-4 py-2 rounded-xl hover:bg-coral-dark transition-all text-sm font-semibold ut-ready:bg-coral ut-uploading:bg-coral/50",
                    allowedContent: "text-charcoal-light text-xs",
                  }}
                />
              </div>
              <span className="text-charcoal-light text-sm">or</span>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="flex-1 px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                placeholder="Paste image URL"
              />
            </div>
            <p className="text-charcoal-light text-xs mt-2">Upload an image or paste a URL. Main image displayed on project cards.</p>
          </div>

          {/* Gallery Images */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-charcoal font-semibold" style={{ fontSize: '14px' }}>
                Project Gallery
              </label>
              <div className="flex gap-2">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res) {
                      const newImages = res.map(file => file.url);
                      setImages([...images, ...newImages]);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`Upload failed: ${error.message}`);
                  }}
                  appearance={{
                    button: "bg-coral text-white px-4 py-2 rounded-xl hover:bg-coral-dark transition-all text-sm font-semibold ut-ready:bg-coral ut-uploading:bg-coral/50 flex items-center gap-2",
                    allowedContent: "hidden",
                  }}
                  content={{
                    button: (
                      <>
                        <Upload className="w-4 h-4" />
                        Upload Images
                      </>
                    ),
                  }}
                />
              </div>
            </div>

            {images.length === 0 ? (
              <div className="bg-cream border-2 border-dashed border-border rounded-xl p-8 text-center">
                <ImageIcon className="w-12 h-12 text-charcoal-light mx-auto mb-3" />
                <p className="text-charcoal-light mb-2" style={{ fontSize: '14px' }}>No gallery images added yet</p>
                <p className="text-charcoal-light text-xs">Upload images using the button above</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-40 object-cover rounded-xl border-2 border-border"
                    />
                    {/* Delete Button - Always Visible */}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-3 p-1 bg-white text-black rounded-full hover:bg-black/10 transition-all shadow-xl border-2 border-black hover:scale-105"
                      title="Remove image"
                    >
                      <X className="w-4 h-4 stroke-[3] color-black" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Key Details/Highlights */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-charcoal font-semibold" style={{ fontSize: '14px' }}>
                Key Details/Highlights
              </label>
              <button
                type="button"
                onClick={addHighlight}
                className="flex items-center gap-2 px-4 py-2 bg-coral-light text-coral rounded-xl hover:bg-coral hover:text-white transition-all"
                style={{ fontSize: '13px', fontWeight: 600 }}
              >
                <Plus className="w-4 h-4" />
                Add Highlight
              </button>
            </div>
            {highlights.length === 0 ? (
              <div className="bg-cream border-2 border-dashed border-border rounded-xl p-6 text-center">
                <p className="text-charcoal-light" style={{ fontSize: '14px' }}>No highlights added yet. Click "Add Highlight" to start.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <textarea
                      value={highlight}
                      onChange={(e) => updateHighlight(index, e.target.value)}
                      rows={2}
                      className="flex-1 px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent resize-none"
                      placeholder={`Highlight ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Impact/Expected Completion */}
          <div>
            <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
              {status === 'completed' ? 'Project Impact' : 'Expected Completion / Impact'}
            </label>
            <textarea
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent resize-none"
              placeholder={status === 'completed' ? 'e.g., Benefits over 50,000 residents daily' : 'e.g., Expected completion: March 2026'}
            />
          </div>

          {/* Published */}
          <div className="flex items-center gap-3 p-4 bg-cream rounded-xl">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              id="published"
              className="w-5 h-5 text-coral border-border rounded focus:ring-2 focus:ring-coral"
            />
            <label htmlFor="published" className="text-charcoal font-semibold" style={{ fontSize: '14px' }}>
              Publish immediately (visible on website)
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-border">
          <Link
            href="/admin/projects"
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
            {isSubmitting ? 'Saving...' : (isEdit ? 'Update Project' : 'Create Project')}
          </button>
        </div>
      </form>
    </div>
  );
}
