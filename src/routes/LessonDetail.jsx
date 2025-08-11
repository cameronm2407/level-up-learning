import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import StageCard from "../components/StageCard";
import StageArrow from "../components/Arrow";
import { LESSONS } from "../lib/lessons";
import { useAuth } from "../Authentication";
import { ensureProgress, getLessonProgress } from "../lib/progress";

export default function LessonDetail() {
  const navigate = useNavigate();
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
          key: "slides",
          title: "Slideshow",
          subtitle: "Read the short overview first",
          to: `/lessons/${lesson.id}/slides`,
        },
        {
          key: "quiz",
          title: "Quiz",
          subtitle: "10 questions chosen at random",
          to: `/lessons/${lesson.id}/quiz`,
        },
        {
          key: "summary",
          title: "Summary",
          subtitle: "Your results & next steps",
          to: `/lessons/${lesson.id}/sumarry`,
        },
      ];
    }
    return [
      {
        key: "slides",
        title: "Slideshow",
        subtitle: "Learn the concept in short steps",
        to: `/lessons/${lesson.id}/slides`,
      },
      {
        key: "quiz",
        title: "Quiz",
        subtitle: "10 random questions",
        to: `/lessons/${lesson.id}/quiz`,
      },
      {
        key: "game",
        title: "Mini‑game",
        subtitle: "Practice with a playful task",
        to: `/lessons/${lesson.id}/game`,
      },
      {
        key: "summary",
        title: "Summary",
        subtitle: "Results, medals & unlocks",
        to: `/lessons/${lesson.id}/summary`,
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

    const slidesDone = lp.slidesDone === true;
    const quizDone = (lp.quiz?.medal ?? "none") !== "none";
    const gameDone = (lp.game?.medal ?? "none") !== "none";

    if (key === "slides") return slidesDone ? "done" : "current";

    if (lesson.id === "l1") {
      if (key === "quiz")
        return slidesDone ? (quizDone ? "done" : "current") : "locked";
      if (key === "summary")
        return slidesDone ? (quizDone ? "current" : "locked") : "locked";
      return "locked";
    }

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
        {stages.map((s, i) => {
          const status = stageStatus(s.key);
          return (
            <div
              key={s.key}
              className="flex md:flex-row flex-col items-center gap-4 md:gap-6"
            >
              <StageCard
                title={s.title}
                subtitle={s.subtitle}
                status={stageStatus(s.key)}
                medal={
                  s.key === "quiz"
                    ? lp?.quiz?.medal
                    : s.key === "game"
                    ? lp?.game?.medal
                    : undefined
                }
                onOpen={() => status !== "locked" && navigate(s.to)}
                disabled={status === "locked"}
              />
              {i < stages.length - 1 && <StageArrow />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
