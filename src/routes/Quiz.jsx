import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../Authentication";
import { ensureProgress } from "../lib/progress";

export default function Quiz() {
  const { lessonId } = useParams();
  const { user } = useAuth();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (user) ensureProgress(user.username);
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Quiz</h1>
        <Link
          to={`/lessons/${lessonId}`}
          className="text-sm font-medium text-slate-700 hover:underline"
        >
          ← Back to Lesson
        </Link>
      </div>

      {!started ? (
        <div className="max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold">How it works</h2>
          <ul className="mt-3 space-y-2 text-slate-700 text-sm">
            <li>
              • You will atempt to answer <strong>10 questions!</strong>
            </li>
            <li>• Scoring: 5+ = 🥉 Bronze, 7+ = 🥈 Silver, 10 = 🥇 Gold.</li>
            <li>• You can retry to improve your best medal.</li>
            <li>• Good luck!!!</li>
          </ul>

          <button
            className="mt-6 rounded-xl px-5 py-2.5 text-sm font-medium border border-slate-300 hover:bg-slate-50"
            onClick={() => setStarted(true)}
          >
            Start
          </button>
        </div>
      ) : (
        <div className="max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <p className="text-slate-600">Quiz UI goes here</p>
        </div>
      )}
    </div>
  );
}
