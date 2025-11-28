import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DashboardMainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* đẩy nội dung xuống để tránh bị header đè */}
      <main className="max-w-7xl mx-auto flex flex-col items-center px-4 pt-24">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
