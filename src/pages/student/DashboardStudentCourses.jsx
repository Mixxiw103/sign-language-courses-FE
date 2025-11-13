import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";
import { Link } from "react-router-dom";

export default function DashboardStudentCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const { user, isAuthenticated, loading: authLoading, api } = useAuth();

  useEffect(() => {
    if (authLoading || !isAuthenticated || !user?.id) return;

    const fetchPurchasedCourses = async () => {
      try {
        setLoading(true);

        // API lấy khóa học đã mua
        const res = await api.get(`/api/courses/users/${user.id}/purchased-courses`);
        const data = res.data?.data || [];

        setCourses(data);
        console.log("Khóa học đã mua:", data);
        setCurrentPage(1);
      } catch (err) {
        console.error("Lỗi khi tải khóa học đã mua:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, [authLoading, isAuthenticated, user, api]);

  const totalPages = Math.max(1, Math.ceil(courses.length / itemsPerPage));

  const currentCourses = courses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  // Loading UI
  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-500">
        <Loader2 className="animate-spin mr-2" />
        Đang tải khóa học của bạn...
      </div>
    );
  }

  // Không có khóa học
  if (!courses.length) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-white shadow-md p-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Khóa học của tôi
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Bạn chưa mua khóa học nào. Hãy khám phá và đăng ký khoá học đầu tiên!
          </p>
        </div>

        <section className="bg-blue-50 py-16 px-6">
          <div className="max-w-6xl mx-auto text-center text-gray-500">
            Chưa có khóa học nào.
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Khóa học của tôi
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Khám phá và tiếp tục hành trình học tập của bạn.
        </p>
      </div>

      {/* Main Content */}
      <section className="bg-blue-50 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Course Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentCourses.map((course) => {
              const progress = course.progress || "0% Hoàn thành";
              const progressPercent = progress.split("%")[0] + "%";

              return (
                <Link
                  to={`/courses/${course._id}`}
                  key={course._id}
                  className="rounded-xl bg-white shadow-md overflow-hidden transition hover:shadow-lg block"
                >
                  <img
                    src={
                      course.thumbnail_url ||
                      "https://via.placeholder.com/300x200?text=Course"
                    }
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-700 line-clamp-2">
                      {course.title}
                    </h3>

                    <div className="flex items-center mt-2">
                      <img
                        src="https://i.pravatar.cc/40"
                        alt="Giảng viên"
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span className="text-sm text-gray-600">
                        {course.lecturer_name || "Giảng viên"}
                      </span>
                    </div>

                    {course.purchased_at && (
                      <p className="text-xs text-gray-500 mt-2">
                        Đã mua ngày:{" "}
                        {new Date(course.purchased_at).toLocaleDateString()}
                      </p>
                    )}

                    <div className="mt-3">
                      <div className="h-1 bg-gray-200 rounded-full">
                        <div
                          className="h-1 bg-black rounded-full"
                          style={{ width: progressPercent }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{progress}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-3">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`p-2 rounded-full border ${currentPage === 1
                  ? "text-gray-300 border-gray-200"
                  : "text-gray-600 hover:bg-gray-200 border-gray-300"
                  }`}
              >
                <ChevronLeft size={20} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition ${currentPage === page
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full border ${currentPage === totalPages
                  ? "text-gray-300 border-gray-200"
                  : "text-gray-600 hover:bg-gray-200 border-gray-300"
                  }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
