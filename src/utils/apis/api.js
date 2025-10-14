import axios from "axios";
import { authApi } from "./authService";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Phản hồi interceptor: thêm token vào header
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

// phản hồi interceptor: handle 401, refresh token
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Nếu nhận 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang refresh, đẩy request vào queue
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refresh_token = localStorage.getItem("refreshToken");
      if (!refresh_token) {
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const res = await authApi.refresh(refresh_token);
        const newToken = res.data.access_token;
        localStorage.setItem("accessToken", newToken);
        api.defaults.headers.Authorization = `Bearer ${newToken}`; // cập nhật token mới cho các request sau
        processQueue(null, newToken);
        return api(originalRequest); //  trả lại request gốc với token mới
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
