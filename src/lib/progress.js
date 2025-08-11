const KEY = "lul_progress";

const DEFAULT_PROGRESS = {
  l1: {
    unlocked: true,
    slidesDone: false,
    quiz: { bestCorrect: 0, medal: "none" },
    lessonBadge: "none",
  },
  l2: {
    unlocked: false,
    slidesDone: false,
    quiz: { bestCorrect: 0, medal: "none" },
    game: { bestScore: 0, medal: "none" },
    lessonBadge: "none",
  },
  l3: {
    unlocked: false,
    slidesDone: false,
    quiz: { bestCorrect: 0, medal: "none" },
    game: { bestScore: 0, medal: "none" },
    lessonBadge: "none",
  },
  l4: {
    unlocked: false,
    slidesDone: false,
    quiz: { bestCorrect: 0, medal: "none" },
    game: { bestScore: 0, medal: "none" },
    lessonBadge: "none",
  },
};

export function ensureProgress(username) {
  const all = getAll();
  if (!all[username]) {
    all[username] = DEFAULT_PROGRESS;
    localStorage.setItem(KEY, JSON.stringify(all));
  }
  return all[username];
}

export function getLessonProgress(username, lessonId) {
  const all = getAll();
  return all[username]?.[lessonId] || null;
}

export function setLessonProgress(username, lessonId, update) {
  const all = getAll();
  all[username] = all[username] || structuredClone(DEFAULT_PROGRESS);
  all[username][lessonId] = { ...(all[username][lessonId] || {}), ...update };
  localStorage.setItem(KEY, JSON.stringify(all));
}

function getAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function medalFromCorrect(correct) {
  if (correct >= 10) return "gold";
  if (correct >= 7) return "silver";
  if (correct >= 5) return "bronze";
  return "none";
}
