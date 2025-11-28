import { useState, useEffect } from "react";
import {
  PenTool,
  Monitor,
  Database,
  Briefcase,
  BarChart,
  Camera,
  Film,
  BookOpen,
} from "lucide-react";

import CourseCard from "../../components/CourseCard";
import CourseProgressCard from "../../components/CourseProgressCard";

import { courseApi } from "../../utils/apis/courseService";
import { api } from "../../utils/api";
import { useAuth } from "../../auth/AuthContext";

export default function CoursePage() {
  const { user, isAuthenticated } = useAuth();

  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  // Set giới hạn
  const [limit] = useState(6);

  const [allCourses, setAllCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [recommendCourses, setRecommendCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingMine, setLoadingMine] = useState(false);
  const [loadingRecommend, setLoadingRecommend] = useState(false);

  // Phân trang
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [error, setError] = useState(null);

  // ======================
  // 1) Lấy TẤT CẢ khóa học
  // ======================
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const res = await courseApi.list({
          page,
          limit,
          q: searchValue || undefined,
        });
        const data = res.data;
        setAllCourses(res.data.items || []);
        setAllCourses(data.items || []);
        setTotalPages(data.pages || 1);
        setTotalItems(data.total || 0);
      } catch (e) {
        console.error(e);
        setError("Không thể tải danh sách khóa học");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [page, searchValue]);

  // ======================
  // 2) Lấy danh sách khóa đã mua
  // ======================
  useEffect(() => {
    if (!isAuthenticated || allCourses.length === 0) {
      setMyCourses([]);
      return;
    }

    const fetchMyCourses = async () => {
      try {
        setLoadingMine(true);

        const purchased = [];

        for (const c of allCourses) {
          const check = await api.get(`/api/purchases/check?courseId=${c._id}`);

          if (check.data.isPurchased) {
            purchased.push(c);
          }
        }

        setMyCourses(purchased);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingMine(false);
      }
    };

    fetchMyCourses();
  }, [isAuthenticated, allCourses]);

  // ======================
  // 3) Gợi ý khóa học
  // ======================
  useEffect(() => {
    const fetchRecommend = async () => {
      try {
        setLoadingRecommend(true);

        const res = await courseApi.list({ limit: 4 });
        const items = res.data.data || res.data.items || [];

        setRecommendCourses(items);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingRecommend(false);
      }
    };

    fetchRecommend();
  }, []);
  // ===== DANH MỤC NỔI BẬT =====
  const categories = [
    {
      id: 1,
      name: "Phát triển Web",
      icon: Monitor,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      name: "Khoa học dữ liệu",
      icon: BarChart,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      name: "Lập trình Backend",
      icon: Database,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      name: "Thiết kế UI/UX",
      icon: PenTool,
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: 5,
      name: "Marketing",
      icon: Briefcase,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: 6,
      name: "Dựng phim - Video",
      icon: Film,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 7,
      name: "Thiết kế đồ hoạ",
      icon: Camera,
      color: "bg-red-100 text-red-600",
    },
    {
      id: 8,
      name: "Kỹ năng mềm",
      icon: BookOpen,
      color: "bg-teal-100 text-teal-600",
    },
  ];

  return (
    <div className="pb-20">
      {/* SEARCH */}
      <div className="my-10 mx-auto max-w-3xl flex items-center p-2 bg-white rounded-full shadow">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Tìm kiếm khoá học yêu thích"
          className="flex-1 px-3 outline-none"
        />
        <button className="px-6 py-2 bg-slate-900 text-white rounded-full">
          Search
        </button>
      </div>
      {/* TIẾN TRÌNH KHÓA HỌC */}
      {isAuthenticated && myCourses.length > 0 && (
        <section className="bg-blue-50 py-10 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-left">
              Chào mừng trở lại, sẵn sàng cho bài học tiếp theo?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.slice(0, 3).map((c) => (
                <CourseProgressCard key={c._id} course={c} userId={user.id} />
              ))}
            </div>
          </div>
        </section>
      )}
      {/* ===== Danh mục khóa học ===== */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-8 ">
            Chọn khóa học yêu thích từ danh mục nổi bật
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                <div className={`p-3 rounded-lg ${cat.color} mb-4`}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-700 mb-2">{cat.name}</h3>
                <p className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* GỢI Ý CHO BẠN */}
      <section className="py-8 px-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-left">Gợi ý cho bạn</h2>

        {loadingRecommend ? (
          <p>Đang tải...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {recommendCourses.map((c) => (
              <CourseCard key={c._id} c={c} />
            ))}
          </div>
        )}
      </section>
      {/* // ===== TẤT CẢ KHÓA HỌC ===== */}
      <section className="bg-blue-50 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-left ">Tất cả khóa học</h2>

          <div className="relative min-h-[400px]">
            {/* Overlay loading */}
            {loading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-slate-900 rounded-full animate-spin"></div>
              </div>
            )}

            {/* Nội dung khóa học */}
            <div
              className={`${loading ? "opacity-50 pointer-events-none" : ""}`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {allCourses.map((c) => (
                  <CourseCard key={c._id} c={c} />
                ))}
              </div>

              {/* ==== PAGINATION ==== */}
              <div className="flex justify-center items-center mt-8 gap-2">
                {/* Prev */}
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className={`px-3 py-1 rounded ${
                    page === 1 ? "bg-gray-200 text-gray-400" : "bg-white shadow"
                  }`}
                >
                  Trước
                </button>

                {/* Page Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <button
                      key={num}
                      onClick={() => setPage(num)}
                      className={`px-3 py-1 rounded ${
                        page === num
                          ? "bg-slate-900 text-white"
                          : "bg-white shadow"
                      }`}
                    >
                      {num}
                    </button>
                  )
                )}

                {/* Next */}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className={`px-3 py-1 rounded ${
                    page === totalPages
                      ? "bg-gray-200 text-gray-400"
                      : "bg-white shadow"
                  }`}
                >
                  Sau
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
