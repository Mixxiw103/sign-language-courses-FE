import { Link, useNavigate } from "react-router-dom";
import { URL_BASE } from "../utils/api";
import { Edit } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 shadow-sm">
      {children}
    </span>
  );
}

export default function CourseCard({ c }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const lecturerId = c.lecturer_id?._id || c.lecturer_id;
  const isOwner = user && user.id === lecturerId;

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/teacher/courses/edit/${c._id || c.id}`);
  };

  function stripHtml(html) {
    if (!html) return "";
    return html.replace(/<[^>]+>/g, "");
  }

  return (
    <Link
      to={`/courses/${c.id || c._id}`}
      className="group rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md relative flex flex-col h-full"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={
            c.thumbnail_url
              ? URL_BASE + c.thumbnail_url
              : "https://i.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png"
          }
          alt={c.title}
          className="h-44 w-full object-cover transition group-hover:scale-[1.04]"
        />

        {isOwner && (
          <button
            onClick={handleEdit}
            className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/90 text-slate-600 shadow-sm hover:bg-orange-500 hover:text-white transition"
            title="Chỉnh sửa khóa học này"
          >
            <Edit size={16} />
          </button>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col justify-between flex-1 p-2">
        {/* Tags */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Badge>{c.category || "Khóa học"}</Badge>
          <Badge>{c.duration || "3 tháng"}</Badge>
        </div>

        {/* TITLE (ép cao 2 dòng) */}
        <h3 className="text-left line-clamp-2 text-base font-semibold text-slate-600 group-hover:text-slate-950 transition min-h-[48px]">
          {c.title}
        </h3>

        {/* DESCRIPTION (ép cao 2 dòng) */}
        <p className="text-left line-clamp-2 text-sm leading-6 text-slate-500 min-h-[48px]">
          {stripHtml(c.description)}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2 pt-1">
          {/* Lecturer */}
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

          {/* Price */}
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
