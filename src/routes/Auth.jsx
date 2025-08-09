import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../Authentication";

export default function Auth() {
  const [username, setUsername] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim()) return;
    signIn(username.trim());
    navigate(from, { replace: true });
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h1 className="text-xl font-semibold">Welcome back</h1>
        <p className="text-slate-600 mt-1">Sign in to continue.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Username
            </label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. cameron"
              autoFocus
            />
          </div>

          <button className="w-full rounded-xl px-4 py-2 text-sm font-medium border border-slate-300 hover:bg-slate-50">
            Sign in
          </button>
        </form>

        <div className="text-xs text-slate-500 mt-4">
          Prototype notice: this is mock auth (no passwords).{" "}
          <Link className="underline" to="/">
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
