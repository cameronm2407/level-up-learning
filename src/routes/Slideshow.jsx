import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LESSONS } from "../lib/lessons";
import { useAuth } from "../Authentication";
import { ensureProgress, setLessonProgress } from "../lib/progress";
import { SLIDES } from "../lib/slides";

export default function Slideshow() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [idx, setIdx] = useState(0);

  const slides = SLIDES[lessonId] ?? [];

  useEffect(() => {
    if (!user) return;
    ensureProgress(user.username);
  }, [user]);

  if (!user) return null;
  if (!slides.length) {
    return (
      <div className="max-w-3xl">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold">No slides found</h2>
          <p className="text-slate-600 mt-2">
            This lesson doesn’t have content yet.
          </p>
        </div>
      </div>
    );
  }
  const atEnd = idx === slides.length - 1;

  function finishSlides() {
    setLessonProgress(user.username, lessonId, { slidesDone: true });
    navigate(`/lessons/${lessonId}`);
  }

  return (
    <div className="max-w-3xl">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="text-xs text-slate-500">
          Slide {idx + 1} of {slides.length}
        </div>
        <h2 className="text-2xl font-semibold mt-2">{slides[idx].t}</h2>
        <p className="text-slate-600 mt-3">{slides[idx].b}</p>

        <div className="mt-6 flex gap-3">
          <button
            className="rounded-xl px-4 py-2 text-sm font-medium border border-slate-300 disabled:opacity-40"
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
          >
            Back
          </button>

          {!atEnd ? (
            <button
              className="rounded-xl px-4 py-2 text-sm font-medium border border-slate-300 hover:bg-slate-50"
              onClick={() => setIdx((i) => Math.min(slides.length - 1, i + 1))}
            >
              Next
            </button>
          ) : (
            <button
              className="rounded-xl px-4 py-2 text-sm font-medium border border-slate-300 hover:bg-slate-50"
              onClick={finishSlides}
            >
              Finish slides
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
