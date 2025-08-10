import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-lg font-semibold">Level‑Up Learning</div>
          <nav className="hidden sm:flex items-center gap-4">
            <Link to="/auth" className="text-slate-700 hover:text-slate-900">
              Sign in
            </Link>
            <Link
              to="/auth"
              className="rounded-xl px-4 py-2 text-sm font-medium bg-slate-900 text-white hover:opacity-90"
            >
              Create account
            </Link>
          </nav>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Learn Python from zero — the fun way.
          </h1>
          <div className="text-slate-600 mt-4 space-y-3">
            <p>
              Learn the very basics of coding in Python with simple,
              step-by-step lessons you can complete in just minutes.
            </p>
            <p>Start from absolute zero — no prior experience needed.</p>
            <p>
              Each topic is broken into short slides, quick quizzes, and fun
              mini-games that help you practice as you go.
            </p>
            <p>
              Earn points, unlock new challenges, and see your progress grow
              with every session.
            </p>
          </div>

          {/*<div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/auth"
              className="rounded-xl px-5 py-2.5 text-sm font-medium bg-slate-900 text-white hover:opacity-90"
            >
              Create account
            </Link>
            <Link
              to="/auth"
              className="rounded-xl px-5 py-2.5 text-sm font-medium border border-slate-300 hover:bg-slate-50"
            >
              Sign in
            </Link>
          </div>

          <p className="text-xs text-slate-500 mt-3">
            Prototype: mock sign‑in only.
          </p> */}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="text-sm text-slate-500">What you will learn here</div>
          <ul className="mt-3 space-y-2 text-slate-700">
            <li>• Variables & data types</li>
            <li>• Printing & formatting</li>
            <li>• Functions & returns</li>
            <li>• Lists & indexing</li>
          </ul>
          <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            Finish lessons to earn XP and unlock the next one.
          </div>
        </div>
      </section>

      <div className="sm:hidden fixed bottom-4 left-0 right-0 px-4">
        <Link
          to="/auth"
          className="block text-center rounded-xl px-5 py-3 text-sm font-medium bg-slate-900 text-white shadow-sm"
        >
          Get started
        </Link>
      </div>
    </main>
  );
}
