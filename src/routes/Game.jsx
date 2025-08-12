import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../Authentication";
import { ensureProgress } from "../lib/progress";
import { GAME_ROUNDS } from "../lib/gameContent";
import { shuffle } from "../lib/quizData";

export default function Game() {
  const { lessonId } = useParams();
  const { user } = useAuth();

  const [started, setStarted] = useState(false);
  const rounds = useMemo(() => GAME_ROUNDS[lessonId] ?? [], [lessonId]);

  const [roundIdx, setRoundIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (user) ensureProgress(user.username);
  }, [user]);

  if (!user) return null;

  function BuildRound({ round, onNext }) {
    const [slots, setSlots] = useState(Array(round.slots).fill(null));
    const [used, setUsed] = useState(Array(round.pieces.length).fill(false));

    const [shuffledPieces] = useState(() => shuffle(round.pieces));

    const nextEmpty = slots.findIndex((s) => s === null);
    const filled = nextEmpty === -1;

    const [attempt, setAttempt] = useState(0); // 0 = first try, 1 = second try
    const [checked, setChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    function pickPiece(i) {
      if (used[i]) return;
      if (nextEmpty === -1) return;
      const copy = slots.slice();
      copy[nextEmpty] = shuffledPieces[i];
      setSlots(copy);

      const usedCopy = used.slice();
      usedCopy[i] = true;
      setUsed(usedCopy);
    }

    function clearSlots() {
      setSlots(Array(round.slots).fill(null));
      setUsed(Array(round.pieces.length).fill(false));
    }

    function checkAnswer() {
      if (slots.some((s) => s === null)) return; // must fill all
      const ok = slots.every((s, i) => s === round.answer[i]);
      setIsCorrect(ok);
      setChecked(true);
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
          {shuffledPieces.map((p, i) => (
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
        <div className="mt-6 flex flex-wrap gap-3 items-center">
          <button
            onClick={clearSlots}
            className="rounded-xl px-4 py-2 text-sm font-medium border border-slate-300 hover:bg-slate-50"
          >
            Clear
          </button>

          {!checked ? (
            <button
              disabled={slots.some((s) => s === null)}
              className="rounded-xl px-4 py-2 text-sm font-medium border border-slate-300 disabled:opacity-40 hover:bg-slate-50"
              onClick={checkAnswer}
            >
              Check
            </button>
          ) : isCorrect ? (
            <button
              className="rounded-xl px-4 py-2 text-sm font-medium border border-slate-300 hover:bg-slate-50"
              onClick={() =>
                round.onNext?.(attempt === 0 ? 10 : 5) ||
                onNext?.(attempt === 0 ? 10 : 5)
              }
            >
              Next
            </button>
          ) : attempt === 0 ? (
            <button
              className="rounded-xl px-4 py-2 text-sm font-medium border border-slate-300 hover:bg-slate-50"
              onClick={() => {
                setAttempt(1);
                setChecked(false);
              }}
            >
              Try again
            </button>
          ) : (
            <button
              className="rounded-xl px-4 py-2 text-sm font-medium border border-slate-300 hover:bg-slate-50"
              onClick={() => round.onNext?.(0) || onNext?.(0)}
            >
              Next
            </button>
          )}
        </div>

        {checked && (
          <div
            className={`mt-3 text-sm ${
              isCorrect ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {isCorrect
              ? "Nice! That’s correct."
              : attempt === 0
              ? "Not quite — you’ve got one more try."
              : "We’ll learn from this and move on."}
          </div>
        )}

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
        started &&
        !finished &&
        rounds.length > 0 && (
          <BuildRound
            round={rounds[roundIdx]}
            onNext={(points) => {
              setScore((s) => s + points);
              if (roundIdx + 1 < rounds.length) {
                setRoundIdx((i) => i + 1);
              } else {
                setFinished(true);
              }
            }}
          />
        )
      ) : (
        <div className="max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <p className="text-slate-600">No rounds configured yet.</p>
        </div>
      )}
      {finished && (
        <div className="max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold">Game complete</h2>
          <p className="text-slate-700 mt-2">
            Score: <strong>{score}</strong>
          </p>
          <div className="mt-6 flex gap-3">
            <button
              className="rounded-xl px-4 py-2 text-sm font-medium border border-slate-300 hover:bg-slate-50"
              onClick={() => {
                setRoundIdx(0);
                setScore(0);
                setFinished(false);
                setStarted(false);
              }}
            >
              Back to intro
            </button>
            <Link
              to={`/lessons/${lessonId}`}
              className="rounded-xl px-4 py-2 text-sm font-medium border border-slate-300 hover:bg-slate-50"
            >
              Back to Lesson
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
