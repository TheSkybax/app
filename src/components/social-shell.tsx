import Link from "next/link";

export type SocialViewer = {
  id: string;
  username?: string;
  displayName?: string;
  verified?: boolean;
};

export function SocialShell({
  viewer,
  feed,
  discovery
}: {
  viewer: SocialViewer;
  feed: Array<{
    id: string;
    authorId: string;
    text?: string;
    createdAt: string;
    visibility: string;
    isAd?: boolean;
    author?: { displayName?: string; username?: string; verified?: boolean; avatar?: string };
  }>;
  discovery: Array<{
    id: string;
    authorId: string;
    text?: string;
    createdAt: string;
    visibility: string;
    isAd?: boolean;
    author?: { displayName?: string; username?: string; verified?: boolean; avatar?: string };
  }>;
}) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">N</div>
          <div>
            <p className="eyebrow">Healthy social</p>
            <h1>Nativ</h1>
          </div>
        </div>

        <nav className="nav" aria-label="Main navigation">
          <Link href="/">Following</Link>
          <Link href="/discovery">Discovery</Link>
          <Link href="/communities">Communities</Link>
          <Link href="/daily-prompts">Prompts</Link>
          <Link href="/profile">Profile</Link>
        </nav>

        <div className="user-pill">
          <span>{viewer.displayName ?? viewer.username ?? "Guest"}</span>
          {viewer.verified ? <span className="verified-badge">✓</span> : null}
        </div>
      </header>

      <main className="layout">
        <aside className="rail left-rail">
          <section className="panel">
            <p className="panel-label">Profile</p>
            <h2>{viewer.displayName ?? "Nativ member"}</h2>
            <p className="muted">@{viewer.username ?? "nativ-user"}</p>
            <div className="stats-grid">
              <div>
                <strong>12</strong>
                <span>Followers</span>
              </div>
              <div>
                <strong>73</strong>
                <span>Following</span>
              </div>
              <div>
                <strong>4</strong>
                <span>Badges</span>
              </div>
            </div>
          </section>

          <section className="panel">
            <p className="panel-label">Controls</p>
            <ul className="checklist">
              <li>Verified-only viewing: Off</li>
              <li>Blocking: Enforced server-side</li>
              <li>Feed ordering: Chronological</li>
              <li>Ads in Following: Disabled</li>
            </ul>
          </section>
        </aside>

        <section className="feed-column">
          <div className="section-header">
            <div>
              <p className="eyebrow">Your feed</p>
              <h2>Following</h2>
            </div>
            <span className="pill soft">Chronological</span>
          </div>

          {feed.length === 0 ? (
            <div className="empty-state">You&apos;re all caught up.</div>
          ) : (
            feed.map((post) => (
              <article key={post.id} className="post-card">
                <div className="post-head">
                  <div className="avatar">{post.author?.avatar ?? "NA"}</div>
                  <div>
                    <h3>{post.author?.displayName ?? "Community member"}</h3>
                    <p className="muted">@{post.author?.username ?? "member"}</p>
                  </div>
                  <span className="visibility-tag">{post.visibility}</span>
                </div>

                <p className="post-body">{post.text}</p>

                <div className="post-meta">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>♡ 12</span>
                  <span>💬 3</span>
                  <span>↻ 2</span>
                </div>
              </article>
            ))
          )}
        </section>

        <aside className="rail right-rail">
          <section className="panel">
            <p className="panel-label">Discovery</p>
            <div className="stacked-list">
              {discovery.map((item) => (
                <div key={item.id} className="discovery-item">
                  <div className="mini-avatar">{item.author?.avatar ?? "D"}</div>
                  <div>
                    <strong>{item.author?.displayName ?? "Discovery"}</strong>
                    <p>{(item.text ?? "").slice(0, 72)}...</p>
                  </div>
                  {item.isAd ? <span className="sponsored-tag">Sponsored</span> : null}
                </div>
              ))}
            </div>
          </section>

          <section className="panel">
            <p className="panel-label">Healthy usage</p>
            <ul className="checklist">
              <li>No aggressive engagement loops</li>
              <li>Meaningful prompts and communities</li>
              <li>Verified and unverified accounts are both allowed</li>
              <li>Product prioritizes life improvement over attention capture</li>
            </ul>
          </section>
        </aside>
      </main>
    </div>
  );
}
