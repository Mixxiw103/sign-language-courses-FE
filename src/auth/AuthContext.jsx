import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { api } from "./api";
import { saveAuth, loadAuth, clearAuth } from "./storage";
import { getUserFromAccessToken } from "./jwt";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null); // { id, email, role, exp }
  const [loading, setLoading] = useState(true);

  // ---- Hàng rào đồng bộ refresh để không refresh chồng chéo
  const isRefreshingRef = useRef(false);
  const refreshPromiseRef = useRef(null);

  // ===== Khởi động: đọc từ localStorage
  useEffect(() => {
    const saved = loadAuth();
    if (saved?.accessToken && saved?.refreshToken) {
      setAccessToken(saved.accessToken);
      setRefreshToken(saved.refreshToken);
      const u = getUserFromAccessToken(saved.accessToken);
      setUser(u);
    }
    setLoading(false);
  }, []);

  // ===== Lưu xuống localStorage mỗi khi token/user đổi
  useEffect(() => {
    if (accessToken && refreshToken) {
      saveAuth({ accessToken, refreshToken, user });
    } else {
      clearAuth();
    }
  }, [accessToken, refreshToken, user]);

  // ===== Gắn Authorization vào request nếu có accessToken
  useEffect(() => {
    const reqId = api.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });
    return () => api.interceptors.request.eject(reqId);
  }, [accessToken]);

  // ===== Interceptor xử lý 401: thử refresh rồi retry 1 lần
  useEffect(() => {
    const resId = api.interceptors.response.use(
      (res) => res,
      async (error) => {
        const original = error.config;
        const status = error?.response?.status;

        // Nếu 401 và chưa retry -> refresh
        if (status === 401 && !original._retry && refreshToken) {
          original._retry = true;

          try {
            // Chặn refresh chồng chéo
            if (!isRefreshingRef.current) {
              isRefreshingRef.current = true;
              refreshPromiseRef.current = doRefreshToken(refreshToken);
            }
            const newTokens = await refreshPromiseRef.current;
            // reset flags
            isRefreshingRef.current = false;
            refreshPromiseRef.current = null;

            // Cập nhật state
            setAccessToken(newTokens.access_token);
            setRefreshToken(newTokens.refresh_token || refreshToken);
            setUser(getUserFromAccessToken(newTokens.access_token));

            // Gắn token mới vào header và retry
            original.headers.Authorization = `Bearer ${newTokens.access_token}`;
            return api(original);
          } catch (e) {
            isRefreshingRef.current = false;
            refreshPromiseRef.current = null;
            // Refresh fail -> logout
            await logout();
          }
        }

        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(resId);
  }, [refreshToken]);

  // ====== API: login / refresh / logout ======
  async function login({ email, password, captchaToken, access_token, refresh_token }) {
    //  Nếu đã có token (xác minh OTP xong)
    if (access_token && refresh_token) {
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      setUser(getUserFromAccessToken(access_token));
      return { access_token, refresh_token };
    }

    //  Nếu chưa có token (đăng nhập thường)
    const res = await api.post("/api/auth/login", { email, password, captchaToken });

    if (res.data?.step === "VERIFY_OTP") {
      return res.data;
    }

    const { access_token: newAccess, refresh_token: newRefresh } = res.data;
    if (newAccess && newRefresh) {
      setAccessToken(newAccess);
      setRefreshToken(newRefresh);
      setUser(getUserFromAccessToken(newAccess));
    }

    return res.data;
  }



  // Hàm gọi thẳng refresh endpoint (tách riêng để interceptor xài)
  async function doRefreshToken(refresh_token_param) {
    // Ví dụ: POST /auth/refresh { refresh_token: "..." }
    const res = await api.post("/api/auth/refresh", {
      refresh_token: refresh_token_param,
    });
    // Backend trả cùng định dạng bạn đưa ra:
    // { access_token, refresh_token? }
    return res.data;
  }

  async function refreshTokenNow() {
    if (!refreshToken) throw new Error("No refresh token");
    const data = await doRefreshToken(refreshToken);
    setAccessToken(data.access_token);
    if (data.refresh_token) setRefreshToken(data.refresh_token);
    setUser(getUserFromAccessToken(data.access_token));
    return data;
  }

  async function logout() {
    try {
      // Nếu có endpoint logout server (revoke refresh token), gọi vào đây
      // await api.post('/auth/logout', { refresh_token: refreshToken });
    } catch { }
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    clearAuth();
  }

  const value = useMemo(
    () => ({
      user,
      accessToken,
      refreshToken,
      isAuthenticated: !!accessToken,
      loading,

      login,
      refreshToken: refreshTokenNow,
      logout,
      api, // export axios instance để nơi khác gọi API
    }),
    [user, accessToken, refreshToken, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
