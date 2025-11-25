import React, { useState, useEffect } from "react";
import { Lock, Mail, User, Trash2, Save } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DashboardSetting() {
  const { user, api, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // vẫn disable nhưng cho state để sync từ user
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // --- Đồng bộ dữ liệu từ AuthContext vào form ---
  useEffect(() => {
    if (user) {
      setName(user.full_name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // --- Hàm kiểm tra mật khẩu ---
  const validatePassword = (pwd) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(pwd);
  };

  const handleUpdate = async () => {
    setError("");
    setServerError("");

    // Nếu user có nhập mật khẩu thì mới kiểm tra
    if (password && !validatePassword(password)) {
      setError(
        "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
      );
      return;
    }

    if (!user?.id) {
      setServerError("Không tìm thấy thông tin người dùng.");
      return;
    }

    try {
      setSaving(true);

      // Payload cơ bản: cập nhật tên
      const payload = {
        full_name: name,
      };

      // Nếu có nhập mật khẩu mới, gửi thêm lên để BE xử lý hash
      if (password) {
        // tuỳ bạn xử lý ở BE: ví dụ nhận field "password" và tự hash vào password_hash
        payload.password = password;
      }

      const res = await api.patch(`/api/users/${user.id}`, payload);

      alert("Thông tin đã được cập nhật thành công!");
      setPassword(""); // clear mật khẩu sau khi cập nhật

      // Nếu AuthContext có cơ chế refresh user từ res, bạn có thể gọi ở đây
      // ví dụ: updateUser(res.data) tuỳ bạn cài
    } catch (err) {
      console.error("Update user error:", err);
      const msg =
        err?.response?.data?.error ||
        "Có lỗi xảy ra khi cập nhật thông tin.";
      setServerError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setServerError("");

    if (!user?.id) {
      setServerError("Không tìm thấy thông tin người dùng.");
      return;
    }

    if (!window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
      return;
    }

    try {
      setDeleting(true);
      await api.delete(`/api/users/${user.id}`);

      alert("Tài khoản đã bị xóa!");

      // Nếu context có logout thì gọi
      if (typeof logout === "function") {
        await logout();
      }

      navigate("/auth");
    } catch (err) {
      console.error("Delete user error:", err);
      const msg =
        err?.response?.status === 403
          ? "Bạn không có quyền xóa tài khoản này."
          : err?.response?.data?.error ||
          "Có lỗi xảy ra khi xóa tài khoản.";
      setServerError(msg);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-6">
      {/* Header */}
      <div className="bg-white shadow-md w-full max-w-3xl rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Cài đặt tài khoản
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Quản lý thông tin cá nhân và bảo mật của bạn.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow-md w-full max-w-3xl rounded-xl p-8">
        {/* Avatar */}
        <div className="flex items-center justify-center mb-6">
          <img
            src={user?.avatar_url || "https://i.pravatar.cc/100?img=1"}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-orange-400 object-cover"
          />
        </div>

        {/* Thông báo lỗi server */}
        {serverError && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded">
            {serverError}
          </div>
        )}

        {/* Form */}
        <div className="space-y-5">
          {/* Tên người dùng */}
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4" /> Tên người dùng
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* Email (chỉ hiển thị, không chỉnh sửa) */}
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-100 text-gray-500"
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Mật khẩu mới
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Để trống nếu không muốn đổi mật khẩu"
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleUpdate}
            disabled={saving}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-70 text-white px-5 py-2 rounded-md shadow-md text-sm"
          >
            <Save className="w-4 h-4" />
            {saving ? "Đang lưu..." : "Cập nhật"}
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-70 text-white px-5 py-2 rounded-md shadow-md text-sm"
          >
            <Trash2 className="w-4 h-4" />
            {deleting ? "Đang xóa..." : "Xóa tài khoản"}
          </button>
        </div>
      </div>
    </div>
  );
}
