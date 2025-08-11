import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home.jsx";
import Auth from "./routes/Auth.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Lessons from "./routes/Lessons.jsx";
import LessonDetail from "./routes/LessonDetail.jsx";
import Slideshow from "./routes/Slideshow.jsx";
import Quiz from "./routes/Quiz.jsx";
import Game from "./routes/Game.jsx";
import Profile from "./routes/Profile.jsx";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public pages (does not require sign-in) without sidebar */}
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />

      {/* Protected (requires sign-in) App pages with sidebar */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lessons/:lessonId" element={<LessonDetail />} />
          <Route path="/lessons/:lessonId/slides" element={<Slideshow />} />
          <Route path="/lessons/:lessonId/quiz" element={<Quiz />} />
          <Route path="/lessons/:lessonId/game" element={<Game />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Optional: a 404 later */}
    </Routes>
  );
}
