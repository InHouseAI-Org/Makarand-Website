import { auth } from "@/auth";
export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { DeleteButton } from "@/app/admin/components/DeleteButton";
import { TogglePublishButton } from "@/app/admin/components/TogglePublishButton";



export default async function WardOfficersPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch all three types of officers
  const [wardOfficers, policeStations, fireStations] = await Promise.all([
    prisma.wardOfficer.findMany({
      orderBy: { priority: 'asc' },
    }),
    prisma.policeStation.findMany({
      orderBy: { priority: 'asc' },
    }),
    prisma.fireStation.findMany({
      orderBy: { priority: 'asc' },
    }),
  ]);

  // Combine all officers into a single array with type information
  const allOfficers = [
    ...wardOfficers.map(officer => ({
      id: officer.id,
      name: officer.name,
      designation: officer.designation,
      department: officer.department,
      phone: officer.phone,
      priority: officer.priority,
      active: officer.active,
      type: 'wardOfficer' as const,
      displayType: 'Ward Officer'
    })),
    ...policeStations.map(station => ({
      id: station.id,
      name: station.name,
      designation: station.designation,
      department: 'Police',
      phone: station.phone,
      priority: station.priority,
      active: station.active,
      type: 'policeStation' as const,
      displayType: 'Police Station',
      stationName: station.stationName
    })),
    ...fireStations.map(station => ({
      id: station.id,
      name: station.stationName,
      designation: 'Fire Station',
      department: 'Fire Services',
      phone: station.phone,
      priority: station.priority,
      active: station.active,
      type: 'fireStation' as const,
      displayType: 'Fire Station'
    }))
  ].sort((a, b) => a.priority - b.priority);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-charcoal mb-2" style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'var(--font-family-serif)' }}>
            Ward Officers & Emergency Services
          </h1>
          <p className="text-charcoal-light" style={{ fontSize: '16px' }}>
            Manage ward officers, police stations, and fire stations
          </p>
        </div>
        <Link
          href="/admin/ward-officers/new"
          className="flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-xl font-bold hover:bg-coral-dark transition-all shadow-lg hover:shadow-xl"
          style={{ fontSize: '14px' }}
        >
          <Plus className="w-5 h-5" />
          Add New Entry
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {allOfficers.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-charcoal-light mb-4" style={{ fontSize: '16px' }}>
              No entries yet. Add your first ward officer, police station, or fire station!
            </p>
            <Link
              href="/admin/ward-officers/new"
              className="inline-flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-xl font-bold hover:bg-coral-dark transition-all"
              style={{ fontSize: '14px' }}
            >
              <Plus className="w-5 h-5" />
              Add New Entry
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cream border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Type</th>
                  <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Name</th>
                  <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Designation</th>
                  <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Department</th>
                  <th className="text-left px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Phone</th>
                  <th className="text-center px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Active</th>
                  <th className="text-right px-6 py-4 text-charcoal font-semibold" style={{ fontSize: '13px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allOfficers.map((officer) => (
                  <tr key={`${officer.type}-${officer.id}`} className="border-b border-border hover:bg-cream/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full ${
                        officer.type === 'wardOfficer' ? 'bg-blue-100 text-blue-700' :
                        officer.type === 'policeStation' ? 'bg-purple-100 text-purple-700' :
                        'bg-red-100 text-red-700'
                      }`} style={{ fontSize: '12px', fontWeight: 600 }}>
                        {officer.displayType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-charcoal font-semibold" style={{ fontSize: '14px' }}>{officer.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full" style={{ fontSize: '12px', fontWeight: 600 }}>
                        {officer.designation}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-charcoal-light" style={{ fontSize: '13px' }}>{officer.department}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-charcoal-light" style={{ fontSize: '13px' }}>{officer.phone || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <TogglePublishButton
                        id={officer.id}
                        published={officer.active}
                        type={officer.type}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/ward-officers/${officer.id}?type=${officer.type}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteButton
                          id={officer.id}
                          type={officer.type}
                          title={officer.name}
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
