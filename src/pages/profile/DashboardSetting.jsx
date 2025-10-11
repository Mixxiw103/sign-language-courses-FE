import React, { useState } from "react";
import { Lock, Mail, User, Trash2, Save } from "lucide-react";

export default function DashboardSetting() {
  const [name, setName] = useState("Jane Cooper");
  const [email] = useState("jane.cooper@example.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // --- Hàm kiểm tra mật khẩu ---
  const validatePassword = (pwd) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(pwd);
  };

  const handleUpdate = () => {
    if (!validatePassword(password)) {
      setError(
        "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
      );
      return;
    }
    setError("");
    alert("Thông tin đã được cập nhật thành công!");
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
      alert("Tài khoản đã bị xóa!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-6">
      {/* Header */}
      <div className="bg-white shadow-md w-full max-w-3xl rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Cài đặt tài khoản</h1>
        <p className="text-sm text-gray-500 mt-1">
          Quản lý thông tin cá nhân và bảo mật của bạn.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow-md w-full max-w-3xl rounded-xl p-8">
        {/* Avatar */}
        <div className="flex items-center justify-center mb-6">
          <img
            src="https://i.pravatar.cc/100?img=1"
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-orange-400"
          />
        </div>

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
              placeholder="Nhập mật khẩu mới..."
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
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md shadow-md text-sm"
          >
            <Save className="w-4 h-4" /> Cập nhật
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md shadow-md text-sm"
          >
            <Trash2 className="w-4 h-4" /> Xóa tài khoản
          </button>
        </div>
      </div>
    </div>
  );
}
