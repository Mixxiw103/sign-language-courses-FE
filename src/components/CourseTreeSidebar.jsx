import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Lock,
  CheckCircle,
  Circle,
  CircleDot,
} from "lucide-react";

export default function CourseTreeSidebar({
  sections = [],
  activeLessonId,
  onSelectLesson = () => {},
  isPurchased = false,
}) {
  const [openChapters, setOpenChapters] = useState(
    new Set(sections.map((s) => s.id))
  );

  const toggleChapter = (id) => {
    const updated = new Set(openChapters);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setOpenChapters(updated);
  };

  return (
    <aside className="flex flex-col h-full bg-white">
      {/* HEADER */}
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">
          Nội dung khóa học
        </h3>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-200">
        {sections.map((sec) => {
          const isOpen = openChapters.has(sec.id);

          return (
            <div key={sec.id} className="px-3 py-2">
              {/* CHAPTER HEADER */}
              <button
                onClick={() => toggleChapter(sec.id)}
                className="w-full flex items-center justify-between py-2"
              >
                <div className="font-semibold text-[15px] text-slate-800">
                  {sec.title}
                </div>

                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-slate-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                )}
              </button>

              {/* LESSONS */}
              {isOpen && (
                <div className="mt-1">
                  {sec.lessons.map((l) => {
                    const isActive = activeLessonId === l.id;
                    const locked = !isPurchased;

                    return (
                      <button
                        key={l.id}
                        disabled={locked}
                        onClick={() => onSelectLesson(l)}
                        className={`
                          w-full flex items-center justify-between px-3 py-2 mb-2 rounded-xl border text-left transition-all
                          ${
                            locked
                              ? "opacity-50 cursor-not-allowed bg-slate-100 border-slate-200"
                              : isActive
                              ? "border-indigo-300 bg-indigo-50"
                              : "border-slate-200 hover:bg-slate-50"
                          }
                        `}
                      >
                        {/* LEFT */}
                        <div>
                          <div className="font-medium text-slate-800">
                            {l.title}
                          </div>
                          <div className="text-xs text-slate-500">
                            {l.durationMin} phút
                          </div>
                        </div>

                        {/* STATUS ICON */}
                        {locked ? (
                          <Lock className="w-4 h-4 text-slate-400" />
                        ) : l.progress?.status === "completed" ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : l.progress?.status === "in_progress" ? (
                          <CircleDot className="w-4 h-4 text-blue-500" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
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
