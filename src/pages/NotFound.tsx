import { useLocation } from "@/lib/router-compat";
import { useEffect } from "react";
import { Crosshair } from "@/lib/icons";
import ErrorTemplate from "@/components/ErrorTemplate";

const RECOVERY_LINKS = [
  { label: "Sitemap", href: "/sitemap.xml", note: "every public URL" },
  { label: "llms.txt", href: "/llms.txt", note: "agent site index" },
  { label: "Developer docs", href: "/developers", note: "VeloRix API & MCP" },
  { label: "OpenAPI spec", href: "/openapi.json", note: "OpenAPI 3.1" },
  { label: "JSON API", href: "/api/v1", note: "read-only REST" },
  { label: "MCP handshake", href: "/.well-known/mcp", note: "Streamable HTTP" },
];

const MARKDOWN_BODY = `# 404 Not Found

The requested path does not exist on VeloRix Tournaments.

## Where to look next

${RECOVERY_LINKS.map((l) => `- [${l.label}](${l.href}) — ${l.note}`).join("\n")}
- [Home](/) — VeloRix Tournaments homepage

Contact: service.veloxyra@gmail.com`;

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <ErrorTemplate
      code="404"
      badge="Match Not Found"
      Icon={Crosshair}
      title="You've been eliminated from this page"
      description="Looks like this lobby doesn't exist or the match already ended. Let's get you back into the game."
      errorTag={`ERROR_CODE: ROUTE_NOT_FOUND · ${location.pathname}`}
      extra={
        <nav aria-label="Where to look next" className="mt-10 text-left">
          <h3 className="text-sm font-semibold text-foreground">Where to look next</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {RECOVERY_LINKS.map((link) => (
              <li key={link.href} className="text-sm">
                <a href={link.href} className="text-primary hover:underline">
                  {link.label}
                </a>
                <span className="text-muted-foreground"> — {link.note}</span>
              </li>
            ))}
          </ul>
          <pre className="mt-6 max-h-56 overflow-auto rounded-lg border border-border bg-secondary/40 p-4 text-left text-[11px] leading-relaxed text-muted-foreground whitespace-pre-wrap">
            {MARKDOWN_BODY}
          </pre>
        </nav>
      }
    />
  );
};

export default NotFound;
