import { SERVERS } from "../../data/servers";

export const metadata = {
  title: "설치 가이드 - Korea MCP Hub",
  description: "Claude Desktop, Claude Code, Cursor에서 한국 MCP 서버를 설정하는 방법",
};

function generateFullConfig() {
  const config: Record<string, unknown> = {};
  SERVERS.slice(0, 3).forEach((server) => {
    config[server.slug] = {
      command: server.installCommand.startsWith("npx") ? "npx" : server.installCommand.split(" ")[0],
      args: server.installCommand.startsWith("npx")
        ? [server.installCommand.replace("npx ", "")]
        : server.installCommand.split(" ").slice(1),
      ...(server.envVars && server.envVars.length > 0
        ? {
            env: Object.fromEntries(
              server.envVars.map((v) => [v.name, `your-${v.name.toLowerCase()}`])
            ),
          }
        : {}),
    };
  });
  return JSON.stringify({ mcpServers: config }, null, 2);
}

export default function GuidePage() {
  return (
    <main className="container" style={{ paddingTop: 40, paddingBottom: 80, maxWidth: 800 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
        설치 가이드
      </h1>
      <p style={{ color: "var(--text-gray)", marginBottom: 40 }}>
        AI 에이전트에서 한국 MCP 서버를 사용하는 방법
      </p>

      {/* Step 1 */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>
          1. MCP란?
        </h2>
        <div className="guide-section">
          <p style={{ color: "var(--text-light)", fontSize: 14, lineHeight: 1.8 }}>
            <strong>MCP (Model Context Protocol)</strong>는 AI 에이전트가 외부 도구와 통신하는 표준 프로토콜입니다.
            MCP 서버를 설치하면 Claude, ChatGPT, Cursor 등에서 한국 서비스(네이버 검색, 택배 조회, 공공데이터 등)를
            직접 사용할 수 있습니다.
          </p>
        </div>
      </section>

      {/* Step 2: Claude Desktop */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>
          2. Claude Desktop 설정
        </h2>
        <div className="guide-section" style={{ marginBottom: 16 }}>
          <h3 style={{ marginBottom: 8 }}>설정 파일 위치</h3>
          <div style={{ fontSize: 13, color: "var(--text-gray)", lineHeight: 2 }}>
            <p><strong>macOS:</strong>{" "}
              <code style={{ color: "var(--accent-green)" }}>
                ~/Library/Application Support/Claude/claude_desktop_config.json
              </code>
            </p>
            <p><strong>Windows:</strong>{" "}
              <code style={{ color: "var(--accent-green)" }}>
                %APPDATA%\Claude\claude_desktop_config.json
              </code>
            </p>
          </div>
        </div>
        <div className="guide-section">
          <h3 style={{ marginBottom: 8 }}>설정 예시</h3>
          <pre>{generateFullConfig()}</pre>
        </div>
      </section>

      {/* Step 3: Claude Code */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>
          3. Claude Code 설정
        </h2>
        <div className="guide-section">
          <pre>{`# 택배 조회 서버 추가
claude mcp add korea-delivery npx @korea-mcp/delivery

# KiMCP (네이버/카카오) 추가
claude mcp add kimcp npx kimcp

# 설치된 서버 확인
claude mcp list

# 서버 제거
claude mcp remove korea-delivery`}</pre>
        </div>
      </section>

      {/* Step 4: Cursor */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>
          4. Cursor 설정
        </h2>
        <div className="guide-section">
          <p style={{ color: "var(--text-light)", fontSize: 14, marginBottom: 12 }}>
            프로젝트 루트에 <code style={{ color: "var(--accent-green)" }}>.cursor/mcp.json</code> 파일을 생성하세요:
          </p>
          <pre>{JSON.stringify({
            mcpServers: {
              "korea-delivery": {
                command: "npx",
                args: ["@korea-mcp/delivery"],
                env: { SWEET_TRACKER_API_KEY: "your-api-key" }
              }
            }
          }, null, 2)}</pre>
        </div>
      </section>

      {/* Step 5: API Keys */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>
          5. API 키 발급 안내
        </h2>
        <div
          style={{
            background: "var(--bg-card)",
            borderRadius: 8,
            overflow: "hidden",
            border: "1px solid var(--border)",
          }}
        >
          {[
            { name: "Naver API", url: "https://developers.naver.com", desc: "네이버 검색, 뉴스 등" },
            { name: "Kakao API", url: "https://developers.kakao.com", desc: "카카오맵, 로컬 검색" },
            { name: "Sweet Tracker", url: "https://tracking.sweettracker.co.kr", desc: "택배 배송 추적" },
            { name: "공공데이터포털", url: "https://www.data.go.kr", desc: "공공데이터 API" },
          ].map((api, i) => (
            <div
              key={api.name}
              style={{
                padding: "14px 16px",
                borderBottom: i < 3 ? "1px solid var(--border)" : "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong style={{ fontSize: 14 }}>{api.name}</strong>
                <div style={{ fontSize: 12, color: "var(--text-gray)" }}>{api.desc}</div>
              </div>
              <a
                href={api.url}
                target="_blank"
                rel="noopener"
                style={{
                  padding: "6px 14px",
                  background: "rgba(59,130,246,0.15)",
                  borderRadius: 6,
                  fontSize: 12,
                  color: "var(--accent-blue)",
                }}
              >
                API 키 발급
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* All Servers */}
      <section>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>
          사용 가능한 서버
        </h2>
        <div
          style={{
            background: "var(--bg-card)",
            borderRadius: 8,
            overflow: "hidden",
            border: "1px solid var(--border)",
          }}
        >
          {SERVERS.map((server, i) => (
            <a
              key={server.slug}
              href={`/servers/${server.slug}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                borderBottom: i < SERVERS.length - 1 ? "1px solid var(--border)" : "none",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div>
                <strong style={{ fontSize: 14 }}>
                  {server.isOurs && <span className="badge badge-green" style={{ marginRight: 6, fontSize: 10 }}>Official</span>}
                  {server.name}
                </strong>
                <div style={{ fontSize: 12, color: "var(--text-gray)" }}>
                  {server.tools.length}개 도구
                </div>
              </div>
              <code style={{ fontSize: 12, color: "var(--accent-green)" }}>
                $ {server.installCommand}
              </code>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
