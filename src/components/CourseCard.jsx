import { Link } from "react-router-dom";

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 shadow-sm">
      {children}
    </span>
  );
}

export default function CourseCard({ c }) {
  return (
    // ✅ Dùng Link bọc toàn bộ card để điều hướng tới trang chi tiết
    <Link
      to={`/courses/${c.id || c._id}`} // 👈 id lấy từ props (BE trả _id)
      className="block cursor-pointer text-left group rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={c.image}
          alt={c.title}
          className="h-44 w-full object-cover transition group-hover:scale-[1.04]"
        />
      </div>

      <div className="space-y-3 p-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Badge>
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
              src={c.avatar}
              alt="avatar"
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-slate-700">
              {c.author || "Giảng viên"}
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
