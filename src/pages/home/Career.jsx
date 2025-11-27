import { Link } from "react-router-dom";
import {
  CheckCircle,
  Users,
  BookOpen,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import HomeIntroduceImg from "../../assets/Home_introduce.png";
export default function Career() {
  return (
    <div className="w-full">
      {/* ==================== HERO BANNER ==================== */}
      <section
        className="relative w-full h-[420px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("https://media.istockphoto.com/id/1398189753/photo/smiling-caucasian-teacher-wearing-spectacles-communicating-with-deaf-girl-student-with-hand.jpg?s=612x612&w=0&k=20&c=99MSwopTbQBVEnAQzD1n2SzhzwAnR_rwYHj38EIeBnM=")',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-4xl font-extrabold leading-tight">
            Cơ hội trở thành{" "}
            <span className="text-cyan-300">Giáo viên Ngôn ngữ Ký hiệu</span>
          </h1>
          <p className="mt-4 text-lg max-w-2xl opacity-90">
            Hãy gia nhập cùng chúng tôi để lan tỏa giá trị cộng đồng và tạo nên
            sự khác biệt cho hơn 3 triệu người Điếc tại Việt Nam.
          </p>
          <Link
            to="/register"
            className="inline-block mt-6 px-6 py-3 bg-cyan-500 text-white rounded-full text-lg font-semibold hover:bg-cyan-600 transition"
          >
            Đăng ký ngay
          </Link>
        </div>
      </section>

      {/* ==================== INTRO ==================== */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ngôn ngữ ký hiệu – Cơ hội nghề nghiệp nhân văn & bền vững
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Việt Nam có hơn <strong>3.000.000 người Điếc</strong> nhưng chỉ có
              khoảng
              <strong> 7 phiên dịch viên chuyên nghiệp</strong>. Nhu cầu học và
              tiếp cận Ngôn ngữ ký hiệu (NNKH) đang ngày càng tăng cao.
            </p>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Trung tâm của chúng tôi đang tìm kiếm những người có đam mê, có
              khả năng giảng dạy và mong muốn đóng góp cho cộng đồng.
            </p>
          </div>

          <img
            src={HomeIntroduceImg}
            alt="Sign language teaching"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* ==================== BENEFITS ==================== */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Quyền lợi khi trở thành giáo viên
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Chúng tôi mang đến môi trường giảng dạy linh hoạt – hỗ trợ – chuyên
            nghiệp.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <CheckCircle className="w-10 h-10 text-cyan-500" />,
              title: "Thu nhập ổn định",
              desc: "Nhận chia sẻ doanh thu từ mỗi khóa học bạn tạo.",
            },
            {
              icon: <Users className="w-10 h-10 text-cyan-500" />,
              title: "Cộng đồng học viên lớn",
              desc: "Hơn hàng ngàn người quan tâm, nhu cầu học tăng mạnh.",
            },
            {
              icon: <BookOpen className="w-10 h-10 text-cyan-500" />,
              title: "Tự tạo khóa học của bạn",
              desc: "Tự do thiết kế bài giảng & nội dung phù hợp phong cách riêng.",
            },
            {
              icon: <Briefcase className="w-10 h-10 text-cyan-500" />,
              title: "Hỗ trợ kỹ thuật 24/7",
              desc: "Đội ngũ hỗ trợ luôn sẵn sàng khi bạn cần.",
            },
            {
              icon: <ArrowRight className="w-10 h-10 text-cyan-500" />,
              title: "Phát triển nghề nghiệp",
              desc: "Cơ hội trở thành phiên dịch viên chuyên nghiệp.",
            },
            {
              icon: <CheckCircle className="w-10 h-10 text-cyan-500" />,
              title: "Tạo tác động xã hội",
              desc: "Giúp người Điếc tiếp cận giáo dục chất lượng dễ dàng.",
            },
          ].map((b, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-center"
            >
              <div className="flex justify-center mb-4">{b.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">{b.title}</h3>
              <p className="text-gray-600 mt-2">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== HOW TO JOIN ==================== */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Làm thế nào để trở thành giáo viên?
        </h2>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            [
              "1. Đăng ký tài khoản",
              "Tạo tài khoản giáo viên để bắt đầu hành trình.",
            ],
            [
              "2. Tạo hồ sơ cá nhân",
              "Giới thiệu bản thân và phong cách giảng dạy.",
            ],
            [
              "3. Tạo khóa học đầu tiên",
              "Tải video, nội dung & cấu trúc khóa học.",
            ],
            [
              "4. Bắt đầu kiếm thu nhập",
              "Học viên mua khóa — bạn nhận doanh thu.",
            ],
          ].map(([title, desc], i) => (
            <div key={i} className="bg-white shadow p-6 rounded-xl">
              <h3 className="font-semibold text-lg text-cyan-600 mb-2">
                {title}
              </h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="bg-cyan-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Sẵn sàng trở thành giáo viên dạy NNKH?
        </h2>
        <p className="opacity-90 mb-6">
          Chúng tôi luôn chào đón những người có đam mê.
        </p>
        <Link
          to="/register"
          className="px-8 py-3 bg-white text-cyan-600 font-semibold rounded-full hover:bg-gray-100 transition"
        >
          Bắt đầu ngay
        </Link>
      </section>
    </div>
  );
}
