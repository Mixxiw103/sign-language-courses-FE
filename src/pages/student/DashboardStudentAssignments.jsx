import React, { useState } from "react";
import { FileText, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";

const assignments = [
  { id: 1, title: "Bài tập thiết kế giao diện UX", course: "UX/UI Design", deadline: "12/10/2025", status: "Chưa nộp" },
  { id: 2, title: "Phân tích yêu cầu người dùng", course: "UX/UI Design", deadline: "15/10/2025", status: "Đã nộp" },
  { id: 3, title: "Tạo wireframe cơ bản", course: "UI Design Fundamentals", deadline: "14/10/2025", status: "Chưa nộp" },
  { id: 4, title: "Xây dựng prototype", course: "UI Design Fundamentals", deadline: "16/10/2025", status: "Đã nộp" },
  { id: 5, title: "Thiết kế hệ thống màu", course: "Advanced Prototyping", deadline: "18/10/2025", status: "Chưa nộp" },
  { id: 6, title: "Tối ưu trải nghiệm người dùng", course: "Advanced Prototyping", deadline: "20/10/2025", status: "Đã nộp" },
];

export default function DashboardStudentAssignment() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(assignments.length / itemsPerPage);

  const visibleAssignments = assignments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800">Bài tập của tôi</h1>
        <p className="text-sm text-gray-500 mt-1">
          Quản lý và hoàn thành các bài tập của bạn.
        </p>
      </div>

      {/* Main Content */}
      <section className="bg-blue-50 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Danh sách bài tập
          </h2>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Tiêu đề</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Khóa học</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Hạn chót</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Xem chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {visibleAssignments.map((assignment) => (
                  <tr key={assignment.id} className="border-t hover:bg-gray-50 transition">
                    <td className="py-4 px-4 text-sm text-gray-700">{assignment.title}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{assignment.course}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{assignment.deadline}</td>
                    <td className="py-4 px-4 text-sm">
                      {assignment.status === "Chưa nộp" ? (
                        <span className="flex items-center text-red-600">
                          <XCircle className="w-4 h-4 mr-1" /> {assignment.status}
                        </span>
                      ) : (
                        <span className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" /> {assignment.status}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm">
                      <button className="text-blue-600 hover:underline">
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 space-x-3">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`p-2 rounded-full border ${
                currentPage === 1
                  ? "text-gray-300 border-gray-200"
                  : "text-gray-600 hover:bg-gray-200 border-gray-300"
              }`}
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full border ${
                currentPage === totalPages
                  ? "text-gray-300 border-gray-200"
                  : "text-gray-600 hover:bg-gray-200 border-gray-300"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
