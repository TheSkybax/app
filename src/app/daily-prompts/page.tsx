import { getDailyPrompt, getPromptAchievement } from "@/lib/daily-prompt";

export default function DailyPromptPage() {
  const prompt = getDailyPrompt(new Date("2026-08-18T12:00:00Z"));
  const achievement = getPromptAchievement([
    { userId: "user-1", date: "2026-08-10" },
    { userId: "user-1", date: "2026-08-18" }
  ]);

  return (
    <main className="page-shell">
      <section className="panel wide-panel">
        <p className="eyebrow">Daily community prompt</p>
        <h1>Reflection prompt</h1>

        <div className="prompt-card">
          <span className="pill soft">{prompt.category}</span>
          <h2>{prompt.question}</h2>
          <p className="muted">
            Participation is encouraged but never punished for missing a day. Progress is cumulative and respectful.
          </p>
          <button className="primary-action" type="button">Answer today</button>
        </div>

        <div className="prompt-achievement">
          <h3>Participation milestone</h3>
          <p>{achievement?.label ?? "No prompt participation yet"}</p>
          <span className="tag">{achievement?.level ?? "not started"}</span>
        </div>
      </section>
    </main>
  );
}
