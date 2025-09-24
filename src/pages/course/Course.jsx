import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../conponents/HeaderP";

export default function CoursePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dữ liệu demo
  const lessons = [
    {
      id: 1,
      title: "AWS Chứng chỉ Kiến trúc sư Giải pháp",
      teacher: "Lina",
      img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1600&auto=format&fit=crop",
      progress: "Bài học 5/7",
    },
    {
      id: 2,
      title: "AWS Chứng chỉ Kiến trúc sư Giải pháp",
      teacher: "Lina",
      img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1600&auto=format&fit=crop",
      progress: "Bài học 5/7",
    },
    {
      id: 3,
      title: "AWS Chứng chỉ Kiến trúc sư Giải pháp",
      teacher: "Lina",
      img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1600&auto=format&fit=crop",
      progress: "Bài học 5/7",
    },
  ];

  const categories = [
    { id: 1, name: "Thiết kế", icon: "✏️" },
    { id: 2, name: "Phát triển", icon: "💻" },
    { id: 3, name: "Công nghệ", icon: "📘" },
    { id: 4, name: "Kinh doanh", icon: "📂" },
    { id: 5, name: "Marketing", icon: "📊" },
    { id: 6, name: "Nhiếp ảnh", icon: "📷" },
    { id: 7, name: "Diễn xuất", icon: "🎭" },
    { id: 8, name: "Quản lý", icon: "📁" },
  ];

  const courses = [
    {
      id: 1,
      title: "AWS Chứng chỉ Kiến trúc sư Giải pháp",
      teacher: "Lina",
      duration: "20 giờ",
      lessons: "20 bài học",
      price: "$80",
      oldPrice: "$200",
      img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "AWS Chứng chỉ Kiến trúc sư Giải pháp",
      teacher: "Lina",
      duration: "18 giờ",
      lessons: "15 bài học",
      price: "$80",
      oldPrice: "$200",
      img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "AWS Chứng chỉ Kiến trúc sư Giải pháp",
      teacher: "Lina",
      duration: "25 giờ",
      lessons: "30 bài học",
      price: "$80",
      oldPrice: "$200",
      img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "AWS Chứng chỉ Kiến trúc sư Giải pháp",
      teacher: "Lina",
      duration: "15 giờ",
      lessons: "12 bài học",
      price: "$80",
      oldPrice: "$200",
      img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : lessons.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < lessons.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* ===== Header ===== */}
      <Header />

      {/* ===== Bài học tiếp theo ===== */}
      <section className="bg-blue-50 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Chào mừng trở lại, sẵn sàng cho bài học tiếp theo?
            </h2>
            <button className="text-sm text-black hover:underline">
              Xem lịch sử
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className={`rounded-xl bg-white shadow-md overflow-hidden transition ${index === currentIndex ? "block" : "hidden md:block"
                  }`}
              >
                <img src={lesson.img} alt={lesson.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-700">{lesson.title}</h3>
                  <div className="flex items-center mt-2">
                    <img
                      src="https://i.pravatar.cc/40?img=2"
                      alt={lesson.teacher}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-600">{lesson.teacher}</span>
                  </div>
                  <div className="mt-3">
                    <div className="h-1 bg-gray-200 rounded-full">
                      <div className="h-1 bg-black w-2/3 rounded-full"></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{lesson.progress}</p>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 shadow-md rounded-full hidden md:block"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 shadow-md rounded-full hidden md:block"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== Danh mục khóa học ===== */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-8">
            Chọn khóa học yêu thích từ danh mục nổi bật
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="font-semibold text-gray-700 mb-2">{cat.name}</h3>
                <p className="text-sm text-gray-500">
                  Đây là mô tả ngắn cho danh mục {cat.name}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Gợi ý cho bạn ===== */}
      <section className="bg-blue-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Gợi ý cho bạn</h2>
            <button className="text-sm text-black hover:underline">Xem tất cả</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="rounded-xl bg-white shadow-md overflow-hidden">
                <img src={course.img} alt={course.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <div className="flex items-center text-gray-500 text-xs space-x-3 mb-2">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" /> {course.duration}
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" /> {course.lessons}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-700 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-500 mt-2">Đây là mô tả ngắn gọn cho khóa học.</p>
                  <div className="flex items-center mt-3">
                    <img
                      src="https://i.pravatar.cc/40?img=3"
                      alt={course.teacher}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-600">{course.teacher}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-gray-400 line-through text-sm">{course.oldPrice}</span>
                    <span className="text-black font-bold">{course.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Lựa chọn khóa học của bạn ===== */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Lựa chọn khóa học của bạn</h2>
            <button className="text-sm text-black hover:underline">Xem tất cả</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="rounded-xl bg-white shadow-md overflow-hidden">
                <img src={course.img} alt={course.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <div className="flex items-center text-gray-500 text-xs space-x-3 mb-2">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" /> {course.duration}
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" /> {course.lessons}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-700 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-500 mt-2">Đây là mô tả ngắn gọn cho khóa học.</p>
                  <div className="flex items-center mt-3">
                    <img
                      src="https://i.pravatar.cc/40?img=4"
                      alt={course.teacher}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-600">{course.teacher}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-gray-400 line-through text-sm">{course.oldPrice}</span>
                    <span className="text-black font-bold">{course.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ===== Banner coaching online ===== */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-neutral-900 text-center text-white rounded-xl py-12 px-6">
            <h2 className="text-2xl font-bold mb-4">
              Bài học huấn luyện trực tuyến cho việc học từ xa
            </h2>
            <p className="max-w-2xl mx-auto text-gray-200 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor.
            </p>
            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium">
              Bắt đầu học ngay
            </button>
          </div>
        </div>
      </section>

      {/* ===== Khóa học phát triển cá nhân ===== */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Khóa học về phát triển cá nhân
            </h2>
            <button className="text-sm text-black hover:underline">Xem tất cả</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="rounded-xl bg-white shadow-md overflow-hidden">
                <img src={course.img} alt={course.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <div className="flex items-center text-gray-500 text-xs space-x-3 mb-2">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" /> {course.duration}
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" /> {course.lessons}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-700 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Đây là mô tả ngắn gọn cho khóa học này.
                  </p>
                  <div className="flex items-center mt-3">
                    <img
                      src="https://i.pravatar.cc/40?img=5"
                      alt={course.teacher}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-600">{course.teacher}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-gray-400 line-through text-sm">{course.oldPrice}</span>
                    <span className="text-black font-bold">{course.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Học viên đang xem ===== */}
      <section className="bg-blue-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Học viên đang xem
            </h2>
            <button className="text-sm text-black hover:underline">Xem tất cả</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="rounded-xl bg-white shadow-md overflow-hidden">
                <img src={course.img} alt={course.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <div className="flex items-center text-gray-500 text-xs space-x-3 mb-2">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" /> {course.duration}
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" /> {course.lessons}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-700 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Đây là mô tả ngắn gọn cho khóa học này.
                  </p>
                  <div className="flex items-center mt-3">
                    <img
                      src="https://i.pravatar.cc/40?img=6"
                      alt={course.teacher}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-600">{course.teacher}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-gray-400 line-through text-sm">{course.oldPrice}</span>
                    <span className="text-black font-bold">{course.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
