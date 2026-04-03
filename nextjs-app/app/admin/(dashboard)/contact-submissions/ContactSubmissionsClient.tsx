'use client';

import { useState } from 'react';
import {
  Mail,
  Phone,
  Calendar,
  Filter,
  CheckCircle2,
  Circle,
  Trash2,
  Eye,
  EyeOff,
  MessageSquare,
  AlertTriangle,
  UserPlus,
  Send,
  GraduationCap
} from 'lucide-react';
import { toast } from 'sonner';
import { CustomDropdown } from '@/app/admin/components/CustomDropdown';

interface ContactSubmission {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  subject: string | null;
  message: string;
  category: string | null;
  ward: string | null;
  skills: string | null;
  program: string | null;
  formType: string;
  status: string;
  read: boolean;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

const formTypeIcons = {
  contact: Send,
  grievance: AlertTriangle,
  volunteer: UserPlus,
  youth: GraduationCap,
};

const formTypeLabels = {
  contact: 'Contact',
  grievance: 'Grievance',
  volunteer: 'Volunteer',
  youth: 'Youth Program',
};

const formTypeBadgeColors = {
  contact: 'bg-blue-100 text-blue-700',
  grievance: 'bg-red-100 text-red-700',
  volunteer: 'bg-green-100 text-green-700',
  youth: 'bg-purple-100 text-purple-700',
};

const statusColors = {
  new: 'bg-yellow-100 text-yellow-700',
  inProgress: 'bg-blue-100 text-blue-700',
  resolved: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-700',
};

export function ContactSubmissionsClient({ submissions: initialSubmissions }: { submissions: ContactSubmission[] }) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRead, setFilterRead] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredSubmissions = submissions.filter((sub) => {
    if (filterType !== 'all' && sub.formType !== filterType) return false;
    if (filterStatus !== 'all' && sub.status !== filterStatus) return false;
    if (filterRead === 'unread' && sub.read) return false;
    if (filterRead === 'read' && !sub.read) return false;
    return true;
  });

  const toggleExpanded = async (id: string) => {
    const submission = submissions.find(s => s.id === id);

    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);

      // Mark as read when expanded
      if (submission && !submission.read) {
        try {
          await fetch(`/api/contact/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ read: true }),
          });

          setSubmissions(prev =>
            prev.map(s => s.id === id ? { ...s, read: true } : s)
          );
        } catch (error) {
          console.error('Error marking as read:', error);
        }
      }
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      setSubmissions(prev =>
        prev.map(s => s.id === id ? { ...s, status } : s)
      );

      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const toggleRead = async (id: string) => {
    const submission = submissions.find(s => s.id === id);
    if (!submission) return;

    try {
      await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !submission.read }),
      });

      setSubmissions(prev =>
        prev.map(s => s.id === id ? { ...s, read: !s.read } : s)
      );

      toast.success(submission.read ? 'Marked as unread' : 'Marked as read');
    } catch (error) {
      console.error('Error toggling read status:', error);
      toast.error('Failed to update read status');
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });

      setSubmissions(prev => prev.filter(s => s.id !== id));
      toast.success('Submission deleted successfully');
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast.error('Failed to delete submission');
    }
  };

  const unreadCount = submissions.filter(s => !s.read).length;
  const newCount = submissions.filter(s => s.status === 'new').length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-charcoal mb-2">Contact Submissions</h1>
        <p className="text-charcoal-light">
          {submissions.length} total submissions • {unreadCount} unread • {newCount} new
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-border p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-charcoal-light" />
          <span className="font-semibold text-charcoal">Filters</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CustomDropdown
            label="Form Type"
            value={filterType}
            onChange={setFilterType}
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'contact', label: 'Contact' },
              { value: 'grievance', label: 'Grievance' },
              { value: 'volunteer', label: 'Volunteer' },
              { value: 'youth', label: 'Youth Program' },
            ]}
          />

          <CustomDropdown
            label="Status"
            value={filterStatus}
            onChange={setFilterStatus}
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'new', label: 'New' },
              { value: 'inProgress', label: 'In Progress' },
              { value: 'resolved', label: 'Resolved' },
              { value: 'closed', label: 'Closed' },
            ]}
          />

          <CustomDropdown
            label="Read Status"
            value={filterRead}
            onChange={setFilterRead}
            options={[
              { value: 'all', label: 'All' },
              { value: 'unread', label: 'Unread Only' },
              { value: 'read', label: 'Read Only' },
            ]}
          />
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <div className="bg-white rounded-xl border border-border p-12 text-center">
            <MessageSquare className="w-12 h-12 text-charcoal-light mx-auto mb-4" />
            <p className="text-charcoal-light">No submissions found</p>
          </div>
        ) : (
          filteredSubmissions.map((submission) => {
            const Icon = formTypeIcons[submission.formType as keyof typeof formTypeIcons] || Send;
            const isExpanded = expandedId === submission.id;

            return (
              <div
                key={submission.id}
                className={`bg-white rounded-xl border transition-all ${
                  submission.read ? 'border-border' : 'border-coral shadow-md'
                }`}
              >
                {/* Header */}
                <div
                  className="p-6 cursor-pointer hover:bg-cream/50 transition-colors"
                  onClick={() => toggleExpanded(submission.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        formTypeBadgeColors[submission.formType as keyof typeof formTypeBadgeColors]
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-charcoal">{submission.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            formTypeBadgeColors[submission.formType as keyof typeof formTypeBadgeColors]
                          }`}>
                            {formTypeLabels[submission.formType as keyof typeof formTypeLabels]}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[submission.status as keyof typeof statusColors] || statusColors.new
                          }`}>
                            {submission.status === 'inProgress' ? 'In Progress' : submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                          </span>
                          {!submission.read && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-coral text-white">
                              New
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-charcoal-light flex-wrap">
                          {submission.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              <span>{submission.phone}</span>
                            </div>
                          )}
                          {submission.email && (
                            <div className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              <span>{submission.email}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(submission.createdAt).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRead(submission.id);
                        }}
                        className="p-2 hover:bg-cream rounded-lg transition-colors"
                        title={submission.read ? 'Mark as unread' : 'Mark as read'}
                      >
                        {submission.read ? (
                          <EyeOff className="w-5 h-5 text-charcoal-light" />
                        ) : (
                          <Eye className="w-5 h-5 text-coral" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-border p-6 bg-cream/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {submission.subject && (
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-1">
                            {submission.formType === 'grievance' ? 'Location' :
                             submission.formType === 'youth' ? 'Education Background' :
                             submission.formType === 'volunteer' ? 'How to Help' :
                             'Subject'}
                          </label>
                          <p className="text-charcoal-light">{submission.subject}</p>
                        </div>
                      )}

                      {submission.category && (
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-1">Category</label>
                          <p className="text-charcoal-light">{submission.category}</p>
                        </div>
                      )}

                      {submission.skills && (
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-1">Skills & Interests</label>
                          <p className="text-charcoal-light">{submission.skills}</p>
                        </div>
                      )}

                      {submission.program && (
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-1">Program of Interest</label>
                          <p className="text-charcoal-light">{submission.program}</p>
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-charcoal mb-2">Message</label>
                      <p className="text-charcoal-light whitespace-pre-wrap bg-white p-4 rounded-lg border border-border">
                        {submission.message}
                      </p>
                    </div>

                    <div className="mb-6">
                      <CustomDropdown
                        label="Status"
                        value={submission.status}
                        onChange={(value) => updateStatus(submission.id, value)}
                        options={[
                          { value: 'new', label: 'New' },
                          { value: 'inProgress', label: 'In Progress' },
                          { value: 'resolved', label: 'Resolved' },
                          { value: 'closed', label: 'Closed' },
                        ]}
                        className="max-w-xs"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => deleteSubmission(submission.id)}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
