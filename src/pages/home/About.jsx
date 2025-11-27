import { Users, Heart, Lightbulb, Globe, Hand } from "lucide-react";
import HomeIntroduceImg from "../../assets/Home_introduce.png";
export default function About() {
  return (
    <div className="w-full">
      {/* ================= HERO ================= */}
      <section
        className="relative h-[400px] w-full bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("https://img.freepik.com/premium-photo/deaf-teacher-sign-language-classroom-with-students_863013-213.jpg")',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 text-white">
          <h1 className="text-4xl font-extrabold leading-tight">
            Giới thiệu về <span className="text-cyan-300">Trung tâm NNKH</span>
          </h1>
          <p className="mt-4 text-lg opacity-90 max-w-xl">
            Chúng tôi tạo ra nền tảng học Ngôn ngữ ký hiệu trực tuyến để mang cơ
            hội giáo dục đến gần hơn với cộng đồng Điếc & mọi người.
          </p>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Chúng tôi là ai?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Với mong muốn mang lại một môi trường học Ngôn ngữ ký hiệu (NNKH)
              chuyên nghiệp – dễ tiếp cận – hiệu quả, chúng tôi xây dựng nền
              tảng học NNKH online cho người Điếc, người khiếm thính và tất cả
              những ai muốn học để giao tiếp tốt hơn.
            </p>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Chúng tôi đồng hành cùng giáo viên là người Điếc để tạo ra những
              khoá học chất lượng, mang tính thực tiễn và gần gũi với cuộc sống.
            </p>
          </div>

          <img
            src={HomeIntroduceImg}
            alt="Sign Language Class"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Sứ mệnh của chúng tôi
          </h2>
          <p className="text-gray-600 mt-3">
            Chúng tôi hướng đến xây dựng môi trường giáo dục toàn diện và dễ
            tiếp cận.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Hand className="w-10 h-10 text-cyan-500" />,
              title: "Lan toả NNKH",
              desc: "Đưa NNKH đến gần hơn với cộng đồng, giúp xoá bỏ rào cản giao tiếp.",
            },
            {
              icon: <Users className="w-10 h-10 text-cyan-500" />,
              title: "Kết nối cộng đồng",
              desc: "Tạo cầu nối giữa người Điếc, giáo viên và học viên trên toàn quốc.",
            },
            {
              icon: <Globe className="w-10 h-10 text-cyan-500" />,
              title: "Giáo dục không giới hạn",
              desc: "Học mọi lúc, mọi nơi, trên mọi thiết bị với nội dung chất lượng.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Giá trị cốt lõi
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <Heart className="w-10 h-10 text-cyan-500" />,
              title: "Tôn trọng & thấu hiểu",
              desc: "Sự tôn trọng văn hoá người Điếc là nền tảng mọi hoạt động.",
            },
            {
              icon: <Lightbulb className="w-10 h-10 text-cyan-500" />,
              title: "Đổi mới sáng tạo",
              desc: "Luôn cải tiến phương pháp giảng dạy và công nghệ học tập.",
            },
            {
              icon: <Users className="w-10 h-10 text-cyan-500" />,
              title: "Hợp tác cộng đồng",
              desc: "Cùng xây dựng tương lai tốt đẹp hơn cho cộng đồng người Điếc.",
            },
          ].map((v, i) => (
            <div key={i} className="p-6 bg-white rounded-xl shadow text-center">
              <div className="flex justify-center mb-4">{v.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">{v.title}</h3>
              <p className="text-gray-600 mt-2">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="bg-gray-50 py-20 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Đội ngũ của chúng tôi
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              name: "Nguyễn Quốc Việt",
              role: "Giáo viên NNKH • 8 năm kinh nghiệm",
              img: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
              name: "Khúc Xuân Triển",
              role: "Phiên dịch viên • Trainer NNKH",
              img: "https://randomuser.me/api/portraits/women/65.jpg",
            },
            {
              name: "Nguyễn Thế Phách",
              role: "Nhà phát triển nội dung học tập",
              img: "https://randomuser.me/api/portraits/men/75.jpg",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <img
                src={t.img}
                alt={t.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">{t.name}</h3>
              <p className="text-gray-600 mt-1 text-sm">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-cyan-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold">
          Cùng nhau lan toả Ngôn ngữ ký hiệu
        </h2>
        <p className="opacity-90 mt-3">
          Chúng tôi luôn tìm kiếm những người đam mê giáo dục & cộng đồng.
        </p>

        <button className="mt-6 px-8 py-3 bg-white text-cyan-600 font-semibold rounded-full hover:bg-gray-100 transition">
          Tham gia cùng chúng tôi
        </button>
      </section>
    </div>
  );
}
