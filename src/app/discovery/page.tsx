import { demoBlocks, demoFollowing, demoPosts, demoUsers } from "@/lib/demo-data";
import { buildDiscoveryFeed } from "@/lib/discovery-rules";

export default function DiscoveryPage() {
  const viewer = {
    id: "user-1",
    verified: true,
    interests: ["community", "calm-internet", "design", "healthy-routines"]
  };

  const rankedPosts = buildDiscoveryFeed(
    demoPosts.map((post) => {
      const text = post.text ?? "";
      return {
        ...post,
        tags: [
          post.visibility === "everyone" ? "public" : post.visibility,
          post.authorId === "user-1" ? "social" : "community",
          text.toLowerCase().includes("community") ? "community" : "general"
        ]
      };
    }),
    viewer,
    {
      followed: demoFollowing,
      blocks: demoBlocks,
      limit: 6
    }
  );

  return (
    <main className="page-shell">
      <section className="panel wide-panel">
        <p className="eyebrow">Separate discovery</p>
        <h1>Discovery</h1>
        <p className="muted">
          Discovery recommends content based on interests, freshness, and diversity,
          while keeping the Following feed intentionally calm and deliberate.
        </p>

        <div className="stacked-list discovery-page-list">
          {rankedPosts.map((post) => {
            const author = demoUsers.find((user) => user.id === post.authorId);

            return (
              <article key={post.id} className="discovery-card">
                <div className="mini-avatar">{author?.avatar ?? "D"}</div>
                <div>
                  <h3>{author?.displayName ?? "Community"}</h3>
                  <p className="muted">@{author?.username ?? "community"}</p>
                  <p className="post-body">{post.text}</p>
                  <p className="muted">Match score: {post.discoveryScore}</p>
                </div>
                {post.isAd ? <span className="sponsored-tag">Sponsored</span> : null}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
