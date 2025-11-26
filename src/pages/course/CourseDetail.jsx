import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../utils/api";
import { useAuth } from "../../auth/AuthContext";
import {
  Compass,
  BookOpen,
  Users,
  Clock,
  Globe,
  BadgeCheck,
  Captions,
  Smartphone,
} from "lucide-react";
import CourseTreeSidebar from "../../components/CourseTreeSidebar";
/* --------------------- COMPONENT CHÍNH ---------------------- */

export default function CourseDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(true);

  /* -------------------- LOAD DATA -------------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1) Lấy info khóa học
        const res = await api.get(`/api/courses/${id}/tree`);
        const data = res.data;

        let purchased = false;

        // 2) Check đã mua (nếu login)
        if (user) {
          try {
            const check = await api.get(`/api/purchases/check?courseId=${id}`);
            purchased = check.data.isPurchased;
          } catch (e) {
            console.log("Không check purchase được");
          }
        }

        setIsPurchased(purchased);
        setCourse(data);

        // 3) Áp trạng thái bài học dựa vào purchased
        const formattedSections = (data.chapters || []).map((ch) => ({
          id: ch._id,
          title: ch.title,
          lessons: (ch.lessons || []).map((l) => ({
            id: l._id,
            title: l.title,
            durationMin: l.duration_min || 10,
            status: purchased ? "unlocked" : "locked",
            documents: l.documents || [],
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
  }, [id, user]);

  //  Mua khoá học
  const handleBuy = async () => {
    if (!user) return alert("Bạn cần đăng nhập!");
    console.log("Hi");
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

  return (
    <div className="grid grid-cols-24 bg-[#f7fafc] min-h-screen">
      <div className="col-span-1"></div>

      {/* MAIN LEFT */}
      <div className="col-span-18 bg-white p-8">
        {/* TITLE */}
        <h1 className="text-3xl font-bold text-slate-900">{course.title}</h1>

        {/* META */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <Meta icon="⭐" number={course.rating || 4.5} label="Ratings" />
          <Meta icon="👥" number={course.enrolledCount || 0} label="Students" />
          <Meta
            icon="⏱"
            number={course.totalDuration || "0h"}
            label="Total Duration"
          />
          <Meta
            icon="🕒"
            number={course.updated_at?.slice(0, 10)}
            label="Last Updated"
          />
          <Meta icon="🌐" number={course.language || "VN"} label="Languages" />
        </div>

        {/* VIDEO */}
        <div className="mt-6 aspect-video rounded-2xl border bg-slate-100"></div>

        {/* BUY BUTTON */}
        {!isPurchased && (
          <button
            onClick={handleBuy}
            className="mt-6 w-full bg-gray-800 hover:bg-gray-900 text-white py-3 text-lg rounded-xl font-semibold cursor-pointer"
          >
            Mua khóa học — {course.price?.toLocaleString()}₫
          </button>
        )}

        {/* ACTIONS */}
        {/* <div className="mt-3 flex items-center justify-between text-sm">
          <div className="flex gap-3">
            <Ghost>Save Note</Ghost>
            <Ghost>Download</Ghost>
          </div>
          <div className="flex gap-3">
            <Ghost>Share</Ghost>
            <Ghost icon>👍</Ghost>
            <Ghost icon>👎</Ghost>
            <Ghost icon>💬</Ghost>
          </div>
        </div> */}

        {/* TABS */}
        <div className="mt-6 border-b border-slate-200">
          <div className="flex items-center gap-6">
            <Tab active>Tổng quan</Tab>
            {/* <Tab>Notes</Tab>
            <Tab>Announcements</Tab>
            <Tab>Reviews</Tab> */}
          </div>
        </div>

        {/* ============ OVERVIEW CONTENT (NO BORDERS) ============ */}

        {/* Summary */}
        {/* ====================== OVERVIEW SECTION ====================== */}

        <div className="mt-6">
          {/* Tổng quan */}
          <div className="flex gap-6 py-8 border-t border-slate-200">
            {/* Label trái */}
            <div className="w-48 font-semibold text-slate-700 text-sm">
              Tổng quan:
            </div>

            {/* Nội dung phải */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <SummaryRow
                icon={<Compass />}
                label="Skill Level"
                value={course.skill_level}
              />
              <SummaryRow
                icon={<BookOpen />}
                label="Giảng viên"
                value={course.lecturer?.full_name}
              />

              <SummaryRow
                icon={<Users />}
                label="Học sinh"
                value={course.enrolledCount}
              />
              <SummaryRow
                icon={<Clock />}
                label="Duration"
                value={course.totalDuration}
              />

              <SummaryRow
                icon={<Globe />}
                label="Languages"
                value={course.language}
              />
              <SummaryRow
                icon={<BadgeCheck />}
                label="Certification"
                value="Yes"
              />

              <SummaryRow icon={<Captions />} label="Captions" value="Yes" />
              <SummaryRow
                icon={<Smartphone />}
                label="App Support"
                value="Yes"
              />
            </div>
          </div>

          {/* Mô tả */}
          <div className="flex gap-6 py-8 border-t border-slate-200">
            <div className="w-48 font-semibold text-slate-700 text-sm">
              Mô tả:
            </div>

            <div className="flex-1 leading-7 text-slate-700">
              <div dangerouslySetInnerHTML={{ __html: course.description }} />
            </div>
          </div>

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
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-x-twitter"></i>
                <i className="fa-brands fa-linkedin"></i>
                <i className="fa-brands fa-github"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="col-span-5 pl-2">
        <CourseTreeSidebar
          sections={sections}
          activeLessonId={activeLesson?.id}
          isPurchased={isPurchased}
          onSelectLesson={(lesson) => {
            if (!isPurchased)
              return alert("Bạn cần mua khoá học để xem bài học");
            setActiveLesson(lesson);
          }}
        />
      </div>
    </div>
  );
}

/* ---------------------- SUB COMPONENTS ---------------------- */
function SummaryRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {icon}
      <span className="font-medium text-slate-600">{label}:</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}

function Meta({ icon, number, label }) {
  return (
    <div className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow-sm">
      <span>{icon}</span>
      <span className="font-semibold text-slate-900">{number}</span>
      <span className="text-slate-600 text-xs">{label}</span>
    </div>
  );
}

function Ghost({ children, icon }) {
  return (
    <button
      className={`rounded-xl border border-slate-200 px-3 py-1.5 bg-white hover:bg-slate-50 ${
        icon ? "text-base" : "text-sm"
      }`}
    >
      {children}
    </button>
  );
}

function Tab({ children, active }) {
  return (
    <button
      className={`pb-3 -mb-px text-sm ${
        active
          ? "border-b-2 border-indigo-600 text-indigo-700 font-medium"
          : "text-slate-500"
      }`}
    >
      {children}
    </button>
  );
}

function SummaryItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span>{icon}</span>
      <span className="font-medium text-slate-600">{label}:</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}
