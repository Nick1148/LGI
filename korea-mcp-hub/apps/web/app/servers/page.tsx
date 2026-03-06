import { SERVERS, CATEGORIES } from "../../data/servers";

export default function ServersPage() {
  return (
    <main className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>MCP 서버 목록</h1>
      <p style={{ color: "var(--text-gray)", marginBottom: 32 }}>
        한국 서비스 연결을 위한 MCP 서버 {SERVERS.length}개
      </p>

      {CATEGORIES.map((cat) => {
        const servers = SERVERS.filter((s) => s.category === cat.id);
        if (servers.length === 0) return null;
        return (
          <section key={cat.id} id={cat.id} style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 22, marginBottom: 16 }}>
              {cat.icon} {cat.name}
            </h2>
            <div className="server-grid">
              {servers.map((server) => (
                <a
                  key={server.slug}
                  href={`/servers/${server.slug}`}
                  className={`server-card${server.isOurs ? " ours" : ""}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h3>
                    {server.isOurs && <span className="badge badge-green">Official</span>}
                    {server.name}
                  </h3>
                  <p>{server.description}</p>
                  <div className="tools-count">
                    {server.tools.length}개 도구
                  </div>
                  <div className="install-cmd">$ {server.installCommand}</div>
                  <div className="tags">
                    {server.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
