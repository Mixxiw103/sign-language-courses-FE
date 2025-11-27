import {
  Search,
  Bell,
  ShoppingCart,
  Package,
  Users,
  Boxes,
  GraduationCap,
  BarChart3,
  Settings,
  LogOut,
  LayoutDashboard,
  PlusSquare,
  House,
} from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LuMessageCircle } from "react-icons/lu";
import IncomingCallModal from "../call/IncomingCallModal";
import { useAuth } from "../auth/AuthContext";
import { URL_BASE } from "../utils/api";

export default function DashboardTeacherLayout() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="min-h-screen text-left bg-slate-100 text-slate-800">
      <IncomingCallModal />
      <div className="grid grid-cols-12 min-h-screen">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 bottom-0  w-[240px] col-span-12 md:col-span-3 lg:col-span-2 bg-white border-r border-slate-100 flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
            <div className="h-10 w-10 rounded-full bg-slate-800 text-white grid place-items-center font-bold">
              ST
            </div>
            <div>
              <div className="font-semibold">{user?.full_name}</div>
              <div className="text-xs text-slate-500">
                Bảng điều khiển Giáo viên
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1">
            {[
              {
                to: "/teacher",
                label: "Bảng điều khiển",
                icon: <LayoutDashboard className="h-5 w-5" />,
              },
              {
                to: "/teacher/new-course",
                label: "Tạo mới khóa học",
                icon: <PlusSquare className="h-5 w-5" />,
              },
              {
                to: "/teacher/my-courses",
                label: "Khóa học của tôi",
                icon: <GraduationCap className="h-5 w-5" />,
              },
              {
                to: "/teacher/earning",
                label: "Kiếm tiền",
                icon: <BarChart3 className="h-5 w-5" />,
              },
              {
                to: "/teacher/messages",
                label: "Tin nhắn",
                icon: <LuMessageCircle className="h-5 w-5" />,
              },
              {
                to: "/teacher/settings",
                label: "Cài đặt",
                icon: <Settings className="h-5 w-5" />,
              },
            ].map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-[#fff3f0] text-[#ff6636] font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto p-4 border-t border-slate-100">
            <button className="cursor-pointer flex w-full items-center gap-3 px-3 py-3 rounded-lg text-slate-600 hover:text-rose-700 hover:bg-rose-50 transition">
              <LogOut className="h-5 w-5" />
              <span className="text-sm font-medium">Đăng xuất</span>
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="col-span-12 md:col-span-9 lg:col-span-10 bg-slate-100 mt-[64px] ml-[240px] w-full">
          {/* Topbar */}
          <div className="flex items-center  ml-[240px] bg-white justify-between px-6 py-2 fixed h-[64px] top-0 right-0 left-0 z-10">
            <div>
              <div className="text-lg font-semibold">Bảng điều khiển</div>
              <div className="text-sm text-slate-500">Chào mừng trở lại!</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  className="pl-9 pr-10 py-2 h-[38px] w-[280px] lg:w-[420px] rounded-full bg-white border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="Search..."
                />
              </div>
              <NavLink
                to="/"
                className="flex gap-2 items-center border border-[#e2e8f0] h-[38px] px-6 py-1 rounded-full"
              >
                <House className="size-4" />
                Về trang chủ
              </NavLink>

              <button className="relative h-10 w-10 rounded-full bg-white cursor-pointer grid place-items-center hover:shadow transition">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-rose-500 text-white text-[10px] grid place-items-center">
                  3
                </span>
              </button>

              <div className="flex items-center gap-3">
                <img
                  src={
                    user?.avatar_url
                      ? URL_BASE + user?.avatar_url
                      : "/defaultAvatar.jpg"
                  }
                  alt="avatar"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="hidden sm:block">
                  <div className="text-sm font-medium">{user?.full_name}</div>
                  <div className="text-xs text-slate-500">{user?.email}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Children với fade transition */}
          <div className="">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname} // khi path đổi sẽ trigger animation
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
