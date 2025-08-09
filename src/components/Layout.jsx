import { Outlet, Link } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="md:hidden bg-white border-b border-slate-200 h-14 flex items-center px-4">
          <Link to="/" className="font-semibold">
            Level‑Up Learning
          </Link>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
