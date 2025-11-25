import React from "react";
import {
  GraduationCap,
  FileText,
  MessageCircle,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardStudentHome() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-800">
          Chào mừng đến với khu vực Học viên
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Chọn một mục bên dưới để bắt đầu học, làm bài tập hoặc trao đổi với giảng viên.
        </p>
      </div>

      {/* Quick Intro Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">
            Bảng điều khiển dành cho học viên
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Đây là nơi bạn quản lý toàn bộ hành trình học tập của mình: xem khóa học đã đăng ký,
            làm bài tập, xem lịch học và trao đổi với giảng viên hoặc bạn học.
          </p>
          <p className="text-sm text-slate-600 mt-2">
            Hãy bắt đầu bằng cách chọn một chức năng ở bên dưới.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">
            Gợi ý
          </p>
          <p className="text-sm text-blue-900">
            Nên thường xuyên kiểm tra mục <span className="font-semibold">Bài tập</span> và{" "}
            <span className="font-semibold">Tin nhắn</span> để không bỏ lỡ deadline
            hoặc thông báo quan trọng từ giảng viên.
          </p>
        </div>
      </div>

      {/* Main Feature Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Khóa học của tôi */}
        <Link
          to="my-courses"
          className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col gap-3 group border border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 rounded-full">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">
                Khóa học
              </p>
              <p className="text-base font-semibold text-slate-800">
                Khóa học của tôi
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-1 flex-1">
            Xem danh sách các khóa học bạn đã đăng ký, tiếp tục học dở và theo dõi tiến độ.
          </p>
          <span className="text-sm font-medium text-blue-600 group-hover:underline mt-1">
            Đi tới &rarr;
          </span>
        </Link>

        {/* Bài tập */}
        <Link
          to="assignments"
          className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col gap-3 group border border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 rounded-full">
              <FileText className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">
                Bài tập
              </p>
              <p className="text-base font-semibold text-slate-800">
                Bài tập & bài nộp
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-1 flex-1">
            Xem danh sách bài tập được giao, deadline và tình trạng nộp bài của bạn.
          </p>
          <span className="text-sm font-medium text-emerald-600 group-hover:underline mt-1">
            Đi tới &rarr;
          </span>
        </Link>

        {/* Tin nhắn */}
        <Link
          to="messages"
          className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col gap-3 group border border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-100 rounded-full">
              <MessageCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">
                Liên lạc
              </p>
              <p className="text-base font-semibold text-slate-800">
                Tin nhắn & thảo luận
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-1 flex-1">
            Trao đổi với giảng viên, hỗ trợ viên hoặc bạn học về nội dung khóa học.
          </p>
          <span className="text-sm font-medium text-purple-600 group-hover:underline mt-1">
            Đi tới &rarr;
          </span>
        </Link>

        {/* Cài đặt */}
        <Link
          to="settings"
          className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col gap-3 group border border-slate-100"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 rounded-full">
              <Settings className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase">
                Tài khoản
              </p>
              <p className="text-base font-semibold text-slate-800">
                Cài đặt & thông tin
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-1 flex-1">
            Chỉnh sửa hồ sơ cá nhân, đổi mật khẩu và tùy chỉnh trải nghiệm học tập.
          </p>
          <span className="text-sm font-medium text-amber-600 group-hover:underline mt-1">
            Đi tới &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}
