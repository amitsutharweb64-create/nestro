import TableHead from "@/components/admin/TableHead";
import StatusBadge from "@/components/admin/StatusBadge";
import ActionDropdown from "@/components/admin/ActionDropdown";
import PageHeader from "@/components/admin/PageHeader";
import DeleteButton from "@/components/admin/DeleteButton";
import EditButton from "@/components/admin/EditButton";
import { fetchCategory } from "@/api/api";

export default async function Page() {
  const { success, data ,message } = await fetchCategory();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Category Management"
        description="Manage Get, Create, Update, and Delete"
        buttonText="Add Category"
        buttonLink="/admin/category/add"
      />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {success === false && (
          <p className="px-6 py-4 text-sm text-red-600">
            {message || "Unable to load categories."}
          </p>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHead
              columns={["Image", "Name", "Slug", "Status", "Edit", "Delete"]}
            />

            <tbody>
              {data?.map((item) => (
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
                      path={`category/status-update/${item._id}`}
                    />
                  </td>
                  <td className="px-6 py-4">
                   <EditButton path={`/admin/category/edit/${item._id}`} />
                  </td>
                  <td className="px-6 py-4">
                    <DeleteButton path={`category/delete/${item._id}`} />
                  </td>
                </tr>
              ))}
              {data?.length === 0 && success !== false && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
