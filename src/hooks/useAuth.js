import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export function useAuth() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        console.log("Token trong localStorage:", token);

        if (!token) {
            setUser(null);
            setIsAuthenticated(false);
            return;
        }

        try {
            const decoded = jwtDecode(token);
            console.log("Decoded token:", decoded);
            const isExpired = decoded.exp * 1000 < Date.now();

            if (isExpired) {
                console.warn("Token hết hạn, vui lòng đăng nhập lại!");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                setUser(null);
                setIsAuthenticated(false);
                return;
            }

            // Nếu token hợp lệ
            setUser(decoded);
            setIsAuthenticated(true);
        } catch (err) {
            console.error("Lỗi giải mã token:", err);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setUser(null);
            setIsAuthenticated(false);
        }
    }, []);

    // Hàm logout — xóa token và reload về trang đăng nhập
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        setIsAuthenticated(false);
        window.location.href = "/auth";
    };

    return { user, isAuthenticated, logout };
}
