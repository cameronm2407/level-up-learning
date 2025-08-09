import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home.jsx";
import Auth from "./routes/Auth.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Lessons from "./routes/Lessons.jsx";
import Profile from "./routes/Profile.jsx";
import Layout from "./components/Layout.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public pages without sidebar */}
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />

      {/* App pages with sidebar layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Optional: a 404 later */}
    </Routes>
  );
}
