import { Link, useNavigate } from "react-router-dom";
import { URL_BASE } from "../utils/api";
import { Edit } from "lucide-react"; // Import icon bút chì
import { useAuth } from "../auth/AuthContext";

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 shadow-sm">
      {children}
    </span>
  );
}

export default function CourseCard({ c }) {
  const { user } = useAuth(); // 2. Lấy user hiện tại
  const navigate = useNavigate();

  // 3. Logic kiểm tra quyền sở hữu
  // c.lecturer_id có thể là string ID hoặc object (nếu đã populate)
  const lecturerId = c.lecturer_id?._id || c.lecturer_id?.id || c.lecturer_id;
  const isOwner = user && user.id === lecturerId;

  const handleEdit = (e) => {
    e.preventDefault(); // Ngăn Link cha hoạt động (không vào trang detail)
    e.stopPropagation();
    // Điều hướng sang trang sửa (bạn sửa đường dẫn này theo router của bạn)
    navigate(`/teacher/courses/edit/${c._id || c.id}`);
  };

  return (
    <Link
      to={`/courses/${c.id || c._id}`}
      className="block cursor-pointer text-left group rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md relative" // Thêm relative để nút Edit định vị
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={
            c.thumbnail_url
              ? URL_BASE + c.thumbnail_url
              : "https://i.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1280&format=png&auto=webp&s=7177756d1f393b6e093596d06e1ba539f723264b"
          }
          alt={c.title}
          className="h-44 w-full object-cover transition group-hover:scale-[1.04]"
        />

        {/* --- NÚT SỬA (CHỈ HIỆN KHI LÀ CHỦ SỞ HỮU) --- */}
        {isOwner && (
          <button
            onClick={handleEdit}
            className="absolute cursor-pointer top-2 right-2 z-10 p-2 rounded-full bg-white/90 text-slate-600 shadow-sm hover:bg-orange-500 hover:text-white transition-colors"
            title="Chỉnh sửa khóa học này"
          >
            <Edit size={16} />
          </button>
        )}
      </div>

      <div className="space-y-3 p-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Badge>
            {/* ... SVG giữ nguyên ... */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              className="-ml-0.5"
            >
              <rect
                x="4"
                y="4"
                width="16"
                height="16"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
            {c.category || "Khóa học"}
          </Badge>
          <Badge>
            {/* ... SVG giữ nguyên ... */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              className="-ml-0.5"
            >
              <path
                d="M12 8v4l3 2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
            {c.duration || "3 tháng"}
          </Badge>
        </div>

        <h3 className="line-clamp-2 text-base font-semibold text-slate-800 group-hover:text-indigo-600 transition">
          {c.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-6 text-slate-500">
          {c.description}
        </p>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <img
              src={
                c?.lecturer_id?.avatar_url
                  ? URL_BASE + c?.lecturer_id?.avatar_url
                  : "/defaultAvatar.jpg"
              }
              alt="avatar"
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-slate-700">
              {c?.lecturer_id?.full_name || "Giảng viên"}
            </span>
          </div>
          <div className="text-right">
            {c.oldPrice && (
              <div className="text-[11px] text-slate-400 line-through">
                ${c.oldPrice}
              </div>
            )}
            <div className="text-sm font-semibold text-slate-900">
              ${c.price}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
