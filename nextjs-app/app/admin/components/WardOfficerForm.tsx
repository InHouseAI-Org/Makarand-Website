'use client';

import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { CustomDropdown } from './CustomDropdown';

interface WardOfficerFormData {
  type: 'wardOfficer' | 'policeStation' | 'fireStation';
  name: string;
  designation: string;
  department: string;
  phone?: string;
  email?: string;
  stationName?: string; // For police and fire stations
  priority: number;
  active: boolean;
}

interface WardOfficerFormProps {
  initialData?: WardOfficerFormData & { id?: string };
  isEdit?: boolean;
}

export function WardOfficerForm({ initialData, isEdit = false }: WardOfficerFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WardOfficerFormData>({
    defaultValues: initialData || {
      type: 'wardOfficer',
      name: '',
      designation: '',
      department: '',
      phone: '',
      email: '',
      stationName: '',
      priority: 0,
      active: true,
    },
  });

  const selectedType = watch('type');

  const onSubmit = async (data: WardOfficerFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      // Process data based on type
      const processedData: any = {
        phone: data.phone || undefined,
        email: data.email || undefined,
        priority: Number(data.priority),
        active: data.active,
      };

      // Add type-specific fields
      if (data.type === 'wardOfficer') {
        processedData.name = data.name;
        processedData.designation = data.designation;
        processedData.department = data.department;
      } else if (data.type === 'policeStation') {
        processedData.stationName = data.stationName;
        processedData.name = data.name;
        processedData.designation = data.designation;
      } else if (data.type === 'fireStation') {
        processedData.stationName = data.stationName;
      }

      const url = isEdit
        ? `/api/admin/${data.type}/${initialData?.id}`
        : `/api/admin/${data.type}`;
      const method = isEdit ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        throw new Error('Failed to save officer');
      }

      router.push('/admin/ward-officers');
      router.refresh();
    } catch (err) {
      setError('Failed to save officer. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/ward-officers"
          className="p-2 hover:bg-cream rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-charcoal" />
        </Link>
        <div>
          <h1 className="text-charcoal mb-2" style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'var(--font-family-serif)' }}>
            {isEdit ? 'Edit Officer/Station' : 'Add New Officer/Station'}
          </h1>
          <p className="text-charcoal-light" style={{ fontSize: '16px' }}>
            {isEdit ? 'Update officer or station information' : 'Add a new ward officer, police station, or fire station'}
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
          {/* Type Selector */}
          <div>
            <Controller
              name="type"
              control={control}
              rules={{ required: 'Type is required' }}
              render={({ field }) => (
                <CustomDropdown
                  label="Type"
                  required
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isEdit}
                  options={[
                    { value: 'wardOfficer', label: 'Ward Officer' },
                    { value: 'policeStation', label: 'Police Station' },
                    { value: 'fireStation', label: 'Fire Station' },
                  ]}
                />
              )}
            />
            {isEdit && (
              <p className="text-charcoal-light text-sm mt-1">Type cannot be changed after creation</p>
            )}
          </div>

          {/* Station Name (for Police and Fire Stations) */}
          {(selectedType === 'policeStation' || selectedType === 'fireStation') && (
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Station Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('stationName', {
                  required: selectedType !== 'wardOfficer' ? 'Station name is required' : false
                })}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                placeholder={selectedType === 'policeStation' ? 'e.g., Colaba Police Station' : 'e.g., Colaba Fire Station'}
              />
              {errors.stationName && (
                <p className="text-red-500 text-sm mt-1">{errors.stationName.message}</p>
              )}
            </div>
          )}

          {/* Name (for Ward Officers and Police Stations) */}
          {selectedType !== 'fireStation' && (
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                {selectedType === 'policeStation' ? 'Officer In Charge Name' : 'Name'} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('name', {
                  required: selectedType !== 'fireStation' ? 'Name is required' : false
                })}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                placeholder={selectedType === 'policeStation' ? 'Enter officer in charge name' : 'Enter officer name'}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
          )}

          {/* Designation (for Ward Officers and Police Stations) */}
          {selectedType !== 'fireStation' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                  Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('designation', {
                    required: selectedType !== 'fireStation' ? 'Designation is required' : false
                  })}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                  placeholder={selectedType === 'policeStation' ? 'e.g., Police Inspector' : 'e.g., Ward Officer, Clerk'}
                />
                {errors.designation && (
                  <p className="text-red-500 text-sm mt-1">{errors.designation.message}</p>
                )}
              </div>

              {/* Department (for Ward Officers only) */}
              {selectedType === 'wardOfficer' && (
                <div>
                  <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                    Department <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('department', {
                      required: selectedType === 'wardOfficer' ? 'Department is required' : false
                    })}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                    placeholder="e.g., Administration, Public Works"
                  />
                  {errors.department && (
                    <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Phone and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('phone', { required: 'Phone is required' })}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                placeholder="e.g., +91 1234567890"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            {selectedType === 'wardOfficer' && (
              <div>
                <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
                  Email
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                  placeholder="e.g., officer@example.com"
                />
              </div>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-charcoal font-semibold mb-2" style={{ fontSize: '14px' }}>
              Priority
            </label>
            <input
              type="number"
              {...register('priority', { valueAsNumber: true })}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
              placeholder="0"
              min="0"
            />
            <p className="text-charcoal-light text-sm mt-1">Lower numbers appear first (0 = highest priority)</p>
          </div>

          {/* Active */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register('active')}
              id="active"
              className="w-5 h-5 text-coral border-border rounded focus:ring-2 focus:ring-coral"
            />
            <label htmlFor="active" className="text-charcoal font-semibold" style={{ fontSize: '14px' }}>
              Active (show on website)
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-border">
          <Link
            href="/admin/ward-officers"
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
            {isSubmitting ? 'Saving...' : (isEdit ? 'Update Entry' : 'Create Entry')}
          </button>
        </div>
      </form>
    </div>
  );
}
