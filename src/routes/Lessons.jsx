import LessonCard from "../components/LessonCard";
import { LESSONS } from "../lib/lessons";

export default function Lessons() {
  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-semibold mb-6">Lessons</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {LESSONS.map((l, idx) => (
          <LessonCard
            key={l.id}
            number={idx + 1}
            title={l.title}
            description={l.description}
            status={l.status}
            to={`/lessons/${l.id}`}
          />
        ))}
      </div>
    </div>
  );
}
