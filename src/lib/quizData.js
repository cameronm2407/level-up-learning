export const QUIZ_POOLS = {
  l1: [
    {
      id: "l1-q1",
      prompt: "Placeholder question 1",
      options: ["A", "B", "C", "D"],
      answerIndex: 0,
    },
    {
      id: "l1-q2",
      prompt: "Placeholder question 2",
      options: ["A", "B", "C", "D"],
      answerIndex: 1,
    },
    {
      id: "l1-q3",
      prompt: "Placeholder question 3",
      options: ["A", "B", "C", "D"],
      answerIndex: 2,
    },
    {
      id: "l1-q4",
      prompt: "Placeholder question 4",
      options: ["A", "B", "C", "D"],
      answerIndex: 3,
    },
    {
      id: "l1-q5",
      prompt: "Placeholder question 5",
      options: ["A", "B", "C", "D"],
      answerIndex: 0,
    },
    {
      id: "l1-q6",
      prompt: "Placeholder question 6",
      options: ["A", "B", "C", "D"],
      answerIndex: 1,
    },
    {
      id: "l1-q7",
      prompt: "Placeholder question 7",
      options: ["A", "B", "C", "D"],
      answerIndex: 2,
    },
    {
      id: "l1-q8",
      prompt: "Placeholder question 8",
      options: ["A", "B", "C", "D"],
      answerIndex: 3,
    },
    {
      id: "l1-q9",
      prompt: "Placeholder question 9",
      options: ["A", "B", "C", "D"],
      answerIndex: 0,
    },
    {
      id: "l1-q10",
      prompt: "Placeholder question 10",
      options: ["A", "B", "C", "D"],
      answerIndex: 1,
    },
    {
      id: "l1-q11",
      prompt: "Placeholder question 11",
      options: ["A", "B", "C", "D"],
      answerIndex: 2,
    },
    {
      id: "l1-q12",
      prompt: "Placeholder question 12",
      options: ["A", "B", "C", "D"],
      answerIndex: 3,
    },
    {
      id: "l1-q13",
      prompt: "Placeholder question 13",
      options: ["A", "B", "C", "D"],
      answerIndex: 0,
    },
    {
      id: "l1-q14",
      prompt: "Placeholder question 14",
      options: ["A", "B", "C", "D"],
      answerIndex: 1,
    },
    {
      id: "l1-q15",
      prompt: "Placeholder question 15",
      options: ["A", "B", "C", "D"],
      answerIndex: 2,
    },
  ],
  l2: [],
  l3: [],
  l4: [],
};

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickN(arr, n = 10) {
  if (!Array.isArray(arr)) return [];
  return shuffle(arr.slice()).slice(0, Math.min(n, arr.length));
}

export function buildQuizAttempt(pool, count = 10) {
  const questions = pickN(pool, count).map((q) => {
    const options = q.options.map((text, idx) => ({
      text,
      isCorrect: idx === q.answerIndex,
    }));
    return { id: q.id, prompt: q.prompt, options: shuffle(options) };
  });
  return questions;
}
