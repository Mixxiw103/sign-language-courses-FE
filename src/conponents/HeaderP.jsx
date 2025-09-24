import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

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
                <nav className="hidden md:flex space-x-8 text-gray-600 font-medium">
                    <Link to="/" className="hover:text-cyan-500">Trang chủ</Link>
                    <Link to="/courses" className="hover:text-cyan-500">Khóa học</Link>
                    <Link to="/careers" className="hover:text-cyan-500">Nghề nghiệp</Link>
                    <Link to="/blog" className="hover:text-cyan-500">Blog</Link>
                    <Link to="/about" className="hover:text-cyan-500">Về chúng tôi</Link>
                </nav>

                {/* User */}
                <div className="relative flex items-center space-x-2">
                    <img
                        src="https://i.pravatar.cc/40?img=1" // avatar demo
                        alt="user"
                        className="w-8 h-8 rounded-full"
                    />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-700 font-medium flex items-center"
                    >
                        Lina <span className="ml-1">▼</span>
                    </button>

                    {/* Dropdown */}
                    {isOpen && (
                        <div className="absolute top-12 right-0 w-40 bg-white shadow-md rounded-lg">
                            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Trang cá nhân</Link>
                            <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Cài đặt</Link>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Đăng xuất</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
