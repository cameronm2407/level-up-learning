import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../Authentication";
import { ensureProgress } from "../lib/progress";
import { GAME_ROUNDS } from "../lib/gameContent";

export default function Game() {
  const { lessonId } = useParams();
  const { user } = useAuth();

  const [started, setStarted] = useState(false);
  const rounds = useMemo(() => GAME_ROUNDS[lessonId] ?? [], [lessonId]);

  useEffect(() => {
    if (user) ensureProgress(user.username);
  }, [user]);

  if (!user) return null;

  function BuildRound({ round }) {
    const [slots, setSlots] = useState(Array(round.slots).fill(null));
    const [used, setUsed] = useState(Array(round.pieces.length).fill(false));

    const nextEmpty = slots.findIndex((s) => s === null);
    const filled = nextEmpty === -1;

    function pickPiece(i) {
      if (used[i]) return;
      if (nextEmpty === -1) return;
      const copy = slots.slice();
      copy[nextEmpty] = round.pieces[i];
      setSlots(copy);

      const usedCopy = used.slice();
      usedCopy[i] = true;
      setUsed(usedCopy);
    }

    function clearSlots() {
      setSlots(Array(round.slots).fill(null));
      setUsed(Array(round.pieces.length).fill(false));
    }

    return (
      <div className="max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold">{round.prompt}</h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {slots.map((token, i) => (
            <div
              key={i}
              className="min-w-[72px] h-10 px-3 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-700"
            >
              {token ?? "—"}
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {round.pieces.map((p, i) => (
            <button
              key={i}
              onClick={() => pickPiece(i)}
              disabled={used[i]}
              className={`rounded-xl px-3 py-2 text-sm border ${
                used[i]
                  ? "border-slate-200 text-slate-400 cursor-not-allowed"
                  : "border-slate-300 hover:bg-slate-50"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={clearSlots}
            className="rounded-xl px-4 py-2 text-sm font-medium border border-slate-300 hover:bg-slate-50"
          >
            Clear
          </button>
          <button
            disabled={!filled}
            className="rounded-xl px-4 py-2 text-sm font-medium border border-slate-300 disabled:opacity-40 hover:bg-slate-50"
            onClick={() => {
              /* next step: check answer & scoring */
            }}
          >
            Next (placeholder)
          </button>
        </div>

        {round.followUp && (
          <p className="mt-4 text-sm text-slate-600">{round.followUp}</p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Mini‑game</h1>
        <Link
          to={`/lessons/${lessonId}`}
          className="text-sm font-medium text-slate-700 hover:underline"
        >
          ← Back to Lesson
        </Link>
      </div>

      {!started ? (
        <div className="max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold">How this game works</h2>
          <ul className="mt-3 space-y-2 text-slate-700 text-sm">
            <li>• You’ll play a few short rounds tied to this lesson.</li>
            <li>• Click the pieces to fill the blanks in order.</li>
            <li>• We’ll add scoring and medals after this scaffold.</li>
          </ul>
          <button
            className="mt-6 rounded-xl px-5 py-2.5 text-sm font-medium border border-slate-300 hover:bg-slate-50"
            onClick={() => setStarted(true)}
          >
            Start
          </button>
        </div>
      ) : rounds.length > 0 ? (
        // For now: render the first round only
        <BuildRound round={rounds[0]} />
      ) : (
        <div className="max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <p className="text-slate-600">No rounds configured yet.</p>
        </div>
      )}
    </div>
  );
}
