import { fetchProducts } from "@/api/api";
import ActionDropdown from "@/components/admin/ActionDropdown";
import DeleteButton from "@/components/admin/DeleteButton";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import TableHead from "@/components/admin/TableHead";

// Product data comes from the external backend API. Fetch it at request time,
// not while Next.js is generating the deployment build.
export const dynamic = "force-dynamic";

export default async function ProductPage() {
  const { success, data = [] } = await fetchProducts();
  const products = success ? data : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Product Management"
        description="Manage your product catalogue"
        buttonText="Add Product"
        buttonLink="/admin/product/add"
      />

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHead
              columns={[
                "Image",
                "Product",
                "Price",
                "Stock",
                "Status",
                "Delete",
                "Actions"
              ]}
            />

            <tbody>
              {products.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-100 transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-14 w-14 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="mt-1 text-xs text-gray-500">{item.slug}</p>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-medium">
                      ₹{Number(item.salePrice || item.price).toLocaleString("en-IN")}
                    </p>
                    {item.salePrice && item.salePrice !== item.price && (
                      <p className="text-xs text-gray-400 line-through">
                        ₹{Number(item.price).toLocaleString("en-IN")}
                      </p>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        item.stock
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.stock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge
                      status={item.status}
                      path={`product/status-update/${item._id}`}
                    />
                  </td>

                  <td className="px-6 py-4">
                    <DeleteButton path={`product/delete/${item._id}`} />
                  </td>  
                    <td className="px-6 py-4">
                    <ActionDropdown 
                     id={item._id} 
                    module = "product" 
                    actions = {["view","BestSeller","images","stock"]} />
                  </td> 
                  

                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No products found. Add your first product to get started.
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
