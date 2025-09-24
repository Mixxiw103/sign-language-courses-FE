import { Route, Routes } from 'react-router-dom'
import './App.css'
import Course from './pages/course/Course'
import Home from './pages/home/Home'
import CourseDetail from './pages/course/CourseDetail'

function App() {

  return (
    <Routes>
        {/* <Route index element={<StepOne />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Routes>
  )
}

export default App
