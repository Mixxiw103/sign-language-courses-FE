import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
<<<<<<< HEAD
import { api } from "../../auth/api";
import CourseTreeSidebar from "../../components/CourseTreeSidebar"; // 👈 import component mới
=======
import { api } from "../../utils/api";
>>>>>>> da34e787d858c11122626d09f6744c0e07e0ec78

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/courses/${id}/tree`);
        const data = res.data;

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
        console.error("Lỗi khi tải khóa học:", err);
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
        <h1 className="text-2xl font-bold text-slate-900 mb-2 text-left">{course.title}</h1>
        <p className="text-slate-600 mb-4 text-left">{course.description}</p>

        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-200 to-slate-100 mb-4">
          {course.demo_video_url ? (
            <video src={course.demo_video_url} controls className="w-full h-full object-cover" />
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
            <p className="font-semibold text-slate-900 text-left pb-0.5">Giảng viên</p>
            <p className="text-sm text-slate-600">
              ID: {course.lecturer_id || "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-4">
          <h2 className="text-lg font-semibold text-slate-900 mb-2 text-left">Mô tả khóa học</h2>
          <p className="text-slate-700 text-left">{course.description}</p>
        </div>
      </div>

      {/* Sidebar */}
      <div className="col-span-5 border-l border-slate-200 bg-white">
        <CourseTreeSidebar
          sections={sections}
          activeLessonId={activeLesson?.id}
          onSelectLesson={(lesson) => setActiveLesson(lesson)}
        />
      </div>
    </div>
  );
}
