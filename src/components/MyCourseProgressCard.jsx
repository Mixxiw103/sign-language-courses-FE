import { Link } from "react-router-dom";
import { URL_BASE } from "../utils/api";

export default function MyCourseProgressCard({ course }) {
  const progress = course.progress || {};
  const completed = progress.byStatus?.completed || 0;
  const total = progress.totalLessons || 0;
  const percent = progress.avg_progress || 0;

  const thumbnail = course.thumbnail_url?.startsWith("http")
    ? course.thumbnail_url
    : URL_BASE + course.thumbnail_url;

  const lecturer =
    course.lecturer_id?.full_name || course.lecturer_name || "Giảng viên";

  return (
    <Link
      to={`/courses/${course._id}`}
      className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden block"
    >
      <div className="h-40 overflow-hidden">
        <img
          src={thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-slate-800 line-clamp-2">
          {course.title}
        </h3>

        <div className="flex items-center gap-2 mt-2">
          <img
            src={course.lecturer_id?.avatar_url || "https://i.pravatar.cc/40"}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-slate-600">{lecturer}</span>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Bài học:</span>
            <span>
              {completed}/{total}
            </span>
          </div>

          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all"
              style={{ width: `${percent}%` }}
            ></div>
          </div>

          <p className="text-xs text-slate-600 mt-2">{percent}% hoàn thành</p>
        </div>
      </div>
    </Link>
  );
}
