import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useClickOutsideDebounce } from "../hooks/useClickOutsideDebounce";
import { useAuth } from "../auth/AuthContext";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import { URL_BASE } from "../utils/api";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useClickOutsideDebounce(() => setIsOpen(false), 200);

  const linkBase = "transition-colors px-0 py-2";
  const linkActive = "text-cyan-500";
  const linkInactive = "text-gray-600 hover:text-cyan-500";

  return (
    // 🔥 Header fixed CHUẨN
    <header
      className="
        fixed top-0 left-0 right-0 z-[9999]
        bg-white/95 backdrop-blur-sm shadow-sm
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="" className="h-8" />
        </div>

        {/* Menu */}
        <nav className="hidden md:flex space-x-8 font-medium">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Trang chủ
          </NavLink>

          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Khóa học
          </NavLink>

          <NavLink
            to="/careers"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Nghề nghiệp
          </NavLink>

          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Blog
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Về chúng tôi
          </NavLink>
        </nav>

        {/* User */}
        <div ref={wrapperRef} className="relative flex items-center space-x-2">
          {user ? (
            <>
              <img
                src={
                  user?.avatar_url
                    ? URL_BASE + user?.avatar_url
                    : "/defaultAvatar.jpg"
                }
                alt="user"
                className="w-8 h-8 rounded-full"
                draggable={false}
              />

              <button
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setIsOpen((v) => !v);
                }}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                className="text-gray-700 font-medium flex items-center cursor-pointer select-none"
              >
                {user?.full_name || "User"}
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Dropdown */}
              <div
                className={`
                  absolute right-0 top-10 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10
                  transition duration-150 origin-top-right
                  ${
                    isOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }
                `}
                role="menu"
              >
                <button
                  onClick={() => {
                    if (user.role === "lecturer") navigate("/teacher");
                    else if (user.role === "student") navigate("/student");
                    else navigate("/");
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  role="menuitem"
                >
                  Trang cá nhân
                </button>

                <Link
                  to="/settings"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100 text-left"
                  role="menuitem"
                >
                  Cài đặt
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Đăng xuất
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="px-1 py-1.5 min-w-[115px] text-base rounded-3xl border border-cyan-500 text-cyan-500 hover:bg-cyan-50"
              >
                Đăng nhập
              </Link>
              <Link
                to="/auth"
                className="px-1 py-1.5 min-w-[115px] text-base rounded-3xl bg-cyan-500 text-white rounded-3xl hover:bg-cyan-600"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
