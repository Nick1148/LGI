import { SERVERS, CATEGORIES } from "../data/servers";

export default function Home() {
  const ourServers = SERVERS.filter((s) => s.isOurs);
  const communityServers = SERVERS.filter((s) => !s.isOurs);
  const totalTools = SERVERS.reduce((sum, s) => sum + s.tools.length, 0);

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <p style={{ marginBottom: 16 }}>
            <span className="badge badge-green">v0.1.0 Beta</span>
          </p>
          <h1>한국 MCP 서버 허브</h1>
          <p>
            AI 에이전트(Claude, ChatGPT, Cursor)가 한국 서비스를 사용할 수 있게
            연결하는 MCP 서버를 한 곳에서 찾아보세요.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stat">
          <div className="stat-number">{SERVERS.length}</div>
          <div className="stat-label">MCP 서버</div>
        </div>
        <div className="stat">
          <div className="stat-number">{totalTools}</div>
          <div className="stat-label">AI Tools</div>
        </div>
        <div className="stat">
          <div className="stat-number">{CATEGORIES.length}</div>
          <div className="stat-label">카테고리</div>
        </div>
      </section>

      {/* Categories */}
      <section className="container">
        <div className="categories">
          {CATEGORIES.map((cat) => {
            const count = SERVERS.filter((s) => s.category === cat.id).length;
            return (
              <a
                key={cat.id}
                href={`/servers?category=${cat.id}`}
                className="category-btn"
              >
                {cat.icon} {cat.name} ({count})
              </a>
            );
          })}
        </div>
      </section>

      {/* Our Servers */}
      {ourServers.length > 0 && (
        <section className="container">
          <h2 className="section-title">
            ✨ Korea MCP Hub 오리지널
          </h2>
          <div className="server-grid">
            {ourServers.map((server) => (
              <a key={server.slug} href={`/servers/${server.slug}`} className="server-card ours" style={{ textDecoration: "none", color: "inherit" }}>
                <h3>
                  <span className="badge badge-green">Official</span>
                  {server.name}
                </h3>
                <p>{server.description}</p>
                <div className="tools-count">
                  🔧 {server.tools.length}개 도구: {server.tools.join(", ")}
                </div>
                <div className="install-cmd">$ {server.installCommand}</div>
                <div className="tags">
                  {server.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Community Servers */}
      <section className="container">
        <h2 className="section-title">
          🌐 커뮤니티 서버
        </h2>
        <div className="server-grid">
          {communityServers.map((server) => (
            <a key={server.slug} href={`/servers/${server.slug}`} className="server-card" style={{ textDecoration: "none", color: "inherit" }}>
              <h3>{server.name}</h3>
              <p>{server.description}</p>
              <div className="author">
                by <a href={server.authorUrl}>{server.author}</a>
              </div>
              <div className="tools-count">
                🔧 {server.tools.length}개 도구
              </div>
              <div className="install-cmd">$ {server.installCommand}</div>
              <div className="tags">
                {server.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="container">
        <h2 className="section-title">🚀 빠른 시작</h2>
        <div className="guide-section">
          <h3>Claude Desktop에서 사용하기</h3>
          <p style={{ color: "var(--text-gray)", marginBottom: 16, fontSize: 14 }}>
            claude_desktop_config.json 파일에 원하는 MCP 서버를 추가하세요.
          </p>
          <pre>{`// ~/Library/Application Support/Claude/claude_desktop_config.json (macOS)
// %APPDATA%\\Claude\\claude_desktop_config.json (Windows)

{
  "mcpServers": {
    "korea-delivery": {
      "command": "npx",
      "args": ["@korea-mcp/delivery"],
      "env": {
        "SWEET_TRACKER_API_KEY": "your-api-key"
      }
    },
    "kimcp": {
      "command": "npx",
      "args": ["kimcp"],
      "env": {
        "NAVER_CLIENT_ID": "your-naver-id",
        "NAVER_CLIENT_SECRET": "your-naver-secret"
      }
    }
  }
}`}</pre>
        </div>

        <div className="guide-section">
          <h3>Claude Code에서 사용하기</h3>
          <pre>{`# 택배 조회 서버 추가
claude mcp add korea-delivery npx @korea-mcp/delivery

# KiMCP (네이버/카카오) 추가
claude mcp add kimcp npx kimcp

# 설치 확인
claude mcp list`}</pre>
        </div>
      </section>
    </main>
  );
}
