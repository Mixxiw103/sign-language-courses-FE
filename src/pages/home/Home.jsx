import { useState } from "react";
import { Link } from "react-router-dom";
import HomeIntroduceImg from "../../assets/Home_introduce.png";
import CourseCard from "../../components/CourseCard";
import {
  ArrowRight,
  CalendarCheck,
  FileSpreadsheet,
  Users,
} from "lucide-react";
import Footer from "../../components/Footer";
import { useAuth } from "../../auth/AuthContext";

const Badge = ({ value = "", title = "" }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-center flex-col items-center">
      <div
        className={[
          "flex items-baseline gap-[0.15em]",
          "font-sans tracking-[-0.02em] select-none text-3xl",
        ].join(" ")}
      >
        <span
          className={[
            "tabular-nums leading-none",
            "bg-gradient-to-r from-sky-600 via-sky-600 to-teal-400",
            "bg-clip-text text-transparent",
            "font-medium",
          ].join(" ")}
        >
          {value}
        </span>
      </div>
      <span className="text-gray-600 mt-2 ">{title}</span>
    </div>
  );
};
const BaseBadge = ({ title = "", desc = "", icon }) => {
  return (
    <div className=" relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
      {icon}
      <div className="p-8 mt-10">
        <h3 className="text-xl font-semibold text-slate-800 mb-3">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
};
export default function Home() {
  const { user } = useAuth();
  console.log("user: ", user);
  const [showVideo, setShowVideo] = useState(false);
  const sampleCourse = {
    image:
      "https://i.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1280&format=png&auto=webp&s=7177756d1f393b6e093596d06e1ba539f723264b",
    category: "Ngôn ngữ ký hiệu",
    duration: "3h 20m",
    title: "Khóa học nhập môn ngôn ngữ ký hiệu",
    description: "Học các ký hiệu cơ bản và thực hành giao tiếp hằng ngày.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    author: "Nguyễn Thị A",
    oldPrice: 49.99,
    price: 19.99,
  };

  return (
    <div>
      {/* Text and Image Section */}
      <div className="w-full flex flex-row mb-20">
        {/* Text */}
        <div className="basis-2/5 min-h-[300px] flex flex-col justify-center items-start bg-cyan-500 p-6 space-y-4 text-left">
          <h1 className="text-2xl text-white">
            Học
            <span className="text-orange-400 font-bold">
              {" "}
              NGÔN NGỮ KÍ HIỆU{" "}
            </span>
            thật là dễ dàng với các khoá học của chúng mình.
          </h1>

          <p className="text-lg text-white">
            Website của chúng mình cung cấp các khoá học ngôn ngữ kí hiệu online
            chất lượng. Khám phá ngay!
          </p>

          <div className="flex space-x-4">
            <Link
              to="/auth"
              className="px-4 py-2 rounded-lg bg-sky-300 bg-opacity-50 text-white hover:bg-cyan-600"
            >
              Khám phá ngay
            </Link>

            <button
              onClick={() => setShowVideo(!showVideo)}
              className="px-4 py-2 rounded-lg border border-white text-white hover:bg-white hover:text-cyan-600 transition"
            >
              {showVideo ? "Đóng demo" : "Xem demo"}
            </button>
          </div>

          {/* Video hiển thị khi nhấn nút */}
          {showVideo && (
            <div className="aspect-video w-full rounded-lg shadow-lg">
              <iframe
                src="https://drive.google.com/file/d/1pG3LHWVuixUSbwhM6C5732fS1YMP69-_/preview"
                className="w-full h-full rounded-lg"
                allow="autoplay"
              />
            </div>
          )}
        </div>

        {/* Image */}
        <div className="basis-3/5 min-h-[300px] bg-cyan-500 flex items-center justify-center">
          <img
            src={HomeIntroduceImg}
            alt="Ngôn ngữ ký hiệu"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Success Section */}
      <section className="text-center mb-20 w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Những thành tựu của chúng tôi
        </h2>
        <p className="text-gray-500 mb-6 mx-64">
          Sau 15 năm hoạt động, chúng tôi đã đạt được nhiều thành tựu đáng quý,
          hãy cùng nhìn lại những con số sau.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
          <Badge value="15k+" title="Học sinh" />
          <Badge value="75%" title="Khóa học" />
          <Badge value="35" title="Đã tốt nghiệp" />
          <Badge value="26" title="Giáo viên" />
          <Badge value="1" title="Năm hoạt động" />
        </div>
      </section>

      {/* Nền tảng học NNKH trực tuyến Section */}
      <section className="text-center mb-20 w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Nền tảng học NNKH trực tuyến.
        </h2>
        <p className="text-gray-500 mb-6 mx-64">
          Chúng tôi có tất cả các khoá học online từ trình độ cho người mới bắt
          đầu tới đào tạo mức phiên dịch viên.
        </p>
        <div className="py-16 px-6 md:px-12 lg:px-20">
          <div className="grid gap-10 md:grid-cols-3">
            <BaseBadge
              title="Các bài giảng trực tuyến"
              desc="Đa dạng các bài giảng, bạn có thể chọn giáo viên ưa thích, chọn
              khoá học phù hợp với bản thân mình"
              icon={
                <div className="mx-auto absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <FileSpreadsheet className="w-8 h-8 text-white" />
                </div>
              }
            />
            <BaseBadge
              title="Học NNKH chưa bao giờ dễ đến vậy"
              desc="Sau khi mua khoá học, bạn có thể học mọi lúc, mọi nơi, trên mọi
              thiết bị."
              icon={
                <div className="mx-auto absolute -top-8 left-1/2 -translate-x-1/2  w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <CalendarCheck className="w-8 h-8 text-white" />
                </div>
              }
            />
            <BaseBadge
              title="Đánh giá trình độ"
              desc="Sau khi học xong mỗi bài học, các bạn có thể làm bài quiz nhỏ để
              đánh giá khả năng."
              icon={
                <div className="mx-auto absolute -top-8 left-1/2 -translate-x-1/2  w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Introduce Section */}
      <section className="text-center mb-20 w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Ngôn ngữ kí hiệu là gì?
        </h2>
        <p className="text-gray-500 mb-6 mx-64">
          Ngôn ngữ kí hiệu (NNKH) là một ngôn ngữ của người Điếc và khiếm thính,
          dùng để giao tiếp hằng ngày. Ngày nay, với khoảng 3 triệu người Điếc,
          trong đó chỉ có khoảng 7 phiên dịch NNKH chuyên nghiệp, chúng tôi hi
          vọng rằng các bạn có thể trở thành người tiếp theo.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center px-48 mb-10 justify-items-center">
          <div className="bg-white p-4 rounded-lg shadow w-full py-8 md:w-4/5">
            <h3 className="text-3xl font-bold text-blue-600">3.000.000</h3>
            <p className="text-gray-600"> người Điếc</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow w-full py-8 md:w-4/5">
            <h3 className="text-3xl font-bold text-blue-600">7</h3>
            <p className="text-gray-600">Phiên dịch chuyên nghiệp</p>
          </div>
        </div>

        {/* Teacher and Student Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center px-48 place-items-center">
          <div
            className="bg-cover bg-center p-4 rounded-lg shadow w-full md:w-full h-75 flex flex-col justify-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${"https://media.istockphoto.com/id/1398189753/photo/smiling-caucasian-teacher-wearing-spectacles-communicating-with-deaf-girl-student-with-hand.jpg?s=612x612&w=0&k=20&c=99MSwopTbQBVEnAQzD1n2SzhzwAnR_rwYHj38EIeBnM="})`,
            }}
          >
            <h3 className="text-3xl font-bold text-white">Bạn là giáo viên</h3>
            <button className="w-1/2 mx-auto mt-4 px-4 py-2 border-2 border-cyan-500 text-white rounded-full hover:bg-blue-500 transition">
              Tạo 1 khoá học mới
            </button>
          </div>
          <div
            className="bg-cover bg-center p-4 rounded-lg shadow w-full md:w-full h-75 flex flex-col justify-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${HomeIntroduceImg})`,
            }}
          >
            <h3 className="text-3xl font-bold text-white">Bạn là học viên</h3>
            <button className="w-1/2 mx-auto mt-4 px-4 py-2 border-2 border-cyan-500 text-white rounded-full hover:bg-blue-500 transition">
              Bắt đầu học nào!
            </button>
          </div>
        </div>
      </section>

      {/* Explore course Section */}
      <section className="text-center mb-20 w-ful px-10">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Khám phá các khoá học của chúng mình
          </h2>
        </div>
        <div className="flex justify-end mb-6">
          <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500 text-cyan-600 font-medium hover:bg-cyan-500 hover:text-white transition">
            Tất cả khoá học
            <ArrowRight size={18} />
          </button>
        </div>

        {/* <div className="px-10"> */}
        <div className="bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-5">
          <div className="space-y-4 text-left">
            <h2 className="text-3xl font-bold text-slate-800">
              Khoá học cơ bản
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Khoá học NNKH cơ bản hướng tới các bạn ở trình độ nhập môn, muốn
              tiếp tục học NNKH. Khoá học này bao gồm 12 bài giảng với 10 bài lý
              thuyết xoay quay về cuộc sống hàng ngày và thêm 1 số từ vựng
              chuyên sâu. Ở khoá học này, các bạn cũng sẽ được học thêm về ngữ
              pháp và biểu cảm trong NNKH.
            </p>
            <button className="mt-4 px-6 py-2 rounded-full bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition">
              Mua ngay
            </button>
            <button className="ml-2 mt-4 px-6 py-2 rounded-full bg-gray-200 text-cyan-500 font-medium hover:bg-white transition">
              Xem tất cả khoá cơ bản
            </button>
          </div>

          <CourseCard c={sampleCourse} />
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-5">
          <CourseCard c={sampleCourse} />

          <div className="space-y-4 text-left">
            <h2 className="text-3xl font-bold text-slate-800">
              Khoá học nâng cao 1
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Khoá học nâng cao 1 NNKH gồm 15 bài giảng, trong đó có các từ vựng
              với chủ đề chuyên sâu hơn về các chuyên ngành như giao thông,
              chính trị, y tế, giáo dục,.. Khoá học này sẽ giúp các bạn hoàn
              thiện khả năng kí hiệu, tư duy ngữ pháp, biểu cảm và điệu bộ. Khoá
              học này phù hợp cho những bạn đã học xong lớp cơ bản, có mong muốn
              học NNKH trình độ sâu hơn.
            </p>
            <button className="mt-4 px-6 py-2 rounded-full bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition">
              Mua ngay
            </button>
            <button className="ml-2 mt-4 px-6 py-2 rounded-full bg-gray-200 text-cyan-500 font-medium hover:bg-white transition">
              Xem tất cả khoá nâng cao 1
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-5">
          <div className="space-y-4 text-left">
            <h2 className="text-3xl font-bold text-slate-800">
              Khoá học nâng cao 2
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Khoá học nâng cao 1 NNKH gồm 20 bài giảng, trong đó có các từ vựng
              với chủ đề chuyên sâu hơn về các chuyên ngành như giao thông,
              chính trị, y tế, giáo dục,.. Khoá học này sẽ giúp các bạn hoàn
              thiện khả năng kí hiệu, tư duy ngữ pháp, biểu cảm và điệu bộ. Khoá
              học này phù hợp cho những bạn đã học xong lớp nâng cao 1, có mong
              muốn học để bước đầu trở thành phiên dịch viên.
            </p>
            <button className="mt-4 px-6 py-2 rounded-full bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition">
              Mua ngay
            </button>
            <button className="ml-2 mt-4 px-6 py-2 rounded-full bg-gray-200 text-cyan-500 font-medium hover:bg-white transition">
              Xem tất cả khoá nâng cao 2
            </button>
          </div>

          <CourseCard c={sampleCourse} />
        </div>
        {/* </div> */}
      </section>

      {/* Teacher Section */}
      <section className="flex flex-col items-center justify-center min-h-screen p-6 text-center mb-20 w-full">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Bạn là người Điếc
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Hãy trở thành giáo viên dạy NNKH của trung tâm chúng mình, chỉ cần
            tạo 1 khóa học mới là bạn có thể bắt đầu hành trình làm giáo viên.
          </p>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300">
            Đăng kí ngay
          </button>
        </div>
        <div className="flex items-center justify-between w-full mt-12">
          <div className="w-2/5">
            <img
              src="https://cloudassess.com/wp-content/uploads/2025/04/Instructor-Happily-Working-on-Costs-and-Logistics.jpg.webp"
              alt="Eduguard Interface"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="w-3/5 pl-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Tại sao bạn nên đăng kí làm giáo viên trung tâm
            </h2>
            <ul className="list-none text-gray-600 space-y-4">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Đáp ứng nhu cầu
                dạy học của bạn.
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Tự quản lí khóa
                học của bạn.
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Trò chuyện với
                học viên nếu cần.
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Kiếm thêm thu
                nhập.
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center my-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Làm thế nào để trở thành giáo viên?
          </h1>
          <div className="flex justify-around w-full max-w-4xl">
            <div className="bg-white p-6 rounded-lg shadow-md w-1/4">
              <p className="text-gray-600 mb-2">1. Đăng kí làm giáo viên</p>
              <p className="text-sm text-gray-500">
                Bạn hãy đăng kí tài khoản giáo viên trên hệ thống
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-1/4">
              <p className="text-gray-600 mb-2">
                2. Tạo cho mình 1 profile độc đáo
              </p>
              <p className="text-sm text-gray-500">
                Bạn có thể giới thiệu bản thân mình
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-1/4">
              <p className="text-gray-600 mb-2">3. Tạo 1 khóa học mới</p>
              <p className="text-sm text-gray-500">
                THiết kế khóa học của bạn và tải tài liệu lên mạng
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-1/4">
              <p className="text-gray-600 mb-2">4. Bắt đầu kiếm tiền</p>
              <p className="text-sm text-gray-500">
                Sau khi học viên mua khóa học của bạn, bạn có thể kiếm tiền
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-full max-w-5xl mb-20">
          <div className="w-1/2 pr-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Quy định khi làm giáo viên
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Quy định 1.</li>
              <li>Quy định 2.</li>
              <li>Quy định 3.</li>
              <li>Quy định 4.</li>
            </ul>
          </div>
          <div className="w-1/2">
            <img
              src="https://cloudassess.com/wp-content/uploads/2025/04/Instructor-Happily-Working-on-Costs-and-Logistics.jpg.webp"
              alt="Instructor Working"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="w-full bg-orange-50 p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Bạn có vấn đề cần giải đáp
          </h2>
          <p className="text-gray-600 mb-4">
            Đừng lo, chúng tôi có đội ngũ kĩ thuật viên để hỗ trợ bạn, liên lạc
            với chúng tôi ngay khi bạn có vấn đề như:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 text-left mx-auto max-w-md">
            <li>Gặp khó khăn trong việc đăng kí làm giáo viên/học viên</li>
            <li>Lỗi kĩ thuật (Không tải được tài liệu, lỗi,...)</li>
            <li>Và tất cả các vấn đề khác phát sinh...</li>
          </ul>
          <p className="text-gray-600 mt-4">
            📧{" "}
            <a href="mailto:help@eduagent.com" className="text-orange-500">
              Email@email.com
            </a>
          </p>
          <div className="flex justify-center mt-6">
            <img
              src="https://picsum.photos/300/200"
              alt="Support Team"
              className="rounded-lg shadow-lg mr-4"
            />
            <img
              src="https://blog.hubspot.com/service/best-help-desk-softwarehttps://53.fs1.hubspotusercontent-na1.net/hubfs/53/best-help-desk-software.jpg"
              alt="Support Desk"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
