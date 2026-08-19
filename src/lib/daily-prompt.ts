export type PromptParticipation = {
  userId: string;
  date: string;
};

export type DailyPrompt = {
  id: string;
  category: "weekly-reflection" | "community" | "learning";
  question: string;
  date: string;
};

export type PromptAchievement = {
  slug: string;
  label: string;
  description: string;
  level: "bronze" | "silver" | "gold";
};

const promptBank = [
  {
    id: "prompt-1",
    category: "weekly-reflection",
    question: "What is something you're looking forward to this week?",
    dateKey: "2026-08-18"
  },
  {
    id: "prompt-2",
    category: "community",
    question: "Who in your community has given you a boost lately?",
    dateKey: "2026-08-19"
  },
  {
    id: "prompt-3",
    category: "learning",
    question: "What is one thing you want to learn or practice this month?",
    dateKey: "2026-08-20"
  }
] as const;

export function getDailyPrompt(date: Date): DailyPrompt {
  const dateKey = date.toISOString().slice(0, 10);
  const prompt =
    promptBank.find((item) => item.dateKey === dateKey) ??
    promptBank[0];

  return {
    id: prompt.id,
    category: prompt.category,
    question: prompt.question,
    date: dateKey
  };
}

export function recordPromptParticipation(
  history: PromptParticipation[],
  userId: string,
  date: string
) {
  const existing = history.some(
    (entry) => entry.userId === userId && entry.date === date
  );

  if (existing) {
    return history;
  }

  return [...history, { userId, date }];
}

export function hasPromptParticipation(
  history: PromptParticipation[],
  userId: string
) {
  return history.some((entry) => entry.userId === userId);
}

export function getPromptAchievement(
  history: PromptParticipation[]
): PromptAchievement | null {
  const total = new Set(history.map((entry) => `${entry.userId}:${entry.date}`)).size;

  if (total >= 3) {
    return {
      slug: "prompt-participant",
      label: "Prompt Participant",
      description: "Cumulative participation in community prompts and reflection activities.",
      level: "gold"
    };
  }

  if (total >= 1) {
    return {
      slug: "prompt-participant",
      label: "Prompt Participant",
      description: "Cumulative participation in community prompts and reflection activities.",
      level: "bronze"
    };
  }

  return null;
}
