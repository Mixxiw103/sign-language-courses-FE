import { Route, Routes } from 'react-router-dom'
import './App.css'
import Course from './pages/course/Course'
import Home from './pages/home/Home'
import CourseDetail from './pages/course/CourseDetail'
import "@fortawesome/fontawesome-free/css/all.min.css";
import Auth from './pages/auth/Auth'

function App() {

  return (
    <Routes>
        {/* <Route index element={<StepOne />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/auth/" element={<Auth />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Routes>
  )
}

export default App
