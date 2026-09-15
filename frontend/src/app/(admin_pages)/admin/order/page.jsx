"use client";

import { useEffect, useState } from "react";
import { client } from "@/utils/helper";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalOrders: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // Filters
  const [search, setSearch] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  // Fetch orders
  const getOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await client.get("/order", {
        params: {
          page: currentPage,
          limit,
          search,
          paymentMethod,
          paymentStatus,
          orderStatus,
          sortBy: "createdAt",
          sortOrder: "desc",
        },
      });

      setOrders(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Get Orders Error:", error);

      setError(
        error?.response?.data?.message ||
          "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch when page/filter changes
  useEffect(() => {
    getOrders();
  }, [
    currentPage,
    paymentMethod,
    paymentStatus,
    orderStatus,
  ]);

  // Search
  const handleSearch = (e) => {
    e.preventDefault();

    setCurrentPage(1);
    getOrders();
  };

  // Reset filters
  const handleReset = () => {
    setSearch("");
    setPaymentMethod("");
    setPaymentStatus("");
    setOrderStatus("");
    setCurrentPage(1);
  };

  // Status badge
  const getStatusClass = (status) => {
    switch (status) {
      case "placed":
        return "bg-purple-100 text-purple-700";

      case "confirmed":
        return "bg-blue-100 text-blue-700";

      case "processing":
        return "bg-yellow-100 text-yellow-700";

      case "shipped":
        return "bg-indigo-100 text-indigo-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentStatusClass = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "failed":
        return "bg-red-100 text-red-700";

      case "refunded":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Orders
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage and view all customer orders
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-4 mb-6">

        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        >

          {/* Search */}
          <input
            type="text"
            placeholder="Search customer, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          />

          {/* Payment Method */}
          <select
            value={paymentMethod}
            onChange={(e) => {
              setPaymentMethod(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-lg px-3 py-2 outline-none"
          >
            <option value="">Payment Method</option>
            <option value="cod">COD</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
          </select>

          {/* Payment Status */}
          <select
            value={paymentStatus}
            onChange={(e) => {
              setPaymentStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-lg px-3 py-2 outline-none"
          >
            <option value="">Payment Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>

          {/* Order Status */}
          <select
            value={orderStatus}
            onChange={(e) => {
              setOrderStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-lg px-3 py-2 outline-none"
          >
            <option value="">Order Status</option>
            <option value="placed">Placed</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded-lg"
            >
              Search
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="border px-4 py-2 rounded-lg"
            >
              Reset
            </button>
          </div>

        </form>
      </div>

      {/* Total */}
      <div className="mb-4 text-sm text-gray-600">
        Total Orders:{" "}
        <span className="font-semibold">
          {pagination.totalOrders}
        </span>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg p-4 mb-4">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white border rounded-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 border-b">

              <tr>
                <th className="text-left px-4 py-3">
                  Order
                </th>

                <th className="text-left px-4 py-3">
                  Customer
                </th>

                <th className="text-left px-4 py-3">
                  City
                </th>

                <th className="text-left px-4 py-3">
                  Amount
                </th>

                <th className="text-left px-4 py-3">
                  Payment
                </th>

                <th className="text-left px-4 py-3">
                  Payment Status
                </th>

                <th className="text-left px-4 py-3">
                  Order Status
                </th>

                <th className="text-left px-4 py-3">
                  Date
                </th>
              </tr>

            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-10 text-gray-500"
                  >
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-10 text-gray-500"
                  >
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (

                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50"
                  >

                    {/* Order */}
                    <td className="px-4 py-4">
                      <p className="font-medium text-gray-800">
                        #{order._id.slice(-8)}
                      </p>
                    </td>

                    {/* Customer */}
                    <td className="px-4 py-4">
                      <p className="font-medium">
                        {order.shippingAddress?.fullName}
                      </p>

                      <p className="text-gray-500 text-xs">
                        {order.shippingAddress?.mobile}
                      </p>
                    </td>

                    {/* City */}
                    <td className="px-4 py-4">
                      <p>
                        {order.shippingAddress?.city}
                      </p>

                      <p className="text-gray-500 text-xs">
                        {order.shippingAddress?.pincode}
                      </p>
                    </td>

                    {/* Amount */}
                    <td className="px-4 py-4">
                      <span className="font-semibold">
                        ₹{order.totalAmount}
                      </span>
                    </td>

                    {/* Payment */}
                    <td className="px-4 py-4 uppercase">
                      {order.paymentMethod}
                    </td>

                    {/* Payment Status */}
                    <td className="px-4 py-4">

                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${getPaymentStatusClass(
                          order.paymentStatus
                        )}`}
                      >
                        {order.paymentStatus}
                      </span>

                    </td>

                    {/* Order Status */}
                    <td className="px-4 py-4">

                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus}
                      </span>

                    </td>

                    {/* Date */}
                    <td className="px-4 py-4 text-gray-500">

                      {new Date(
                        order.createdAt
                      ).toLocaleDateString("en-IN")}

                    </td>

                  </tr>

                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Pagination */}
      {pagination.totalPages > 0 && (

        <div className="flex items-center justify-between mt-5">

          <p className="text-sm text-gray-500">
            Page {pagination.currentPage} of{" "}
            {pagination.totalPages}
          </p>

          <div className="flex items-center gap-2">

            <button
              disabled={!pagination.hasPreviousPage}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              className="border px-4 py-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <span className="px-3 py-2 bg-black text-white rounded-lg">
              {pagination.currentPage}
            </span>

            <button
              disabled={!pagination.hasNextPage}
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              className="border px-4 py-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>

          </div>

        </div>

      )}

    </div>
  );
}