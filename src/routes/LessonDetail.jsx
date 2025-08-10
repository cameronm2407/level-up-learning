import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StageCard from "../components/StageCard";
import StageArrow from "../components/Arrow";
import { LESSONS } from "../lib/lessons";
import { useAuth } from "../Authentication";
import { ensureProgress, getLessonProgress } from "../lib/progress";

export default function LessonDetail() {
  const { lessonId } = useParams();
  const lesson = LESSONS.find((l) => l.id === lessonId);
  const { user } = useAuth();
  const [lp, setLp] = useState(null);

  useEffect(() => {
    if (!user) return;
    ensureProgress(user.username);
    setLp(getLessonProgress(user.username, lessonId));
  }, [user, lessonId]);

  const stages = useMemo(() => {
    if (!lesson) return [];
    if (lesson.id === "l1") {
      return [
        {
          key: "quiz",
          title: "Quiz",
          subtitle: "10 questions chosen at random",
        },
        {
          key: "summary",
          title: "Summary",
          subtitle: "Your results & next steps",
        },
      ];
    }
    return [
      {
        key: "slides",
        title: "Slideshow",
        subtitle: "Learn the concept in short steps",
      },
      { key: "quiz", title: "Quiz", subtitle: "10 random questions" },
      {
        key: "game",
        title: "Mini‑game",
        subtitle: "Practice with a playful task",
      },
      {
        key: "summary",
        title: "Summary",
        subtitle: "Results, medals & unlocks",
      },
    ];
  }, [lesson]);

  if (!lesson) {
    return (
      <div>
        <p className="text-slate-700">Lesson not found.</p>
        <Link to="/lessons" className="text-slate-900 underline">
          Back to Lessons
        </Link>
      </div>
    );
  }

  function stageStatus(key) {
    if (!lp) return "locked";
    const unlocked = lp.unlocked;

    if (!unlocked) return "locked";

    if (lesson.id === "l1") {
      const quizDone = (lp.quiz?.medal ?? "none") !== "none";
      if (key === "quiz") return quizDone ? "done" : "current";
      if (key === "summary") return quizDone ? "current" : "locked";
      return "locked";
    }

    const quizDone = (lp.quiz?.medal ?? "none") !== "none";
    const gameDone = (lp.game?.medal ?? "none") !== "none";
    const slidesDone = lp.slidesDone === true; // Toggled later when stages fully built

    if (key === "slides") return slidesDone ? "done" : "current";
    if (key === "quiz")
      return slidesDone ? (quizDone ? "done" : "current") : "locked";
    if (key === "game")
      return slidesDone && quizDone
        ? gameDone
          ? "done"
          : "current"
        : "locked";
    if (key === "summary")
      return slidesDone && quizDone
        ? gameDone
          ? "current"
          : "locked"
        : "locked";
    return "locked";
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">{lesson.title}</h1>
        <Link
          to="/lessons"
          className="text-sm font-medium text-slate-700 hover:underline"
        >
          ← Back to Lessons
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-6">
        {stages.map((s, i) => (
          <div
            key={s.key}
            className="flex md:flex-row flex-col items-center gap-4 md:gap-6"
          >
            <StageCard
              title={s.title}
              subtitle={s.subtitle}
              status={stageStatus(s.key)}
              onOpen={() => {}}
              disabled={stageStatus(s.key) === "locked"}
            />
            {i < stages.length - 1 && <StageArrow />}
          </div>
        ))}
      </div>
    </div>
  );
}
