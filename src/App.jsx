import { Routes, Route, Link } from "react-router-dom";
import Home from "./routes/Home.jsx";
import Auth from "./routes/Auth.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Lessons from "./routes/Lessons.jsx";
import Profile from "./routes/Profile.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Simple header nav just to move around for now */}
      <header className="bg-white border-b border-slate-200">
        <nav className="max-w-5xl mx-auto px-4 py-3 flex gap-4">
          <Link className="text-slate-700 hover:text-slate-900" to="/">
            Home
          </Link>
          <Link className="text-slate-700 hover:text-slate-900" to="/auth">
            Auth
          </Link>
          <Link className="text-slate-700 hover:text-slate-900" to="/dashboard">
            Dashboard
          </Link>
          <Link className="text-slate-700 hover:text-slate-900" to="/lessons">
            Lessons
          </Link>
          <Link className="text-slate-700 hover:text-slate-900" to="/profile">
            Profile
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/profile" element={<Profile />} />
        {/* Optional: a 404 later */}
      </Routes>
    </div>
  );
}
