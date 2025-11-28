import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, URL_BASE } from "../../utils/api";
import { useAuth } from "../../auth/AuthContext";
import {
  Compass,
  BookOpen,
  Users,
  Clock,
  Globe,
  Star,
  RefreshCcw,
  Globe2,
  BadgeCheck,
  Captions,
  Smartphone,
  File,
} from "lucide-react";
import CourseTreeSidebar from "../../components/CourseTreeSidebar";
import { toast } from "react-toastify";

/* --------------------- COMPONENT CHÍNH ---------------------- */

export default function CourseDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  // Lấy userId an toàn (có thể là _id hoặc id)
  const userId = user?._id || user?.id || null;

  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  // Tiến trình khoá học
  const [courseProgress, setCourseProgress] = useState(null);

  /* -------------------- LOAD COURSE + TREE -------------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1) Lấy info khóa học + tree
        const res = await api.get(`/api/courses/${id}/tree`);
        const data = res.data;

        let purchased = false;

        // 2) Check đã mua (nếu login)
        if (userId) {
          try {
            const check = await api.get(`/api/purchases/check?courseId=${id}`);
            purchased = check.data.isPurchased;
          } catch (e) {
            console.log("Không check purchase được");
          }
        }

        setIsPurchased(purchased);
        setCourse(data);

        // 3) Map data chapters -> sections + lessons
        const formattedSections = (data.chapters || []).map((ch) => ({
          id: ch._id,
          title: ch.title,
          lessons: (ch.lessons || []).map((l) => ({
            id: l._id,
            chapter_id: ch._id, // 🔥 THÊM CHAPTER_ID CHO MỖI LESSON
            title: l.title,
            durationMin: l.duration_min || 10,
            status: purchased ? "unlocked" : "locked",
            documents: l.documents || [],
            description: l.description || "",
            video_url: l.video_url || "",
          })),
        }));

        setSections(formattedSections);
      } catch (err) {
        console.error("Lỗi khi tải khóa học:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, userId]);

  /* -------------------- LOAD TIẾN TRÌNH KHÓA HỌC -------------------- */
  useEffect(() => {
    if (!userId || !isPurchased) return;

    const loadProgress = async () => {
      try {
        const res = await api.get(
          `/api/progress/${userId}/course/${id}/summary`
        );
        setCourseProgress(res.data);
      } catch (err) {
        console.log("Không load progress khóa học", err);
      }
    };

    loadProgress();
  }, [id, userId, isPurchased]);

  //  Mua khoá học
  const handleBuy = async () => {
    if (!userId) {
      toast.error("Bạn cần đăng nhập!", {
        position: "top-right",
        theme: "colored",
      });
      return;
    }
    const orderCode = Date.now().toString(); // mã đơn hàng
    const amount = course.price; // số tiền
    const ipAddr = "127.0.0.1"; // local
    const courseId = id;

    const res = await api.post("/api/payments/create-payment", {
      orderCode,
      amount,
      ipAddr,
      courseId,
    });

    window.location.href = res.data.paymentUrl;
  };

  if (loading || !course) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-lg">
        Đang tải khóa học...
      </div>
    );
  }

  //  Khi học xong video -> complete lesson
  async function handleLessonCompleted() {
    if (!userId || !activeLesson) return;
    try {
      await api.post(`/api/progress/${userId}/complete`, {
        course_id: id,
        chapter_id: activeLesson.chapter_id,
        lesson_id: activeLesson.id,
      });

      toast.success("🎉 Bạn đã hoàn thành bài học!");

      // Reload tiến trình khóa học sau khi hoàn thành
      try {
        const res = await api.get(
          `/api/progress/${userId}/course/${id}/summary`
        );
        setCourseProgress(res.data);
      } catch (err) {
        console.log("Không reload progress sau complete");
      }
    } catch (err) {
      console.log("Không thể hoàn thành bài học", err);
    }
  }

  return (
    <div className="grid grid-cols-24 bg-[#f7fafc] min-h-screen">
      <div className="col-span-1" />

      {/* MAIN LEFT */}
      <div
        className={`col-span-18 bg-white ${
          activeLesson ? "px-0 pt-4 pb-10" : "p-8"
        }`}
      >
        {/* ===================== CHẾ ĐỘ XEM KHÓA HỌC (OVERIEW) ===================== */}
        {!activeLesson && (
          <>
            {/* TITLE */}
            <h1 className="text-3xl font-bold text-slate-900">
              {course.title}
            </h1>

            {/* META */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <Meta icon={Star} number={course.rating || 4.5} label="Ratings" />
              <Meta
                icon={Clock}
                number={course.totalDuration || "0h"}
                label="Tổng thời lượng:"
              />
              <Meta
                icon={RefreshCcw}
                number={course.updated_at?.slice(0, 10)}
                label="Cập nhập:"
              />
              <Meta
                icon={Globe2}
                number={course.language || "Việt Nam"}
                label="Ngôn ngữ:"
              />
            </div>

            {/* VIDEO GIỚI THIỆU */}
            <VideoWrapper>
              <video
                controls
                className="w-full h-[500px] object-cover bg-slate-50"
                src={
                  course.demo_video_url ? URL_BASE + course.demo_video_url : ""
                }
              />
            </VideoWrapper>

            {/* TABS + BUY BUTTON */}
            <div className="mt-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                {/* Tabs bên trái */}
                <div className="flex items-center gap-6">
                  <Tab active>Tổng quan</Tab>
                </div>

                {/* Nút mua bên phải */}
                {!isPurchased && (
                  <button
                    onClick={handleBuy}
                    className="px-6 py-2 bg-slate-900 hover:bg-black text-white rounded-full font-medium shadow-sm transition"
                  >
                    Mua khóa học — {course.price?.toLocaleString()}₫
                  </button>
                )}
              </div>
            </div>

            {/* OVERVIEW CONTENT */}
            <div className="mt-6">
              {/* Tổng quan */}
              <div className="flex gap-6 py-8 border-t border-slate-200">
                <div className="w-48 font-semibold text-slate-700 text-sm">
                  Tổng quan:
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SummaryRow
                    icon={<Compass />}
                    label="Skill Level"
                    value={course.skill_level || "Cơ bản"}
                  />
                  <SummaryRow
                    icon={<BookOpen />}
                    label="Giảng viên"
                    value={course.lecturer?.full_name || "Đang cập nhập"}
                  />
                  <SummaryRow
                    icon={<Users />}
                    label="Học sinh"
                    value={course.enrolledCount || "Đang cập nhập"}
                  />
                  <SummaryRow
                    icon={<Clock />}
                    label="Duration"
                    value={course.totalDuration || "60 phút"}
                  />
                  <SummaryRow
                    icon={<Globe />}
                    label="Languages"
                    value={course.language || "Việt Nam"}
                  />
                  <SummaryRow
                    icon={<BadgeCheck />}
                    label="Chứng nhận"
                    value="Có"
                  />
                  <SummaryRow
                    icon={<Captions />}
                    label="Captions"
                    value="Yes"
                  />
                  <SummaryRow
                    icon={<Smartphone />}
                    label="Đa nền tảng"
                    value="Có"
                  />
                </div>
              </div>

              {/* Mô tả */}
              <div className="flex gap-6 py-8 border-t border-slate-200">
                <div className="w-48 font-semibold text-slate-700 text-sm">
                  Mô tả:
                </div>

                <div className="flex-1 leading-7 text-slate-700 text-left">
                  <div
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />
                </div>
              </div>

              {/* TIẾN ĐỘ KHÓA HỌC
              {courseProgress && (
                <div className="mt-6">
                  <p className="text-slate-700">
                    Tiến độ: {courseProgress.avg_progress}% (
                    {courseProgress.byStatus?.completed || 0}/
                    {courseProgress.totalLessons} bài)
                  </p>

                  <div className="w-full bg-slate-200 h-2 rounded-full mt-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${courseProgress.avg_progress}%` }}
                    ></div>
                  </div>
                </div>
              )} */}

              {/* Giảng viên hướng dẫn */}
              <div className="flex gap-6 py-8 border-t border-slate-200">
                <div className="w-48 font-semibold text-slate-700 text-sm">
                  Giảng viên:
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        course.lecturer?.avatar_url ||
                        "https://i.pravatar.cc/80?img=32"
                      }
                      className="w-16 h-16 rounded-full object-cover"
                    />

                    <div>
                      <p className="font-semibold text-slate-900 text-base">
                        {course.lecturer?.full_name}
                      </p>
                      <p className="text-sm text-slate-600">
                        {course.lecturer?.bio}
                      </p>
                    </div>
                  </div>

                  {/* Social */}
                  <div className="flex gap-4 text-xl text-slate-600">
                    <i className="fa-brands fa-facebook" />
                    <i className="fa-brands fa-x-twitter" />
                    <i className="fa-brands fa-linkedin" />
                    <i className="fa-brands fa-github" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ===================== CHẾ ĐỘ XEM BÀI HỌC (LESSON) ===================== */}
        {activeLesson && (
          <div className="w-full">
            {/* TIÊU ĐỀ BÀI HỌC */}
            <h1 className="text-3xl font-bold text-slate-900 text-left">
              {activeLesson.title}
            </h1>

            <p className="text-slate-600 text-sm mt-1 text-left">
              Giảng viên: {course?.lecturer?.full_name || "Đang cập nhật"}
            </p>

            {/* VIDEO BÀI HỌC */}
            <VideoWrapper>
              <video
                controls
                className="w-full h-[500px] object-cover bg-slate-50"
                src={
                  activeLesson.video_url
                    ? URL_BASE + activeLesson.video_url
                    : ""
                }
                onEnded={handleLessonCompleted}
              />
            </VideoWrapper>

            {/* MÔ TẢ BÀI HỌC */}
            <div className="py-8 border-t border-slate-200 mt-4">
              <h2 className="text-xl font-semibold text-slate-900 mb-2 text-left">
                Mô tả bài học:
              </h2>
              <p className="text-slate-700 leading-7 whitespace-pre-line">
                {activeLesson.description || "Chưa có mô tả cho bài học này."}
              </p>
            </div>
            {/* TIẾN TRÌNH KHÓA HỌC */}
            {courseProgress && (
              <div className="py-8 border-t border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900 mb-3 text-left">
                  Tiến trình khóa học
                </h2>

                <p className="text-slate-700 text-sm mb-2">
                  Hoàn thành:{" "}
                  <span className="font-bold text-slate-900">
                    {courseProgress.byStatus?.completed || 0} /{" "}
                    {courseProgress.totalLessons}
                  </span>{" "}
                  bài học
                </p>

                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${courseProgress.avg_progress}%` }}
                  />
                </div>

                {/* <p className="text-sm text-slate-600 mt-2">
                  Tiến độ trung bình:{" "}
                  <span className="font-semibold text-blue-700">
                    {courseProgress.avg_progress}%
                  </span>
                </p> */}
              </div>
            )}

            {/* TÀI LIỆU ĐÍNH KÈM */}
            {activeLesson.documents?.length > 0 && (
              <div className="py-8 border-t border-slate-200 flex-row">
                <h2 className="text-xl font-semibold text-slate-900 mb-4 text-left">
                  Tài liệu bài học:
                </h2>

                <div className="flex flex-wrap gap-4">
                  {activeLesson.documents.map((doc, idx) => (
                    <a
                      key={idx}
                      href={URL_BASE + doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 transition shadow-sm"
                    >
                      <File size={18} className="text-slate-700" />
                      <span className="font-medium text-slate-800">
                        {doc.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Giảng viên hướng dẫn */}
            <div className="flex gap-6 py-8 border-t border-slate-200">
              <div className="w-48 font-semibold text-slate-700 text-sm ">
                Giảng viên:
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4 text-left">
                  <img
                    src={
                      course.lecturer?.avatar_url ||
                      "https://i.pravatar.cc/80?img=32"
                    }
                    className="w-16 h-16 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold text-slate-900 text-base">
                      {course.lecturer?.full_name}
                    </p>
                    <p className="text-sm text-slate-600">
                      {course.lecturer?.bio}
                    </p>
                  </div>
                </div>

                {/* Social */}
                <div className="flex gap-4 text-xl text-slate-600">
                  <i className="fa-brands fa-facebook" />
                  <i className="fa-brands fa-x-twitter" />
                  <i className="fa-brands fa-linkedin" />
                  <i className="fa-brands fa-github" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SIDEBAR */}
      <div className="col-span-5 pl-2">
        <CourseTreeSidebar
          sections={sections}
          activeLessonId={activeLesson?.id}
          isPurchased={isPurchased}
          onSelectLesson={async (lesson) => {
            if (!isPurchased) {
              toast.error("Bạn cần mua khoá học để xem bài học.");
              return;
            }

            setActiveLesson(lesson);
            window.scrollTo({ top: 0, behavior: "smooth" });

            // ====== GỌI API CẬP NHẬT TIẾN ĐỘ BÀI HỌC KHI MỞ BÀI ======
            if (!userId) return;

            try {
              await api.post(`/api/progress/${userId}/touch`, {
                course_id: id,
                chapter_id: lesson.chapter_id,
                lesson_id: lesson.id,
                progress_percent: 0,
              });
            } catch (err) {
              console.log("Không thể cập nhật tiến độ bài học", err);
            }
          }}
        />
      </div>
    </div>
  );
}

/* ---------------------- SUB COMPONENTS ---------------------- */

function VideoWrapper({ children }) {
  return (
    <div
      className=" relative w-full max-w-[1400px] mx-auto my-6 rounded-2xl overflow-hidden border border-slate-200 bg-black"
      style={{ aspectRatio: "16 / 9" }}
    >
      {children}
    </div>
  );
}

function SummaryRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {icon}
      <span className="font-medium text-slate-600">{label}:</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}

function Meta({ icon: Icon, number, label }) {
  return (
    <div className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow-sm border border-slate-200">
      <Icon size={16} className="text-slate-500" />
      <span className="text-slate-600 text-xs">{label}</span>
      <span className="font-semibold text-slate-900">{number}</span>
    </div>
  );
}

function Tab({ children, active }) {
  return (
    <button
      className={`pb-3 -mb-px text-sm ${
        active
          ? "border-b-2 border-slate-600 text-slate-600 font-medium"
          : "text-slate-500"
      }`}
    >
      {children}
    </button>
  );
}
