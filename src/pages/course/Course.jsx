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
import { courseApi } from "../../utils/apis/courseService";
import { useAuth } from "../../auth/AuthContext";

export default function CoursePage() {
  const { user, isAuthenticated } = useAuth();

  // Search + phân trang
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(8);

  // Data
  const [myCourses, setMyCourses] = useState([]);
  const [recommendCourses, setRecommendCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  // Pagination meta
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // UI state
  const [loading, setLoading] = useState(true);
  const [loadingMine, setLoadingMine] = useState(false);
  const [loadingRecommend, setLoadingRecommend] = useState(false);
  const [error, setError] = useState(null);

  // ===== Helper chuẩn hoá khoá học để đẩy vào CourseCard =====
  function transformCourse(course) {
    return {
      id: course._id,

      // --- TEXT FIELD FALLBACK ---
      title: course.title || "Khoá học chưa có tiêu đề",
      description: course.description || "Khoá học này chưa có mô tả.",
      category: course.category || course.status || "Chưa phân loại",
      duration: course.duration || "3 tháng",

      // --- IMAGE FALLBACK ---
      image:
        course.thumbnail_url ||
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200",

      // --- LECTURER INFO ---
      author:
        course.lecturer_id?.full_name || course.lecturer_name || "Giảng viên",

      avatar:
        course.lecturer_id?.avatar_url ||
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",

      // --- PRICE FIELD ---
      price: course.price || 0,
      oldPrice:
        course.old_price || (course.price ? course.price + 20000 : 50000),
    };
  }

  // ===== Gọi API: tất cả khoá học + search + phân trang =====
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await courseApi.list({
          page,
          limit,
          q: searchValue || undefined,
        });

        const data = res.data || {};
        setAllCourses(data.items || []);
        setTotalPages(data.pages || 1);
        setTotalItems(data.total || 0);
      } catch (err) {
        console.error("Lỗi khi tải tất cả khóa học:", err);
        setError("Không thể tải danh sách khóa học");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [page, limit, searchValue]);

  // ===== Gọi API: khoá học đã mua của user =====
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchMine = async () => {
      try {
        setLoadingMine(true);
        const res = await courseApi.mine();
        console.log(res);
        // tuỳ backend trả { data: [...] } hay { items: [...] }
        const data = res.data;
        const items = data.data || data.items || [];
        setMyCourses(items);
      } catch (err) {
        console.error("Lỗi khi tải khóa học của bạn:", err);
      } finally {
        setLoadingMine(false);
      }
    };

    fetchMine();
  }, [isAuthenticated]);

  // ===== Gọi API: gợi ý cho bạn =====
  useEffect(() => {
    const fetchRecommend = async () => {
      try {
        setLoadingRecommend(true);
        const res = await courseApi.recommend({ limit: 4 });
        const data = res.data;
        const items = data.data || data.items || [];
        setRecommendCourses(items);
      } catch (err) {
        console.error("Lỗi khi tải khóa học gợi ý:", err);
      } finally {
        setLoadingRecommend(false);
      }
    };

    fetchRecommend();
  }, []);

  // ===== Handler: khi search thì reset về trang 1 =====
  function handleSearchChange(e) {
    setSearchValue(e.target.value);
    setPage(1);
  }

  return (
    <div className="pb-16">
      {/* ===== Ô tìm kiếm ===== */}
      <div className="my-10 relative mx-auto flex w-full max-w-3xl items-center rounded-full bg-white p-1 pl-4 shadow-xl ring-1 ring-slate-100">
        <input
          type="text"
          placeholder="Tìm khóa học yêu thích..."
          className="h-12 flex-1 rounded-full bg-transparent pl-2 pr-10 text-base text-slate-700 placeholder:text-slate-400 focus:outline-none"
          value={searchValue}
          onChange={handleSearchChange}
        />
        {searchValue && (
          <button
            onClick={() => setSearchValue("")}
            className="absolute right-24 p-2 text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        )}
        <button
          className="cursor-pointer mr-1 rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          type="button"
        >
          Search
        </button>
      </div>

      {/* ===== Danh mục khóa học nổi bật ===== */}
      {/* <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-8">
            Danh mục khóa học nổi bật
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
                  Khám phá các khóa học hấp dẫn.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ===== Khóa học của bạn (đã mua) ===== */}
      {isAuthenticated && (
        <section className="py-8 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Khoá học của bạn
              </h2>
            </div>

            {loadingMine ? (
              <p className="text-gray-500 py-6">Đang tải khoá học của bạn...</p>
            ) : myCourses.length === 0 ? (
              <p className="text-gray-500 py-6">
                Bạn chưa mua khoá học nào. Hãy khám phá và đăng ký ngay!
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {myCourses.map((course) => {
                  const c = transformCourse(course);
                  return <CourseCard key={c.id} c={c} />;
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== Gợi ý cho bạn ===== */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Gợi ý cho bạn
            </h2>
          </div>

          {loadingRecommend ? (
            <p className="text-gray-500 py-6">Đang tải khoá học gợi ý...</p>
          ) : recommendCourses.length === 0 ? (
            <p className="text-gray-500 py-6">
              Hiện chưa có khoá học gợi ý. Hệ thống sẽ cập nhật sớm!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {recommendCourses.map((course) => {
                const c = transformCourse(course);
                return <CourseCard key={c.id} c={c} />;
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== Tất cả khóa học (có phân trang) ===== */}
      <section className="bg-blue-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Tất cả khoá học
              </h2>
              <p className="text-sm text-gray-500">
                Tìm thấy {totalItems} khoá học phù hợp.
              </p>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-gray-500 py-10">
              Đang tải dữ liệu...
            </p>
          ) : error ? (
            <p className="text-center text-red-500 py-10">{error}</p>
          ) : allCourses.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              Hiện chưa có khóa học nào.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {allCourses.map((course) => {
                  const c = transformCourse(course);
                  return <CourseCard key={c.id} c={c} />;
                })}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-3 mt-8">
                <button
                  disabled={page === 1}
                  className={`px-4 py-2 border rounded-full text-sm ${
                    page === 1
                      ? "text-gray-300 border-gray-200 cursor-not-allowed"
                      : "text-slate-700 border-slate-300 hover:bg-white"
                  }`}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Trước
                </button>

                <span className="text-sm text-slate-600">
                  Trang {page} / {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  className={`px-4 py-2 border rounded-full text-sm ${
                    page === totalPages
                      ? "text-gray-300 border-gray-200 cursor-not-allowed"
                      : "text-slate-700 border-slate-300 hover:bg-white"
                  }`}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Sau
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
