import LessonCard from "../components/LessonCard";
import { LESSONS } from "../lib/lessons";
import { useAuth } from "../Authentication";
import { ensureProgress, getLessonProgress } from "../lib/progress";
import { useEffect, useState } from "react";

export default function Lessons() {
  const { user } = useAuth();
  const [prog, setProg] = useState(null);

  useEffect(() => {
    if (!user) return;
    const p = ensureProgress(user.username);
    setProg(p);
  }, [user]);

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-semibold mb-6">Lessons</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {LESSONS.map((l, idx) => {
          const lp = prog ? getLessonProgress(user.username, l.id) : null;

          const locked = !lp?.unlocked;
          const status = locked ? "locked" : "unlocked";
          const badge = locked
            ? "locked"
            : lp?.lessonBadge === "gold"
            ? "gold"
            : lp?.lessonBadge === "completed"
            ? "completed"
            : "available";

          const quizMedal = lp?.quiz?.medal ?? "none";
          const gameMedal =
            l.id === "l1" ? undefined : lp?.game?.medal ?? "none";

          return (
            <LessonCard
              key={l.id}
              number={idx + 1}
              title={l.title}
              description={l.description}
              status={status}
              badge={badge}
              quizMedal={quizMedal}
              gameMedal={gameMedal}
              to={`/lessons/${l.id}`}
            />
          );
        })}
      </div>
    </div>
  );
}
