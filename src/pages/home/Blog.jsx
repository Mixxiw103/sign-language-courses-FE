import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "Lộ trình học Ngôn ngữ ký hiệu cho người mới bắt đầu",
      desc: "Bạn nên bắt đầu từ đâu? Tập từ nào trước? Đây là hướng dẫn toàn diện cho người mới.",
      date: "10/12/2024",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200",
      category: "Học tập",
    },
    {
      id: 2,
      title: "Những điều thú vị về cộng đồng người Điếc tại Việt Nam",
      desc: "Tìm hiểu về văn hoá, cách giao tiếp, và những câu chuyện đầy cảm hứng.",
      date: "05/12/2024",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200",
      category: "Cộng đồng",
    },
    {
      id: 3,
      title: "Làm sao để trở thành phiên dịch viên NNKH?",
      desc: "Con đường trở thành thông dịch viên chuyên nghiệp không hề đơn giản nhưng đầy ý nghĩa.",
      date: "28/11/2024",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200",
      category: "Nghề nghiệp",
    },
  ];

  return (
    <div className="w-full">
      {/* ================= HERO ================= */}
      <section
        className="relative h-[380px] w-full bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("https://media.istockphoto.com/id/1398189753/photo/smiling-caucasian-teacher-wearing-spectacles-communicating-with-deaf-girl-student-with-hand.jpg?s=612x612&w=0&k=20&c=99MSwopTbQBVEnAQzD1n2SzhzwAnR_rwYHj38EIeBnM=")',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-4xl font-extrabold">Blog Ngôn Ngữ Ký Hiệu</h1>
          <p className="mt-4 text-lg max-w-xl opacity-90">
            Nơi chia sẻ kiến thức, câu chuyện, kinh nghiệm và tin tức về cộng
            đồng người Điếc và học NNKH.
          </p>
        </div>
      </section>

      {/* ================= CATEGORY FILTER ================= */}
      <section className="py-10 px-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Danh mục</h2>
        <div className="flex flex-wrap gap-3">
          {["Tất cả", "Học tập", "Cộng đồng", "Nghề nghiệp", "Tin tức"].map(
            (cat, i) => (
              <button
                key={i}
                className="px-5 py-2 rounded-full border border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-white transition text-sm"
              >
                {cat}
              </button>
            )
          )}
        </div>
      </section>

      {/* ================= FEATURED POST ================= */}
      <section className="px-6 max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Bài viết nổi bật
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <img
            src="https://cloudassess.com/wp-content/uploads/2025/04/Instructor-Happily-Working-on-Costs-and-Logistics.jpg.webp"
            alt="featured"
            className="rounded-xl shadow"
          />

          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-slate-800 mb-3">
              Học NNKH online – Tại sao ngày càng nhiều người lựa chọn?
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Việc học online đã mang lại cơ hội tiếp cận dễ dàng cho người Điếc
              và người bình thường muốn học NNKH...
            </p>
            <button className="flex items-center gap-2 w-fit px-5 py-2 border border-cyan-500 text-cyan-600 rounded-full hover:bg-cyan-500 hover:text-white transition">
              Đọc tiếp <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ================= POSTS LIST ================= */}
      <section className="px-6 max-w-6xl mx-auto pb-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bài viết mới</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-44 object-cover"
              />

              <div className="p-5">
                <span className="text-sm text-cyan-600 font-medium">
                  {post.category}
                </span>

                <h3 className="mt-2 text-lg font-semibold text-slate-800">
                  {post.title}
                </h3>

                <p className="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {post.desc}
                </p>

                <div className="flex items-center gap-2 text-gray-400 text-sm mt-3">
                  <Calendar size={16} />
                  {post.date}
                </div>

                <button className="mt-4 flex items-center gap-2 text-cyan-600 hover:underline">
                  Đọc thêm <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
