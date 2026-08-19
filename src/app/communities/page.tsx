import { demoCommunities, demoCommunityPosts } from "@/lib/communities";

export default function CommunitiesPage() {
  return (
    <main className="page-shell">
      <section className="panel wide-panel">
        <p className="eyebrow">Communities</p>
        <h1>Community spaces</h1>
        <p className="muted">
          Communities are designed for participation, not compulsive engagement. Moderators can set rules,
          visibility, and trusted participation options.
        </p>

        <div className="community-grid">
          {demoCommunities.map((community) => (
            <article key={community.id} className="community-card">
              <div className="community-card-header">
                <div>
                  <p className="eyebrow">{community.visibility}</p>
                  <h2>{community.name}</h2>
                </div>
                {community.verifiedOnly ? <span className="pill soft">Verified</span> : null}
              </div>

              <p className="community-description">{community.description}</p>

              <div className="tag-row">
                {community.tags.map((tag) => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>

              <div className="community-stat-row">
                <span>{community.members.toLocaleString()} members</span>
                <span>{community.moderatorCount} moderators</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel wide-panel community-feed-panel">
        <p className="eyebrow">Weekly discussion</p>
        <h2>Community prompts</h2>

        <div className="stacked-list">
          {demoCommunityPosts.map((post) => (
            <article key={post.id} className="community-post-card">
              <div className="post-head">
                <div className="avatar">{post.author.slice(0, 2).toUpperCase()}</div>
                <div>
                  <h3>{post.author}</h3>
                  <p className="muted">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <h4>{post.title}</h4>
              <p className="post-body">{post.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
