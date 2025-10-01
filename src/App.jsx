import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Course from "./pages/course/Course";
import Home from "./pages/home/Home";
import CourseDetail from "./pages/course/CourseDetail";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Auth from "./pages/auth/Auth";
import Checkout from "./pages/Checkout";
import { AnimatePresence } from "framer-motion";
import Page from "./conponents/Page";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardOrder from "./pages/dashboard/DashboardOrder";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardProduct from "./pages/dashboard/DashboardProduct";
import DashboardCustomer from "./pages/dashboard/DashboardCustomer";
import DashboardCourse from "./pages/dashboard/DashboardCourse";
import DashboardReport from "./pages/dashboard/DashboardReport";
import DashboardSetting from "./pages/dashboard/DashboardSetting";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route path="/auth" element={<Page><Auth /></Page>} />
        <Route path="/courses" element={<Page><Course /></Page>} />
        <Route path="/courses/:id" element={<Page><CourseDetail /></Page>} />
        <Route path="/checkout" element={<Page><Checkout /></Page>} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />        
          <Route path="home" element={<DashboardHome />} />
          <Route path="orders" element={<DashboardOrder />} />
          <Route path="products" element={<DashboardProduct />} />
          <Route path="customers" element={<DashboardCustomer />} />
          <Route path="courses" element={<DashboardCourse />} />
          <Route path="reports" element={<DashboardReport />} />
          <Route path="settings" element={<DashboardSetting />} />
        </Route>

        {/* Teacher Screen */}
      </Routes>
    </AnimatePresence>
  );
}

export default App;
