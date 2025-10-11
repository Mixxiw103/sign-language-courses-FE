import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const lessons = [
  {
    id: 1,
    title: "Introduction to UX Design",
    img: "https://via.placeholder.com/300x200",
    teacher: "Jane Cooper",
    progress: "66% Hoàn thành",
  },
  {
    id: 2,
    title: "UI Design Fundamentals",
    img: "https://via.placeholder.com/300x200",
    teacher: "Jenny Wilson",
    progress: "33% Hoàn thành",
  },
  {
    id: 3,
    title: "Advanced Prototyping",
    img: "https://via.placeholder.com/300x200",
    teacher: "Marvin McKinney",
    progress: "90% Hoàn thành",
  },
  {
    id: 4,
    title: "Design Systems",
    img: "https://via.placeholder.com/300x200",
    teacher: "Floyd Miles",
    progress: "10% Hoàn thành",
  },
  {
    id: 5,
    title: "Interaction Design",
    img: "https://via.placeholder.com/300x200",
    teacher: "Courtney Henry",
    progress: "75% Hoàn thành",
  },
  {
    id: 6,
    title: "Usability Testing",
    img: "https://via.placeholder.com/300x200",
    teacher: "Leslie Alexander",
    progress: "50% Hoàn thành",
  },
];

export default function DashboardStudentCourses() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(lessons.length / itemsPerPage);

  const currentLessons = lessons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Khóa học của tôi
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Khám phá và tiếp tục hành trình học tập của bạn.
        </p>
      </div>

      {/* Main Content */}
      <section className="bg-blue-50 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Course Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="rounded-xl bg-white shadow-md overflow-hidden transition hover:shadow-lg"
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
                      alt={lesson.teacher}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-600">
                      {lesson.teacher}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="h-1 bg-gray-200 rounded-full">
                      <div
                        className="h-1 bg-black rounded-full"
                        style={{ width: lesson.progress.split("%")[0] }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {lesson.progress}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 space-x-3">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`p-2 rounded-full border ${
                currentPage === 1
                  ? "text-gray-300 border-gray-200"
                  : "text-gray-600 hover:bg-gray-200 border-gray-300"
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full border ${
                currentPage === totalPages
                  ? "text-gray-300 border-gray-200"
                  : "text-gray-600 hover:bg-gray-200 border-gray-300"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}