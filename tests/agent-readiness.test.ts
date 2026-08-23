import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(__dirname, "..");
const read = (p: string) => readFileSync(resolve(root, p), "utf8");

const MD_ROUTES = ["/", "/about", "/contact", "/privacy", "/terms", "/download", "/developers"];

describe("agent-friendly 404s", () => {
  const vercel = JSON.parse(read("vercel.json"));

  it("ships a static 404 document", () => {
    expect(existsSync(resolve(root, "public/404.html"))).toBe(true);
  });

  it("404 body points agents at machine-readable resources", () => {
    const html = read("public/404.html");
    for (const target of ["/llms.txt", "/sitemap.xml", "/.well-known/mcp", "/developers"]) {
      expect(html).toContain(target);
    }
    expect(html).toContain("404");
  });

  it("has no catch-all rewrite that would soft-404 unknown paths", () => {
    const sources: string[] = vercel.rewrites.map((r: { source: string }) => r.source);
    expect(sources).not.toContain("/(.*)");
    expect(sources.some((s) => s.includes("(?!"))).toBe(false);
  });

  it("rewrites every SPA route explicitly", () => {
    const app = read("src/App.tsx");
    const routes = [...app.matchAll(/<Route path="([^"]+)"/g)]
      .map((m) => m[1])
      .filter((p) => p !== "*" && p !== "/");
    const sources: string[] = vercel.rewrites.map((r: { source: string }) => r.source);
    for (const route of routes) {
      const normalised = route.replace(/:(\w+)/g, ":$1");
      const covered =
        sources.includes(normalised) ||
        sources.includes(normalised.replace(/\/error\/\d+/, "/error/:code")) ||
        (normalised.startsWith("/error/") && sources.includes("/error/:code"));
      expect(covered, `route ${route} has no vercel rewrite`).toBe(true);
    }
  });
});

describe("content without JavaScript", () => {
  const html = read("index.html");

  it("pre-renders content inside #root", () => {
    expect(html).toContain('<div id="root">');
    expect(html).toContain('id="prerender"');
  });

  it("has exactly one H1 with 500+ chars of static text", () => {
    const h1 = html.match(/<h1[^>]*>/g) ?? [];
    expect(h1).toHaveLength(1);
    const body = html.slice(html.indexOf('id="prerender"'));
    const text = body
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    expect(text.length).toBeGreaterThan(500);
  });
});

describe("markdown content negotiation", () => {
  const middleware = read("middleware.ts");
  const vercel = JSON.parse(read("vercel.json"));

  it("has a markdown mirror for every negotiated route", () => {
    for (const route of MD_ROUTES) {
      expect(middleware).toContain(`"${route}"`);
    }
    for (const file of ["index", "about", "contact", "privacy", "terms", "download", "developers"]) {
      const p = `public/md/${file}.md`;
      expect(existsSync(resolve(root, p)), `${p} missing`).toBe(true);
      expect(read(p).length).toBeGreaterThan(500);
    }
  });

  it("serves markdown with Vary: Accept", () => {
    expect(middleware).toContain("text/markdown; charset=utf-8");
    expect(middleware).toContain("Accept, Accept-Encoding");
  });

  it("sets Vary: Accept globally via vercel headers", () => {
    const global = vercel.headers.find((h: { source: string }) => h.source === "/(.*)");
    expect(global.headers).toEqual(
      expect.arrayContaining([{ key: "Vary", value: "Accept, Accept-Encoding" }]),
    );
    const md = vercel.headers.find((h: { source: string }) => h.source === "/md/(.*)");
    expect(md.headers.map((h: { key: string }) => h.key)).toContain("Content-Type");
  });
});

describe("developer discoverability and agent instructions", () => {
  const llms = read("public/llms.txt");

  it("publishes a named developer resources page", () => {
    const page = read("public/developers/index.html");
    expect(page).toMatch(/<title>VeloRix[^<]*Developer/);
    expect(page).toContain("<h1>VeloRix Tournaments Developer");
    expect(page).toContain("/.well-known/mcp");
  });

  it("lists developer resources in llms.txt", () => {
    expect(llms).toContain("/developers");
    expect(llms).toContain("/.well-known/mcp");
    expect(llms).toContain("llms-full.txt");
  });

  it("llms.txt has when-to-use guidance and a call path", () => {
    expect(llms).toMatch(/##\s*When to use VeloRix/);
    expect(llms).toContain("Do not use VeloRix for");
    expect(llms).toContain("How an agent should call VeloRix");
  });

  it("developers page is in the sitemap", () => {
    expect(read("public/sitemap.xml")).toContain("/developers</loc>");
  });
});

describe("trust anchor pages", () => {
  it("about, contact and privacy each expose 500+ chars of machine-readable text", () => {
    for (const file of ["about", "contact", "privacy"]) {
      const md = read(`public/md/${file}.md`);
      expect(md.length, `${file}.md too short`).toBeGreaterThan(500);
      expect(md).toContain("service.veloxyra@gmail.com");
    }
  });
});

describe("structured data", () => {
  const html = read("index.html");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => JSON.parse(m[1]),
  );

  it("every JSON-LD block parses", () => {
    expect(blocks.length).toBeGreaterThanOrEqual(4);
  });

  it("Organization schema is complete", () => {
    const org = blocks.find((b) => b["@type"] === "Organization");
    expect(org).toBeDefined();
    expect(org.name).toBeTruthy();
    expect(org.description).toBeTruthy();
    expect(org.url).toBeTruthy();
    expect(org.logo).toBeTruthy();
    expect(Array.isArray(org.sameAs)).toBe(true);
    expect(org.address["@type"]).toBe("PostalAddress");
    expect(org.address.addressCountry).toBe("IN");
    const contacts = Array.isArray(org.contactPoint) ? org.contactPoint : [org.contactPoint];
    expect(contacts.length).toBeGreaterThan(0);
    for (const c of contacts) {
      expect(c["@type"]).toBe("ContactPoint");
      expect(c.contactType).toBeTruthy();
      expect(c.email).toBeTruthy();
    }
  });

  it("app schema carries identity fields", () => {
    const app = blocks.find((b) => b["@type"] === "MobileApplication");
    expect(app.name).toBeTruthy();
    expect(app.description).toBeTruthy();
    expect(app.offers).toBeTruthy();
  });
});

describe("MCP manifest", () => {
  const wellKnown = JSON.parse(read("public/.well-known/mcp"));
  const manifest = JSON.parse(read(".lovable/mcp/manifest.json"));

  it("advertises a streamable-http server", () => {
    expect(wellKnown.servers).toHaveLength(1);
    expect(wellKnown.servers[0].transport).toBe("streamable-http");
    expect(wellKnown.servers[0].url).toBe("https://velorix-hub.vercel.app/mcp");
    expect(wellKnown.whenToUse).toBeTruthy();
  });

  it("proxies /mcp to the deployed function", () => {
    const vercel = JSON.parse(read("vercel.json"));
    const proxy = vercel.rewrites.find((r: { source: string }) => r.source === "/mcp");
    expect(proxy.destination).toMatch(/\/functions\/v1\/mcp$/);
  });

  it("well-known tool list matches the built manifest", () => {
    const built = manifest.mcp.tools.map((t: { name: string }) => t.name).sort();
    const advertised = wellKnown.tools.map((t: { name: string }) => t.name).sort();
    expect(advertised).toEqual(built);
    expect(wellKnown.name).toBe(manifest.mcp.server.name);
  });
});
