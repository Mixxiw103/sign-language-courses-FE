import { Route, Routes } from 'react-router-dom'
import './App.css'
import Course from './pages/course/Course'
import Home from './pages/home/Home'
import CourseDetail from './pages/course/CourseDetail'
import "@fortawesome/fontawesome-free/css/all.min.css";
import Auth from './pages/auth/Auth'
import Checkout from './pages/Checkout'
import Search from './pages/home/Search'

function App() {

  return (
    <Routes>
      {/* <Route index element={<StepOne />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/auth/" element={<Auth />} />
      <Route path="/courses" element={<Course />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/checkout" element={<Checkout />} />

    </Routes>
  )
}

export default App
