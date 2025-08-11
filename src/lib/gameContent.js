export const GAME_THRESHOLDS = { bronze: 30, silver: 45, gold: 60 };

export const GAME_ROUNDS = {
  l2: [
    {
      id: "l2-r1",
      type: "build",
      prompt: "Build a line that prints the name Ava.",
      slots: 3,
      pieces: ["name", "=", `"Ava"`, "print(name)"],
      answer: ["name", "=", `"Ava"`],
      followUp: "Now run print(name) to display the value.",
    },
    {
      id: "l2-r2",
      type: "build",
      prompt: "Build a line that stores the number 12 in age.",
      slots: 3,
      pieces: ["age", "=", "12", "print(age)"],
      answer: ["age", "=", "12"],
      followUp: "Use print(age) to show it on screen.",
    },
  ],
  l3: [],
  l4: [],
};
