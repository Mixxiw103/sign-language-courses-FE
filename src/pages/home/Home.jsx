import { useState } from "react";
import Header from "../../conponents/HeaderP";
import { Link } from "react-router-dom";
import HomeIntroduceImg from "../../assets/Home_introduce.png";

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Nội dung trang */}
      <main className="max-w-7xl mx-auto flex flex-col items-center py-12 px-4">
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
                to="/register"
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
              <h3 className="text-3xl font-bold text-blue-600">26</h3>
              <p className="text-gray-600">Chief experts</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-3xl font-bold text-blue-600">16</h3>
              <p className="text-gray-600">Years of experience</p>
            </div>
          </div>
        </section>

        {/* All-in-One Cloud Software Section */}
        <section className="text-center mb-12 w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            All-in-One Cloud Software.
          </h2>
          <p className="text-gray-500 mb-6">
            TOTC is one powerful online software suite that combines all the
            tools needed to run a successful school or office.
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
                Online Billing, Invoicing, & Contracts
              </h3>
              <p className="text-gray-600 mt-2">
                Simple and secure control of your organization’s financial and
                legal transactions. Send customized invoices and contracts.
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
                Easy Scheduling & Attendance Tracking
              </h3>
              <p className="text-gray-600 mt-2">
                Schedule and reserve classrooms at one campus or multiple
                campuses. Keep detailed records of student attendance.
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
                Customer Tracking
              </h3>
              <p className="text-gray-600 mt-2">
                Automate and track emails to individuals or groups. Skilline’s
                built-in system helps organize your organization.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
