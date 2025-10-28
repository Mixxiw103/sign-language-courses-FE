import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../utils/api";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //  Fetch dữ liệu khóa học
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/courses/${id}/tree`);
        const data = res.data;

        // Map dữ liệu MongoDB → React format
        const formattedSections = (data.chapters || []).map((ch) => ({
          id: ch._id,
          title: ch.title,
          lessons: (ch.lessons || []).map((l) => ({
            id: l._id,
            title: l.title,
            durationMin: l.duration_min || 10,
            status: "idle",
            documents: l.documents || [],
          })),
        }));

        setCourse(data);
        setSections(formattedSections);
      } catch (err) {
        console.error(" Lỗi khi tải khóa học:", err);
        setError("Không thể tải dữ liệu khóa học.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="flex h-[70vh] items-center justify-center text-lg text-slate-600">
        Đang tải khóa học...
      </div>
    );

  if (error)
    return (
      <div className="flex h-[70vh] items-center justify-center text-red-600">
        {error}
      </div>
    );

  if (!course)
    return (
      <div className="flex h-[70vh] items-center justify-center text-slate-600">
        Không tìm thấy khóa học
      </div>
    );

  return (
    <div className="grid grid-cols-24 bg-[#f7fafc] min-h-screen">
      <div className="col-span-1"></div>

      {/* Nội dung chính */}
      <div className="col-span-18 bg-white shadow-sm p-8">
        {/* Tiêu đề khóa học */}
        <h1 className="text-2xl font-bold text-slate-900 mb-2 text-left">
          {course.title}
        </h1>
        <p className="text-slate-600 mb-4 text-left">{course.description}</p>

        {/* Video demo */}
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-200 to-slate-100 mb-4">
          {course.demo_video_url ? (
            <video
              src={course.demo_video_url}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500">
              Không có video demo
            </div>
          )}
        </div>

        {/* Giảng viên */}
        <div className="flex items-center gap-4 py-4 border-t border-slate-200">
          <img
            src="https://i.pravatar.cc/80?img=32"
            alt="Instructor"
            className="h-14 w-14 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-slate-900 text-left pb-0.5">
              Giảng viên
            </p>
            <p className="text-sm text-slate-600">
              ID: {course.lecturer_id || "N/A"}
            </p>
          </div>
        </div>

        {/* Mô tả */}
        <div className="mt-6 border-t border-slate-200 pt-4">
          <h2 className="text-lg font-semibold text-slate-900 mb-2 text-left">
            Mô tả khóa học
          </h2>
          <p className="text-slate-700 text-left">{course.description}</p>
        </div>
      </div>

      {/* Sidebar */}
      <div className="col-span-5 border-l border-slate-200 bg-white">
        <CourseContentSidebar
          sections={sections}
          activeLessonId={activeLesson?.id}
          onSelectLesson={(lesson) => setActiveLesson(lesson)}
          defaultOpen={sections.slice(0, 1).map((s) => s.id)}
        />
      </div>
    </div>
  );
}

// ======================= SIDEBAR ==========================

function CourseContentSidebar({
  sections = [],
  activeLessonId,
  onSelectLesson = () => { },
  defaultOpen = [],
}) {
  const [open, setOpen] = useState(
    () => new Set(defaultOpen.length ? defaultOpen : sections.map((s) => s.id))
  );
  const toggle = (id) => {
    const n = new Set(open);
    n.has(id) ? n.delete(id) : n.add(id);
    setOpen(n);
  };

  return (
    <aside>
      <div className="flex items-center justify-between p-4">
        <h3 className="text-lg font-semibold text-slate-900">
          Nội dung khóa học
        </h3>
        <button className="text-slate-400 hover:text-slate-600">⋯</button>
      </div>

      <div className="divide-y divide-slate-200">
        {sections.map((sec) => {
          const totalMin = sec.lessons.reduce(
            (a, b) => a + (b.durationMin || 0),
            0
          );
          return (
            <div key={sec.id} className="px-2">
              <button
                onClick={() => toggle(sec.id)}
                className="flex w-full items-center justify-between py-3 px-2"
              >
                <div>
                  <div className="text-[15px] font-semibold text-slate-800 text-left pb-0.5">
                    {sec.title}
                  </div>
                  <div className="text-xs text-slate-500 text-left">
                    {sec.lessons.length} bài học • {formatMin(totalMin)} tổng
                    thời gian
                  </div>
                </div>
                <Chevron open={open.has(sec.id)} />
              </button>

              {open.has(sec.id) && (
                <div className="pb-2">
                  {sec.lessons.map((l) => {
                    const isActive = l.id === activeLessonId;
                    return (
                      <div key={l.id} className="mb-2">
                        <button
                          onClick={() => onSelectLesson(l, sec)}
                          className={[
                            "w-full rounded-xl border px-3 py-2 text-left flex items-center justify-between",
                            isActive
                              ? "border-indigo-300 bg-indigo-50"
                              : "border-slate-200 hover:bg-slate-50",
                          ].join(" ")}
                        >
                          <div className="flex items-center gap-3">
                            <StatusIcon status={l.status} active={isActive} />
                            <div>
                              <div className="text-sm font-medium text-slate-800 text-left">
                                {l.title}
                              </div>
                              <div className="text-xs text-slate-500 text-left">
                                {formatMin(l.durationMin)}
                              </div>
                            </div>
                          </div>
                          <RightBadge status={l.status} active={isActive} />
                        </button>

                        {l.documents?.length > 0 && (
                          <div className="pl-10 text-xs text-slate-600 mt-1 text-left">
                            {l.documents.map((d) => (
                              <div key={d._id}>
                                📄{" "}
                                <a
                                  href={d.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="underline hover:text-indigo-600"
                                >
                                  {d.name}
                                </a>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

// ======================= TIỆN ÍCH ==========================

function Chevron({ open }) {
  return (
    <svg
      className={
        "h-5 w-5 transition-transform text-slate-400 " +
        (open ? "rotate-180" : "")
      }
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.04 1.08l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z" />
    </svg>
  );
}

function StatusIcon({ status, active }) {
  if (status === "done")
    return (
      <svg className="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.7-7.7 1.4 1.4z" />
      </svg>
    );
  if (status === "locked")
    return (
      <svg className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 8V6a3 3 0 116 0v3H9z" />
      </svg>
    );
  return (
    <svg
      className={"h-5 w-5 " + (active ? "text-indigo-600" : "text-slate-400")}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function RightBadge({ status, active }) {
  if (status === "done")
    return (
      <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs">
        ✓
      </span>
    );
  return (
    <span
      className={[
        "grid h-5 w-5 place-items-center rounded-full border text-xs",
        active
          ? "border-indigo-300 text-indigo-600 bg-indigo-50"
          : "border-slate-300 text-slate-400",
      ].join(" ")}
    >
      ▶
    </span>
  );
}

function formatMin(min = 0) {
  return min >= 60
    ? `${Math.floor(min / 60)}h ${min % 60}m`
    : `${min} phút`;
}
