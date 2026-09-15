"use client";

import { useEffect, useState, useTransition } from "react";
import { client } from "@/utils/helper";
import {
  MessageSquare,
  Search,
  RotateCcw,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Clock3,
  Archive,
  Eye,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  User,
  Sparkles,
  Inbox,
  SendHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    in_progress: 0,
    resolved: 0,
    closed: 0,
  });

  // Filters & Search
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalInquiries: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // Selected Inquiry for Modal
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [copiedField, setCopiedField] = useState("");
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);

  // Fetch inquiries from API
  const fetchInquiryList = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", currentPage);
      params.append("limit", limit);
      if (search.trim()) params.append("search", search.trim());
      if (subjectFilter !== "all") params.append("subject", subjectFilter);
      if (statusFilter !== "all") params.append("status", statusFilter);

      const response = await client.get(`/contact?${params.toString()}`);

      if (response.data.success) {
        setInquiries(response.data.data || []);
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
        if (response.data.stats) {
          setStats(response.data.stats);
        }
      } else {
        toast.error(response.data.message || "Failed to load inquiries");
      }
    } catch (error) {
      console.error("Fetch Inquiries Error:", error);
      toast.error(error.response?.data?.message || "Failed to connect to inquiries API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiryList();
  }, [currentPage, subjectFilter, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchInquiryList();
  };

  const handleResetFilters = () => {
    setSearch("");
    setSubjectFilter("all");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  // Status Change Handler
  const handleStatusChange = async (inquiryId, newStatus) => {
    try {
      setStatusUpdatingId(inquiryId);
      const response = await client.patch(`/contact/status/${inquiryId}`, {
        status: newStatus,
      });

      if (response.data.success) {
        toast.success(response.data.message || `Status updated to ${newStatus}`);

        // Update local list
        setInquiries((prev) =>
          prev.map((item) =>
            item._id === inquiryId ? { ...item, status: newStatus } : item
          )
        );

        // Update modal state if open
        if (selectedInquiry && selectedInquiry._id === inquiryId) {
          setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
        }

        // Refresh stats
        fetchInquiryList();
      }
    } catch (error) {
      console.error("Update Status Error:", error);
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setStatusUpdatingId(null);
    }
  };

  // Delete Handler with SweetAlert2
  const handleDeleteInquiry = async (inquiryId, name) => {
    const result = await Swal.fire({
      title: "Delete Inquiry?",
      text: `Are you sure you want to delete the message from "${name || "Customer"}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete It",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const response = await client.delete(`/contact/delete/${inquiryId}`);
        if (response.data.success) {
          toast.success("Inquiry deleted successfully");
          if (selectedInquiry && selectedInquiry._id === inquiryId) {
            setSelectedInquiry(null);
          }
          fetchInquiryList();
        }
      } catch (error) {
        console.error("Delete Error:", error);
        toast.error(error.response?.data?.message || "Failed to delete inquiry");
      }
    }
  };

  // Copy helper
  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(`Copied ${fieldName} to clipboard`);
    setTimeout(() => setCopiedField(""), 2000);
  };

  // Subject display formatter
  const getSubjectBadge = (subject) => {
    switch (subject) {
      case "order":
        return {
          label: "Order Enquiry",
          bg: "bg-blue-50 text-blue-700 border-blue-200",
        };
      case "custom":
        return {
          label: "Custom Furniture",
          bg: "bg-purple-50 text-purple-700 border-purple-200",
        };
      case "returns":
        return {
          label: "Returns & Exchange",
          bg: "bg-amber-50 text-amber-700 border-amber-200",
        };
      case "other":
      default:
        return {
          label: "General Query",
          bg: "bg-stone-100 text-stone-700 border-stone-200",
        };
    }
  };

  // Status visual formatter
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          dot: "bg-amber-500",
          pill: "bg-amber-50 text-amber-700 border-amber-200",
          icon: Clock3,
        };
      case "in_progress":
        return {
          label: "In Progress",
          dot: "bg-blue-500",
          pill: "bg-blue-50 text-blue-700 border-blue-200",
          icon: RotateCcw,
        };
      case "resolved":
        return {
          label: "Resolved",
          dot: "bg-emerald-500",
          pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: CheckCircle2,
        };
      case "closed":
        return {
          label: "Closed",
          dot: "bg-gray-400",
          pill: "bg-gray-100 text-gray-600 border-gray-200",
          icon: Archive,
        };
      default:
        return {
          label: status || "Pending",
          dot: "bg-amber-500",
          pill: "bg-amber-50 text-amber-700 border-amber-200",
          icon: Clock3,
        };
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-gray-900">
              Customer Inquiries
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800">
              {stats.total} Total
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Manage, review, and respond to incoming customer contact inquiries.
          </p>
        </div>

        <button
          onClick={fetchInquiryList}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-xl shadow-xs transition"
        >
          <RotateCcw className={`w-4 h-4 ${loading ? "animate-spin text-teal-600" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inquiries */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Messages
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {stats.total}
            </h3>
            <p className="text-[11px] text-gray-400 mt-1">
              All time received inquiries
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Action */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-amber-600 uppercase tracking-wider">
              Pending
            </p>
            <h3 className="text-2xl font-bold text-amber-600 mt-1">
              {stats.pending}
            </h3>
            <p className="text-[11px] text-amber-600/70 mt-1">
              Requires initial response
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">
              In Progress
            </p>
            <h3 className="text-2xl font-bold text-blue-600 mt-1">
              {stats.in_progress}
            </h3>
            <p className="text-[11px] text-blue-600/70 mt-1">
              Currently handling query
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Resolved */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider">
              Resolved
            </p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">
              {stats.resolved}
            </h3>
            <p className="text-[11px] text-emerald-600/70 mt-1">
              Successfully addressed
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-4">
        <form
          onSubmit={handleSearchSubmit}
          className="grid grid-cols-1 md:grid-cols-12 gap-3"
        >
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by customer name, email, phone, keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
            />
          </div>

          {/* Subject Filter */}
          <div className="md:col-span-3">
            <select
              value={subjectFilter}
              onChange={(e) => {
                setSubjectFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 cursor-pointer transition"
            >
              <option value="all">All Topics</option>
              <option value="order">Order Enquiry</option>
              <option value="custom">Custom Furniture</option>
              <option value="returns">Returns &amp; Exchange</option>
              <option value="other">General / Other</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 cursor-pointer transition"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Actions */}
          <div className="md:col-span-2 flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl shadow-xs transition"
            >
              Search
            </button>
            {(search || subjectFilter !== "all" || statusFilter !== "all") && (
              <button
                type="button"
                onClick={handleResetFilters}
                title="Reset Filters"
                className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Main Inquiries Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/80 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Topic / Subject</th>
                <th className="px-6 py-4">Message Snippet</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm font-medium">Loading inquiries...</p>
                    </div>
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-semibold text-gray-800">
                        No Inquiries Found
                      </h4>
                      <p className="text-xs text-gray-500 max-w-sm">
                        {search || subjectFilter !== "all" || statusFilter !== "all"
                          ? "No messages match your selected search criteria. Try clearing some filters."
                          : "Customer queries submitted through the website contact form will appear here."}
                      </p>
                      {(search || subjectFilter !== "all" || statusFilter !== "all") && (
                        <button
                          onClick={handleResetFilters}
                          className="mt-2 text-xs font-semibold text-teal-600 hover:text-teal-700 underline"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry) => {
                  const subjectBadge = getSubjectBadge(inquiry.subject);
                  const statusInfo = getStatusBadge(inquiry.status);

                  return (
                    <tr
                      key={inquiry._id}
                      className="hover:bg-gray-50/70 transition group"
                    >
                      {/* Customer Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                            {inquiry.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 leading-tight">
                              {inquiry.name}
                            </p>
                            <a
                              href={`mailto:${inquiry.email}`}
                              className="text-xs text-gray-500 hover:text-teal-600 flex items-center gap-1 mt-0.5"
                            >
                              <Mail className="w-3 h-3 text-gray-400" />
                              <span className="truncate max-w-[160px]">
                                {inquiry.email}
                              </span>
                            </a>
                            {inquiry.phone && (
                              <a
                                href={`tel:${inquiry.phone}`}
                                className="text-xs text-gray-400 hover:text-teal-600 flex items-center gap-1 mt-0.5"
                              >
                                <Phone className="w-3 h-3" />
                                <span>{inquiry.phone}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Subject */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${subjectBadge.bg}`}
                        >
                          {subjectBadge.label}
                        </span>
                      </td>

                      {/* Message Preview */}
                      <td className="px-6 py-4">
                        <p
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="text-gray-600 line-clamp-2 text-xs max-w-xs cursor-pointer hover:text-teal-600 transition"
                          title="Click to view full message"
                        >
                          {inquiry.message}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                        <p className="font-medium text-gray-700">
                          {new Date(inquiry.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {new Date(inquiry.createdAt).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </td>

                      {/* Status Selector */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={inquiry.status || "pending"}
                          disabled={statusUpdatingId === inquiry._id}
                          onChange={(e) =>
                            handleStatusChange(inquiry._id, e.target.value)
                          }
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border outline-none cursor-pointer transition ${statusInfo.pill}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedInquiry(inquiry)}
                            className="p-1.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition"
                            title="View Full Inquiry"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <a
                            href={`mailto:${inquiry.email}?subject=Regarding your enquiry on Nestro: ${inquiry.subject}&body=Hi ${inquiry.name},%0D%0A%0D%0AThank you for contacting Nestro.%0D%0A%0D%0A`}
                            className="p-1.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
                            title="Reply via Email"
                          >
                            <SendHorizontal className="w-4 h-4" />
                          </a>

                          <button
                            onClick={() =>
                              handleDeleteInquiry(inquiry._id, inquiry.name)
                            }
                            className="p-1.5 rounded-lg bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-100 gap-3">
            <p className="text-xs text-gray-500">
              Showing Page{" "}
              <span className="font-semibold text-gray-800">
                {pagination.currentPage}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-800">
                {pagination.totalPages}
              </span>{" "}
              ({pagination.totalInquiries} Total Messages)
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={!pagination.hasPreviousPage}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Previous
              </button>

              <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-teal-600 text-white">
                {pagination.currentPage}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, pagination.totalPages)
                  )
                }
                disabled={!pagination.hasNextPage}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {selectedInquiry.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 leading-tight">
                    {selectedInquiry.name}
                  </h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    {new Date(selectedInquiry.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm">
                <div>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                    Email Address
                  </span>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="font-medium text-gray-800 hover:text-teal-600 truncate"
                    >
                      {selectedInquiry.email}
                    </a>
                    <button
                      onClick={() =>
                        copyToClipboard(selectedInquiry.email, "Email")
                      }
                      className="text-gray-400 hover:text-gray-600 p-1"
                      title="Copy Email"
                    >
                      {copiedField === "Email" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                    Phone Number
                  </span>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <span className="font-medium text-gray-800">
                      {selectedInquiry.phone || "Not provided"}
                    </span>
                    {selectedInquiry.phone && (
                      <button
                        onClick={() =>
                          copyToClipboard(selectedInquiry.phone, "Phone")
                        }
                        className="text-gray-400 hover:text-gray-600 p-1"
                        title="Copy Phone"
                      >
                        {copiedField === "Phone" ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                    Topic / Category
                  </span>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        getSubjectBadge(selectedInquiry.subject).bg
                      }`}
                    >
                      {getSubjectBadge(selectedInquiry.subject).label}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                    Current Status
                  </span>
                  <div className="mt-1">
                    <select
                      value={selectedInquiry.status || "pending"}
                      onChange={(e) =>
                        handleStatusChange(selectedInquiry._id, e.target.value)
                      }
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                        getStatusBadge(selectedInquiry.status).pill
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message Box */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Customer Message
                  </label>
                  <button
                    onClick={() =>
                      copyToClipboard(selectedInquiry.message, "Message")
                    }
                    className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-teal-600 font-medium"
                  >
                    {copiedField === "Message" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/80 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {selectedInquiry.status !== "resolved" && (
                  <button
                    onClick={() =>
                      handleStatusChange(selectedInquiry._id, "resolved")
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Mark as Resolved
                  </button>
                )}

                <button
                  onClick={() =>
                    handleDeleteInquiry(
                      selectedInquiry._id,
                      selectedInquiry.name
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Regarding your inquiry: ${selectedInquiry.subject}&body=Hi ${selectedInquiry.name},%0D%0A%0D%0AThank you for reaching out to us.%0D%0A%0D%0A`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl shadow-xs transition w-full sm:w-auto"
                >
                  <SendHorizontal className="w-4 h-4" />
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
