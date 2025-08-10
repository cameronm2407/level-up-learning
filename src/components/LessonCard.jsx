import { Link } from "react-router-dom";

const Badge = ({ variant = "available", children }) => {
  const styles =
    {
      locked: "bg-slate-100 text-slate-500 border border-slate-200",
      available: "bg-slate-100 text-slate-700 border border-slate-200",
      completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      gold: "bg-amber-50 text-amber-800 border border-amber-200",
    }[variant] || "bg-slate-100 text-slate-700 border border-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${styles}`}
    >
      {children}
    </span>
  );
};

const Medal = ({ type }) => {
  const map = {
    gold: "🥇",
    silver: "🥈",
    bronze: "🥉",
    none: "—",
    undefined: "—",
  };
  return <span className="text-base leading-none">{map[type]}</span>;
};

export default function LessonCard({
  number,
  title,
  description,
  status = "unlocked",
  to = "#",
  badge = "available", // locked | available | completed | gold
  quizMedal = "none",
  gameMedal = undefined,
}) {
  const locked = status === "locked";

  return (
    <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col">
      <div className="absolute right-4 top-4">
        <Badge variant={locked ? "locked" : badge}>
          {locked
            ? "Locked"
            : badge === "gold"
            ? "Gold complete"
            : badge === "completed"
            ? "Completed"
            : "Available"}
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-medium">
          Lesson {number}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 flex-1">{description}</p>

      <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Quiz</span>
          <Medal type={quizMedal} />
        </div>
        {gameMedal !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Game</span>
            <Medal type={gameMedal} />
          </div>
        )}
      </div>

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
