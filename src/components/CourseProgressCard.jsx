import { useEffect, useState } from "react";
import { api, URL_BASE } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function CourseProgressCard({ course, userId }) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !course?._id) return;

    const fetchProgress = async () => {
      try {
        const res = await api.get(
          `/api/progress/${userId}/course/${course._id}/summary`
        );
        setProgress(res.data);
      } catch (err) {
        console.log("Không load progress", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [userId, course?._id]);

  // --- TÍNH TIẾN TRÌNH CHUẨN ---
  const totalLessons = progress?.totalLessons || 0;
  const completed = progress?.byStatus?.completed || 0;

  const percent =
    totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0; // Tính chuẩn, không dùng avg_progress bị sai

  // --- UI INFO ---
  const thumbnail =
    course.thumbnail_url ||
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200";

  const lecturerName =
    course.lecturer_id?.full_name || course.lecturer_name || "Giảng viên";

  const lecturerAvatar =
    course.lecturer_id?.avatar_url ||
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400";

  return (
    <div
      onClick={() => navigate(`/courses/${course._id}`)}
      className="rounded-xl bg-white shadow-sm hover:shadow-md overflow-hidden 
                 transition border border-gray-100 cursor-pointer"
    >
      {/* Image */}
      <img
        src={thumbnail.startsWith("http") ? thumbnail : URL_BASE + thumbnail}
        alt={course.title}
        className="w-full h-40 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-[15px] leading-tight line-clamp-2 text-left">
          {course.title}
        </h3>

        {/* Lecturer */}
        <div className="flex items-center mt-2">
          <img
            src={lecturerAvatar}
            alt={lecturerName}
            className="w-6 h-6 rounded-full object-cover mr-2"
          />
          <span className="text-[13px] text-gray-600">{lecturerName}</span>
        </div>

        {/* Progress */}
        <div className="mt-3">
          <div className="h-[3px] bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-[3px] bg-black rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>

          <p className="text-[11px] text-gray-500 mt-1 text-center">
            {loading
              ? "Đang tải..."
              : totalLessons > 0
              ? `Bài học ${completed}/${totalLessons}`
              : "Chưa có bài học nào"}
          </p>
        </div>
      </div>
    </div>
  );
}
