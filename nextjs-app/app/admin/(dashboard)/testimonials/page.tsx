import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import { DeleteButton } from "@/app/admin/components/DeleteButton";
import { TogglePublishButton } from "@/app/admin/components/TogglePublishButton";



export default async function TestimonialsPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-charcoal mb-2" style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'var(--font-family-serif)' }}>
            Testimonials
          </h1>
          <p className="text-charcoal-light" style={{ fontSize: '16px' }}>
            Manage testimonials from citizens and community members
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-xl font-bold hover:bg-coral-dark transition-all shadow-lg hover:shadow-xl"
          style={{ fontSize: '14px' }}
        >
          <Plus className="w-5 h-5" />
          Add New Testimonial
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {testimonials.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-charcoal-light mb-4" style={{ fontSize: '16px' }}>
              No testimonials yet. Add your first testimonial!
            </p>
            <Link
              href="/admin/testimonials/new"
              className="inline-flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-xl font-bold hover:bg-coral-dark transition-all"
              style={{ fontSize: '14px' }}
            >
              <Plus className="w-5 h-5" />
              Add New Testimonial
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cream border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Name</th>
                  <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Role</th>
                  <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Type</th>
                  <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Rating</th>
                  <th className="text-center px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Published</th>
                  <th className="text-right px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="border-b border-border hover:bg-cream/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-charcoal font-semibold" style={{ fontSize: '14px' }}>{testimonial.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-charcoal-light" style={{ fontSize: '13px' }}>{testimonial.role || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full ${
                        testimonial.type === 'text' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }`} style={{ fontSize: '12px', fontWeight: 600 }}>
                        {testimonial.type === 'text' ? 'Text' : 'Video'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <TogglePublishButton
                        id={testimonial.id}
                        published={testimonial.published}
                        type="testimonial"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/testimonials/${testimonial.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteButton
                          id={testimonial.id}
                          type="testimonial"
                          title={testimonial.name}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
