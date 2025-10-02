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
import DashboardHome from "./pages/admin/DashboardHome";
import DashboardOrder from "./pages/admin/DashboardOrder";
import DashboardProduct from "./pages/admin/DashboardProduct";
import DashboardCustomer from "./pages/admin/DashboardCustomer";
import DashboardCourse from "./pages/admin/DashboardCourse";
import DashboardReport from "./pages/admin/DashboardReport";
import DashboardSetting from "./pages/admin/DashboardSetting";
import DashboardAdminLayout from "./layout/DashboardAdminLayout";
import DashboardTeacherLayout from "./layout/DashboardTeacherLayout";
import DashboardTeacherCourse from "./pages/teacher/DashboardTeacherHome";
import DashboardTeacherNewCourse from "./pages/teacher/DashboardTeacherNewCourse";
import DashboardTeacherEarning from "./pages/teacher/DashboardTeacherEarning";
import DashboardTeacherMyCourse from "./pages/teacher/DashboardTeacherMyCourse";
import DashboardTeacherMessage from "./pages/teacher/DashboardTeacherMessage";
import DashboardTeacherSetting from "./pages/teacher/DashboardTeacherSetting";
import DashboardTeacherHome from "./pages/teacher/DashboardTeacherHome";

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

        {/* Dashboard Admin*/}
        <Route path="/admin" element={<DashboardAdminLayout />}>
          <Route index element={<DashboardHome />} />        
          <Route path="home" element={<DashboardHome />} />
          <Route path="orders" element={<DashboardOrder />} />
          <Route path="products" element={<DashboardProduct />} />
          <Route path="customers" element={<DashboardCustomer />} />
          <Route path="courses" element={<DashboardCourse />} />
          <Route path="reports" element={<DashboardReport />} />
          <Route path="settings" element={<DashboardSetting />} />
        </Route>

        {/* Dashboard Teacher*/}
        <Route path="/teacher" element={<DashboardTeacherLayout />}>
          <Route index element={<DashboardTeacherHome />} />
          <Route path="new-course" element={<DashboardTeacherNewCourse />} />
          <Route path="my-courses" element={<DashboardTeacherMyCourse />} />
          <Route path="earning" element={<DashboardTeacherEarning />} />
          <Route path="messages" element={<DashboardTeacherMessage />} />
          <Route path="settings" element={<DashboardTeacherSetting />} />
        </Route>

        {/* Teacher Screen */}
      </Routes>
    </AnimatePresence>
  );
}

export default App;
