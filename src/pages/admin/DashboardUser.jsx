import React, { useEffect, useState, useRef } from "react";
import {
  UserCircle2,
  Mail,
  Phone,
  ShoppingCart,
  CalendarDays,
  DollarSign,
  Edit3,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import { api } from "../../utils/api"; // điều chỉnh path nếu cần

// Helper nhỏ format tiền
const formatMoney = (v) =>
  typeof v === "number"
    ? v.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : v;

export default function DashboardUser() {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 0,
  });
  const [q, setQ] = useState("");
  const qRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [sort, setSort] = useState("-created_at");

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      // only trigger if changed
      if (qRef.current !== q) {
        qRef.current = q;
        fetchUsers({ page: 1, q });
      }
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  useEffect(() => {
    fetchUsers({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchUsers({ page, limit, q: qIn, sort: sortIn } = {}) {
    const p = page ?? meta.page;
    const l = limit ?? meta.limit;
    const qq = qIn ?? qRef.current ?? "";
    const s = sortIn ?? sort;

    try {
      setLoading(true);
      const res = await api.get("/api/users", {
        params: { page: p, limit: l, q: qq, sort: s },
      });
      // expects { page, limit, total, total_pages, items }
      const {
        items = [],
        page: rp = 1,
        limit: rl = l,
        total = 0,
        total_pages = 1,
      } = res.data;
      setUsers(items);
      setMeta({ page: rp, limit: rl, total, total_pages });
    } catch (err) {
      console.error("fetchUsers error", err);
      toast.error("Không thể tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Xóa người dùng "${name}" ? Hành động không thể hoàn tác.`))
      return;
    try {
      setDeletingId(id);
      await api.delete(`/api/users/${id}`);
      toast.success("Xóa user thành công");
      // reload current page
      fetchUsers();
    } catch (err) {
      console.error("delete error", err);
      toast.error(err?.response?.data?.error || "Xóa thất bại");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = async (user) => {
    // simple prompt; bạn có thể thay bằng modal form
    const full_name = prompt("Họ & tên:", user.full_name || "");
    if (full_name === null) return; // cancel
    const email = prompt("Email:", user.email || "");
    if (email === null) return;
    const role = prompt("Role (e.g. admin/student/teacher):", user.role || "");
    if (role === null) return;

    try {
      setUpdatingId(user._id);
      const payload = {
        full_name: full_name.trim(),
        email: email.trim(),
        role: role.trim(),
      };
      const res = await api.patch(`/api/users/${user._id}`, payload);
      toast.success("Cập nhật user thành công");
      // update list in-place to avoid refetch, or refetch
      setUsers((prev) => prev.map((u) => (u._id === user._id ? res.data : u)));
    } catch (err) {
      console.error("update user error", err);
      toast.error(err?.response?.data?.error || "Cập nhật thất bại");
    } finally {
      setUpdatingId(null);
    }
  };

  const goPage = (p) => {
    if (p < 1 || p > meta.total_pages) return;
    fetchUsers({ page: p });
  };

  return (
    <div className="min-h-screen bg-[#f7fbfa] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800 flex items-center gap-3">
              <UserCircle2 className="w-6 h-6 text-slate-600" /> Quản lý người
              dùng
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Danh sách người dùng — tìm kiếm, sửa, xóa.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm theo tên, email, số điện thoại..."
              className="px-3 py-2 rounded-md border border-slate-200 shadow-sm text-sm w-72 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
            <select
              value={meta.limit}
              onChange={(e) => {
                const lim = Number(e.target.value);
                setMeta((m) => ({ ...m, limit: lim, page: 1 }));
                fetchUsers({ page: 1, limit: lim });
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
                fetchUsers({ page: 1, sort: e.target.value });
              }}
              className="px-2 py-2 rounded-md border border-slate-200 bg-white text-sm"
            >
              <option value="-created_at">Mới nhất</option>
              <option value="created_at">Cũ nhất</option>
              <option value="full_name">Tên A→Z</option>
              <option value="-full_name">Tên Z→A</option>
            </select>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Tổng:{" "}
              <span className="font-semibold text-slate-800">{meta.total}</span>{" "}
              người dùng
            </div>
            <div className="text-xs text-slate-500">
              Page {meta.page} / {meta.total_pages}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] table-auto text-left">
              <thead className="bg-slate-50">
                <tr className="text-slate-600 text-sm">
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Role / Status</th>
                  <th className="px-4 py-3">Joined</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      Đang tải...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      Không có người dùng. Thử xóa filter hoặc thay đổi search.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr
                      key={u._id}
                      className="border-b last:border-b-0 hover:bg-slate-50 transition"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-slate-100 grid place-items-center text-slate-600">
                            {u.avatar ? (
                              <img
                                src={u.avatar}
                                alt={u.full_name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <UserCircle2 className="w-6 h-6 text-slate-500" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-800">
                              {u.full_name}
                            </div>
                            <div className="text-xs text-slate-500">
                              ID: {u._id}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-sm text-slate-600">
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-slate-400" />
                          <div className="truncate max-w-[240px]">
                            {u.email}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <div className="text-xs text-slate-500">
                            {u.phone_number || "-"}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2 items-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              u.role === "admin"
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {u.role || "user"}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${
                              u.status === "active"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-rose-50 text-rose-700"
                            }`}
                          >
                            {u.status || "unknown"}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-4 h-4 text-slate-400" />
                          <div>
                            {u.created_at
                              ? new Date(u.created_at).toLocaleDateString()
                              : "-"}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(u)}
                            disabled={updatingId === u._id}
                            className="px-2 py-1 rounded-md bg-sky-50 text-sky-700 hover:bg-sky-100 text-sm flex items-center gap-2"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                            {updatingId === u._id ? "Saving..." : "Edit"}
                          </button>

                          <button
                            onClick={() => handleDelete(u._id, u.full_name)}
                            disabled={deletingId === u._id}
                            className="px-2 py-1 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 text-sm flex items-center gap-2"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                            {deletingId === u._id ? "Deleting..." : "Delete"}
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
              Showing page <span className="font-semibold">{meta.page}</span> of{" "}
              <span className="font-semibold">{meta.total_pages}</span>
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
                max={meta.total_pages || 1}
                value={meta.page}
                onChange={(e) => {
                  const p = Number(e.target.value) || 1;
                  if (p >= 1 && p <= meta.total_pages) goPage(p);
                }}
                className="w-16 text-center px-2 py-1 rounded-md border border-slate-200 text-sm"
              />

              <button
                onClick={() => goPage(meta.page + 1)}
                disabled={meta.page === meta.total_pages}
                className="px-3 py-1 rounded-md border border-slate-200 bg-white text-sm disabled:opacity-50"
              >
                Next ›
              </button>
              <button
                onClick={() => goPage(meta.total_pages)}
                disabled={meta.page === meta.total_pages}
                className="px-3 py-1 rounded-md border border-slate-200 bg-white text-sm disabled:opacity-50"
              >
                Last »
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
