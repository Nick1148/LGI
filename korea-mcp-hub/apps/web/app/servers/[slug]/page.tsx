import { SERVERS, CATEGORIES } from "../../../data/servers";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return SERVERS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const server = SERVERS.find((s) => s.slug === slug);
  if (!server) return { title: "Not Found" };
  return {
    title: `${server.name} - Korea MCP Hub`,
    description: server.description,
  };
}

function generateClaudeDesktopConfig(server: (typeof SERVERS)[0]) {
  const config: Record<string, unknown> = {
    mcpServers: {
      [server.slug]: {
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
      },
    },
  };
  return JSON.stringify(config, null, 2);
}

function generateClaudeCodeCommand(server: (typeof SERVERS)[0]) {
  let cmd = `claude mcp add ${server.slug} ${server.installCommand}`;
  if (server.envVars) {
    server.envVars.forEach((v) => {
      cmd += `\n\n# ${v.description}${v.required ? " (필수)" : " (선택)"}`;
      cmd += `\nexport ${v.name}="your-value"`;
    });
  }
  return cmd;
}

export default async function ServerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const server = SERVERS.find((s) => s.slug === slug);
  if (!server) notFound();

  const category = CATEGORIES.find((c) => c.id === server.category);

  return (
    <main className="container" style={{ paddingTop: 40, paddingBottom: 80, maxWidth: 800 }}>
      {/* Breadcrumb */}
      <nav style={{ fontSize: 13, color: "var(--text-gray)", marginBottom: 24 }}>
        <a href="/">Home</a> &gt; <a href="/servers">Servers</a> &gt;{" "}
        <span style={{ color: "var(--text-white)" }}>{server.name}</span>
      </nav>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          {server.isOurs && <span className="badge badge-green">Official</span>}
          {category && (
            <span className="badge badge-blue">
              {category.icon} {category.name}
            </span>
          )}
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>{server.name}</h1>
        <p style={{ fontSize: 16, color: "var(--text-gray)", lineHeight: 1.6 }}>
          {server.description}
        </p>
        <div style={{ marginTop: 12, fontSize: 13, color: "var(--text-gray)" }}>
          by{" "}
          <a href={server.authorUrl} target="_blank" rel="noopener">
            {server.author}
          </a>
          {server.githubUrl && (
            <>
              {" | "}
              <a href={server.githubUrl} target="_blank" rel="noopener">
                GitHub
              </a>
            </>
          )}
        </div>
      </div>

      {/* Tools */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>Tools ({server.tools.length})</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {server.tools.map((tool) => (
            <code
              key={tool}
              style={{
                padding: "6px 12px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 6,
                fontSize: 13,
                color: "var(--accent-blue)",
              }}
            >
              {tool}
            </code>
          ))}
        </div>
      </section>

      {/* Environment Variables */}
      {server.envVars && server.envVars.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, marginBottom: 12 }}>Environment Variables</h2>
          <div
            style={{
              background: "var(--bg-card)",
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid var(--border)",
            }}
          >
            {server.envVars.map((v, i) => (
              <div
                key={v.name}
                style={{
                  padding: "12px 16px",
                  borderBottom: i < server.envVars!.length - 1 ? "1px solid var(--border)" : "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <code style={{ color: "var(--accent-green)", fontSize: 13 }}>{v.name}</code>
                  <div style={{ fontSize: 12, color: "var(--text-gray)", marginTop: 2 }}>
                    {v.description}
                  </div>
                </div>
                <span
                  className={`badge ${v.required ? "badge-orange" : "badge-purple"}`}
                  style={{ fontSize: 11 }}
                >
                  {v.required ? "Required" : "Optional"}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Installation */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>Installation</h2>

        <div className="guide-section" style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 15 }}>Claude Desktop</h3>
          <p style={{ color: "var(--text-gray)", fontSize: 13, marginBottom: 12 }}>
            claude_desktop_config.json에 추가:
          </p>
          <pre>{generateClaudeDesktopConfig(server)}</pre>
        </div>

        <div className="guide-section">
          <h3 style={{ fontSize: 15 }}>Claude Code</h3>
          <pre>{generateClaudeCodeCommand(server)}</pre>
        </div>
      </section>

      {/* Tags */}
      <section>
        <div className="tags" style={{ gap: 8 }}>
          {server.tags.map((tag) => (
            <span
              key={tag}
              className="tag"
              style={{ fontSize: 13, padding: "4px 12px" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
