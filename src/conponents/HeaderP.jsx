import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useClickOutsideDebounce } from "../hooks/useClickOutsideDebounce";

export default function Header({ isLoggedIn = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hideAfterFade, setHideAfterFade] = useState(true); // 👈 ẩn hẳn sau khi fade-out
  const menuRef = useClickOutsideDebounce(() => setIsOpen(false), 200);

  // Mở menu: hiện ngay để chạy fade-in
  useEffect(() => {
    if (isOpen) setHideAfterFade(false);
  }, [isOpen]);

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
          <NavLink to="/" end className={({isActive}) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>Trang chủ</NavLink>
          <NavLink to="/courses" className={({isActive}) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>Khóa học</NavLink>
          <NavLink to="/careers" className={({isActive}) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>Nghề nghiệp</NavLink>
          <NavLink to="/blog" className={({isActive}) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>Blog</NavLink>
          <NavLink to="/about" className={({isActive}) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>Về chúng tôi</NavLink>
        </nav>

        {/* User */}
        <div className="relative flex items-center space-x-2 text-left">
          {isLoggedIn ? (
            <>
              <img src="https://i.pravatar.cc/40?img=1" alt="user" className="w-8 h-8 rounded-full" />
              <button
                id="user-menu-button"
                onClick={() => setIsOpen(v => !v)}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                className="text-gray-700 font-medium flex items-center cursor-pointer"
              >
                Lina <span className="ml-1">▼</span>
              </button>

              {/* Dropdown: luôn render, fade mượt khi đóng */}
              <div
                ref={menuRef}
                role="menu"
                aria-hidden={!isOpen}
                aria-labelledby="user-menu-button"
                onTransitionEnd={(e) => {
                  // Khi đang đóng (isOpen=false) và transition của opacity kết thúc ⇒ ẩn hẳn
                  if (e.propertyName === "opacity" && !isOpen) {
                    setHideAfterFade(true);
                  }
                }}
                className={[
                  "absolute z-10 top-12 right-0 w-40 bg-white shadow-md rounded-lg",
                  "origin-top-right transform-gpu will-change-transform",
                  // dùng easing khác nhau cho mở/đóng để tự nhiên hơn
                  isOpen ? "transition-opacity transition-transform duration-200 ease-out"
                         : "transition-opacity transition-transform duration-150 ease-in",
                  // trạng thái thị giác
                  isOpen ? "opacity-100 scale-100 translate-y-0"
                         : "opacity-0 scale-95 -translate-y-1",
                  // chặn tương tác CHỈ SAU khi fade-out xong
                  hideAfterFade ? "invisible pointer-events-none" : "visible pointer-events-auto"
                ].join(" ")}
              >
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100" role="menuitem" tabIndex={isOpen ? 0 : -1}>
                  Trang cá nhân
                </Link>
                <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100" role="menuitem" tabIndex={isOpen ? 0 : -1}>
                  Cài đặt
                </Link>
                <button className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100" role="menuitem" tabIndex={isOpen ? 0 : -1}>
                  Đăng xuất
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/auth" className="px-4 py-2 rounded-lg border border-cyan-500 text-cyan-500 hover:bg-cyan-50">Đăng nhập</Link>
              <Link to="/auth" className="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600">Đăng ký</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
