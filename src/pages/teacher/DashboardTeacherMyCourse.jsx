import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../auth/AuthContext"; // ✅ lấy từ context
import CourseCard from "../../components/CourseCard"; // tuỳ bạn, có thể hiển thị thẳng trong file này

export default function DashboardTeacherMyCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Lấy user và axios instance từ AuthContext
  const { user, isAuthenticated, loading: authLoading, api } = useAuth();

  useEffect(() => {
    if (authLoading || !isAuthenticated || !user?.id) return;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/courses", {
          params: {
            lecturer_id: user.id,
            sort: "-created_at",
          },
        });

        setCourses(res.data.items || []);
        console.log("📦 Courses từ API:", courses);
      } catch (err) {
        console.error("❌ Lỗi khi tải danh sách khóa học:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [authLoading, isAuthenticated, user, api]);

  // 🌀 Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <Loader2 className="animate-spin mr-2" />
        Đang tải danh sách khóa học...
      </div>
    );
  }

  // 📭 Không có khóa học nào
  if (courses.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        Bạn chưa tạo khóa học nào.
      </div>
    );
  }

  // 🎓 Hiển thị danh sách khóa học
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Khoá học của tôi</h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((c) => (
          <CourseCard key={c.id} c={c} />
        ))}
      </div>
    </div>
  );
}
