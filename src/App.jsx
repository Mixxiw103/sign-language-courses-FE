// App.jsx
import { useEffect } from "react";
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import "./App.css";
import Course from "./pages/course/Course";
import Home from "./pages/home/Home";
import CourseDetail from "./pages/course/CourseDetail";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Auth from "./pages/auth/Auth";
import Checkout from "./pages/Checkout";
import { AnimatePresence } from "framer-motion";
import Page from "./components/Page";
import DashboardHome from "./pages/admin/DashboardHome";
import DashboardOrder from "./pages/admin/DashboardOrder";
import DashboardProduct from "./pages/admin/DashboardProduct";
import DashboardCustomer from "./pages/admin/DashboardCustomer";
import DashboardCourse from "./pages/admin/DashboardCourse";
import DashboardReport from "./pages/admin/DashboardReport";
import DashboardSetting from "./pages/profile/DashboardSetting";
import DashboardAdminLayout from "./layout/DashboardAdminLayout";
import DashboardTeacherLayout from "./layout/DashboardTeacherLayout";
import DashboardTeacherNewCourse from "./pages/teacher/DashboardTeacherNewCourse";
import DashboardTeacherEarning from "./pages/teacher/DashboardTeacherEarning";
import DashboardTeacherMyCourse from "./pages/teacher/DashboardTeacherMyCourse";
import DashboardTeacherHome from "./pages/teacher/DashboardTeacherHome";
import CourseView from "./pages/course/CourseView";
import VideoCallPage from "./pages/chat/VideoCall";
import DashboardMainLayout from "./layout/DashboardMainLayout";
import Blog from "./pages/home/Blog";
import Career from "./pages/home/Career";
import About from "./pages/home/About";
import DashboardStudentLayout from "./layout/DashboardStudentLayout";
import DashboardStudentHome from "./pages/student/DashboardStudentHome";
import DashboardStudentCourses from "./pages/student/DashboardStudentCourses";
import DashboardStudentAssignment from "./pages/student/DashboardStudentAssignments";
import DashboardMessage from "./pages/chat/DashboardMessage";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import CallProvider from "./call/CallContext";
import { socket } from "./utils/socket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// helper: lấy meta user cho modal gọi
function useUserMetaResolver() {
  return (userId) => ({
    name: `User ${String(userId).slice(-4)}`,
    avatar: "https://i.pravatar.cc/100",
  });
}

function AppRoutes() {
  const location = useLocation();
  const { user } = useAuth();
  const getUserMeta = useUserMetaResolver();

  // Kết nối socket khi đã đăng nhập
  useEffect(() => {
    if (!user?.id) return;
    socket.connect();
    socket.emit("join", user.id);
    return () => {
      socket.disconnect();
    };
  }, [user?.id]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<DashboardMainLayout />}>
          <Route
            index
            element={
              <Page>
                <Home />
              </Page>
            }
          />
          <Route
            path="courses"
            element={
              <Page>
                <Course />
              </Page>
            }
          />
          <Route
            path="careers"
            element={
              <Page>
                <Career />
              </Page>
            }
          />
          <Route
            path="blog"
            element={
              <Page>
                <Blog />
              </Page>
            }
          />
          <Route
            path="about"
            element={
              <Page>
                <About />
              </Page>
            }
          />
          <Route
            path="/course-view"
            element={
              <Page>
                <CourseView />
              </Page>
            }
          />
          <Route
            path="/courses/:id"
            element={
              <Page>
                <CourseDetail />
              </Page>
            }
          />
          <Route
            path="/checkout"
            element={
              <Page>
                <Checkout />
              </Page>
            }
          />
          <Route
            path="/call/:roomId"
            element={
              <Page>
                <VideoCallPage />
              </Page>
            }
          />
        </Route>

        <Route
          path="/auth"
          element={
            <Page>
              <Auth />
            </Page>
          }
        />

        {/* Admin */}
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

        {/* Teacher + CallProvider */}
        <Route
          path="/teacher"
          element={
            <CallProvider currentUser={user} getUserMeta={getUserMeta}>
              <DashboardTeacherLayout />
            </CallProvider>
          }
        >
          <Route index element={<DashboardTeacherHome />} />
          <Route path="new-course" element={<DashboardTeacherNewCourse />} />
          <Route path="my-courses" element={<DashboardTeacherMyCourse />} />
          <Route path="earning" element={<DashboardTeacherEarning />} />
          <Route path="messages" element={<DashboardMessage />} />
          <Route path="settings" element={<DashboardSetting />} />
        </Route>

        {/* Student + CallProvider */}
        <Route
          path="/student"
          element={
            <CallProvider currentUser={user} getUserMeta={getUserMeta}>
              <DashboardStudentLayout />
            </CallProvider>
          }
        >
          <Route index element={<DashboardStudentHome />} />
          <Route path="my-courses" element={<DashboardStudentCourses />} />
          <Route path="assignments" element={<DashboardStudentAssignment />} />
          <Route path="messages" element={<DashboardMessage />} />
          <Route path="settings" element={<DashboardSetting />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CallProvider>
        <AppRoutes />
        {/* ToastContainer đặt ở root để dùng ở mọi nơi */}
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </CallProvider>
    </AuthProvider>
  );
}
