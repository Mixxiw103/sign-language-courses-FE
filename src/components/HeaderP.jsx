import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useClickOutsideDebounce } from "../hooks/useClickOutsideDebounce";
import { useAuth } from "../auth/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  // const { user, isAuthenticated, logout } = useAuth();
  const menuRef = useClickOutsideDebounce(() => setIsOpen(false), 200);

  const linkBase = "transition-colors px-0 py-2";
  const linkActive = "text-cyan-500";
  const linkInactive = "text-gray-600 hover:text-cyan-500";

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="border border-cyan-400 rounded-md p-2">
            <span className="font-bold text-gray-700">TOTC</span>
          </div>
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
        <div className="relative flex items-center space-x-2 text-left">
          {user ? (
            <>
              <img
                src="https://i.pravatar.cc/40?img=1"
                alt="user"
                className="w-8 h-8 rounded-full"
              />
              <button
                onClick={() => setIsOpen((v) => !v)}
                className="text-gray-700 font-medium flex items-center cursor-pointer"
              >
                {user?.full_name || "User"} <span className="ml-1">▼</span>
              </button>

              {isOpen && (
                <div
                  ref={menuRef}
                  className="absolute right-0 top-10 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Trang cá nhân
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Cài đặt
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="px-4 py-2 rounded-lg border border-cyan-500 text-cyan-500 hover:bg-cyan-50"
              >
                Đăng nhập
              </Link>
              <Link
                to="/auth"
                className="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600"
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
