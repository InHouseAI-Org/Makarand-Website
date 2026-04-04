'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';
import Link from 'next/link';

interface EventFormProps {
  event?: {
    id: string;
    title: string;
    description: string;
    eventDate: Date;
    location: string | null;
    buttonText: string;
    buttonLink: string | null;
    image: string | null;
    priority: number;
    active: boolean;
  };
}

export default function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    eventDate: event?.eventDate
      ? new Date(event.eventDate).toISOString().slice(0, 16)
      : '',
    location: event?.location || '',
    buttonText: event?.buttonText || 'Register Now',
    buttonLink: event?.buttonLink || '/connect?mode=contact',
    image: event?.image || '',
    priority: event?.priority || 0,
    active: event?.active !== undefined ? event.active : true,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = event
        ? `/api/events/${event.id}`
        : '/api/events';

      const method = event ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save event');
      }

      router.push('/admin/events');
      router.refresh();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white to-cream rounded-2xl border-2 border-border shadow-xl w-full">
      <div className="p-8 space-y-8">
        {/* Basic Information Section */}
        <div className="space-y-6">
          <div className="pb-4 border-b-2 border-border">
            <h2 className="text-charcoal font-bold" style={{ fontSize: '20px', fontFamily: 'var(--font-family-serif)' }}>
              Event Information
            </h2>
            <p className="text-charcoal-light mt-1" style={{ fontSize: '13px' }}>
              Basic details about your event
            </p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
              Event Title <span className="text-coral">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-coral transition-all bg-white"
              style={{ fontSize: '15px' }}
              placeholder="Enter a compelling title for your event, e.g. 'Free Health Camp - South Mumbai, 25th Dec'"
            />
            <p className="text-charcoal-light mt-1.5" style={{ fontSize: '12px' }}>
              Give your event a clear, engaging title
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
              Description <span className="text-coral">*</span>
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-coral transition-all resize-none bg-white"
              style={{ fontSize: '15px', lineHeight: '1.6' }}
              placeholder="Provide a detailed description of the event, including what attendees can expect, who should attend, and any other relevant information to encourage participation."
            />
            <p className="text-charcoal-light mt-1.5" style={{ fontSize: '12px' }}>
              Describe what attendees can expect at your event
            </p>
          </div>

          {/* Event Date & Location Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Event Date & Time <span className="text-coral">*</span>
              </label>
              <input
                type="datetime-local"
                required
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-coral transition-all bg-white"
                style={{ fontSize: '15px' }}
              />
            </div>

            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-coral transition-all bg-white"
                style={{ fontSize: '15px' }}
                placeholder="Enter the event location, e.g. 'Community Hall, South Mumbai' or 'Online - Zoom'"
              />
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="space-y-6">
          <div className="pb-4 border-b-2 border-border">
            <h2 className="text-charcoal font-bold" style={{ fontSize: '20px', fontFamily: 'var(--font-family-serif)' }}>
              Call to Action
            </h2>
            <p className="text-charcoal-light mt-1" style={{ fontSize: '13px' }}>
              Configure the action button in the popup
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Button Text */}
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Button Text
              </label>
              <input
                type="text"
                value={formData.buttonText}
                onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-coral transition-all bg-white"
                style={{ fontSize: '15px' }}
                placeholder="Register Now"
              />
            </div>

            {/* Button Link */}
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Button Link
              </label>
              <input
                type="text"
                value={formData.buttonLink}
                onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-coral transition-all bg-white"
                style={{ fontSize: '15px' }}
                placeholder="/connect?mode=contact"
              />
            </div>
          </div>
          <p className="text-charcoal-light" style={{ fontSize: '12px' }}>
            Use relative URLs like <code className="bg-cream px-2 py-0.5 rounded text-coral">/connect</code> or external URLs like <code className="bg-cream px-2 py-0.5 rounded text-coral">https://forms.google.com/...</code>
          </p>
        </div>

        {/* Settings Section */}
        <div className="space-y-6">
          <div className="pb-4 border-b-2 border-border">
            <h2 className="text-charcoal font-bold" style={{ fontSize: '20px', fontFamily: 'var(--font-family-serif)' }}>
              Display Settings
            </h2>
            <p className="text-charcoal-light mt-1" style={{ fontSize: '13px' }}>
              Control how this event appears
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Priority */}
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Priority Level
              </label>
              <input
                type="number"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-coral transition-all bg-white"
                style={{ fontSize: '15px' }}
                placeholder="0"
                min="0"
                max="100"
              />
              <p className="text-charcoal-light mt-1.5" style={{ fontSize: '12px' }}>
                Higher numbers appear first (0-100)
              </p>
            </div>

            {/* Active Status */}
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Visibility
              </label>
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-border h-[54px]">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-5 h-5 text-coral border-2 border-border rounded focus:ring-coral cursor-pointer"
                />
                <label htmlFor="active" className="text-charcoal font-medium cursor-pointer" style={{ fontSize: '14px' }}>
                  Show in popup
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 p-6 bg-cream border-t-2 border-border rounded-b-2xl">
        <button
          type="submit"
          disabled={loading}
          className="bg-coral hover:bg-coral-dark text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:bg-charcoal-light disabled:cursor-not-allowed"
          style={{ fontSize: '14px' }}
        >
          <Save className="w-5 h-5" />
          {loading ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
        </button>
        <Link
          href="/admin/events"
          className="bg-white hover:bg-cream text-charcoal px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all border-2 border-border"
          style={{ fontSize: '14px' }}
        >
          <X className="w-5 h-5" />
          Cancel
        </Link>
      </div>
    </form>
  );
}
