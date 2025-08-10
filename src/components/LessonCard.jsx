import { Link } from "react-router-dom";

export default function LessonCard({
  number,
  title,
  description,
  status = "unlocked",
  to = "#",
}) {
  const locked = status === "locked";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-medium">
          Lesson {number}
        </span>
        <span
          className={`text-xs font-medium ${
            locked ? "text-slate-500" : "text-slate-700"
          }`}
        >
          {locked ? "Locked" : "Available"}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 flex-1">{description}</p>

      {locked ? (
        <button
          disabled
          className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-400 cursor-not-allowed"
        >
          Locked
        </button>
      ) : (
        <Link
          to={to}
          className="mt-5 w-full text-center rounded-xl px-4 py-2 text-sm font-medium border border-slate-300 hover:bg-slate-50"
        >
          View lesson
        </Link>
      )}
    </div>
  );
}
