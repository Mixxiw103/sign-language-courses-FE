import React from "react";
import { GraduationCap, FileText, Calendar, BarChart3 } from "lucide-react";

export default function DashboardStudentHome() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Chào mừng, Học sinh!</h1>
        <p className="text-sm text-slate-500">Theo dõi tiến độ học tập của bạn tại đây.</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Khóa học */}
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Khóa học</p>
              <p className="text-lg font-semibold text-slate-800">5 Đang học</p>
            </div>
          </div>
        </div>

        {/* Card 2: Bài tập */}
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-full">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Bài tập</p>
              <p className="text-lg font-semibold text-slate-800">3 Chưa nộp</p>
            </div>
          </div>
        </div>

        {/* Card 3: Lịch học */}
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-full">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Lịch học</p>
              <p className="text-lg font-semibold text-slate-800">2 Buổi hôm nay</p>
            </div>
          </div>
        </div>

        {/* Card 4: Tiến độ */}
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-full">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Tiến độ</p>
              <p className="text-lg font-semibold text-slate-800">75% Hoàn thành</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Section (nếu có trong ảnh) */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Khóa học nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold">UX/UI Design</h3>
            <p className="text-sm text-slate-600">8h 30min - 9 Lessons</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold">Python Basics</h3>
            <p className="text-sm text-slate-600">5h 15min - 6 Lessons</p>
          </div>
        </div>
      </div>
    </div>
  );
}