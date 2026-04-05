import { auth } from "@/auth";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { DeleteButton } from "@/app/admin/components/DeleteButton";
import { TogglePublishButton } from "@/app/admin/components/TogglePublishButton";



export default async function GovernmentProjectsPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const governmentProjects = await prisma.governmentProject.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-charcoal mb-2" style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'var(--font-family-serif)' }}>
            Government Projects
          </h1>
          <p className="text-charcoal-light" style={{ fontSize: '16px' }}>
            Manage government initiatives and public development projects
          </p>
        </div>
        <Link
          href="/admin/government-projects/new"
          className="flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-xl font-bold hover:bg-coral-dark transition-all shadow-lg hover:shadow-xl"
          style={{ fontSize: '14px' }}
        >
          <Plus className="w-5 h-5" />
          Add Government Project
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {governmentProjects.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-charcoal-light mb-4" style={{ fontSize: '16px' }}>
              No government projects yet. Create your first government project!
            </p>
            <Link
              href="/admin/government-projects/new"
              className="inline-flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-xl font-bold hover:bg-coral-dark transition-all"
              style={{ fontSize: '14px' }}
            >
              <Plus className="w-5 h-5" />
              Add Government Project
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cream border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Title</th>
                  <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Department</th>
                  <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Status</th>
                  <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Location</th>
                  <th className="text-center px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Published</th>
                  <th className="text-right px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {governmentProjects.map((project) => (
                  <tr key={project.id} className="border-b border-border hover:bg-cream/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-charcoal font-semibold" style={{ fontSize: '14px' }}>{project.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full" style={{ fontSize: '12px', fontWeight: 600 }}>
                        {project.department}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full ${project.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`} style={{ fontSize: '12px', fontWeight: 600 }}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-charcoal-light" style={{ fontSize: '13px' }}>{project.location || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <TogglePublishButton
                        id={project.id}
                        published={project.published}
                        type="governmentProject"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/government-projects/${project.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteButton
                          id={project.id}
                          type="governmentProject"
                          title={project.title}
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
