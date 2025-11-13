import { useState, useRef } from "react";

export default function CourseTreeSidebar({
    sections = [],
    activeLessonId,
    onSelectLesson = () => { },
}) {
    const [open, setOpen] = useState(new Set(sections.map((s) => s.id)));
    const [page, setPage] = useState(1);
    const perPage = 5;
    const totalPages = Math.ceil(sections.length / perPage);
    const startIdx = (page - 1) * perPage;
    const visibleSections = sections.slice(startIdx, startIdx + perPage);

    // ✅ ref để theo dõi vị trí cuộn
    const containerRef = useRef(null);
    const sectionRefs = useRef({});

    const toggle = (id) => {
        const n = new Set(open);
        const wasOpen = n.has(id);
        wasOpen ? n.delete(id) : n.add(id);
        setOpen(n);

        //  Nếu đang ẩn section → cuộn lên trên
        if (wasOpen && sectionRefs.current[id]) {
            sectionRefs.current[id].scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <aside className="flex flex-col h-full" ref={containerRef}>
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">Nội dung khóa học</h3>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-200">
                {visibleSections.map((sec) => {
                    const totalMin = sec.lessons.reduce((a, b) => a + (b.durationMin || 0), 0);
                    return (
                        <div
                            key={sec.id}
                            ref={(el) => (sectionRefs.current[sec.id] = el)}
                            className="px-2"
                        >
                            <button
                                onClick={() => toggle(sec.id)}
                                className="flex w-full items-center justify-between py-3 px-2"
                            >
                                <div>
                                    <div className="text-[15px] font-semibold text-slate-800 text-left">
                                        {sec.title}
                                    </div>
                                    <div className="text-xs text-slate-500 text-left">
                                        {sec.lessons.length} bài học • {formatMin(totalMin)}
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
                                                    className={`w-full rounded-xl border px-3 py-2 text-left flex items-center justify-between ${isActive
                                                        ? "border-indigo-300 bg-indigo-50"
                                                        : "border-slate-200 hover:bg-slate-50"
                                                        }`}
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
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Phân trang nút tròn */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 py-3 border-t border-slate-200 bg-slate-50">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`w-7 h-7 rounded-full text-sm font-medium ${page === i + 1
                                ? "bg-indigo-600 text-white"
                                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-300"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </aside>
    );
}

// ================== ICON & UTILS ==================
function Chevron({ open }) {
    return (
        <svg
            className={"h-5 w-5 transition-transform text-slate-400 " + (open ? "rotate-180" : "")}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.04 1.08l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z" />
        </svg>
    );
}

function StatusIcon({ status, active }) {
    if (status === "done")
        return <svg className="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.7-7.7 1.4 1.4z" /></svg>;
    if (status === "locked")
        return <svg className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 8V6a3 3 0 116 0v3H9z" /></svg>;
    return (
        <svg className={"h-5 w-5 " + (active ? "text-indigo-600" : "text-slate-400")} viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
        </svg>
    );
}

function RightBadge({ status, active }) {
    if (status === "done")
        return <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs">✓</span>;
    return (
        <span className={`grid h-5 w-5 place-items-center rounded-full border text-xs ${active ? "border-indigo-300 text-indigo-600 bg-indigo-50" : "border-slate-300 text-slate-400"
            }`}>
            ▶
        </span>
    );
}

function formatMin(min = 0) {
    return min >= 60 ? `${Math.floor(min / 60)}h ${min % 60}m` : `${min} phút`;
}
