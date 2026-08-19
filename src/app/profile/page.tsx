import {
  buildProfileCustomization,
  getAccountAgeBadge,
  getFounderBadge,
  getThemeStyle
} from "@/lib/personalization";
import { demoBadges, demoProfileCustomization } from "@/lib/demo-data";

export default function ProfilePage() {
  const customization = buildProfileCustomization(demoProfileCustomization);
  const founderBadge = getFounderBadge(250);
  const ageBadge = getAccountAgeBadge("2024-08-18T00:00:00Z", new Date("2026-08-18T00:00:00Z"));
  const themeStyle = getThemeStyle(customization.theme);

  return (
    <main className="page-shell">
      <section className="panel profile-panel">
        <div
          className="profile-banner"
          style={{ background: themeStyle.gradient }}
        >
          <div className="profile-header">
            <div className="avatar large">CM</div>
            <div>
              <p className="eyebrow">User profile</p>
              <h1 style={{ color: customization.nameColor === "sunset" ? "#f7d8ad" : "#ffffff" }}>
                Calvin M. ✓
              </h1>
              <p className="muted light-text">@calvinm · Verified · Building a calmer internet</p>
            </div>
          </div>
        </div>

        <div className="profile-grid">
          <div className="panel dark-panel">
            <h3>About</h3>
            <p>
              Personalization should feel like a digital home, not a manipulation engine.
            </p>
            <div className="meta-list">
              <span>Theme: {customization.style.label}</span>
              <span>Background: {customization.background}</span>
              <span>Music: {customization.musicMood}</span>
              <span>Name color: {customization.nameColor}</span>
            </div>
          </div>

          <div className="panel dark-panel">
            <h3>Badges</h3>
            <ul className="checklist compact">
              {founderBadge ? <li>{founderBadge.label}</li> : null}
              {ageBadge ? <li>{ageBadge.label}</li> : null}
              {demoBadges.map((badge) => (
                <li key={badge.slug}>{badge.label}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
