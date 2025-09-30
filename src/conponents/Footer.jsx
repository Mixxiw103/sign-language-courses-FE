import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Intro */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Trung tâm Ngôn ngữ Ký hiệu
          </h2>
          <p className="text-sm leading-6">
            Mang đến cho bạn những khóa học chất lượng về ngôn ngữ ký hiệu, kết
            nối cộng đồng và mở rộng tri thức.
          </p>
        </div>

        {/* Menu */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Menu</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-white">
                Khoá học
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-white">
                Nghề nghiệp
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Liên hệ</h4>
            <p>Email: contact@nnkhanoi.vn</p>
            <p>Điện thoại: 0123 456 789</p>
            <p>Địa chỉ: Hà Nội, Việt Nam</p>
          </div>

          {/* Map */}
          <div className="w-full h-32">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3724.2776258836175!2d105.8357947!3d21.0215747!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8fd635d495%3A0x3b1f5aee06ed9c95!2zVHJ1bmcgdMOibSDEkcOgbyB04bqhbyBOZ8O0biBuZ-G7ryBrw70gaGnhu4d1IEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1759222121480!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          <div className="flex space-x-4">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/ngonngukyhieuhanoi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>

            {/* Tiktok */}
            <a
              href="https://www.tiktok.com/@ttngonngukyhieu.hanoi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M208 72a55.9 55.9 0 0 1-32-10.3V152a64 64 0 1 1-64-64 63.4 63.4 0 0 1 16 2.1v32.8a32.1 32.1 0 1 0 16 28.1V24h32a55.9 55.9 0 0 0 32 48Z" />
              </svg>
            </a>

            {/* Youtube */}
            <a
              href="https://www.youtube.com/@trungtamngonngukyhieuhanoi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Trung tâm Ngôn ngữ Ký hiệu. All rights
        reserved.
      </div>
    </footer>
  );
}
