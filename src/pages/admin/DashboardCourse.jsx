import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Users, GraduationCap } from "lucide-react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { api } from "../../utils/api"; // điều chỉnh path nếu cần

const formatMoney = (v) =>
  typeof v === "number"
    ? v.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : v;

export default function DashboardCourse() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [q, setQ] = useState("");
  const qRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [sort, setSort] = useState("-created_at");
  const [statusFilter, setStatusFilter] = useState(""); // "" | draft | published | archived
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // EDIT modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editCourse, setEditCourse] = useState(null); // object being edited
  const [editForm, setEditForm] = useState({
    title: "",
    price: "",
    category: "",
    status: "draft",
    thumbnail_url: "",
  });
  const [saving, setSaving] = useState(false);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      if (qRef.current !== q) {
        qRef.current = q;
        fetchCourses({ page: 1, q });
      }
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  useEffect(() => {
    fetchCourses({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchCourses({
    page,
    limit,
    q: qIn,
    sort: sortIn,
    status,
    min_price,
    max_price,
  } = {}) {
    const p = page ?? meta.page;
    const l = limit ?? meta.limit;
    const qq = qIn ?? qRef.current ?? "";
    const s = sortIn ?? sort;
    try {
      setLoading(true);
      const params = { page: p, limit: l, sort: s };
      if (qq) params.q = qq;
      if (status !== undefined) params.status = status;
      else if (statusFilter) params.status = statusFilter;
      if (min_price !== undefined) params.min_price = min_price ?? minPrice;
      else if (minPrice !== "") params.min_price = minPrice;
      if (max_price !== undefined) params.max_price = max_price ?? maxPrice;
      else if (maxPrice !== "") params.max_price = maxPrice;

      const res = await api.get("/api/courses", { params });
      // API trả { page, limit, total, pages, items }
      const {
        items = [],
        page: rp = p,
        limit: rl = l,
        total = 0,
        pages = 1,
      } = res.data;
      setCourses(items);
      setMeta({ page: rp, limit: rl, total, pages });
    } catch (err) {
      console.error("fetchCourses error", err);
      toast.error("Không tải được danh sách khoá học");
    } finally {
      setLoading(false);
    }
  }

  const goPage = (p) => {
    if (p < 1 || p > (meta.pages || 1)) return;
    fetchCourses({ page: p });
  };

  const handleNavigate = (id) => {
    navigate(`/courses/${id}`);
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Xóa khoá học "${title}"? Hành động không thể hoàn tác.`))
      return;
    try {
      setDeletingId(id);
      await api.delete(`/api/courses/${id}`);
      toast.success("Đã xóa khoá học");
      fetchCourses({});
    } catch (err) {
      console.error("delete error", err);
      toast.error(err?.response?.data?.error || "Xóa thất bại");
    } finally {
      setDeletingId(null);
    }
  };

  // Open edit modal and populate form
  const openEditModal = (course) => {
    setEditCourse(course);
    setEditForm({
      title: course.title || "",
      price: course.price != null ? String(course.price) : "",
      category: course.category || "",
      status: course.status || "draft",
      thumbnail_url: course.thumbnail_url || course.image || "",
    });
    setEditOpen(true);
  };

  // Close modal and reset
  const closeEditModal = () => {
    setEditOpen(false);
    setEditCourse(null);
    setEditForm({
      title: "",
      price: "",
      category: "",
      status: "draft",
      thumbnail_url: "",
    });
    setSaving(false);
  };

  // Submit edit form
  const submitEdit = async (e) => {
    e.preventDefault();
    if (!editCourse) return;
    const title = (editForm.title || "").trim();
    const price = editForm.price === "" ? null : Number(editForm.price);
    if (!title) {
      toast.error("Title không được để trống");
      return;
    }
    if (price != null && (Number.isNaN(price) || price < 0)) {
      toast.error("Price không hợp lệ");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        title,
        price,
        category: editForm.category || undefined,
        thumbnail_url: editForm.thumbnail_url || undefined,
        status: editForm.status,
      };
      // remove undefined fields
      Object.keys(payload).forEach(
        (k) => payload[k] === undefined && delete payload[k]
      );

      const res = await api.patch(`/api/courses/${editCourse._id}`, payload);
      toast.success("Cập nhật khoá học thành công");
      // update local list
      setCourses((prev) =>
        prev.map((c) => (c._id === editCourse._id ? res.data : c))
      );
      closeEditModal();
    } catch (err) {
      console.error("update course error", err);
      toast.error(err?.response?.data?.error || "Cập nhật thất bại");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (course) => {
    const nextStatus =
      course.status === "draft"
        ? "published"
        : course.status === "published"
        ? "archived"
        : "draft";
    try {
      setUpdatingId(course._id);
      const res = await api.patch(
        `/api/courses/${course._1d || course._id}/status`,
        {
          status: nextStatus,
        }
      );
      toast.success(`Status: ${res.data.status}`);
      setCourses((prev) =>
        prev.map((c) => (c._id === course._id ? res.data : c))
      );
    } catch (err) {
      // fallback to correct endpoint if above typo
      try {
        const res = await api.patch(`/api/courses/${course._id}/status`, {
          status: nextStatus,
        });
        toast.success(`Status: ${res.data.status}`);
        setCourses((prev) =>
          prev.map((c) => (c._id === course._id ? res.data : c))
        );
      } catch (e) {
        console.error("update status error", e);
        toast.error(e?.response?.data?.error || "Cập nhật status thất bại");
      }
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#f7fbfa] p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-start justify-between gap-6 mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-slate-600" /> Quản lý
                khoá học
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Danh sách khóa học — tìm, sửa, xóa, thay đổi trạng thái.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm theo title, lecturer..."
                className="px-3 py-2 rounded-md border border-slate-200 shadow-sm text-sm w-72 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />

              <select
                value={meta.limit}
                onChange={(e) => {
                  const lim = Number(e.target.value);
                  setMeta((m) => ({ ...m, limit: lim, page: 1 }));
                  fetchCourses({ page: 1, limit: lim });
                }}
                className="px-2 py-2 rounded-md border border-slate-200 bg-white text-sm"
              >
                <option value={5}>5 / trang</option>
                <option value={10}>10 / trang</option>
                <option value={25}>25 / trang</option>
                <option value={50}>50 / trang</option>
              </select>

              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  fetchCourses({ page: 1, sort: e.target.value });
                }}
                className="px-2 py-2 rounded-md border border-slate-200 bg-white text-sm"
              >
                <option value="-created_at">Mới nhất</option>
                <option value="created_at">Cũ nhất</option>
                <option value="price">Giá tăng</option>
                <option value="-price">Giá giảm</option>
                <option value="title">Title A→Z</option>
                <option value="-title">Title Z→A</option>
              </select>
            </div>
          </div>

          {/* Filters row */}
          <div className="flex items-center gap-3 mb-4">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                fetchCourses({ page: 1, status: e.target.value || undefined });
              }}
              className="px-2 py-2 rounded-md border border-slate-200 bg-white text-sm"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>

            <input
              placeholder="Min price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onBlur={() =>
                fetchCourses({ page: 1, min_price: minPrice || undefined })
              }
              className="w-24 px-2 py-2 rounded-md border border-slate-200 text-sm"
            />
            <input
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onBlur={() =>
                fetchCourses({ page: 1, max_price: maxPrice || undefined })
              }
              className="w-24 px-2 py-2 rounded-md border border-slate-200 text-sm"
            />
          </div>

          {/* Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Tổng:{" "}
                <span className="font-semibold text-slate-800">
                  {meta.total}
                </span>{" "}
                khoá học
              </div>
              <div className="text-xs text-slate-500">
                Page {meta.page} / {meta.pages}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] table-auto text-left">
                <thead className="bg-slate-50">
                  <tr className="text-slate-600 text-sm">
                    <th className="px-4 py-3">Course</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Students</th>
                    <th className="px-4 py-3">Rating</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="p-8 text-center text-slate-500"
                      >
                        Đang tải...
                      </td>
                    </tr>
                  ) : courses.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="p-8 text-center text-slate-500"
                      >
                        Không tìm thấy khoá học.
                      </td>
                    </tr>
                  ) : (
                    courses.map((c) => (
                      <tr
                        key={c._id}
                        className="border-b last:border-b-0 hover:bg-slate-50 transition"
                      >
                        <td className="px-4 py-3">
                          <div
                            className="flex items-center gap-3 cursor-pointer"
                            onClick={() => handleNavigate(c._id)}
                          >
                            <img
                              src={
                                c.thumbnail_url ||
                                c.image ||
                                "https://via.placeholder.com/120"
                              }
                              alt={c.title}
                              className="w-16 h-10 rounded object-cover border"
                            />
                            <div>
                              <div className="text-sm font-medium text-slate-800">
                                {c.title}
                              </div>
                              <div className="text-xs text-slate-500">
                                {c.lecturer_name || c.lecturer_id || "—"}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3 text-sm text-slate-600">
                          <span className="px-3 py-1 text-xs rounded-md bg-slate-100">
                            {c.category || "-"}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-sm text-slate-800">
                          ${formatMoney(c.price ?? 0)}
                        </td>

                        <td className="px-4 py-3 text-sm text-slate-700">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-slate-400" />
                            <span>{c.students ?? "-"}</span>
                          </div>
                        </td>

                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{c.rating ?? "-"}</span>
                          </div>
                        </td>

                        <td className="px-4 py-3 text-sm">
                          <button
                            onClick={() => handleToggleStatus(c)}
                            disabled={updatingId === c._id}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              c.status === "published"
                                ? "bg-emerald-50 text-emerald-700"
                                : c.status === "draft"
                                ? "bg-yellow-50 text-yellow-700"
                                : "bg-slate-100 text-slate-700"
                            }`}
                            title="Toggle status"
                          >
                            {updatingId === c._id ? "Saving..." : c.status}
                          </button>
                        </td>

                        <td
                          className="px-4 py-3 text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => openEditModal(c)}
                              disabled={updatingId === c._id}
                              className="px-2 py-1 rounded-md bg-sky-50 text-sky-700 hover:bg-sky-100 text-sm flex items-center gap-2"
                              title="Edit"
                            >
                              <FiEdit className="w-4 h-4" />
                              {updatingId === c._id ? "Saving..." : "Edit"}
                            </button>

                            <button
                              onClick={() => handleDelete(c._id, c.title)}
                              disabled={deletingId === c._id}
                              className="px-2 py-1 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 text-sm flex items-center gap-2"
                              title="Delete"
                            >
                              <FiTrash2 className="w-4 h-4" />
                              {deletingId === c._id ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer / Pagination */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Showing page <span className="font-semibold">{meta.page}</span>{" "}
                of <span className="font-semibold">{meta.pages}</span> — Total{" "}
                <span className="font-semibold">{meta.total}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => goPage(1)}
                  disabled={meta.page === 1}
                  className="px-3 py-1 rounded-md border border-slate-200 bg-white text-sm disabled:opacity-50"
                >
                  « First
                </button>
                <button
                  onClick={() => goPage(meta.page - 1)}
                  disabled={meta.page === 1}
                  className="px-3 py-1 rounded-md border border-slate-200 bg-white text-sm disabled:opacity-50"
                >
                  ‹ Prev
                </button>

                <input
                  type="number"
                  min={1}
                  max={meta.pages || 1}
                  value={meta.page}
                  onChange={(e) => {
                    const p = Number(e.target.value) || 1;
                    if (p >= 1 && p <= meta.pages) goPage(p);
                  }}
                  className="w-16 text-center px-2 py-1 rounded-md border border-slate-200 text-sm"
                />

                <button
                  onClick={() => goPage(meta.page + 1)}
                  disabled={meta.page === meta.pages}
                  className="px-3 py-1 rounded-md border border-slate-200 bg-white text-sm disabled:opacity-50"
                >
                  Next ›
                </button>
                <button
                  onClick={() => goPage(meta.pages)}
                  disabled={meta.page === meta.pages}
                  className="px-3 py-1 rounded-md border border-slate-200 bg-white text-sm disabled:opacity-50"
                >
                  Last »
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeEditModal}
          />
          <form
            onSubmit={submitEdit}
            className="relative z-10 w-full max-w-2xl bg-white rounded-lg shadow-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Chỉnh sửa khoá học</h3>
              <button
                type="button"
                onClick={closeEditModal}
                className="text-slate-500 hover:text-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Title
                </label>
                <input
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm((s) => ({ ...s, title: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Price
                </label>
                <input
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm((s) => ({ ...s, price: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-200"
                  inputMode="decimal"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Category
                </label>
                <input
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm((s) => ({ ...s, category: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Status
                </label>
                <select
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm((s) => ({ ...s, status: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-200"
                >
                  <option value="draft">draft</option>
                  <option value="published">published</option>
                  <option value="archived">archived</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-slate-600 mb-1">
                  Thumbnail URL
                </label>
                <input
                  value={editForm.thumbnail_url}
                  onChange={(e) =>
                    setEditForm((s) => ({
                      ...s,
                      thumbnail_url: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeEditModal}
                className="px-4 py-2 rounded-md border text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
