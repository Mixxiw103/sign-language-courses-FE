import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DashboardMainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto flex flex-col items-center px-4 mt-3">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
}
