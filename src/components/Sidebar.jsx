import { NavLink } from "react-router-dom";

const linkClasses = ({ isActive }) =>
  "block rounded-lg px-3 py-2 text-sm font-medium " +
  (isActive
    ? "bg-slate-100 text-slate-900"
    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50");

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 border-r border-slate-200 bg-white">
      <div className="h-16 flex items-center px-4 border-b border-slate-200">
        <span className="text-lg font-semibold">Level‑Up Learning</span>
      </div>

      <nav className="p-3 space-y-1">
        <NavLink to="/dashboard" className={linkClasses}>
          Dashboard
        </NavLink>
        <NavLink to="/lessons" className={linkClasses}>
          Lessons
        </NavLink>
        <NavLink to="/profile" className={linkClasses}>
          Profile
        </NavLink>
      </nav>

      <div className="mt-auto p-3 border-t border-slate-200">
        {/* Placeholder sign‑out for later */}
        <button className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">
          Sign out
        </button>
      </div>
    </aside>
  );
}
