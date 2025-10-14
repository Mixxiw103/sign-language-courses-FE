import axios from "axios";


// Cách dùng: const res = await api.get("/users/me");

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

// Lấy token từ localStorage mỗi lần gửi request
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("auth");
  if (raw) {
    const { accessToken } = JSON.parse(raw);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  // Gắn thêm header khác tùy bạn:
  //   config.headers["x-api-key"] = "YOUR_API_KEY";
  //   config.headers["Content-Type"] = "application/json";

  return config;
});

