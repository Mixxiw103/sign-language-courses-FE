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
  House,
} from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function DashboardAdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen text-left bg-slate-100 text-slate-800">
      <div className="grid grid-cols-12 min-h-screen">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 bottom-0  w-[240px] col-span-12 md:col-span-3 lg:col-span-2 bg-white border-r border-slate-100 flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
            <div className="h-10 w-10 rounded-full bg-slate-800 text-white grid place-items-center font-bold">
              ST
            </div>
            <div>
              <div className="font-semibold">SweetTreats</div>
              <div className="text-xs text-slate-500">Admin Panel</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1">
            {[
              {
                to: "/admin",
                label: "Bảng điều khiển",
                icon: <LayoutDashboard className="h-5 w-5" />,
              },
              {
                to: "/admin/orders",
                label: "Hóa đơn",
                icon: <ShoppingCart className="h-5 w-5" />,
              },
              {
                to: "/admin/users",
                label: "Người dùng",
                icon: <Users className="h-5 w-5" />,
              },
              {
                to: "/admin/courses",
                label: "Khóa học",
                icon: <GraduationCap className="h-5 w-5" />,
              },
              {
                to: "/admin/reports",
                label: "Báo cáo",
                icon: <BarChart3 className="h-5 w-5" />,
              },
              {
                to: "/admin/settings",
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
                      ? "bg-[#f0f9ff] text-[#1faec4] font-semibold"
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
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="col-span-12 md:col-span-9 lg:col-span-10 bg-amber-50/60 mt-[64px] ml-[240px] w-full">
          {/* Topbar */}
          <div className="flex items-center ml-[240px] bg-white justify-between px-6 py-2 fixed h-[64px] top-0 right-0 left-0">
            <div>
              <div className="text-lg font-semibold">Dashboard</div>
              <div className="text-sm text-slate-500">Welcome back, Admin!</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  className="pl-9 h-[38px] pr-10 py-2 w-[280px] lg:w-[420px] rounded-full bg-white border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
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
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=80&auto=format&fit=crop"
                  alt="avatar"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="hidden sm:block">
                  <div className="text-sm font-medium">Admin User</div>
                  <div className="text-xs text-slate-500">
                    admin@sweettreats.com
                  </div>
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
