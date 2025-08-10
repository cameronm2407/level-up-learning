export default function StageCard({
  title,
  subtitle,
  status = "locked", // locked | current | done
  onOpen,
  disabled = false,
}) {
  const styles = {
    locked: "bg-white border-slate-200 opacity-60",
    current: "bg-white border-slate-200 shadow-sm ring-1 ring-slate-200",
    done: "bg-white border-slate-200 shadow-sm",
  }[status];

  const badge = {
    locked: {
      text: "Locked",
      cls: "bg-slate-100 text-slate-500 border-slate-200",
    },
    current: {
      text: "In progress",
      cls: "bg-slate-100 text-slate-700 border-slate-200",
    },
    done: {
      text: "Completed",
      cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  }[status];

  return (
    <div
      className={`relative rounded-2xl border p-5 ${styles} w-full max-w-sm`}
    >
      <div className="absolute right-4 top-4">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border ${badge.cls}`}
        >
          {badge.text}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}

      <button
        onClick={onOpen}
        disabled={disabled || status === "locked"}
        className={`mt-5 w-full text-center rounded-xl px-4 py-2 text-sm font-medium border border-slate-300
          ${
            status === "locked"
              ? "text-slate-400 cursor-not-allowed"
              : "hover:bg-slate-50"
          }`}
      >
        Open
      </button>
    </div>
  );
}
