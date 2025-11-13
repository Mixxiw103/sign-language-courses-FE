import { useState, useEffect } from "react";
import { BookOpen, PenTool, Monitor, Database, Briefcase, BarChart, Camera, Film } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import CourseCard from "../../components/CourseCard";
import Search from "./Search";
import { courseApi } from "../../utils/apis/courseService"; // ✅ import service

export default function CoursePage() {
  const [searchValue, setSearchValue] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fade = {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
  };

  // ===== 🧠 GỌI API từ BE thông qua service =====
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await courseApi.list({ limit: 8 }); // 👈 bạn có thể truyền thêm params (page, q, sort,...)
        setCourses(res.data.items || []);
      } catch (err) {
        console.error("Lỗi khi tải khóa học:", err);
        setError("Không thể tải danh sách khóa học");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // ===== Danh mục mẫu =====
  const categories = [
    { id: 1, name: "Design", icon: PenTool, color: "bg-teal-100 text-teal-600" },
    { id: 2, name: "Development", icon: Monitor, color: "bg-indigo-100 text-indigo-600" },
    { id: 3, name: "Technology", icon: Database, color: "bg-blue-100 text-blue-600" },
    { id: 4, name: "Business", icon: Briefcase, color: "bg-emerald-100 text-emerald-600" },
    { id: 5, name: "Marketing", icon: BarChart, color: "bg-amber-100 text-amber-600" },
    { id: 6, name: "Photography", icon: Camera, color: "bg-rose-100 text-rose-600" },
    { id: 7, name: "Acting", icon: Film, color: "bg-gray-100 text-gray-600" },
    { id: 8, name: "Management", icon: BookOpen, color: "bg-green-100 text-green-600" },
  ];

  return (
    <div>
      {/* ===== Ô tìm kiếm ===== */}
      <div className="my-10 relative mx-auto flex w-full max-w-3xl items-center rounded-full bg-white p-1 pl-4 shadow-xl ring-1 ring-slate-100">
        <input
          type="text"
          placeholder="Tìm khóa học yêu thích..."
          className="h-12 flex-1 rounded-full bg-transparent pl-2 pr-10 text-base text-slate-700 placeholder:text-slate-400 focus:outline-none"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
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
          type="submit"
        >
          Search
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {searchValue !== "" ? (
          <motion.div key="search" {...fade}>
            <Search />
          </motion.div>
        ) : (
          <motion.div key="home" {...fade}>
            {/* ===== Danh mục khóa học ===== */}
            <section className="py-8 px-6">
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
                      <p className="text-sm text-gray-500">Khám phá các khóa học hấp dẫn.</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ===== Danh sách khóa học từ BE ===== */}
            <section className="bg-blue-50 py-12 px-6">
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Khóa học hiện có</h2>
                </div>

                {loading ? (
                  <p className="text-center text-gray-500 py-10">Đang tải dữ liệu...</p>
                ) : error ? (
                  <p className="text-center text-red-500 py-10">{error}</p>
                ) : courses.length === 0 ? (
                  <p className="text-center text-gray-500 py-10">
                    Hiện chưa có khóa học nào.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {courses.map((course) => (
                      <CourseCard
                        key={course._id}
                        c={{
                          id: course._id,
                          title: course.title,
                          description: course.description,
                          category: course.status || "draft",
                          duration: "3 tháng",
                          image:
                            course.thumbnail_url ||
                            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200",
                          author: "Giảng viên",
                          avatar:
                            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
                          oldPrice: course.price + 20,
                          price: course.price,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
