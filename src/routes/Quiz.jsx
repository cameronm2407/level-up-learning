import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../Authentication";
import { ensureProgress, setLessonProgress, medal } from "../lib/progress";
import { QUIZ_POOLS, buildQuizAttempt } from "../lib/quizData";

export default function Quiz() {
  const { lessonId } = useParams();
  const { user } = useAuth();
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (user) ensureProgress(user.username);
  }, [user]);

  if (!user) return null;

  function startQuiz() {
    const pool = QUIZ_POOLS[lessonId] || [];
    const attempt = buildQuizAttempt(pool, 10);
    setQuestions(attempt);
    setStarted(true);
    setQIdx(0);
    setSelected(null);
    setCorrectCount(0);
    setFinished(false);
  }

  function chooseOption(i) {
    if (selected !== null) return;
    setSelected(i);
    if (questions[qIdx].options[i].isCorrect) {
      setCorrectCount((c) => c + 1);
    }
  }

  function nextQuestion() {
    if (qIdx + 1 < questions.length) {
      setQIdx((i) => i + 1);
      setSelected(null);
    } else {
      const medal = medal(correctCount);
      setLessonProgress(user.username, lessonId, {
        quiz: { bestCorrect: correctCount, medal },
      });
      setFinished(true);
    }
  }

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

      {/* Intro (Quiz not started) */}
      {!started && !finished && (
        <div className="max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold">How this quiz works</h2>
          <ul className="mt-3 space-y-2 text-slate-700 text-sm">
            <li>
              • You’ll answer <strong>10 questions</strong> chosen at random.
            </li>
            <li>• Questions and answer options are shuffled every attempt.</li>
            <li>• Scoring: 5+ = 🥉 Bronze, 7+ = 🥈 Silver, 10 = 🥇 Gold.</li>
            <li>• You can retry to improve your best medal.</li>
          </ul>
          <button
            className="mt-6 rounded-xl px-5 py-2.5 text-sm font-medium border border-slate-300 hover:bg-slate-50"
            onClick={startQuiz}
          >
            Start
          </button>
        </div>
      )}

      {/* Questions (Quiz in progress) */}
      {started && !finished && questions.length > 0 && (
        <div className="max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="text-xs text-slate-500 mb-2">
            Question {qIdx + 1} of {questions.length}
          </div>
          <h2 className="text-lg font-semibold">{questions[qIdx].prompt}</h2>

          <div className="mt-4 grid gap-3">
            {questions[qIdx].options.map((opt, i) => {
              const isChosen = selected === i;
              const isCorrect = opt.isCorrect;
              const showColors = selected !== null;
              const base =
                "w-full text-left rounded-xl px-4 py-2 text-sm border transition";
              const idle = "border-slate-300 hover:bg-slate-50";
              const correctCls = "border-emerald-300 bg-emerald-50";
              const wrongCls = "border-rose-300 bg-rose-50 opacity-90";
              const chosenCls =
                showColors && isChosen
                  ? isCorrect
                    ? correctCls
                    : wrongCls
                  : "";
              const revealCorrect =
                showColors && !isChosen && isCorrect
                  ? "border-emerald-300 bg-emerald-50"
                  : "";

              return (
                <button
                  key={i}
                  className={`${base} ${
                    showColors ? "" : idle
                  } ${chosenCls} ${revealCorrect}`}
                  onClick={() => chooseOption(i)}
                  disabled={selected !== null}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              className="rounded-xl px-4 py-2 text-sm font-medium border border-slate-300 disabled:opacity-40 hover:bg-slate-50"
              onClick={nextQuestion}
              disabled={selected === null}
            >
              {qIdx + 1 < questions.length ? "Next" : "Finish"}
            </button>
          </div>
        </div>
      )}

      {finished && (
        <div className="max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold">Quiz complete</h2>
          <p className="text-slate-700 mt-2">
            You got <strong>{correctCount}</strong> / {questions.length}{" "}
            correct.
          </p>

          <div className="mt-6 flex gap-3">
            <button
              className="rounded-xl px-4 py-2 text-sm font-medium border border-slate-300 hover:bg-slate-50"
              onClick={startQuiz}
            >
              Try again
            </button>
            <Link
              to={`/lessons/${lessonId}`}
              className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium border border-slate-300 hover:bg-slate-50"
            >
              Back to Lesson
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
