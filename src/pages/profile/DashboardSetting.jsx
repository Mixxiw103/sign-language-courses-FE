import React, { useState, useEffect } from "react";
import { Lock, Mail, User, Trash2, Save, Camera } from "lucide-react"; // Thêm icon Camera
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { URL_BASE } from "../../utils/api";

export default function DashboardSetting() {
  const { user, api, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --- State cho Avatar ---
  const [avatarFile, setAvatarFile] = useState(null); // File user chọn
  const [avatarPreview, setAvatarPreview] = useState(null); // URL để hiển thị preview

  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // --- Đồng bộ dữ liệu từ AuthContext vào form ---
  useEffect(() => {
    if (user) {
      setName(user.full_name || "");
      setEmail(user.email || "");
      // Set ảnh mặc định từ user data
      setAvatarPreview(
        user.avatar_url ? URL_BASE + user?.avatar_url : "/defaultAvatar.jpg"
      );
    }
  }, [user]);

  // --- Xử lý chọn ảnh ---
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate loại file (optional)
      if (!file.type.startsWith("image/")) {
        setError("Vui lòng chỉ chọn file hình ảnh.");
        return;
      }
      // Reset lỗi
      setError("");

      setAvatarFile(file);
      // Tạo URL preview cục bộ ngay lập tức
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const validatePassword = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(pwd);
  };

  const handleUpdate = async () => {
    setError("");
    setServerError("");

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
      let newAvatarUrl = user.avatar_url; // Mặc định giữ nguyên ảnh cũ

      // === BƯỚC 1: NẾU CÓ CHỌN FILE MỚI THÌ UPLOAD ===
      if (avatarFile) {
        const formData = new FormData();
        formData.append("folder", `users/${user.id}`); // Folder lưu trữ (tuỳ backend)
        formData.append("file", avatarFile);

        // Gọi API upload (sử dụng endpoint upload chung của bạn)
        const uploadRes = await api.post("/api/uploads", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // Giả sử server trả về { url: "..." }
        newAvatarUrl = uploadRes.data.url;
      }

      // === BƯỚC 2: CẬP NHẬT THÔNG TIN USER ===
      const payload = {
        full_name: name,
        avatar_url: newAvatarUrl, // Gửi URL ảnh mới (hoặc cũ) lên
      };

      if (password) {
        payload.password = password;
      }

      const res = await api.patch(`/api/users/${user.id}`, payload);

      alert("Thông tin đã được cập nhật thành công!");
      setPassword("");
      setAvatarFile(null); // Clear file sau khi save xong

      // TODO: Nếu AuthContext có hàm reloadUser() hoặc updateUser(), hãy gọi ở đây
      // để header cập nhật avatar mới ngay lập tức.
      // updateAuthUser(res.data);
    } catch (err) {
      console.error("Update user error:", err);
      const msg =
        err?.response?.data?.error || "Có lỗi xảy ra khi cập nhật thông tin.";
      setServerError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    // ... (Giữ nguyên logic cũ của bạn)
    setServerError("");
    if (!user?.id) return;
    if (!window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?"))
      return;

    try {
      setDeleting(true);
      await api.delete(`/api/users/${user.id}`);
      alert("Tài khoản đã bị xóa!");
      if (typeof logout === "function") await logout();
      navigate("/auth");
    } catch (err) {
      console.error("Delete user error:", err);
      const msg =
        err?.response?.data?.error || "Có lỗi xảy ra khi xóa tài khoản.";
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
        {/* --- KHU VỰC AVATAR (UPDATED) --- */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative group cursor-pointer">
            <img
              src={avatarPreview}
              alt="avatar"
              className="w-28 h-28 rounded-full border-4 border-orange-100 object-cover shadow-sm group-hover:opacity-90 transition"
            />

            {/* Input file ẩn */}
            <input
              type="file"
              accept="image/*"
              id="avatar-upload"
              className="hidden"
              onChange={handleAvatarChange}
            />

            {/* Nút đè lên ảnh */}
            <label
              htmlFor="avatar-upload"
              className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Camera className="w-8 h-8" />
            </label>

            {/* Nút nhỏ ở góc (luôn hiện) */}
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-1 right-1 bg-white text-gray-600 p-1.5 rounded-full shadow border border-gray-200 cursor-pointer hover:text-orange-600"
            >
              <Camera className="w-4 h-4" />
            </label>
          </div>
          <p className="text-xs text-gray-400 mt-2">Chạm vào ảnh để thay đổi</p>
        </div>
        {/* ------------------------------- */}

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

          {/* Email */}
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
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleUpdate}
            disabled={saving}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-70 text-white px-5 py-2 rounded-md shadow-md text-sm transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? "Đang lưu..." : "Cập nhật"}
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-70 text-white px-5 py-2 rounded-md shadow-md text-sm transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            {deleting ? "Đang xóa..." : "Xóa tài khoản"}
          </button>
        </div>
      </div>
    </div>
  );
}
