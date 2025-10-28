import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CourseCard from "../../components/CourseCard";
import Header from "../../components/Header";
import {
  PenTool,
  Monitor,
  Database,
  Briefcase,
  BarChart,
  Camera,
  Film,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Search from "./Search";

export default function CoursePage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fade = {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
  };

  // Dữ liệu demo
  const lessons = [
    {
      id: 1,
      title: "AWS Chứng chỉ Kiến trúc sư Giải pháp",
      teacher: "Lina",
      img: "https://picsum.photos/400/200?random=1",
      progress: "Bài học 5/7",
    },
    {
      id: 2,
      title: "ReactJS Cơ bản",
      teacher: "David",
      img: "https://picsum.photos/400/200?random=2",
      progress: "Bài học 3/12",
    },
    {
      id: 3,
      title: "Python cho người mới bắt đầu",
      teacher: "Sophia",
      img: "https://picsum.photos/400/200?random=3",
      progress: "Bài học 7/10",
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Design",
      icon: PenTool,
      color: "bg-teal-100 text-teal-600",
    },
    {
      id: 2,
      name: "Development",
      icon: Monitor,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      id: 3,
      name: "Technology",
      icon: Database,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 4,
      name: "Business",
      icon: Briefcase,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      id: 5,
      name: "Marketing",
      icon: BarChart,
      color: "bg-amber-100 text-amber-600",
    },
    {
      id: 6,
      name: "Photography",
      icon: Camera,
      color: "bg-rose-100 text-rose-600",
    },
    { id: 7, name: "Acting", icon: Film, color: "bg-gray-100 text-gray-600" },
    {
      id: 8,
      name: "Management",
      icon: BookOpen,
      color: "bg-green-100 text-green-600",
    },
  ];

  const courses = [
    {
      id: 1,
      title: "AWS Certified solutions Architect",
      category: "Design",
      duration: "3 Month",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
      author: "Lina",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
      oldPrice: 100,
      price: 80,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      id: 2,
      title: "AWS Certified solutions Architect",
      category: "Design",
      duration: "3 Month",
      image:
        "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=1200&auto=format&fit=crop",
      author: "Lina",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
      oldPrice: 100,
      price: 80,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      id: 3,
      title: "AWS Certified solutions Architect",
      category: "Design",
      duration: "3 Month",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
      author: "Lina",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
      oldPrice: 100,
      price: 80,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      id: 4,
      title: "AWS Certified solutions Architect",
      category: "Design",
      duration: "3 Month",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
      author: "Lina",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
      oldPrice: 100,
      price: 80,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      id: 5,
      title: "AWS Certified solutions Architect",
      category: "Design",
      duration: "3 Month",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      author: "Lina",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
      oldPrice: 100,
      price: 80,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      id: 6,
      title: "AWS Certified solutions Architect",
      category: "Design",
      duration: "3 Month",
      image:
        "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d?q=80&w=1200&auto=format&fit=crop",
      author: "Lina",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
      oldPrice: 100,
      price: 80,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      id: 7,
      title: "AWS Certified solutions Architect",
      category: "Design",
      duration: "3 Month",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      author: "Lina",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
      oldPrice: 100,
      price: 80,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      id: 8,
      title: "AWS Certified solutions Architect",
      category: "Design",
      duration: "3 Month",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
      author: "Lina",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
      oldPrice: 100,
      price: 80,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
  ];

  // const handlePrev = () => {
  //   setCurrentIndex((prev) => (prev > 0 ? prev - 1 : lessons.length - 1));
  // };

  // const handleNext = () => {
  //   setCurrentIndex((prev) => (prev < lessons.length - 1 ? prev + 1 : 0));
  // };

  return (
    <div>
      {/* ===== Header ===== */}

      <div className="my-10 relative mx-auto flex w-full max-w-3xl items-center rounded-full bg-white p-1 pl-4 shadow-xl ring-1 ring-slate-100">
        <input
          type="text"
          placeholder="Search your favourite course"
          className="h-12 flex-1 rounded-full bg-transparent pl-2 pr-10 text-base text-slate-700 placeholder:text-slate-400 focus:outline-none"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {/* Dấu X clear input */}
        {searchValue && (
          <button
            type="button"
            onClick={() => setSearchValue("")}
            className="absolute right-30 p-2 text-slate-300 cursor-pointer text-sm hover:text-slate-600"
          >
            <i className="fas fa-times"></i> {/* hoặc dùng icon lib khác */}
          </button>
        )}

        <button
          className="cursor-pointer mr-1 rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          type="submit"
        >
          Search
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {searchValue != "" ? (
          <motion.div key="search" {...fade}>
            {/* nội dung khi có searchValue (ví dụ kết quả tìm kiếm) */}
            <div className="">
              <Search></Search>
            </div>
          </motion.div>
        ) : (
          <motion.div key="home" {...fade}>
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
                      className={`rounded-xl bg-white shadow-md overflow-hidden transition ${
                        index === currentIndex ? "block" : "hidden md:block"
                      }`}
                    >
                      <img
                        src={lesson.img}
                        alt={lesson.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-700">
                          {lesson.title}
                        </h3>
                        <div className="flex items-center mt-2">
                          <img
                            src="https://i.pravatar.cc/40?img=2"
                            alt={lesson.avatar}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <span className="text-sm text-gray-600">
                            {lesson.teacher}
                          </span>
                        </div>
                        <div className="mt-3">
                          <div className="h-1 bg-gray-200 rounded-full">
                            <div className="h-1 bg-black w-2/3 rounded-full"></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {lesson.progress}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* <button
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
            </button> */}
                </div>
              </div>
            </section>

            {/* ===== Danh mục khóa học ===== */}
            <section className="py-8 px-6">
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
                      <div className={`p-3 rounded-lg ${cat.color} mb-4`}>
                        <cat.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-gray-700 mb-2">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ===== Các section khóa học ===== */}
            {[
              { title: "Gợi ý cho bạn", bg: "bg-blue-50" },
              { title: "Lựa chọn khóa học của bạn", bg: "bg-white" },
              { title: "Khóa học về phát triển cá nhân", bg: "bg-white" },
              { title: "Học viên đang xem", bg: "bg-blue-50" },
            ].map((section, idx) => (
              <section key={idx} className={`${section.bg} py-12 px-6`}>
                <div className="max-w-6xl mx-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {section.title}
                    </h2>
                    <button className="text-sm text-black hover:underline">
                      Xem tất cả
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {courses.map((course) => (
                      <CourseCard key={course.id} c={course} />
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {/* ===== Banner coaching online ===== */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-neutral-900 text-left text-white rounded-xl py-12 px-6">
            <h2 className="text-2xl font-bold mb-4">
              Bài học huấn luyện trực tuyến cho việc học từ xa
            </h2>
            <p className="max-w-2xl text-gray-200 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor.
            </p>
            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium">
              Bắt đầu học ngay
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
