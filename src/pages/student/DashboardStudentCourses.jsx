import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { courseApi } from "../../utils/apis/courseService";
import { api } from "../../utils/api";
import CourseProgressCard from "../../components/CourseProgressCard";
import { Link } from "react-router-dom";
export default function DashboardStudentCourses() {
  const { user, isAuthenticated } = useAuth();

  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy tiến trình
  async function getCourseProgress(courseId) {
    const res = await api.get(
      `/api/progress/${user._id}/course/${courseId}/summary`
    );
    return res.data;
  }

  // Chuẩn hoá data
  function transformCourse(course) {
    return {
      id: course._id,
      title: course.title || "Khoá học chưa có tiêu đề",
      description: course.description || "Khoá học này chưa có mô tả.",
      thumbnail_url: course.thumbnail_url,
      lecturer_id: course.lecturer_id,
      category: course.category || course.status || "Chưa phân loại",
      duration: course.duration || "3 tháng",
      image:
        course.thumbnail_url ||
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200",
      author:
        course.lecturer_id?.full_name || course.lecturer_name || "Giảng viên",
      avatar:
        course.lecturer_id?.avatar_url ||
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
      price: course.price || 0,
      oldPrice:
        course.old_price || (course.price ? course.price + 20000 : 50000),
    };
  }

  // Load danh sách khóa học đã mua
  useEffect(() => {
    const loadCourses = async () => {
      try {
        if (!isAuthenticated) return;

        setLoading(true);
        const res = await courseApi.list({ limit: 1000 }); // lấy nhiều để check purchased
        const allList = res.data.items || [];

        const my = [];

        for (const course of allList) {
          const check = await api.get(
            `/api/purchases/check?courseId=${course._id}`
          );

          if (check.data.isPurchased) {
            my.push(course);
          }
        }

        setMyCourses(my);
      } catch (err) {
        console.error("Lỗi tải khóa học đã mua:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [isAuthenticated]);

  return (
    <div className="p-6 pb-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Khoá học của bạn</h1>
        <p className="text-sm text-gray-500 mb-6">
          Xem tiến trình và tiếp tục học ngay
        </p>

        {loading ? (
          <p className="text-gray-500 py-10">Đang tải dữ liệu...</p>
        ) : myCourses.length === 0 ? (
          <p className="text-gray-500">Bạn chưa mua khoá học nào.</p>
        ) : (
          <div
            className="
            grid grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            gap-6"
          >
            {myCourses.map((course) => (
              <Link
                key={course._id}
                to={`/courses/${course._id}`}
                className="block" // để giữ layout đẹp
              >
                <CourseProgressCard course={course} userId={user?.id} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
