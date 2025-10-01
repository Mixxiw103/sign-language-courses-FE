import { useState } from "react";
import Header from "../../conponents/HeaderP";
import { Link } from "react-router-dom";
import HomeIntroduceImg from "../../assets/Home_introduce.png";
import CourseCard from "../../conponents/CourseCard";
import { ArrowRight } from "lucide-react";
import Footer from "../../conponents/Footer";

export default function Home() {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Nội dung trang */}
      <main className="max-w-7xl mx-auto flex flex-col items-center px-4 mt-3">
        {/* Text and Image Section */}
        <div className="w-full flex flex-row mb-12">
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
              Website của chúng mình cung cấp các khoá học ngôn ngữ kí hiệu
              online chất lượng. Khám phá ngay!
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
        <section className="text-center mb-12 w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Những thành tựu của chúng tôi
          </h2>
          <p className="text-gray-500 mb-6">
            Sau 15 năm hoạt động, chúng tôi đã đạt được nhiều thành tựu đáng
            quý, hãy cùng nhìn lại những con số sau.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-3xl font-bold text-blue-600">XXX</h3>
              <p className="text-gray-600">Học viên</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-3xl font-bold text-blue-600">XXX</h3>
              <p className="text-gray-600">Khoá học</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-3xl font-bold text-blue-600">XXX</h3>
              <p className="text-gray-600">Đã tốt nghiệp</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-3xl font-bold text-blue-600">XXX</h3>
              <p className="text-gray-600">Giáo viên</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-3xl font-bold text-blue-600">XXX</h3>
              <p className="text-gray-600">Năm hoạt động</p>
            </div>
          </div>
        </section>

        {/* Nền tảng học NNKH trực tuyến Section */}
        <section className="text-center mb-12 w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Nền tảng học NNKH trực tuyến.
          </h2>
          <p className="text-gray-500 mb-6">
            Chúng tôi có tất cả các khoá học online từ trình độ cho người mới
            bắt đầu tới đào tạo mức phiên dịch viên.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6zm2 2a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Các bài giảng trực tuyến
              </h3>
              <p className="text-gray-600 mt-2">
                Đa dạng các bài giảng, bạn có thể chọn giáo viên ưa thích, chọn
                khoá học phù hợp với bản thân mình
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 10H9v-2h2v2zm0-4H9V6h2v2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Học NNKH chưa bao giờ dễ đến vậy
              </h3>
              <p className="text-gray-600 mt-2">
                Sau khi mua khoá học, bạn có thể học mọi lúc, mọi nơi, trên mọi
                thiết bị.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zm-2 10a2 2 0 10-4 0 2 2 0 004 0zm6-6a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Đánh giá trình độ
              </h3>
              <p className="text-gray-600 mt-2">
                Sau khi học xong mỗi bài học, các bạn có thể làm bài quiz nhỏ để
                đánh giá khả năng.
              </p>
            </div>
          </div>
        </section>

        {/* Introduce Section */}
        <section className="text-center mb-12 w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Ngôn ngữ kí hiệu là gì?
          </h2>
          <p className="text-gray-500 mb-6">
            Ngôn ngữ kí hiệu (NNKH) là một ngôn ngữ của người Điếc và khiếm
            thính, dùng để giao tiếp hằng ngày. Ngày nay, với khoảng 3 triệu
            người Điếc, trong đó chỉ có khoảng 7 phiên dịch NNKH chuyên nghiệp,
            chúng tôi hi vọng rằng các bạn có thể trở thành người tiếp theo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center px-10 mb-5 justify-items-center">
            <div className="bg-white p-4 rounded-lg shadow w-full md:w-4/5">
              <h3 className="text-3xl font-bold text-blue-600">3.000.000</h3>
              <p className="text-gray-600"> người Điếc</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow w-full md:w-4/5">
              <h3 className="text-3xl font-bold text-blue-600">7</h3>
              <p className="text-gray-600">Phiên dịch chuyên nghiệp</p>
            </div>
          </div>

          {/* Teacher and Student Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center px-10 place-items-center">
            <div
              className="bg-cover bg-center p-4 rounded-lg shadow w-full md:w-full h-75 flex flex-col justify-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${"https://media.istockphoto.com/id/1398189753/photo/smiling-caucasian-teacher-wearing-spectacles-communicating-with-deaf-girl-student-with-hand.jpg?s=612x612&w=0&k=20&c=99MSwopTbQBVEnAQzD1n2SzhzwAnR_rwYHj38EIeBnM="})`,
              }}
            >
              <h3 className="text-3xl font-bold text-white">
                Bạn là giáo viên
              </h3>
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
        <section className="text-center mb-12 w-full">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Khám phá các khoá học của chúng mình
            </h2>
          </div>
          <div className="flex justify-end mb-6">
            <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500 text-cyan-600 font-medium hover:bg-cyan-500 hover:text-white transition">
              Tất cả khoá học
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-5">
            <CourseCard c={sampleCourse} />

            <div className="space-y-4 text-left">
              <h2 className="text-3xl font-bold text-slate-800">
                Khoá học nhập môn
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Khoá học nhập môn NNKH sẽ cung cấp cho các bạn các từ vựng đơn
                giản về 7 chủ đề xoay quanh cuộc sống hàng ngày. Làm quen với
                bảng chữ cái, số đếm và ngữ pháp NNKH cũng sẽ được giới thiệu
                qua trong phần này.
              </p>
              <button className="mt-4 px-6 py-2 rounded-full bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition">
                Mua ngay
              </button>
              <button className="ml-2 mt-4 px-6 py-2 rounded-full bg-gray-200 text-cyan-500 font-medium hover:bg-white transition">
                Xem tất cả khoá nhập môn
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-5">
            <div className="space-y-4 text-left">
              <h2 className="text-3xl font-bold text-slate-800">
                Khoá học cơ bản
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Khoá học NNKH cơ bản hướng tới các bạn ở trình độ nhập môn, muốn
                tiếp tục học NNKH. Khoá học này bao gồm 12 bài giảng với 10 bài
                lý thuyết xoay quay về cuộc sống hàng ngày và thêm 1 số từ vựng
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
                Khoá học nâng cao 1 NNKH gồm 15 bài giảng, trong đó có các từ
                vựng với chủ đề chuyên sâu hơn về các chuyên ngành như giao
                thông, chính trị, y tế, giáo dục,.. Khoá học này sẽ giúp các bạn
                hoàn thiện khả năng kí hiệu, tư duy ngữ pháp, biểu cảm và điệu
                bộ. Khoá học này phù hợp cho những bạn đã học xong lớp cơ bản,
                có mong muốn học NNKH trình độ sâu hơn.
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
                Khoá học nâng cao 1 NNKH gồm 20 bài giảng, trong đó có các từ
                vựng với chủ đề chuyên sâu hơn về các chuyên ngành như giao
                thông, chính trị, y tế, giáo dục,.. Khoá học này sẽ giúp các bạn
                hoàn thiện khả năng kí hiệu, tư duy ngữ pháp, biểu cảm và điệu
                bộ. Khoá học này phù hợp cho những bạn đã học xong lớp nâng cao
                1, có mong muốn học để bước đầu trở thành phiên dịch viên.
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
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
}
