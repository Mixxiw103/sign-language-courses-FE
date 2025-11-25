import { api } from "../api";

export const authApi = {
  // Đăng ký tài khoản mới
  register: (data) => api.post("/api/auth/register", data),

  // Đăng nhập (sẽ trả về step: VERIFY_OTP)
  login: (data) => api.post("/api/auth/login", data),

  // Xác minh mã OTP sau khi đăng nhập
  verifyOtp: (data) => api.post("/api/auth/verify-otp", data),

  // Làm mới token (refresh token)
  refresh: (refresh_token) => api.post("/api/auth/refresh", { refresh_token }),

  // Đăng xuất
  logout: (refresh_token) => api.post("/api/auth/logout", { refresh_token }),
};
