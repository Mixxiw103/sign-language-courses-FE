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
import { api } from "../../utils/api";

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
  const purchasedIds = new Set(myCourses.map((c) => c._id));
  const filteredAllCourses = allCourses.filter((c) => !purchasedIds.has(c._id));
  const filteredRecommend = recommendCourses.filter(
    (c) => !purchasedIds.has(c._id)
  );

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
      thumbnail_url: course.thumbnail_url,
      lecturer_id: course.lecturer_id,
      category: course.category || course.status || "Chưa phân loại",
      duration: course.duration || "3 tháng",

      // --- IMAGE FALLBACK ---
      image:
        course.thumbnail_url ||
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200",

      // --- LECTURER INFO ---
      author:
        course.lecturer_id?.full_name || course.lecturer_name || "Giảng viên ",

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
  // ====== Lấy tất cả khoá học + phân loại theo purchased ======
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);

        // 1) Lấy tất cả khóa học
        const res = await courseApi.list({
          page,
          limit,
          q: searchValue || undefined,
        });

        const list = res.data.items || [];

        // 2) Nếu chưa đăng nhập → không có khoá học của bạn
        if (!isAuthenticated) {
          setAllCourses(list);
          setMyCourses([]);
          setRecommendCourses(list.slice(0, 4));
          return;
        }

        // 3) Nếu có login → check purchased từng khoá
        const my = [];
        const notPurchased = [];

        for (const course of list) {
          const check = await api.get(
            `/api/purchases/check?courseId=${course._id}`
          );

          if (check.data.isPurchased) {
            my.push(course);
          } else {
            notPurchased.push(course);
          }
        }

        setMyCourses(my);
        setAllCourses(notPurchased);
        setRecommendCourses(notPurchased.slice(0, 4)); // lấy 4 khóa gợi ý
      } catch (err) {
        console.error("Lỗi tải courses:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [page, searchValue, isAuthenticated]);

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
    <div className="pb-16">
      {/* ===== SEARCH BOX ===== */}
      <div className="my-10 relative mx-auto flex w-full max-w-3xl items-center rounded-full bg-white p-1 pl-4 shadow-xl ring-1 ring-slate-100">
        <input
          type="text"
          placeholder="Tìm kiếm khoá học yêu thích"
          className="h-12 flex-1 rounded-full bg-transparent pl-2 pr-10 text-base text-slate-700 placeholder:text-slate-400 focus:outline-none"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {/* Dấu X clear input */}
        {searchValue && (
          <button
            type="button"
            onClick={() => setSearchValue("")}
            className="absolute right-30 p-2 text-slate-300 cursor-pointer text-sm hover:text-slate-600"
          >
            <i className="fas fa-times"></i> {/* hoặc dùng icon lib khác */}
          </button>
        )}

        <button
          className="cursor-pointer mr-1 rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          type="submit"
        >
          Search
        </button>
      </div>
      {/* ===== KHOÁ HỌC CỦA BẠN ===== */}
      {isAuthenticated && (
        <section className="py-8 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-left">
              Khoá học của bạn
            </h2>

            {myCourses.length === 0 ? (
              <p className="text-gray-500">Bạn chưa mua khoá học nào.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {myCourses.map((c) => (
                  <CourseCard key={c._id} c={transformCourse(c)} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ==== FILTER DANH SÁCH ĐÃ MUA RA ===== */}
      {(() => {
        const purchasedIds = new Set(myCourses.map((c) => c._id));
        var filteredRecommend = recommendCourses.filter(
          (c) => !purchasedIds.has(c._id)
        );
        var filteredAllCourses = allCourses.filter(
          (c) => !purchasedIds.has(c._id)
        );
      })()}

      {/* ===== GỢI Ý CHO BẠN ===== */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-left">
            Gợi ý cho bạn
          </h2>

          {loadingRecommend ? (
            <p className="text-gray-500 py-6">Đang tải khoá học gợi ý...</p>
          ) : filteredRecommend.length === 0 ? (
            <p className="text-gray-500 py-6">Không có gợi ý phù hợp.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {filteredRecommend.map((course) => {
                const c = transformCourse(course);
                return <CourseCard key={c.id} c={c} />;
              })}
            </div>
          )}
        </div>
      </section>
      {/* ===== Danh mục khóa học ===== */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-8">
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
      {/* ===== TẤT CẢ KHOÁ HỌC ===== */}
      <section className="bg-blue-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 text-left">
            Tất cả khoá học
          </h2>
          <p className="text-sm text-gray-500 text-left">
            Tìm thấy {filteredAllCourses.length} khoá học phù hợp.
          </p>

          {loading ? (
            <p className="text-center text-gray-500 py-10">
              Đang tải dữ liệu...
            </p>
          ) : error ? (
            <p className="text-center text-red-500 py-10">{error}</p>
          ) : filteredAllCourses.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              Không còn khoá học nào khác.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {filteredAllCourses.map((course) => {
                  const c = transformCourse(course);
                  return <CourseCard key={c.id} c={c} />;
                })}
              </div>

              {/* PAGINATION GIỮ NGUYÊN */}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
