import TableHead from "@/components/admin/TableHead";
import StatusBadge from "@/components/admin/StatusBadge";
import ActionDropdown from "@/components/admin/ActionDropdown";
import PageHeader from "@/components/admin/PageHeader";
import DeleteButton from "@/components/admin/DeleteButton";
import EditButton from "@/components/admin/EditButton";
import { fetchCategory, fetchRooms } from "@/api/api";

// Room data is provided by the external backend API, so fetch it at request
// time rather than when Next.js generates the deployment build.
export const dynamic = "force-dynamic";

export default async function Page() {
  const { success, data = [] } = await fetchRooms();
  const rooms = success ? data : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Category Management"
        description="Manage Get, Create, Update, and Delete"
        buttonText="Add room"
        buttonLink="/admin/room-type/add"
      />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHead
              columns={["Image", "Name", "Slug", "Status", "Edit", "Delete"]}
            />

            <tbody>
              {rooms.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  {/* Image */}
                  <td className="px-6 py-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-18 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4 font-medium">{item.name}</td>

                  {/* Slug */}
                  <td className="px-6 py-4 text-gray-500">{item.slug}</td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <StatusBadge
                      status={item.status}
                      path={`room-type/status-update/${item._id}`}
                    />
                  </td>
                  <td className="px-6 py-4">
                   <EditButton path={`/admin/room-typr/edit/${item._id}`} />
                  </td>
                  <td className="px-6 py-4">
                    <DeleteButton path={`room-type/delete/${item._id}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
